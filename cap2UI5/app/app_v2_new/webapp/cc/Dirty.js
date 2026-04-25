sap.ui.define(["z2ui5/_NoopControl", "z2ui5/Runtime"], (NoopControl, z2ui5) =>
	NoopControl.extend("z2ui5.Dirty", {
		metadata: {
			properties: {
				isDirty: { type: "boolean", defaultValue: false },
			},
		},
		setIsDirty(val) {
			this.setProperty("isDirty", val);
			const fallback = () => {
				window.onbeforeunload = val
					? (e) => {
						e.preventDefault();
						e.returnValue = "";
					}
					: null;
			};

			// use FLP dirty flag (SAPUI5 only) when in Launchpad, else fall back to browser unload
			try {
				if (z2ui5.oLaunchpad?.Container?.setDirtyFlag && z2ui5.oLaunchpad?.ShellUIService) {
					z2ui5.oLaunchpad.Container.setDirtyFlag(val);
				} else {
					fallback();
				}
			} catch (e) {
				z2ui5.logError(`Dirty.setIsDirty: setDirtyFlag failed`, e);
				fallback();
			}
		},
		exit() {
			window.onbeforeunload = null;
		},
	}),
);
