sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/BusyIndicator",
		"sap/m/MessageBox",
		"sap/m/BusyDialog",
		"z2ui5/Runtime",
		"z2ui5/Server",
		"z2ui5/BackendAdapter",
		"z2ui5/ViewFactory",
		"z2ui5/ViewLifecycle",
		"z2ui5/Messaging",
		"z2ui5/Actions",
		"z2ui5/Helpers",
		"z2ui5/HistoryHelper",
		"z2ui5/SDKCompat",
	],
	(Controller, BusyIndicator, MessageBox, mBusyDialog, z2ui5, Server, Adapter, ViewFactory, ViewLifecycle, Messaging, Actions, Helpers, HistoryHelper, SDKCompat) => {
		"use strict";

		const { buildDelta } = Helpers;
		const { VIEW_KEY, VIEW_OBJ_KEY } = Adapter;

		// Backend-set positional flags inside args[0] of an eB call.
		const FLAG_BYPASS_BUSY = 2;        // backend signals "send even if isBusy"
		const FLAG_FORCE_MAIN_MODEL = 3;   // backend signals "use main view's model regardless of caller"

		return Controller.extend("app_v2.controller.View1", {
			onAfterRendering() {
				if (z2ui5.oResponse) this._processAfterRendering();
			},

			async _processAfterRendering() {
				try {
					const response = z2ui5.oResponse;
					if (!response?.PARAMS) return;
					await this._dispatchOverlays(response);
					HistoryHelper.update(response);
					if (Adapter.navBack(response)) history.back();
					z2ui5.hooks.emit("afterRendering");
				} catch (e) {
					this._showFatalError(e);
				} finally {
					this._exitBusy();
				}
			},

			async _dispatchOverlays(response) {
				const popup = Adapter.popup(response);
				const popover = Adapter.popover(response);
				const nest = Adapter.nest(response);
				const nest2 = Adapter.nest2(response);

				if (popup?.CHECK_DESTROY) ViewLifecycle.destroyPopup();
				if (popover?.CHECK_DESTROY) ViewLifecycle.destroyPopover();
				if (popup?.XML) {
					ViewLifecycle.destroyPopup();
					await ViewFactory.displayFragment(popup.XML, VIEW_OBJ_KEY[VIEW_KEY.POPUP]);
				}
				if (!z2ui5.checkNestAfter && nest?.XML) {
					ViewLifecycle.destroyNest();
					await ViewFactory.displayNestedView(nest.XML, VIEW_OBJ_KEY[VIEW_KEY.NEST], Adapter.PARAM.NEST, z2ui5.oControllerNest);
					z2ui5.checkNestAfter = true;
				}
				if (!z2ui5.checkNestAfter2 && nest2?.XML) {
					ViewLifecycle.destroyNest2();
					await ViewFactory.displayNestedView(nest2.XML, VIEW_OBJ_KEY[VIEW_KEY.NEST2], Adapter.PARAM.NEST2, z2ui5.oControllerNest2);
					z2ui5.checkNestAfter2 = true;
				}
				if (popover?.XML) {
					await ViewFactory.displayPopover(popover.XML, VIEW_OBJ_KEY[VIEW_KEY.POPOVER], popover.OPEN_BY_ID);
				}
			},

			_showFatalError(e) {
				z2ui5.logError(`_processAfterRendering: unexpected error`, e);
				MessageBox.error(e.toLocaleString(), {
					title: "Unexpected Error Occurred - App Terminated",
					actions: [],
					onClose: () => new mBusyDialog({ text: "Please Restart the App" }).open(),
				});
			},

			_exitBusy() {
				BusyIndicator.hide();
				z2ui5.isBusy = false;
			},

			eF(...args) {
				z2ui5.hooks.emit("beforeEventFrontend", args);
				Actions.dispatch(args, this);
			},

			eB(...args) {
				if (!this._guardOnline()) return;
				if (!this._guardBusy(args)) return;
				this._enterBusy();
				const oModel = this._collectModel(args);
				z2ui5.hooks.emit("beforeRoundtrip");
				this._buildXxDelta(oModel);
				this._finalizeBody(args);
				Server.Roundtrip();
				z2ui5.hooks.emit("afterRoundtrip");
			},

			_guardOnline() {
				if (navigator.onLine) return true;
				MessageBox.alert("No internet connection! Please reconnect to the server and try again.");
				return false;
			},

			_guardBusy(args) {
				if (!z2ui5.isBusy || args[0][FLAG_BYPASS_BUSY]) return true;
				const oBusyDialog = new mBusyDialog();
				oBusyDialog.open();
				queueMicrotask(() => oBusyDialog.close());
				return false;
			},

			_enterBusy() {
				z2ui5.isBusy = true;
				BusyIndicator.show();
				z2ui5.oBody = { VIEWNAME: VIEW_KEY.MAIN };
			},

			_collectModel(args) {
				const viewKey = args[0][FLAG_FORCE_MAIN_MODEL] ? VIEW_KEY.MAIN : (this._viewKey ?? VIEW_KEY.MAIN);
				const view = z2ui5[VIEW_OBJ_KEY[viewKey]];
				z2ui5.oBody.VIEWNAME = viewKey;
				const useHttpModel = viewKey === VIEW_KEY.MAIN && Adapter.view(z2ui5.oResponse)?.SWITCH_DEFAULT_MODEL_PATH;
				return useHttpModel ? view?.getModel("http") : view?.getModel();
			},

			_buildXxDelta(oModel) {
				if (!oModel || !(z2ui5.xxChanges?.size > 0)) return;
				const xx = oModel.getData()?.XX;
				if (xx) z2ui5.oBody.XX = buildDelta(z2ui5.xxChanges, xx);
			},

			_finalizeBody(args) {
				z2ui5.oBody.ID = z2ui5.oResponse?.ID;
				z2ui5.oBody.ARGUMENTS = args.map((item, i) =>
					i > 0 && typeof item === "object" ? JSON.stringify(item) : item,
				);
				z2ui5.oResponseOld = z2ui5.oResponse;
			},

			updateModelIfRequired(paramKey, oView) {
				if (!z2ui5.oResponse?.PARAMS?.[paramKey]?.CHECK_UPDATE_MODEL) return;
				const oModel = ViewFactory.createViewModel();
				ViewFactory.applyStoredSizeLimit(Adapter.PARAM_TO_VIEW_KEY[paramKey], oModel);
				oView?.setModel(oModel);
			},

			checkSDKcompatibility(err) {
				return SDKCompat.check(err);
			},

			showMessage(response) {
				Messaging.showAll(response, this);
			},

			displayView: ViewFactory.displayView,
			ViewDestroy: ViewLifecycle.destroyView,
			PopupDestroy: ViewLifecycle.destroyPopup,
			PopoverDestroy: ViewLifecycle.destroyPopover,
			NestViewDestroy: ViewLifecycle.destroyNest,
			NestViewDestroy2: ViewLifecycle.destroyNest2,
		});
	},
);
