sap.ui.define(
	["sap/m/ComboBox", "sap/ui/core/Item", "sap/m/ComboBoxRenderer", "z2ui5/Runtime"],
	(ComboBox, Item, ComboBoxRenderer, z2ui5) => {
		"use strict";

		return ComboBox.extend("z2ui5.CameraSelector", {
			async init() {
				ComboBox.prototype.init.call(this);
				try {
					const devices = await navigator.mediaDevices?.enumerateDevices();
					if (!devices) return;
					for (const device of devices) {
						if (device.kind === "videoinput" && !this.isDestroyed())
							this.addItem(new Item({ key: device.deviceId, text: device.label }));
					}
				} catch (err) {
					z2ui5.logError(`CameraDeviceList: enumerateDevices failed`, err);
				}
			},

			renderer: ComboBoxRenderer,
		});
	},
);
