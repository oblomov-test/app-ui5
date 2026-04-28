const z2ui5_cl_core_app       = require("./z2ui5_cl_core_app");
const z2ui5_cl_core_srv_model = require("./z2ui5_cl_core_srv_model");

/**
 * Roundtrip orchestrator — JS port of abap2UI5 z2ui5_cl_core_handler.
 *
 * Glues together the four core services per request:
 *   - z2ui5_cl_core_action     resolves which app to load
 *   - z2ui5_cl_core_app        validates / runs / persists the app
 *   - z2ui5_cl_core_srv_model  applies XX delta + builds response model
 *   - z2ui5_cl_core_srv_event  generates press="…" strings (used by client)
 *   - z2ui5_cl_core_srv_bind   binds values → model paths (used by client)
 */
class z2ui5_cl_core_handler {

  /** @deprecated Use z2ui5_cl_core_app.validate. */
  static _validateApp(oApp) {
    return z2ui5_cl_core_app.validate(oApp);
  }

  /** @deprecated Use z2ui5_cl_core_srv_model.main_json_to_attri. */
  static _applyXxDelta(oApp, xx, requireOwnProp = false) {
    return z2ui5_cl_core_srv_model.main_json_to_attri(oApp, xx, requireOwnProp);
  }

  /**
   * Process a single roundtrip. `body` is the parsed request payload — exactly
   * what the abap2UI5 ABAP handler receives on the wire (no CDS-action wrapping).
   *
   * Returns a JSON string — caller writes it as the HTTP response body.
   */
  async main(body) {
    const oReq    = body;
    const Client  = require("./z2ui5_cl_core_client");
    const Action  = require("./z2ui5_cl_core_action");
    const oClient = new Client();
    oClient.oReq  = oReq;

    // 1. Resolve app + rehydrate nav stack
    let oApp = await Action.factory_main(oReq, oClient);
    z2ui5_cl_core_app.validate(oApp);

    // 2. Apply incoming model delta
    z2ui5_cl_core_srv_model.main_json_to_attri(oApp, oReq.XX);
    oClient.oApp = oApp;

    // 3. Run main(), or short-circuit on the framework-intercepted nav-back event
    //    (abap2UI5 client->_event_nav_app_leave — apps never see it).
    if (oReq?.S_FRONT?.EVENT === Client.EVENT_NAV_APP_LEAVE) {
      oClient.nav_app_leave();
    } else {
      await oApp.main(oClient);
      oApp.check_initialized = true;
    }

    // 4. Nav-loop: process any nav_app_call / nav_app_leave queued by main()
    while (oClient._navTarget) {
      const navApp  = oClient._navTarget;
      const isLeave = oClient._navTargetIsLeave;
      oClient._navTarget = null;
      oClient._navTargetIsLeave = false;

      // Forward navigation pushes the current app onto the stack so it can be
      // popped later. Back navigation does NOT push — instead the leaving app
      // is parked on _navPrev so the destination can read it via
      // get_app_prev() (mirrors abap z2ui5_cl_core_action->o_app_leave).
      if (isLeave) {
        oClient._navPrev = oApp;
      } else {
        oClient._navStack.push(oApp);
      }

      oApp = navApp;
      oClient._check_on_navigated = true;

      z2ui5_cl_core_app.reset_client_for_nav(oClient, oReq);
      await z2ui5_cl_core_app.run(oApp, oClient, oReq, /*requireOwn=*/true);
    }

    // 5. Persist app + nav stack
    const previousId  = oReq?.S_FRONT?.ID || null;
    const generatedId = await z2ui5_cl_core_app.db_save(oApp, oClient, previousId);

    // 6. Build response
    const oModel = z2ui5_cl_core_srv_model.main_json_stringify(oClient.aBind);
    const oResponse = {
      S_FRONT: {
        APP: oApp.constructor.name,
        ID: generatedId,
        PARAMS: {
          S_MSG_TOAST: oClient.S_MSG_TOAST || null,
          S_MSG_BOX:   oClient.S_MSG_BOX   || null,
          S_VIEW:      oClient.S_VIEW      || null,
          S_VIEW_NEST: oClient.S_VIEW_NEST || null,
          S_VIEW_NEST2: oClient.S_VIEW_NEST2 || null,
          S_POPUP:     oClient.S_POPUP     || null,
          S_POPOVER:   oClient.S_POPOVER   || null,
          S_FOLLOW_UP_ACTION: oClient._follow_up_actions.length
            ? { CUSTOM_JS: oClient._follow_up_actions }
            : null,
          SET_PUSH_STATE:       oClient._push_state !== undefined ? oClient._push_state : null,
          SET_APP_STATE_ACTIVE: oClient._app_state_active || null,
          SET_NAV_BACK:         oClient._nav_back || null,
          S_STATEFUL:           oClient._session_stateful ? { ACTIVE: true } : null,
        },
      },
      MODEL: oModel,
    };

    return JSON.stringify(oResponse);
  }
}

module.exports = z2ui5_cl_core_handler;
