sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"app2/model/models",
], (UIComponent, Device, models) => {
	"use strict";

	return UIComponent.extend("app2.Component", {
		metadata: {
			manifest: "json",
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
		},

		init() {
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");

			this.getRouter().initialize();
		},
	});
});
