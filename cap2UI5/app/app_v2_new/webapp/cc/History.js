sap.ui.define(["z2ui5/_NoopControl", "z2ui5/Runtime"], (NoopControl, z2ui5) =>
	NoopControl.extend("z2ui5.History", {
		metadata: {
			properties: {
				search: { type: "string" },
			},
		},
		setSearch(val) {
			this.setProperty("search", val);
			try {
				history.replaceState(null, "", `${window.location.pathname}${val ?? ""}`);
			} catch (e) {
				z2ui5.logError(`History.setSearch: replaceState failed`, e);
			}
		},
	}),
);
