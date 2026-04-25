class z2ui5_cl_core_client {

  oApp = {};
  oReq = {};
  aBind = [];

  // Navigation
  _navTarget = null;
  _navStack = [];

  // View & Popup & Popover
  S_VIEW = null;
  S_VIEW_NEST = null;
  S_VIEW_NEST2 = null;
  S_MSG_TOAST = null;
  S_MSG_BOX = null;
  S_POPUP = null;
  S_POPOVER = null;

  // State flags
  _check_on_navigated = false;
  _follow_up_action = null;
  _push_state = undefined;

  // --- Lifecycle Check Methods ---

  check_on_init() {
    const event = this.oReq?.S_FRONT?.EVENT || "";
    return event === "";
  }

  check_on_event(val) {
    const event = this.oReq?.S_FRONT?.EVENT || "";
    if (val === undefined) {
      return event !== "";
    }
    return event === val;
  }

  check_on_navigated() {
    return this._check_on_navigated;
  }

  check_app_prev_stack() {
    return this._navStack.length > 0;
  }

  // --- Main View Display ---

  view_display(val) {
    this.S_VIEW = { XML: val };
  }

  view_model_update() {
    if (!this.S_VIEW) {
      this.S_VIEW = {};
    }
    this.S_VIEW.MODEL_UPDATE = true;
  }

  view_destroy() {
    this.S_VIEW = { DESTROY: true };
  }

  // --- Nested View (Level 1) ---

  nest_view_display(val, id, method_insert, method_destroy) {
    this.S_VIEW_NEST = {
      XML: val,
      ID: id,
      METHOD_INSERT: method_insert,
      METHOD_DESTROY: method_destroy || "",
    };
  }

  nest_view_model_update() {
    if (!this.S_VIEW_NEST) {
      this.S_VIEW_NEST = {};
    }
    this.S_VIEW_NEST.MODEL_UPDATE = true;
  }

  nest_view_destroy() {
    this.S_VIEW_NEST = { DESTROY: true };
  }

  // --- Nested View (Level 2) ---

  nest2_view_display(val, id, method_insert, method_destroy) {
    this.S_VIEW_NEST2 = {
      XML: val,
      ID: id,
      METHOD_INSERT: method_insert,
      METHOD_DESTROY: method_destroy || "",
    };
  }

  nest2_view_model_update() {
    if (!this.S_VIEW_NEST2) {
      this.S_VIEW_NEST2 = {};
    }
    this.S_VIEW_NEST2.MODEL_UPDATE = true;
  }

  nest2_view_destroy() {
    this.S_VIEW_NEST2 = { DESTROY: true };
  }

  // --- Popup ---

  popup_display(val) {
    this.S_POPUP = {
      XML: val,
    };
  }

  popup_model_update() {
    if (!this.S_POPUP) {
      this.S_POPUP = {};
    }
    this.S_POPUP.MODEL_UPDATE = true;
  }

  popup_destroy() {
    this.S_POPUP = { CLOSE: true };
  }

  // --- Popover ---

  popover_display(xml, by_id) {
    this.S_POPOVER = {
      XML: xml,
      BY_ID: by_id,
    };
  }

  popover_model_update() {
    if (!this.S_POPOVER) {
      this.S_POPOVER = {};
    }
    this.S_POPOVER.MODEL_UPDATE = true;
  }

  popover_destroy() {
    this.S_POPOVER = { CLOSE: true };
  }

  // --- Data Binding ---

  _bind(val) {
    for (const prop in this.oApp) {
      if (this._isEqual(this.oApp[prop], val)) {
        this.aBind.push({ name: prop, val: val, type: "BIND" });
        return `{/${prop}}`;
      }
    }
    // Fallback: create a dynamic binding name
    const name = `__bind_${this.aBind.length}`;
    this.oApp[name] = val;
    this.aBind.push({ name: name, val: val, type: "BIND" });
    return `{/${name}}`;
  }

  _bind_edit(val) {
    for (const prop in this.oApp) {
      if (this._isEqual(this.oApp[prop], val)) {
        this.aBind.push({ name: prop, val: val, type: "BIND_EDIT" });
        return `{/XX/${prop}}`;
      }
    }
    // Fallback: create a dynamic binding name
    const name = `__edit_${this.aBind.length}`;
    this.oApp[name] = val;
    this.aBind.push({ name: name, val: val, type: "BIND_EDIT" });
    return `{/XX/${name}}`;
  }

  _bind_local(val) {
    const name = `__local_${this.aBind.length}`;
    this.aBind.push({ name: name, val: val, type: "BIND" });
    return `{/${name}}`;
  }

  _isEqual(a, b) {
    // Reference equality (for objects/arrays)
    if (Object.is(a, b)) return true;
    // For primitives that are the same value but different references
    if (typeof a === typeof b && typeof a !== "object" && a === b) return true;
    return false;
  }

  // --- Events ---

  _event(val, ...args) {
    if (args.length > 0) {
      const argList = [val, ...args].map((a) => `'${a}'`).join(",");
      return `.eB([${argList}])`;
    }
    return `.eB(['${val}'])`;
  }

  _event_client(val, ...args) {
    if (args.length > 0) {
      const argList = [val, ...args].map((a) => `'${a}'`).join(",");
      return `.eF([${argList}])`;
    }
    return `.eF('${val}')`;
  }

  get() {
    const event = this.oReq?.S_FRONT?.EVENT || "";
    const args = this.oReq?.S_FRONT?.T_EVENT_ARG || [];
    return {
      EVENT: event,
      T_EVENT_ARG: args,
      get_event_arg(index) {
        return args[index] || "";
      },
    };
  }

  get_event_arg(v) {
    const index = (v || 1) - 1; // ABAP is 1-based
    const args = this.oReq?.S_FRONT?.T_EVENT_ARG || [];
    return args[index] || "";
  }

  // --- Messages ---

  message_toast_display(text) {
    this.S_MSG_TOAST = {
      AUTOCLOSE: "X",
      CLOSEONBROWSERNAVIGATION: "X",
      TEXT: text,
    };
  }

  message_box_display(text, type = "information", title, styleclass, onclose,
    emphasizedaction, initialfocus, textdirection, icon, details, actions, closeonnavigation = true) {
    this.S_MSG_BOX = {
      CLOSEONNAVIGATION: closeonnavigation ? "X" : "",
      TEXT: typeof text === "object" ? JSON.stringify(text) : text,
      TYPE: type,
      TITLE: title || "",
      STYLECLASS: styleclass || "",
      ONCLOSE: onclose || "",
      EMPHASIZEDACTION: emphasizedaction || "",
      INITIALFOCUS: initialfocus || "",
      TEXTDIRECTION: textdirection || "",
      ICON: icon || "",
      DETAILS: details || "",
      ACTIONS: actions || [],
    };
  }

  // --- Navigation ---

  nav_app_call(appInstance) {
    this._navTarget = appInstance;
  }

  nav_app_leave(app) {
    if (app) {
      this._navTarget = app;
    } else if (this._navStack.length > 0) {
      this._navTarget = this._navStack.pop();
    } else {
      const StartupApp = require("../../02/z2ui5_cl_app_startup");
      this._navTarget = new StartupApp();
    }
  }

  nav_app_home() {
    const StartupApp = require("../../02/z2ui5_cl_app_startup");
    this._navTarget = new StartupApp();
  }

  nav_app_back() {
    if (this._navStack.length > 0) {
      this._navTarget = this._navStack.pop();
    } else {
      this.nav_app_home();
    }
  }

  // --- Utility ---

  get_app(id) {
    if (id) {
      // Loading by ID would require DB access - return null for now
      return null;
    }
    return this.oApp;
  }

  get_app_prev() {
    if (this._navStack.length > 0) {
      return this._navStack[this._navStack.length - 1];
    }
    return null;
  }

  get_frontend_data() {
    return this.oReq?.S_FRONT || {};
  }

  follow_up_action(val) {
    this._follow_up_action = val;
  }

  set_push_state(val) {
    this._push_state = val;
  }
}

module.exports = z2ui5_cl_core_client;
