sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
], (Controller, MessageToast) => {
	"use strict";

	return Controller.extend("ui5_v2.controller.Main", {
		onInit() {
		},

		onSayHello() {
			const oBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageToast.show(oBundle.getText("helloMessage"));
		},
	});
});
