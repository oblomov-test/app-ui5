sap.ui.define(
	["sap/ui/core/routing/HashChanger", "z2ui5/Runtime", "z2ui5/BackendAdapter"],
	(HashChanger, z2ui5, Adapter) => {
		"use strict";

		const _hashChanger = HashChanger.getInstance();

		// Build a URL string from the current location, optionally stripping the
		// trailing hash separator (`#`) when the hash content is empty. UI5's
		// HashChanger.replaceHash('') leaves `#` in the URL; abap2UI5 keeps the
		// URL clean, so we mirror that.
		const _currentUrl = (keepHash) => {
			const { pathname, search, hash } = window.location;
			if (keepHash && hash && hash !== "#") return `${pathname}${search}${hash}`;
			return `${pathname}${search}`;
		};

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
						const hash = _hashChanger.getHash();
						const hashPart = hash ? `#${hash}` : "";
						history.pushState(
							oState,
							"",
							`${window.location.pathname}${window.location.search}${hashPart}${pushState}`,
						);
					} else {
						history.replaceState(oState, "", _currentUrl(/*keepHash=*/ true));
					}
					if (appStateActive) {
						_hashChanger.replaceHash(`z2ui5-xapp-state=${response.ID ?? ""}`);
					} else if (window.location.hash) {
						// Strip stale hash + the `#` separator (left over from a
						// previous appStateActive cycle, or from UI5's auto-`#`).
						history.replaceState(oState, "", _currentUrl(/*keepHash=*/ false));
					}
				} catch (e) {
					z2ui5.logError(`HistoryHelper.update failed`, e);
				}
			},
		};
	},
);
