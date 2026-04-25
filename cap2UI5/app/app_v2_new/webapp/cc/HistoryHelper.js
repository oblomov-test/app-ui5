sap.ui.define(
	["sap/ui/core/routing/HashChanger", "z2ui5/Runtime", "z2ui5/BackendAdapter"],
	(HashChanger, z2ui5, Adapter) => {
		"use strict";

		const _hashChanger = HashChanger.getInstance();

		return {
			update(response) {
				const oView = z2ui5.oView;
				const oState = oView
					? { view: oView.mProperties.viewContent, model: oView.getModel()?.getData(), response }
					: {};
				const pushState = Adapter.pushState(response);
				const appStateActive = Adapter.appStateActive(response);
				try {
					if (pushState) {
						const hash = _hashChanger.getHash() || "#";
						history.pushState(
							oState,
							"",
							`${window.location.pathname}${window.location.search}${hash}${pushState}`,
						);
					} else {
						history.replaceState(oState, "", window.location.href);
					}
					_hashChanger.replaceHash(appStateActive ? `z2ui5-xapp-state=${response.ID ?? ""}` : "");
				} catch (e) {
					z2ui5.logError(`HistoryHelper.update failed`, e);
				}
			},
		};
	},
);
