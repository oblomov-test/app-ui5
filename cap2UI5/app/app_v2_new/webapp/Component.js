sap.ui.define(
	[
		"sap/ui/core/UIComponent",
		"app_v2/model/models",
		"z2ui5/Runtime",
		"z2ui5/Server",
		"sap/ui/VersionInfo",
		"z2ui5/DebugTool",
	],
	(UIComponent, Models, z2ui5, Server, VersionInfo, DebugTool) => {
		"use strict";
		return UIComponent.extend("app_v2.Component", {
			metadata: {
				manifest: "json",
				interfaces: ["sap.ui.core.IAsyncContentCreation"],
			},
			init() {
				z2ui5.oConfig = {};

				UIComponent.prototype.init.call(this);

				if (z2ui5.checkLocal === false) z2ui5.reset();
				z2ui5.oDeviceModel = Models.createDeviceModel();
				this.setModel(z2ui5.oDeviceModel, "device");

				z2ui5.oConfig.ComponentData = this.getComponentData();

				this._readyPromise = this._initAsync();

				this._listenerCleanup = new AbortController();
				const { signal } = this._listenerCleanup;
				const unloadEvent = /iPad|iPhone/.test(navigator.userAgent) ? "pagehide" : "beforeunload";

				window.addEventListener(unloadEvent, () => this._onUnload(), { signal });
				document.addEventListener("keydown", (e) => this._onKeydown(e), { signal });
				window.addEventListener("popstate", (e) => this._onPopstate(e), { signal });
			},

			_onUnload() {
				this.destroy();
			},

			_onKeydown(zEvent) {
				if (zEvent.ctrlKey && zEvent.key === "F12") {
					z2ui5.debugTool ??= new DebugTool();
					z2ui5.debugTool.toggle();
				}
			},

			_onPopstate(event) {
				delete event?.state?.response?.PARAMS?.SET_PUSH_STATE;
				delete event?.state?.response?.PARAMS?.SET_APP_STATE_ACTIVE;
				if (event?.state?.view) {
					z2ui5.oController?.ViewDestroy();
					z2ui5.oResponse = event.state.response;
					z2ui5.oController
						?.displayView(event.state.view, event.state.model)
						?.catch((e) => z2ui5.logError(`popstate: displayView failed`, e));
				}
			},

			async _initAsync() {
				try {
					const Container = sap.ui.require("sap/ushell/Container");
					if (Container) {
						const launchpad = { Container };
						try {
							launchpad.ShellUIService = await this.getService("ShellUIService");
						} catch (e) {
							z2ui5.logError(`Component: ShellUIService init failed`, e);
						}
						try {
							launchpad.CrossAppNavigator = await Container.getServiceAsync("CrossApplicationNavigation");
						} catch (e) {
							z2ui5.logError(`Component: CrossApplicationNavigation init failed`, e);
						}
						try {
							launchpad.AppConfiguration = await new Promise((resolve, reject) =>
								sap.ui.require(["sap/ushell/services/AppConfiguration"], resolve, reject),
							);
						} catch (e) {
							z2ui5.logError(`Component: AppConfiguration init failed`, e);
						}
						if (!this.isDestroyed()) z2ui5.oLaunchpad = launchpad;
					}
				} catch (e) {
					z2ui5.logError(`Component: Launchpad init failed`, e);
				}

				try {
					const { version, buildTimestamp, gav } = await VersionInfo.load();
					if (!this.isDestroyed()) z2ui5.oConfig.UI5VersionInfo = { version, buildTimestamp, gav };
				} catch (e) {
					z2ui5.logError(`Component: VersionInfo load failed`, e);
				}
			},

			whenReady() {
				return this._readyPromise ?? Promise.resolve();
			},

			exit() {
				this._listenerCleanup?.abort();
				Server.endSession();
				UIComponent.prototype.exit.call(this);
			},
		});
	},
);
