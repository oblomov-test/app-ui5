sap.ui.define(
	[
		"sap/ui/core/BusyIndicator",
		"sap/m/MessageBox",
		"z2ui5/Runtime",
		"z2ui5/BackendAdapter",
		"z2ui5/CustomJsParser",
		"z2ui5/Helpers",
	],
	(BusyIndicator, MessageBox, z2ui5, Adapter, CustomJsParser, Helpers) => {
	"use strict";

	const ERROR_MAX_LENGTH = 50000;
	const RETRY_DELAYS_MS = [250, 500, 1000];

	const { sleep, escapeHtml } = Helpers;

	let csrfToken = null;

	// Lazy: only fetch when the backend signals it's required (typical SAP Gateway).
	// Backends without CSRF (e.g., CAP REST) never trigger this.
	const fetchCsrfToken = async () => {
		try {
			const resp = await fetch(z2ui5.oConfig.pathname, {
				method: "HEAD",
				headers: { "X-CSRF-Token": "Fetch" },
			});
			const t = resp.headers.get("X-CSRF-Token");
			csrfToken = t && t.toLowerCase() !== "required" ? t : null;
		} catch {
			csrfToken = null;
		}
	};

	return {
		endSession() {
			if (z2ui5.contextId) {
				fetch(z2ui5.oConfig.pathname, {
					method: "HEAD",
					keepalive: true,
					headers: {
						"sap-terminate": "session",
						"sap-contextid": z2ui5.contextId,
						"sap-contextid-accept": "header",
					},
				}).catch(() => {});
				delete z2ui5.contextId;
			}
		},
		Roundtrip() {
			z2ui5.checkNestAfter = z2ui5.checkNestAfter2 = false;
			const oBody = (z2ui5.oBody ??= {});
			oBody.S_FRONT = {
				ID: oBody.ID,
				CONFIG: z2ui5.oConfig,
				ORIGIN: window.location.origin,
				PATHNAME: window.location.pathname,
				SEARCH: window.location.search,
				VIEW: oBody.VIEWNAME,
				EVENT: oBody.ARGUMENTS?.[0]?.[0],
				HASH: window.location.hash,
			};
			const sFront = oBody.S_FRONT;
			oBody.ARGUMENTS?.shift();
			sFront.T_EVENT_ARG = oBody.ARGUMENTS;
			delete oBody.ID;
			delete oBody.VIEWNAME;
			delete oBody.ARGUMENTS;
			if (!sFront.T_EVENT_ARG?.length) delete sFront.T_EVENT_ARG;
			if (sFront.T_STARTUP_PARAMETERS === undefined) delete sFront.T_STARTUP_PARAMETERS;
			if (sFront.SEARCH === "") delete sFront.SEARCH;
			if (!oBody.XX) delete oBody.XX;
			this.readHttp();
		},

		async readHttp() {
			const body = z2ui5.safeStringify({ value: z2ui5.oBody }, 0);

			const doPost = () => {
				const headers = {
					"Content-Type": "application/json",
					"sap-contextid-accept": "header",
					"sap-contextid": z2ui5.contextId ?? "",
				};
				if (csrfToken) headers["X-CSRF-Token"] = csrfToken;
				return fetch(z2ui5.oConfig.pathname, { method: "POST", headers, body });
			};

			// Transient errors (network failures, 5xx) get exponential-backoff retries.
			// Client errors (4xx) and CSRF challenges (handled below) bail out immediately.
			let response;
			let lastNetworkError;
			for (let attempt = 0; ; attempt++) {
				try {
					response = await doPost();
					lastNetworkError = null;
					if (response.status < 500) break;
				} catch (e) {
					lastNetworkError = e;
				}
				if (attempt >= RETRY_DELAYS_MS.length) break;
				await sleep(RETRY_DELAYS_MS[attempt]);
			}
			if (lastNetworkError) {
				this.responseError(`Network error: ${lastNetworkError.message}`);
				return;
			}
			// Retry once on CSRF expiry
			if (response.status === 403 && (response.headers.get("X-CSRF-Token") ?? "").toLowerCase() === "required") {
				await fetchCsrfToken();
				try {
					response = await doPost();
				} catch (e) {
					this.responseError(`Network error: ${e.message}`);
					return;
				}
			}
			z2ui5.contextId = response.headers.get("sap-contextid");
			if (!response.ok) {
				let text;
				try {
					text = await response.text();
				} catch {
					text = `HTTP ${response.status}: could not read error body`;
				}
				this.responseError(text);
				return;
			}
			let responseData;
			try {
				responseData = await response.json();
			} catch (e) {
				this.responseError(`Invalid JSON response: ${e.message}`);
				return;
			}
			if (!responseData?.S_FRONT) {
				this.responseError(`Invalid response: missing S_FRONT`);
				return;
			}
			z2ui5.responseData = responseData;
			z2ui5.xxChanges = new Map();
			const {
				S_FRONT: { ID, PARAMS },
				MODEL,
			} = responseData;
			this.responseSuccess({ ID, PARAMS, OVIEWMODEL: MODEL });
		},
		async responseSuccess(response) {
			const { oController } = z2ui5;
			try {
				z2ui5.oResponse = response;
				const sView = Adapter.view(response);
				if (sView?.CHECK_DESTROY) oController.ViewDestroy();
				const customJs = Adapter.customJs(response);
				if (customJs) {
					queueMicrotask(() => {
						if (oController.isDestroyed?.()) return;
						for (const item of customJs) {
							try {
								const callArgs = CustomJsParser.parse(item);
								if (callArgs) {
									oController.eF(...callArgs);
								} else {
									z2ui5.logError(`customJs: rejected non-conforming payload`, item);
								}
							} catch (e) {
								z2ui5.logError(`customJs: execution failed`, e);
							}
						}
					});
				}
				oController.showMessage(response);
				if (sView?.XML) {
					oController.ViewDestroy();
					await oController.displayView(sView.XML, response.OVIEWMODEL);
					return;
				}
				const viewByParam = {
					[Adapter.PARAM.VIEW]: z2ui5.oView,
					[Adapter.PARAM.NEST]: z2ui5.oViewNest,
					[Adapter.PARAM.NEST2]: z2ui5.oViewNest2,
					[Adapter.PARAM.POPUP]: z2ui5.oViewPopup,
					[Adapter.PARAM.POPOVER]: z2ui5.oViewPopover,
				};
				for (const param of Adapter.ALL_VIEW_PARAMS) {
					oController.updateModelIfRequired(param, viewByParam[param]);
				}
				oController._processAfterRendering();
			} catch (e) {
				BusyIndicator.hide();
				z2ui5.isBusy = false;
				z2ui5.logError(`responseSuccess: unexpected error`, e);
				const msg = e.message ?? "";
				if (msg.includes("openui5") && msg.includes("script load error")) {
					oController.checkSDKcompatibility(e);
				} else {
					MessageBox.error(e.toLocaleString());
				}
			}
		},
		_getOrCreateErrorContainer() {
			const existing = document.getElementById("serverErrorContainer");
			if (existing) return existing;
			const container = Object.assign(document.createElement("div"), { id: "serverErrorContainer" });
			container.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          height: 90%;
          background: white;
          border: 2px solid #d32f2f;
          border-radius: 4px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.3);
          z-index: 9999;
          display: flex;
          flex-direction: column;
        `;
			document.body.appendChild(container);
			return container;
		},
		responseError(response) {
			BusyIndicator.hide();
			z2ui5.isBusy = false;

			const full = String(response);
			const errorMessage =
				full.length > ERROR_MAX_LENGTH
					? `${full.slice(0, ERROR_MAX_LENGTH)}\n\n<!-- Content truncated - too long -->`
					: full;

			const errorContainer = this._getOrCreateErrorContainer();
			errorContainer.textContent = "";

			const headerDiv = document.createElement("div");
			headerDiv.style.cssText =
				"padding: 15px; background: #d32f2f; color: white; display: flex; justify-content: space-between; align-items: center;";
			const h3 = Object.assign(document.createElement("h3"), { textContent: "Server Error - Please Restart The App" });
			h3.style.cssText = "margin: 0";
			headerDiv.appendChild(h3);

			const btnStyle =
				"padding: 6px 14px; background: white; color: #d32f2f; border: none; border-radius: 3px; cursor: pointer; font-weight: bold;";

			const actionsDiv = document.createElement("div");
			actionsDiv.style.cssText = "display: flex; gap: 8px;";

			const refreshBtn = Object.assign(document.createElement("button"), { type: "button", textContent: "Refresh" });
			refreshBtn.style.cssText = btnStyle;
			refreshBtn.addEventListener("click", () => window.location.reload());
			actionsDiv.appendChild(refreshBtn);

			const logoutBtn = Object.assign(document.createElement("button"), { type: "button", textContent: "Logout" });
			logoutBtn.style.cssText = btnStyle;
			logoutBtn.addEventListener("click", () => {
				const redirectToLogoff = () => {
					window.location.href = "/sap/public/bc/icf/logoff";
				};
				try {
					if (z2ui5.oLaunchpad?.Container?.logout) {
						z2ui5.oLaunchpad.Container.logout();
					} else {
						redirectToLogoff();
					}
				} catch {
					redirectToLogoff();
				}
			});
			actionsDiv.appendChild(logoutBtn);

			headerDiv.appendChild(actionsDiv);

			errorContainer.appendChild(headerDiv);

			const iframe = Object.assign(document.createElement("iframe"), { id: "errorIframe" });
			iframe.style.cssText = "width: 100%; height: 100%; border: none; flex: 1;";
			iframe.setAttribute("sandbox", "");
			iframe.srcdoc =
				`<!DOCTYPE html><html><body style="margin:0;padding:0;">` +
				`<pre style="margin:0;padding:8px;font-family:monospace;font-size:12px;white-space:pre-wrap;word-break:break-all;">` +
				escapeHtml(errorMessage) +
				`</pre></body></html>`;
			errorContainer.appendChild(iframe);
		},
	};
	},
);
