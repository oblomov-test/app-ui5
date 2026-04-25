sap.ui.define(["z2ui5/_HiddenControl", "z2ui5/Runtime"], (HiddenControl, z2ui5) =>
	HiddenControl.extend("z2ui5.Focus", {
		metadata: {
			properties: {
				setUpdate: { type: "boolean", defaultValue: true },
				focusId: { type: "string" },
				selectionStart: { type: "string", defaultValue: "0" },
				selectionEnd: { type: "string", defaultValue: "0" },
			},
		},
		setFocusId(val) {
			try {
				this.setProperty("focusId", val);
				const oElement = z2ui5.oView?.byId(val);
				if (oElement) oElement.applyFocusInfo(oElement.getFocusInfo());
			} catch (e) {
				z2ui5.logError(`Focus.setFocusId failed`, e);
			}
		},
		onAfterRendering() {
			if (!this._pendingFocus) return;
			this._pendingFocus = false;
			const oElement = z2ui5.oView?.byId(this.getProperty("focusId"));
			if (!oElement) return;
			try {
				oElement.applyFocusInfo(
					Object.assign(oElement.getFocusInfo(), {
						selectionStart: +this.getProperty("selectionStart"),
						selectionEnd: +this.getProperty("selectionEnd"),
					}),
				);
			} catch (e) {
				z2ui5.logError(`Focus.onAfterRendering: applyFocusInfo failed`, e);
			}
		},
		afterHiddenRender() {
			if (!this.getProperty("setUpdate")) return;
			this.setProperty("setUpdate", false, true);
			this._pendingFocus = true;
		},
	}),
);
