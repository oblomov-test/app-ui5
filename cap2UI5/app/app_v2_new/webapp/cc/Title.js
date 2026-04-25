sap.ui.define(["z2ui5/_NoopControl"], (NoopControl) =>
	NoopControl.extend("z2ui5.Title", {
		metadata: {
			properties: {
				title: { type: "string" },
			},
		},
		setTitle(val) {
			this.setProperty("title", val);
			document.title = String(val ?? "");
		},
	}),
);
