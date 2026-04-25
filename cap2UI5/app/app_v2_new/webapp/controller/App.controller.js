sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"app_v2/controller/View1.controller",
		"z2ui5/Runtime",
		"z2ui5/Server",
		"z2ui5/Util",
		"z2ui5/BackendAdapter",
	],
	(BaseController, Controller, z2ui5, Server, Util, Adapter) => {
		"use strict";

		z2ui5.Util = Util;

		const makeController = (viewKey) => {
			const c = new Controller();
			c._viewKey = viewKey;
			return c;
		};

		return BaseController.extend("app_v2.controller.App", {
			onInit() {
				const oOwnerComponent = this.getOwnerComponent();
				z2ui5.oOwnerComponent = oOwnerComponent;
				const uri = oOwnerComponent.getManifest()?.["sap.app"]?.dataSources?.http?.uri;
				z2ui5.oConfig.pathname = z2ui5.checkLocal ? window.location.href : uri;

				Object.assign(z2ui5, {
					oController: makeController(Adapter.VIEW_KEY.MAIN),
					oApp: this.getView().byId("app"),
					oControllerNest: makeController(Adapter.VIEW_KEY.NEST),
					oControllerNest2: makeController(Adapter.VIEW_KEY.NEST2),
					oControllerPopup: makeController(Adapter.VIEW_KEY.POPUP),
					oControllerPopover: makeController(Adapter.VIEW_KEY.POPOVER),
					errors: [],
					checkNestAfter: false,
					checkNestAfter2: false,
				});
				z2ui5.hooks.clear();

				this._kickOffInitialRoundtrip();
			},

			async _kickOffInitialRoundtrip() {
				try {
					await this.getOwnerComponent().whenReady();
					if (this.getView()?.isDestroyed()) return;
					z2ui5.checkInit = true;
					Server.Roundtrip();
				} catch (e) {
					z2ui5.logError(`App: initial roundtrip failed`, e);
				}
			},
		});
	},
);
