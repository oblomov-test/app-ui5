sap.ui.define(["sap/ui/core/Control", "sap/ui/util/Storage", "z2ui5/Runtime"], (Control, Storage, z2ui5) => {
	"use strict";

	return Control.extend("z2ui5.Storage", {
		metadata: {
			properties: {
				type: {
					type: "string",
					defaultValue: "session",
				},
				prefix: {
					type: "string",
					defaultValue: "",
				},
				key: {
					type: "string",
					defaultValue: "",
				},
				value: {
					type: "any",
					defaultValue: "",
				},
			},
			events: {
				finished: {
					parameters: {
						type: {
							type: "string",
						},
						prefix: {
							type: "string",
						},
						key: {
							type: "string",
						},
						value: {
							type: "any",
						},
					},
				},
			},
		},

		renderer: {
			apiVersion: 2,
			render(_, oControl) {
				const type = oControl.getProperty("type");
				const prefix = oControl.getProperty("prefix");
				const key = oControl.getProperty("key");
				const value = oControl.getProperty("value");
				let stored;
				try {
					stored = new Storage(Storage.Type[type] ?? Storage.Type.session, prefix).get(key) ?? "";
				} catch (e) {
					z2ui5.logError(`Storage: read failed for key '${key}'`, e);
					return;
				}
				if (stored !== value) {
					oControl.setProperty("value", stored, true);
					oControl.fireFinished({ type, prefix, key, value: stored });
				}
			},
		},
	});
});
