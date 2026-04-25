sap.ui.define(["sap/ui/core/Control"], (Control) =>
	Control.extend("z2ui5._HiddenControl", {
		renderer: {
			apiVersion: 2,
			render(oRm, oControl) {
				oRm.openStart("span", oControl);
				oRm.style("display", "none");
				oRm.openEnd();
				oRm.close("span");
				oControl.afterHiddenRender?.();
			},
		},
	}),
);
