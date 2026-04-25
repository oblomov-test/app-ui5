sap.ui.define(["z2ui5/_NoopControl", "z2ui5/Runtime"], (NoopControl, z2ui5) =>
	NoopControl.extend("z2ui5.SmartMultiInputExt", {
		metadata: {
			properties: {
				multiInputId: { type: "string" },
				addedTokens: { type: "object" },
				removedTokens: { type: "object" },
				rangeData: { type: "object", defaultValue: [] },
				checkInit: { type: "boolean", defaultValue: false },
			},
			events: {
				change: { allowPreventDefault: true, parameters: {} },
			},
		},

		init() {
			this._oInput = null;
			this._oPendingInnerControlsCreated = null;
			this._bInnerControlsCreated = false;
			this._unhook = z2ui5.hooks.on("afterRendering", () => this.setControl());
		},
		exit() {
			this._unhook?.();
			this._oPendingInnerControlsCreated?.(null);
			this._oPendingInnerControlsCreated = null;
		},

		onTokenUpdate(oEvent) {
			const { mParameters } = oEvent;
			const isRemoved = mParameters.type === "removed";
			const mappedTokens = (mParameters[isRemoved ? "removedTokens" : "addedTokens"] ?? []).map((item) => ({
				KEY: item.getKey(),
				TEXT: item.getText(),
			}));
			this.setProperty("addedTokens", isRemoved ? [] : mappedTokens);
			this.setProperty("removedTokens", isRemoved ? mappedTokens : []);
			const source = oEvent.getSource();
			const tokens = source.getTokens();
			this.setProperty(
				"rangeData",
				(source.getRangeData() ?? []).map((oRangeData, index) => {
					const token = tokens[index];
					return Object.assign(oRangeData, { tokenText: token?.getText() ?? "", tokenLongKey: token?.data("longKey") });
				}),
			);
			this.fireChange();
		},
		async setRangeData(aRangeData) {
			this.setProperty("rangeData", aRangeData);
			try {
				const input = await this.inputInitialized();
				if (this.isDestroyed() || !input) return;
				input.setRangeData(
					aRangeData.map((oRangeData) =>
						Object.fromEntries(
							Object.entries(oRangeData).map(([key, value]) => {
								const k = key.toLowerCase();
								return [k === "keyfield" ? "keyField" : k, value];
							}),
						),
					),
				);
				//we need to set token text explicitly, as setRangeData does no recalculation
				for (const [index, token] of (input.getTokens() ?? []).entries()) {
					const rangeItem = aRangeData[index];
					if (!rangeItem) continue;
					const { TOKENLONGKEY, TOKENTEXT } = rangeItem;
					token.data("longKey", TOKENLONGKEY);
					token.data("range", null);
					if (TOKENTEXT) token.setText(TOKENTEXT);
				}
			} catch (e) {
				z2ui5.logError("SmartMultiInputExt.setRangeData failed", e);
			}
		},
		setControl() {
			const input = z2ui5.oView?.byId(this.getProperty("multiInputId"));
			if (!input || this.getProperty("checkInit")) return;
			this.setProperty("checkInit", true);
			try {
				input.attachTokenUpdate(this.onTokenUpdate.bind(this));
				input.attachInnerControlsCreated(this.onInnerControlsCreated.bind(this));
			} catch (e) {
				z2ui5.logError(`SmartMultiInputExt.setControl: setup failed`, e);
			}
		},
		inputInitialized() {
			return new Promise((resolve) => {
				if (this._bInnerControlsCreated) resolve(this._oInput);
				else this._oPendingInnerControlsCreated = resolve;
			});
		},
		onInnerControlsCreated(oEvent) {
			this._oInput = oEvent.getSource();
			this._oPendingInnerControlsCreated?.(this._oInput);
			this._oPendingInnerControlsCreated = null;
			this._bInnerControlsCreated = true;
		},
	}),
);
