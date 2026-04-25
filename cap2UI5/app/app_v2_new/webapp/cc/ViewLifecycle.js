sap.ui.define(["z2ui5/Runtime", "z2ui5/BackendAdapter"], (z2ui5, Adapter) => {
	"use strict";

	const { VIEW_OBJ_KEY, VIEW_KEY } = Adapter;

	const destroy = (prop, tryClose = false) => {
		const view = z2ui5[prop];
		if (!view) return;
		if (tryClose) {
			try {
				view.close?.();
			} catch (e) {
				z2ui5.logError(`ViewLifecycle: close() failed for ${prop}`, e);
			}
		}
		try {
			view.destroy();
		} catch (e) {
			z2ui5.logError(`ViewLifecycle: destroy() failed for ${prop}`, e);
		}
		z2ui5[prop] = null;
	};

	return {
		destroyView() {
			destroy(VIEW_OBJ_KEY[VIEW_KEY.MAIN]);
		},
		destroyPopup() {
			destroy(VIEW_OBJ_KEY[VIEW_KEY.POPUP], true);
		},
		destroyPopover() {
			destroy(VIEW_OBJ_KEY[VIEW_KEY.POPOVER], true);
		},
		destroyNest() {
			destroy(VIEW_OBJ_KEY[VIEW_KEY.NEST]);
		},
		destroyNest2() {
			destroy(VIEW_OBJ_KEY[VIEW_KEY.NEST2]);
		},
	};
});
