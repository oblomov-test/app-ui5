sap.ui.define(
	[
		"sap/ui/core/Fragment",
		"sap/m/MessageBox",
		"sap/m/library",
		"sap/ui/util/Storage",
		"sap/ui/model/odata/v2/ODataModel",
		"z2ui5/Runtime",
		"z2ui5/ViewLifecycle",
		"z2ui5/BackendAdapter",
	],
	(Fragment, MessageBox, mobileLibrary, Storage, ODataModel, z2ui5, ViewLifecycle, Adapter) => {
		"use strict";

		const _SAFE_PROTOCOLS = new Set(["http:", "https:"]);
		const _URLHelper = mobileLibrary.URLHelper;

		const isValidRedirectURL = (url) => {
			if (!url) return false;
			try {
				const { origin, protocol } = new URL(url, window.location.origin);
				if (origin !== window.location.origin) {
					z2ui5.logError(`Security: Blocked redirect to different origin: ${url}`);
					return false;
				}
				if (!_SAFE_PROTOCOLS.has(protocol)) {
					z2ui5.logError(`Security: Blocked redirect with invalid protocol: ${protocol}`);
					return false;
				}
				return true;
			} catch (e) {
				z2ui5.logError(`Security: Invalid URL format: ${url}`, e);
				return false;
			}
		};

		const copyToClipboard = (textToCopy) => {
			if (!navigator.clipboard?.writeText) {
				z2ui5.logError(`Clipboard: writeText API not available`);
				return;
			}
			navigator.clipboard.writeText(textToCopy).catch((err) => z2ui5.logError(`Clipboard: writeText failed`, err));
		};

		const withCrossAppNavigator = (callback) => {
			const nav = z2ui5.oLaunchpad?.CrossAppNavigator;
			if (!nav) {
				z2ui5.logError(`CrossAppNav: not running inside Launchpad`);
				return;
			}
			try {
				callback(nav);
			} catch (e) {
				z2ui5.logError(`CrossAppNav: callback failed`, e);
			}
		};

		const navContainerLookups = {
			NAV_CONTAINER_TO: (id) => z2ui5.oView?.byId(id),
			NEST_NAV_CONTAINER_TO: (id) => z2ui5.oViewNest?.byId(id),
			NEST2_NAV_CONTAINER_TO: (id) => z2ui5.oViewNest2?.byId(id),
			POPUP_NAV_CONTAINER_TO: (id) => Fragment.byId(Adapter.FRAGMENT_ID.POPUP, id),
			POPOVER_NAV_CONTAINER_TO: (id) => Fragment.byId(Adapter.FRAGMENT_ID.POPOVER, id),
		};

		const viewLookups = {
			MAIN: () => z2ui5.oView,
			NEST: () => z2ui5.oViewNest,
			NEST2: () => z2ui5.oViewNest2,
			POPUP: () => z2ui5.oViewPopup,
			POPOVER: () => z2ui5.oViewPopover,
		};

		const ACTIONS = {
			SET_SIZE_LIMIT(args) {
				const hasLimit = args[2] !== undefined && args[2] !== "";
				const viewKey = hasLimit ? args[2] : args[1];
				const limit = hasLimit ? Number(args[1]) : NaN;
				const model = viewLookups[viewKey]?.()?.getModel();
				if (Number.isFinite(limit) && limit > 0) {
					(z2ui5.viewSizeLimits ??= {})[viewKey] = limit;
					if (model) {
						model.setSizeLimit(limit);
						model.refresh(true);
					}
				} else {
					if (z2ui5.viewSizeLimits) delete z2ui5.viewSizeLimits[viewKey];
					if (model) {
						model.setSizeLimit(100);
						model.refresh(true);
					}
				}
			},

			HISTORY_BACK() {
				history.back();
			},

			CLIPBOARD_COPY(args) {
				copyToClipboard(args[1]);
			},

			CLIPBOARD_APP_STATE() {
				copyToClipboard(`${window.location.href}#/z2ui5-xapp-state=${z2ui5.oResponse?.ID}`);
			},

			SET_ODATA_MODEL(args) {
				try {
					const oModel = new ODataModel({ serviceUrl: args[1], annotationURI: args[3] ?? "" });
					z2ui5.oView?.setModel(oModel, args[2] || undefined);
				} catch (e) {
					z2ui5.logError(`SET_ODATA_MODEL: failed for '${args[1]}'`, e);
				}
			},

			STORE_DATA(args) {
				const { TYPE, PREFIX, VALUE, KEY } = ensureObj(args[1]);
				try {
					const oStorage = new Storage(Storage.Type[TYPE] ?? Storage.Type.session, PREFIX);
					if (VALUE === "" || VALUE == null) {
						oStorage.remove(KEY);
					} else {
						oStorage.put(KEY, VALUE);
					}
				} catch (e) {
					z2ui5.logError(`STORE_DATA: storage operation failed for key '${KEY}'`, e);
				}
			},

			DOWNLOAD_B64_FILE(args) {
				Object.assign(document.createElement("a"), { href: args[1], download: args[2] }).click();
			},

			CROSS_APP_NAV_TO_PREV_APP() {
				withCrossAppNavigator((nav) => nav.backToPreviousApp());
			},

			CROSS_APP_NAV_TO_EXT(args) {
				withCrossAppNavigator((nav) => {
					const params = ensureObj(args[2]);
					const hash = nav.hrefForExternal({ target: args[1], params }) ?? "";
					if (args[3] === "EXT") {
						_URLHelper.redirect(`${window.location.href.split("#")[0]}${hash}`, true);
					} else {
						nav.toExternal({ target: { shellHash: hash } });
					}
				});
			},

			LOCATION_RELOAD(args) {
				if (isValidRedirectURL(args[1])) {
					window.location.href = args[1];
				} else {
					MessageBox.error("Invalid redirect URL. Only relative URLs to the same domain are allowed.");
				}
			},

			SYSTEM_LOGOUT(args) {
				const logoutUrl = args[1] || "/sap/public/bc/icf/logoff";
				const redirectToLogoff = () => {
					if (isValidRedirectURL(logoutUrl)) {
						window.location.href = logoutUrl;
					} else {
						MessageBox.error("Invalid logout URL. Only relative URLs to the same domain are allowed.");
					}
				};
				try {
					if (z2ui5.oLaunchpad?.Container?.logout) {
						z2ui5.oLaunchpad.Container.logout();
					} else {
						redirectToLogoff();
					}
				} catch (e) {
					z2ui5.logError(`SYSTEM_LOGOUT: ushell logout failed`, e);
					redirectToLogoff();
				}
			},

			OPEN_NEW_TAB(args) {
				if (isValidRedirectURL(args[1])) {
					const newWindow = window.open(args[1], "_blank");
					if (newWindow) newWindow.opener = null;
				} else {
					MessageBox.error("Invalid URL. Only relative URLs to the same domain are allowed.");
				}
			},

			POPUP_CLOSE() {
				ViewLifecycle.destroyPopup();
			},

			POPOVER_CLOSE() {
				ViewLifecycle.destroyPopover();
			},

			URLHELPER(args) {
				const params = ensureObj(args[2]);
				const handlers = {
					REDIRECT: () => _URLHelper.redirect(params.URL, params.NEW_WINDOW),
					TRIGGER_EMAIL: () =>
						_URLHelper.triggerEmail(
							params.EMAIL,
							params.SUBJECT,
							params.BODY,
							params.CC,
							params.BCC,
							params.NEW_WINDOW,
						),
					TRIGGER_SMS: () => _URLHelper.triggerSms(params),
					TRIGGER_TEL: () => _URLHelper.triggerTel(params),
				};
				try {
					handlers[args[1]]?.();
				} catch (e) {
					z2ui5.logError(`URLHELPER: '${args[1]}' failed`, e);
				}
			},

			IMAGE_EDITOR_POPUP_CLOSE(_args, controller) {
				let image;
				try {
					image = Fragment.byId(Adapter.FRAGMENT_ID.POPUP, "imageEditor")?.getImagePngDataURL();
				} catch (e) {
					z2ui5.logError(`IMAGE_EDITOR_POPUP_CLOSE: getImagePngDataURL failed`, e);
				}
				ViewLifecycle.destroyPopup();
				controller.eB(["SAVE"], image);
			},

			Z2UI5(args) {
				try {
					z2ui5[args[1]]?.(args.slice(2));
				} catch (e) {
					z2ui5.logError(`Z2UI5: '${args[1]}' failed`, e);
				}
			},
		};

		const navigateContainer = (lookup, args) => {
			try {
				lookup(args[1])?.to(lookup(args[2]));
			} catch (e) {
				z2ui5.logError(`navigateContainer: navigation failed`, e);
			}
		};

		// Backend convenience methods on the server (storage_set, url_helper_*, cross_app_nav_to_ext)
		// JSON-encode their object arguments because S_FOLLOW_UP_ACTION.CUSTOM_JS strings can only
		// carry apostrophe-tokenized scalars. Coerce string → object here so XML-driven calls (which
		// still pass real objects) and backend-driven calls (which pass strings) both work.
		const ensureObj = (v) => (typeof v === "string" ? JSON.parse(v) : v);

		return {
			dispatch(args, controller) {
				// Normalise the two call shapes:
				//   .eF('ACTION', extra1, extra2)         → args = ['ACTION', extra1, extra2]
				//   .eF(['ACTION', arg1, arg2], extra1)   → args = [['ACTION', arg1, arg2], extra1]
				// The second form (used by _event_client when there are args) puts everything
				// into the first array. We flatten so handlers see a single args list with
				// args[0] = action name, args[1..] = action args.
				const flat = Array.isArray(args[0])
					? [...args[0], ...args.slice(1)]
					: args;

				const navLookup = navContainerLookups[flat[0]];
				if (navLookup) {
					navigateContainer(navLookup, flat);
					return;
				}
				const handler = ACTIONS[flat[0]];
				if (handler) handler(flat, controller);
			},
		};
	},
);
