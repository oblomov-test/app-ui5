sap.ui.define(["sap/ui/core/Control"], (Control) =>
	Control.extend("z2ui5._NoopControl", {
		renderer: {
			apiVersion: 2,
			render() {},
		},
	}),
);
