const DB = require("../01/z2ui5_cl_core_srv_draft");
const z2ui5_if_app = require("../../02/z2ui5_if_app");
const z2ui5_cl_core_srv_model = require("./z2ui5_cl_core_srv_model");

/**
 * App lifecycle helpers — JS port of abap2UI5 z2ui5_cl_core_app.
 *
 * Wraps the per-roundtrip work that surrounds an app instance:
 *   - validate           — ensure it implements z2ui5_if_app
 *   - run                — invoke main() and stamp check_initialized
 *   - reset_client       — clear per-app client state between nav-loop hops
 *   - persist            — save the nav stack + the app itself to the DB
 *
 * The handler glues these together. Pulling them out keeps the handler thin
 * and mirrors abap2UI5's class layout.
 */
class z2ui5_cl_core_app {

  /** Throws if the candidate object doesn't implement the z2ui5_if_app interface. */
  static validate(oApp) {
    if (!(oApp instanceof z2ui5_if_app)) {
      throw new Error(
        `${oApp?.constructor?.name || "Unknown"} must extend z2ui5_if_app (INTERFACES z2ui5_if_app)`
      );
    }
  }

  /**
   * Apply incoming XX delta, run main(), then mark check_initialized=true so
   * the next roundtrip's check_on_init() returns false.
   *
   * @param {object} oApp           the app instance
   * @param {object} oClient        the per-roundtrip client
   * @param {object} oReq           the request body (provides .XX)
   * @param {boolean} requireOwn    only apply XX deltas the app already declares
   *                                 (used for nav-loop hops to keep state isolated)
   */
  static async run(oApp, oClient, oReq, requireOwn = false) {
    z2ui5_cl_core_srv_model.main_json_to_attri(oApp, oReq?.XX, requireOwn);
    this.validate(oApp);
    oClient.oApp = oApp;
    await oApp.main(oClient);
    oApp.check_initialized = true;
  }

  /**
   * Reset the per-app slots on the client between nav-loop hops, and clear the
   * originating event so check_on_event(X) on the navigated-to app returns
   * false (otherwise BACK would re-fire on the popped app and ping-pong).
   * check_on_init() is gated separately by oApp.check_initialized.
   */
  static reset_client_for_nav(oClient, oReq) {
    oClient.aBind = [];
    oClient.S_VIEW = null;
    oClient.S_VIEW_NEST = null;
    oClient.S_VIEW_NEST2 = null;
    oClient.S_MSG_TOAST = null;
    oClient.S_MSG_BOX = null;
    oClient.S_POPUP = null;
    oClient.S_POPOVER = null;
    oClient._follow_up_actions = [];
    oClient._app_state_active = null;
    oClient._nav_back = null;
    oClient._push_state = undefined;
    if (oReq?.S_FRONT) oReq.S_FRONT.EVENT = "";
  }

  /**
   * Persist the app + its nav stack. Saves stack entries first, stashes their
   * IDs on oApp.__navStackIds, then saves oApp itself. Without this ordering
   * the IDs wouldn't round-trip through the DB.
   *
   * Returns the new ID assigned to oApp by the DB.
   */
  static async db_save(oApp, oClient, previousId = null) {
    if (oClient._navStack.length > 0) {
      oApp.__navStackIds = [];
      for (const stackApp of oClient._navStack) {
        const stackId = await DB.saveApp(stackApp, null);
        oApp.__navStackIds.push(stackId);
      }
    } else {
      delete oApp.__navStackIds;
    }
    return DB.saveApp(oApp, previousId);
  }
}

module.exports = z2ui5_cl_core_app;
