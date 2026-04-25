sap.ui.define(["z2ui5/_NoopControl", "z2ui5/Runtime"], (NoopControl, z2ui5) =>
	NoopControl.extend("z2ui5.LPTitle", {
		metadata: {
			properties: {
				title: { type: "string" },
				ApplicationFullWidth: { type: "boolean" },
			},
		},
		setTitle(val) {
			this.setProperty("title", val);
			try {
				z2ui5.oLaunchpad?.ShellUIService?.setTitle(val)?.catch((e) =>
					z2ui5.logError(`LPTitle: Launchpad Service setTitle failed`, e),
				);
			} catch (e) {
				z2ui5.logError(`LPTitle: Launchpad Service setTitle failed`, e);
			}
		},
		setApplicationFullWidth(val) {
			this.setProperty("ApplicationFullWidth", val);
			try {
				z2ui5.oLaunchpad?.AppConfiguration?.setApplicationFullWidth(val);
			} catch (e) {
				z2ui5.logError(`LPTitle: setApplicationFullWidth failed`, e);
			}
		},
	}),
);
