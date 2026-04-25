sap.ui.define([], () => {
	"use strict";

	const PARAM = Object.freeze({
		VIEW: "S_VIEW",
		NEST: "S_VIEW_NEST",
		NEST2: "S_VIEW_NEST2",
		POPUP: "S_POPUP",
		POPOVER: "S_POPOVER",
		MSG_TOAST: "S_MSG_TOAST",
		MSG_BOX: "S_MSG_BOX",
		FOLLOW_UP: "S_FOLLOW_UP_ACTION",
		PUSH_STATE: "SET_PUSH_STATE",
		APP_STATE_ACTIVE: "SET_APP_STATE_ACTIVE",
		NAV_BACK: "SET_NAV_BACK",
	});

	const VIEW_KEY = Object.freeze({
		MAIN: "MAIN",
		NEST: "NEST",
		NEST2: "NEST2",
		POPUP: "POPUP",
		POPOVER: "POPOVER",
	});

	// Maps a logical view key to the property name on z2ui5 that holds the actual XMLView/Fragment.
	const VIEW_OBJ_KEY = Object.freeze({
		[VIEW_KEY.MAIN]:    "oView",
		[VIEW_KEY.NEST]:    "oViewNest",
		[VIEW_KEY.NEST2]:   "oViewNest2",
		[VIEW_KEY.POPUP]:   "oViewPopup",
		[VIEW_KEY.POPOVER]: "oViewPopover",
	});

	// Stable Fragment IDs used as the second arg to Fragment.byId(...) for Popup/Popover lookups.
	const FRAGMENT_ID = Object.freeze({
		POPUP:   "popupId",
		POPOVER: "popoverId",
	});

	const PARAM_TO_VIEW_KEY = Object.freeze({
		[PARAM.VIEW]: VIEW_KEY.MAIN,
		[PARAM.NEST]: VIEW_KEY.NEST,
		[PARAM.NEST2]: VIEW_KEY.NEST2,
		[PARAM.POPUP]: VIEW_KEY.POPUP,
		[PARAM.POPOVER]: VIEW_KEY.POPOVER,
	});

	const ALL_VIEW_PARAMS = Object.freeze([PARAM.VIEW, PARAM.NEST, PARAM.NEST2, PARAM.POPUP, PARAM.POPOVER]);

	const params = (response) => response?.PARAMS;
	const view = (response) => params(response)?.[PARAM.VIEW];
	const nest = (response) => params(response)?.[PARAM.NEST];
	const nest2 = (response) => params(response)?.[PARAM.NEST2];
	const popup = (response) => params(response)?.[PARAM.POPUP];
	const popover = (response) => params(response)?.[PARAM.POPOVER];
	const msgToast = (response) => params(response)?.[PARAM.MSG_TOAST];
	const msgBox = (response) => params(response)?.[PARAM.MSG_BOX];
	const customJs = (response) => params(response)?.[PARAM.FOLLOW_UP]?.CUSTOM_JS;
	const pushState = (response) => params(response)?.[PARAM.PUSH_STATE];
	const appStateActive = (response) => params(response)?.[PARAM.APP_STATE_ACTIVE];
	const navBack = (response) => params(response)?.[PARAM.NAV_BACK];

	const buildResponse = (raw) => ({
		ID: raw?.S_FRONT?.ID,
		PARAMS: raw?.S_FRONT?.PARAMS,
		OVIEWMODEL: raw?.MODEL,
	});

	return {
		PARAM,
		VIEW_KEY,
		VIEW_OBJ_KEY,
		FRAGMENT_ID,
		PARAM_TO_VIEW_KEY,
		ALL_VIEW_PARAMS,
		view,
		nest,
		nest2,
		popup,
		popover,
		msgToast,
		msgBox,
		customJs,
		pushState,
		appStateActive,
		navBack,
		buildResponse,
	};
});
