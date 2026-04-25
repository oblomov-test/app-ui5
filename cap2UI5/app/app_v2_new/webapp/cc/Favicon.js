sap.ui.define(["z2ui5/_NoopControl"], (NoopControl) =>
	NoopControl.extend("z2ui5.Favicon", {
		metadata: {
			properties: {
				favicon: { type: "string" },
			},
		},
		setFavicon(val) {
			this.setProperty("favicon", val);
			const existing = document.head.querySelector('link[rel="shortcut icon"]');
			if (existing) {
				existing.href = val;
			} else {
				document.head.appendChild(Object.assign(document.createElement("link"), { rel: "shortcut icon", href: val }));
			}
		},
	}),
);
