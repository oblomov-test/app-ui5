sap.ui.define(["sap/ui/core/Control", "z2ui5/Runtime"], (Control, z2ui5) =>
	Control.extend("z2ui5.Scrolling", {
		metadata: {
			properties: {
				setUpdate: { type: "boolean", defaultValue: true },
				items:     { type: "object" },
			},
		},

		_getDomInnerElement(id) {
			const control = z2ui5.oView?.byId(id);
			return control && document.getElementById(`${control.getId()}-inner`);
		},

		_getScrollTop(item) {
			try {
				const control = z2ui5.oView?.byId(item.N);
				const scrollDelegate = control?.getScrollDelegate?.();
				if (scrollDelegate) return scrollDelegate.getScrollTop();
				const element = this._getDomInnerElement(item.ID);
				return element?.scrollTop ?? 0;
			} catch (e) {
				z2ui5.logError(`Scrolling._getScrollTop: failed`, e);
				return 0;
			}
		},

		setBackend() {
			const items = this.getProperty("items");
			if (!items) return;
			try {
				const bindingInfo = this.getBindingInfo("items");
				const bindingPath = bindingInfo?.parts?.[0]?.path ?? bindingInfo?.path;
				for (const [index, item] of items.entries()) {
					const scrollTop = this._getScrollTop(item);
					if (item.V !== scrollTop) {
						item.V = scrollTop;
						if (bindingPath) z2ui5.recordChange(`${bindingPath}/${index}/V`);
					}
				}
			} catch (e) {
				z2ui5.logError(`Scrolling.setBackend: failed`, e);
			}
		},

		init() {
			this._unhook = z2ui5.hooks.on("beforeRoundtrip", () => this.setBackend());
		},

		exit() {
			this._unhook?.();
		},

		_restoreScrollPosition(item) {
			try {
				const control = z2ui5.oView?.byId(item.N);
				if (control?.scrollTo) {
					control.scrollTo(item.V);
					return;
				}
				const element = this._getDomInnerElement(item.ID);
				if (element) element.scrollTop = item.V;
			} catch (e) {
				z2ui5.logError(`Scrolling._restoreScrollPosition: failed`, e);
			}
		},

		onAfterRendering() {
			if (!this._pendingScroll) return;
			this._pendingScroll = false;

			const items = this.getProperty("items");
			if (!items) return;

			try {
				for (const item of items) {
					const control = z2ui5.oView?.byId(item.N);
					if (control?.getDomRef()) {
						this._restoreScrollPosition(item);
					} else if (control) {
						const delegate = {
							onAfterRendering: () => {
								control.removeEventDelegate(delegate);
								if (!this.isDestroyed()) this._restoreScrollPosition(item);
							},
						};
						control.addEventDelegate(delegate);
					}
				}
			} catch (e) {
				z2ui5.logError(`Scrolling.onAfterRendering: failed`, e);
			}
		},

		renderer: {
			apiVersion: 2,
			render(oRm, oControl) {
				oRm.openStart("span", oControl);
				oRm.style("display", "none");
				oRm.openEnd();
				oRm.close("span");

				if (!oControl.getProperty("setUpdate")) return;
				oControl.setProperty("setUpdate", false, true);
				oControl._pendingScroll = true;
			},
		},
	}),
);
