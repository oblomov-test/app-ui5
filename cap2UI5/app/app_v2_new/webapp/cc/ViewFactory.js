sap.ui.define(
	[
		"sap/ui/core/mvc/XMLView",
		"sap/ui/core/Fragment",
		"sap/ui/model/json/JSONModel",
		"sap/ui/model/odata/v2/ODataModel",
		"sap/ui/core/Element",
		"z2ui5/Runtime",
		"z2ui5/BackendAdapter",
	],
	(XMLView, Fragment, JSONModel, ODataModel, Element, z2ui5, Adapter) => {
		"use strict";

		const applyStoredSizeLimit = (viewKey, oModel) => {
			const limit = z2ui5.viewSizeLimits?.[viewKey];
			if (limit !== undefined && oModel) oModel.setSizeLimit(limit);
		};

		const trackChanges = (oModel) => {
			oModel.attachPropertyChange((e) => {
				const { path: raw, context: c } = e.getParameters();
				if (!raw) return;
				const fullPath = c && !raw.startsWith("/") ? `${c.getPath()}/${raw}` : raw;
				z2ui5.recordChange(fullPath);
			});
			return oModel;
		};

		const createViewModel = () => trackChanges(new JSONModel(z2ui5.oResponse?.OVIEWMODEL));

		const displayView = async (xml, viewModel) => {
			const oViewModel = trackChanges(new JSONModel(viewModel));
			const sView = Adapter.view(z2ui5.oResponse);
			const switchPath = sView?.SWITCH_DEFAULT_MODEL_PATH;
			const oModel = switchPath
				? new ODataModel({
					serviceUrl: switchPath,
					annotationURI: sView.SWITCHDEFAULTMODELANNOURI ?? "",
				})
				: oViewModel;
			applyStoredSizeLimit(Adapter.VIEW_KEY.MAIN, oModel);
			z2ui5.oView = await XMLView.create({
				definition: xml,
				models: oModel,
				controller: z2ui5.oController,
				id: "mainView",
				preprocessors: { xml: { models: { template: oViewModel } } },
			});
			if (!z2ui5.oApp || z2ui5.oApp.isDestroyed()) {
				z2ui5.oView.destroy();
				if (switchPath) oModel.destroy();
				z2ui5.oView = null;
				return;
			}
			z2ui5.oView.setModel(z2ui5.oDeviceModel, "device");
			if (switchPath) z2ui5.oView.setModel(oViewModel, "http");
			z2ui5.oApp.removeAllPages();
			z2ui5.oApp.insertPage(z2ui5.oView);
		};

		const displayFragment = async (xml, viewProp) => {
			const oModel = createViewModel();
			applyStoredSizeLimit(Adapter.VIEW_KEY.POPUP, oModel);
			const oFragment = await Fragment.load({
				definition: xml,
				controller: z2ui5.oControllerPopup,
				id: Adapter.FRAGMENT_ID.POPUP,
			});
			if (!z2ui5.oApp || z2ui5.oApp.isDestroyed()) {
				oFragment.destroy();
				return;
			}
			oFragment.setModel(oModel);
			oFragment.Fragment = Fragment;
			z2ui5[viewProp] = oFragment;
			oFragment.open();
		};

		const displayPopover = async (xml, viewProp, openById) => {
			try {
				const oModel = createViewModel();
				applyStoredSizeLimit(Adapter.VIEW_KEY.POPOVER, oModel);
				const oFragment = await Fragment.load({
					definition: xml,
					controller: z2ui5.oControllerPopover,
					id: Adapter.FRAGMENT_ID.POPOVER,
				});
				if (!z2ui5.oApp || z2ui5.oApp.isDestroyed()) {
					oFragment.destroy();
					return;
				}
				oFragment.setModel(oModel);
				oFragment.Fragment = Fragment;
				z2ui5[viewProp] = oFragment;
				const oControl =
					z2ui5.oView?.byId(openById) ||
					z2ui5.oViewPopup?.Fragment.byId(Adapter.FRAGMENT_ID.POPUP, openById) ||
					z2ui5.oViewNest?.byId(openById) ||
					z2ui5.oViewNest2?.byId(openById) ||
					Element.getElementById?.(openById);
				if (!oControl) {
					z2ui5.logError(`displayPopover: openBy control '${openById}' not found`);
					return;
				}
				oFragment.openBy(oControl);
			} catch (e) {
				z2ui5.logError(`displayPopover: failed`, e);
			}
		};

		const displayNestedView = async (xml, viewProp, viewNestParam, controller) => {
			const oModel = createViewModel();
			applyStoredSizeLimit(Adapter.PARAM_TO_VIEW_KEY[viewNestParam], oModel);
			const oView = await XMLView.create({
				definition: xml,
				controller,
				preprocessors: { xml: { models: { template: oModel } } },
			});
			if (!z2ui5.oApp || z2ui5.oApp.isDestroyed()) {
				oView.destroy();
				return;
			}
			oView.setModel(oModel);
			const nestParams = z2ui5.oResponse?.PARAMS?.[viewNestParam];
			if (!nestParams) {
				z2ui5.logError(`displayNestedView: missing PARAMS.${viewNestParam}`);
				oView.destroy();
				return;
			}
			const { ID, METHOD_DESTROY, METHOD_INSERT } = nestParams;
			const oParent = z2ui5.oView?.byId(ID);
			if (!oParent) {
				z2ui5.logError(`displayNestedView: parent control '${ID}' not found, nested view discarded`);
				oView.destroy();
				return;
			}
			try {
				oParent[METHOD_DESTROY]();
			} catch (e) {
				z2ui5.logError(`displayNestedView: parent destroy method failed`, e);
			}
			try {
				oParent[METHOD_INSERT](oView);
			} catch (e) {
				z2ui5.logError(`displayNestedView: parent insert method failed`, e);
				oView.destroy();
				return;
			}
			z2ui5[viewProp] = oView;
		};

		return {
			displayView,
			displayFragment,
			displayPopover,
			displayNestedView,
			createViewModel,
			applyStoredSizeLimit,
			trackChanges,
		};
	},
);
