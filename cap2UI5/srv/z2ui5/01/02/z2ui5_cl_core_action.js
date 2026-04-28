const DB = require("../01/z2ui5_cl_core_srv_draft");

/**
 * Action factory — JS port of abap2UI5 z2ui5_cl_core_action.
 *
 * Resolves which app instance should handle this roundtrip, in this order
 * (mirrors abap's five named factory branches):
 *
 *   1. by_navigation     — caller already injected oClient._navTarget
 *   2. by_frontend       — S_FRONT.ID present → load from DB
 *   3. first_start       — ?app_start=ClassName URL deep-link
 *   4. system_startup    — fallback: instantiate StartupApp
 *
 * Also rehydrates the navigation stack from the loaded app's __navStackIds.
 */
class z2ui5_cl_core_action {

  /**
   * Resolve the app instance for this roundtrip and rehydrate the nav stack.
   * Returns the app instance — never null.
   */
  static async factory_main(oReq, oClient) {
    let oApp = await this._resolve(oReq, oClient);
    await this._rehydrate_nav_stack(oApp, oClient);

    if (!oApp) oApp = await this.factory_first_start(oReq);
    if (!oApp) oApp = this.factory_system_startup();

    return oApp;
  }

  /** Try the in-memory navTarget, then DB load by ID. Returns null if neither. */
  static async _resolve(oReq, oClient) {
    if (oClient._navTarget) {
      return oClient._navTarget;
    }
    if (oReq?.S_FRONT?.ID) {
      try {
        return await DB.loadApp(oReq.S_FRONT.ID);
      } catch (e) {
        console.warn(`z2ui5: loadApp(${oReq.S_FRONT.ID}) failed, falling back to startup:`, e.message);
        return null;
      }
    }
    return null;
  }

  /**
   * Walk the persisted __navStackIds of the loaded app, load each one from the
   * DB, and push onto oClient._navStack. Without this, nav_app_leave() would
   * always see an empty stack and incorrectly fall back to startup.
   */
  static async _rehydrate_nav_stack(oApp, oClient) {
    if (!oApp?.__navStackIds?.length) return;
    for (const stackId of oApp.__navStackIds) {
      try {
        const stackApp = await DB.loadApp(stackId);
        if (stackApp) oClient._navStack.push(stackApp);
      } catch (e) {
        console.warn(`z2ui5: navStack loadApp(${stackId}) failed:`, e.message);
      }
    }
  }

  /**
   * Deep-link via ?app_start=ClassName — instantiates the named class.
   * Mirrors abap2UI5 z2ui5_cl_core_action=>factory_first_start.
   */
  static async factory_first_start(oReq) {
    const z2ui5_cl_util = require("../../00/03/z2ui5_cl_util");
    const search = oReq?.S_FRONT?.SEARCH || "";
    let appStart = "";
    try {
      appStart = (new URLSearchParams(search).get("app_start") || "").trim().toLowerCase();
    } catch {
      // malformed query string — ignore
    }
    if (!appStart) return null;

    const Cls = z2ui5_cl_util.rtti_get_class(appStart);
    if (!Cls) {
      console.warn(`z2ui5: app_start='${appStart}' — class not found, falling back to startup`);
      return null;
    }
    try {
      return new Cls();
    } catch (e) {
      console.warn(`z2ui5: app_start='${appStart}' instantiation failed:`, e.message);
      return null;
    }
  }

  /** Always-on fallback: instantiate the framework's startup app. */
  static factory_system_startup() {
    const StartupApp = require("../../02/z2ui5_cl_app_startup");
    return new StartupApp();
  }
}

module.exports = z2ui5_cl_core_action;
