sap.ui.define([
	"sap/ui/core/ComponentContainer",
], (ComponentContainer) => {
	"use strict";

	new ComponentContainer({
		id: "app2Container",
		name: "app2",
		async: true,
		manifest: true,
		height: "100%",
	}).placeAt("content");
});
