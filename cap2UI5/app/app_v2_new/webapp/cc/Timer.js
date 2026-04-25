sap.ui.define(["z2ui5/_HiddenControl"], (HiddenControl) =>
	HiddenControl.extend("z2ui5.Timer", {
		metadata: {
			properties: {
				delayMS: { type: "int", defaultValue: 0 },
				checkActive: { type: "boolean", defaultValue: true },
				checkRepeat: { type: "boolean", defaultValue: false },
			},
			events: {
				finished: { allowPreventDefault: true, parameters: {} },
			},
		},
		onAfterRendering() {
			if (!this._pendingTimer) return;
			this._pendingTimer = false;
			this.delayedCall();
		},
		exit() {
			clearTimeout(this._timerId);
		},
		delayedCall() {
			if (!this.getProperty("checkActive")) return;
			clearTimeout(this._timerId);
			this._timerId = setTimeout(() => {
				if (this.isDestroyed()) return;
				if (!this.getProperty("checkRepeat")) this.setProperty("checkActive", false, true);
				this.fireFinished();
				if (this.getProperty("checkRepeat") && !this.isDestroyed()) this.delayedCall();
			}, this.getProperty("delayMS"));
		},
		afterHiddenRender() {
			this._pendingTimer = this.getProperty("checkActive");
		},
	}),
);
