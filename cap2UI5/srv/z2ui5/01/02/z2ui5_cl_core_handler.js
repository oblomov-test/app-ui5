const DB = require("../01/z2ui5_cl_core_srv_draft");
const z2ui5_if_app = require("../../z2ui5_if_app");

class z2ui5_cl_core_handler {

  static _validateApp(oApp) {
    if (!(oApp instanceof z2ui5_if_app)) {
      throw new Error(
        `${oApp?.constructor?.name || "Unknown"} must extend z2ui5_if_app (INTERFACES z2ui5_if_app)`
      );
    }
  }

  async main(req) {
    const oReq = req.data.value;
    const Client = require("./z2ui5_cl_core_client");
    const oClient = new Client();
    oClient.oReq = oReq;

    let oApp = null;

    // Check if we have a navigation request from a previous roundtrip
    if (oClient._navTarget) {
      oApp = oClient._navTarget;
    }
    // Try loading existing app from DB via ID
    else if (oReq?.S_FRONT?.ID) {
      oApp = await DB.loadApp(oReq.S_FRONT.ID);
    }

    // Fallback: create startup app
    if (!oApp) {
      const StartupApp = require("../../02/z2ui5_cl_app_startup");
      oApp = new StartupApp();
    }

    // Validate: app must implement z2ui5_if_app
    z2ui5_cl_core_handler._validateApp(oApp);

    // Apply model data from frontend (two-way binding)
    if (oReq.XX) {
      for (const prop in oReq.XX) {
        oApp[prop] = oReq.XX[prop];
      }
    }

    oClient.oApp = oApp;

    // Run the app's main method
    await oApp.main(oClient);

    // Handle navigation: if nav_app_call was used, run the target app
    while (oClient._navTarget) {
      const navApp = oClient._navTarget;
      oClient._navTarget = null;
      oClient._navStack.push(oApp);
      oApp = navApp;

      // Apply model data if any
      if (oReq.XX) {
        for (const prop in oReq.XX) {
          if (oApp.hasOwnProperty(prop)) {
            oApp[prop] = oReq.XX[prop];
          }
        }
      }

      // Validate: navigated app must implement z2ui5_if_app
      z2ui5_cl_core_handler._validateApp(oApp);

      oClient.oApp = oApp;
      oClient.aBind = [];
      oClient.S_VIEW = null;
      oClient.S_VIEW_NEST = null;
      oClient.S_VIEW_NEST2 = null;
      oClient.S_MSG_TOAST = null;
      oClient.S_MSG_BOX = null;
      oClient.S_POPUP = null;
      oClient.S_POPOVER = null;
      oClient._follow_up_action = null;

      await oApp.main(oClient);
    }

    // Save app state to DB
    const previousId = oReq?.S_FRONT?.ID || null;
    const generatedId = await DB.saveApp(oApp, previousId);

    // Save nav stack apps too (for back navigation)
    if (oClient._navStack.length > 0) {
      // Store the nav stack reference in the current app for later retrieval
      oApp.__navStackIds = [];
      for (const stackApp of oClient._navStack) {
        const stackId = await DB.saveApp(stackApp, null);
        oApp.__navStackIds.push(stackId);
      }
    }

    // Build model from bindings
    const oModel = { XX: {} };
    for (const binding of oClient.aBind) {
      if (binding.type === "BIND") {
        oModel[binding.name] = binding.val;
      } else {
        oModel.XX[binding.name] = binding.val;
      }
    }

    const oResponse = {
      S_FRONT: {
        APP: oApp.constructor.name,
        ID: generatedId,
        PARAMS: {
          S_MSG_TOAST: oClient.S_MSG_TOAST || null,
          S_MSG_BOX: oClient.S_MSG_BOX || null,
          S_VIEW: oClient.S_VIEW || null,
          S_VIEW_NEST: oClient.S_VIEW_NEST || null,
          S_VIEW_NEST2: oClient.S_VIEW_NEST2 || null,
          S_POPUP: oClient.S_POPUP || null,
          S_POPOVER: oClient.S_POPOVER || null,
          S_FOLLOW_UP_ACTION: oClient._follow_up_action || null,
          S_PUSH_STATE: oClient._push_state !== undefined ? oClient._push_state : null,
        },
      },
      MODEL: oModel,
    };

    return JSON.stringify(oResponse);
  }
}

module.exports = z2ui5_cl_core_handler;
