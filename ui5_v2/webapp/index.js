sap.ui.define([
	"sap/ui/core/ComponentContainer",
], (ComponentContainer) => {
	"use strict";

	new ComponentContainer({
		id: "ui5_v2Container",
		name: "ui5_v2",
		async: true,
		manifest: true,
		height: "100%",
	}).placeAt("content");
});
