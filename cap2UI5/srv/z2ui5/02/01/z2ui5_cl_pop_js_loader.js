const z2ui5_if_app      = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");

/**
 * z2ui5_cl_pop_js_loader — JS port of abap2UI5 z2ui5_cl_pop_js_loader.
 *
 * Two-mode helper popup:
 *
 *   factory({i_js, i_result}) — runs an arbitrary <script> on the client and
 *     waits for a TIMER_FINISHED tick before resolving. result() returns the
 *     `i_result` string (defaults to "LOADED") so callers can branch on it.
 *
 *   factory_check_open_ui5() — uses the z2ui5.Info custom control to detect
 *     whether the running runtime is OpenUI5 vs SAPUI5. mv_is_open_ui5 is
 *     true when so.
 *
 * Modal "Setup UI..." popup with no buttons; auto-closes on completion.
 */
class z2ui5_cl_pop_js_loader extends z2ui5_if_app {

  client = null;
  js              = ``;
  user_command    = `LOADED`;
  check_open_ui5  = false;
  mv_is_open_ui5  = false;
  ui5_gav         = ``;

  static factory({ i_js, i_result = `LOADED` } = {}) {
    const r_result = new z2ui5_cl_pop_js_loader();
    r_result.js           = String(i_js ?? ``);
    r_result.user_command = i_result;
    return r_result;
  }

  static factory_check_open_ui5() {
    const r_result = new z2ui5_cl_pop_js_loader();
    r_result.check_open_ui5 = true;
    return r_result;
  }

  result() { return this.user_command; }

  view_display() {
    const c = this.client;
    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({ title: `Setup UI...` })
      .content();

    if (this.js) {
      popup._z2ui5().timer({ finished: c._event(`TIMER_FINISHED`) });
      // Plain <script> tag with the user-supplied JS body. Rendered raw —
      // mirrors abap _generic + _cc_plain_xml.
      popup._emit(`script`, { ns: `html`, raw: this.js });
    }

    if (this.check_open_ui5) {
      popup._z2ui5().info_frontend({
        finished: c._event(`INFO_FINISHED`),
        ui5_gav:  c._bind_edit(this.ui5_gav),
      });
    }

    c.popup_display(popup.stringify());
  }

  async main(client) {
    this.client = client;

    if (client.check_on_init()) {
      this.view_display();
      return;
    }

    switch (client.get().EVENT) {
      case `INFO_FINISHED`:
        if (String(this.ui5_gav || ``).toUpperCase().includes(`OPEN`)) {
          this.mv_is_open_ui5 = true;
        }
        client.popup_destroy();
        client.nav_app_leave();
        break;
      case `TIMER_FINISHED`:
        client.popup_destroy();
        client.nav_app_leave();
        break;
    }
  }
}

module.exports = z2ui5_cl_pop_js_loader;
