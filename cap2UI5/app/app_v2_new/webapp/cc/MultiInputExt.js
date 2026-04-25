sap.ui.define(
	["z2ui5/_NoopControl", "sap/m/Token", "z2ui5/Runtime"],
	(NoopControl, Token, z2ui5) =>
		NoopControl.extend("z2ui5.MultiInputExt", {
			metadata: {
				properties: {
					MultiInputId: { type: "string" },
					MultiInputName: { type: "string" },
					addedTokens: { type: "object" },
					checkInit: { type: "boolean", defaultValue: false },
					removedTokens: { type: "object" },
				},
				events: {
					change: { allowPreventDefault: true, parameters: {} },
				},
			},

			init() {
				this._unhook = z2ui5.hooks.on("afterRendering", () => this.setControl());
			},
			exit() {
				this._unhook?.();
			},

			onTokenUpdate(oEvent) {
				const { mParameters } = oEvent;
				const isRemoved = mParameters.type === "removed";
				const tokens = (mParameters[isRemoved ? "removedTokens" : "addedTokens"] ?? []).map((item) => ({
					KEY: item.getKey(),
					TEXT: item.getText(),
				}));
				this.setProperty("addedTokens", isRemoved ? [] : tokens);
				this.setProperty("removedTokens", isRemoved ? tokens : []);
				this.fireChange();
			},
			setControl() {
				const table = z2ui5.oView?.byId(this.getProperty("MultiInputId"));
				if (!table || this.getProperty("checkInit")) return;
				this.setProperty("checkInit", true);
				try {
					table.attachTokenUpdate(this.onTokenUpdate.bind(this));
					table.addValidator(({ text }) => new Token({ key: text, text }));
				} catch (e) {
					z2ui5.logError(`MultiInputExt.setControl: setup failed`, e);
				}
			},
		}),
);
