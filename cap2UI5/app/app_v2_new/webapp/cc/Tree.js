sap.ui.define(["z2ui5/_HiddenControl", "z2ui5/Runtime"], (HiddenControl, z2ui5) =>
	HiddenControl.extend("z2ui5.Tree", {
		metadata: {
			properties: {
				tree_id: { type: "string" },
			},
		},

		_getTreeBinding() {
			return z2ui5.oView?.byId(this.getProperty("tree_id"))?.getBinding("items");
		},

		setBackend() {
			try {
				z2ui5.treeState = this._getTreeBinding()?.getCurrentTreeState();
			} catch (e) {
				z2ui5.logError(`Tree.setBackend: failed`, e);
			}
		},

		init() {
			this._unhook = z2ui5.hooks.on("beforeRoundtrip", () => this.setBackend());
		},

		exit() {
			this._unhook?.();
		},

		onAfterRendering() {
			if (!this._pendingTreeState) return;
			this._pendingTreeState = false;
			try {
				this._getTreeBinding()?.setTreeState(z2ui5.treeState);
			} catch (e) {
				z2ui5.logError(`Tree.onAfterRendering: setTreeState failed`, e);
			}
		},

		afterHiddenRender() {
			if (!z2ui5.treeState) return;
			this._pendingTreeState = true;
		},
	}),
);
