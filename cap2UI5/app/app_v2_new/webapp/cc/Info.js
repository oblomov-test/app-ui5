sap.ui.define(["sap/ui/core/Control", "z2ui5/Runtime"], (Control, z2ui5) => {
	"use strict";

	return Control.extend("z2ui5.Info", {
		metadata: {
			properties: {
				ui5_version: {
					type: "string",
				},
				device_phone: {
					type: "string",
				},
				device_desktop: {
					type: "string",
				},
				device_tablet: {
					type: "string",
				},
				device_combi: {
					type: "string",
				},
				device_height: {
					type: "string",
				},
				device_width: {
					type: "string",
				},
				ui5_theme: {
					type: "string",
				},
				device_os: {
					type: "string",
				},
				device_systemtype: {
					type: "string",
				},
				device_browser: {
					type: "string",
				},
			},
			events: {
				finished: {
					allowPreventDefault: true,
					parameters: {},
				},
			},
		},

		renderer: {
			apiVersion: 2,
			render(_, oControl) {
				try {
					const deviceData = z2ui5.oView?.getModel("device")?.getData();
					if (!deviceData) return;
					const { system, resize, os, browser } = deviceData;
					for (const [prop, val] of [
						["ui5_version", z2ui5.oConfig?.UI5VersionInfo?.version],
						["device_phone", system.phone],
						["device_desktop", system.desktop],
						["device_tablet", system.tablet],
						["device_combi", system.combi],
						["device_height", resize.height],
						["device_width", resize.width],
						["device_os", os.name],
						["device_browser", browser.name],
					])
						oControl.setProperty(prop, String(val ?? ""), true);
					oControl.fireFinished();
				} catch (e) {
					z2ui5.logError(`Info.renderer: failed`, e);
				}
			},
		},
	});
});
