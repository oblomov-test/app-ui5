sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ui5_v2/model/models",
], (UIComponent, Device, models) => {
	"use strict";

	return UIComponent.extend("ui5_v2.Component", {
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
