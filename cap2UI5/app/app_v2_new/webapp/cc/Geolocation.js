sap.ui.define(["z2ui5/_HiddenControl", "z2ui5/Runtime"], (HiddenControl, z2ui5) => {
	"use strict";

	const _GEO_PROPS = ["longitude", "latitude", "altitude", "accuracy", "altitudeAccuracy", "speed", "heading"];

	return HiddenControl.extend("z2ui5.Geolocation", {
		metadata: {
			properties: {
				longitude: { type: "string", defaultValue: "" },
				latitude: { type: "string", defaultValue: "" },
				altitude: { type: "string", defaultValue: "" },
				accuracy: { type: "string", defaultValue: "" },
				altitudeAccuracy: { type: "string", defaultValue: "" },
				speed: { type: "string", defaultValue: "" },
				heading: { type: "string", defaultValue: "" },
				enableHighAccuracy: { type: "boolean", defaultValue: false },
				timeout: { type: "string", defaultValue: "5000" },
			},
			events: {
				finished: { allowPreventDefault: true, parameters: {} },
			},
		},

		callbackPosition({ coords }) {
			if (this.isDestroyed()) return;
			for (const prop of _GEO_PROPS) this.setProperty(prop, coords[prop]?.toString() ?? "", true);
			this.fireFinished();
		},

		init() {
			this._pendingGeolocate = true;
		},

		exit() {
			this._pendingGeolocate = false;
		},

		onAfterRendering() {
			if (!this._pendingGeolocate) return;
			this._pendingGeolocate = false;
			try {
				navigator.geolocation?.getCurrentPosition(
					this.callbackPosition.bind(this),
					(error) => z2ui5.logError(`Geolocation error (${error.code}): ${error.message}`),
					{
						enableHighAccuracy: this.getProperty("enableHighAccuracy"),
						timeout: +this.getProperty("timeout"),
					},
				);
			} catch (e) {
				z2ui5.logError(`Geolocation.onAfterRendering: getCurrentPosition failed`, e);
			}
		},
	});
});
