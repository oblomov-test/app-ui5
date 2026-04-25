sap.ui.define(["sap/ui/VersionInfo", "sap/m/MessageBox", "z2ui5/Runtime"], (VersionInfo, MessageBox, z2ui5) => {
	"use strict";

	return {
		// Inspects the loaded UI5 SDK and shows a tailored error message — distinguishes
		// between an OpenUI5 module-not-found situation and a generic module load failure.
		async check(err) {
			let gav;
			try {
				({ gav } = await VersionInfo.load());
			} catch (e) {
				z2ui5.logError("SDKCompat.check: VersionInfo.load failed", e);
				return;
			}
			if (!gav.includes("com.sap.ui5")) {
				MessageBox.error(`openui5 SDK is loaded, module: ${err?._modules} is not available in openui5`);
				return;
			}
			MessageBox.error(err.toLocaleString());
		},
	};
});
