const z2ui5_if_app      = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");

/**
 * z2ui5_cl_pop_error — JS port of abap2UI5 z2ui5_cl_pop_error.
 *
 * Modal error dialog. Used by core_handler to surface uncaught exceptions
 * to the user instead of breaking the session.
 *
 * Usage:
 *   client.nav_app_leave(z2ui5_cl_pop_error.factory({ x_root: caughtError }));
 */
class z2ui5_cl_pop_error extends z2ui5_if_app {

  client = null;
  error  = null;        // Error / cx_root-like object
  title  = `Error`;

  static factory({ x_root, i_title = `Error` } = {}) {
    const r_result = new z2ui5_cl_pop_error();
    r_result.error = x_root;
    r_result.title = i_title;
    return r_result;
  }

  view_display() {
    const text = this._error_text();
    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({
        title:      this.title,
        afterClose: this.client._event(`BUTTON_CONFIRM`),
      })
      .content()
        .VBox({ class: `sapUiMediumMargin` })
          .Text({ text })
        .get_parent()
      .get_parent()
      .buttons()
        .Button({
          text:  `OK`,
          press: this.client._event(`BUTTON_CONFIRM`),
          type:  `Emphasized`,
        });

    this.client.popup_display(popup.stringify());
  }

  /**
   * Extracts a readable text from a thrown value. Handles abap-style
   * `get_text()` (z2ui5_cx_util_error) and plain Errors.
   */
  _error_text() {
    if (!this.error) return ``;
    if (typeof this.error.get_text === `function`) return this.error.get_text();
    if (this.error.message) return this.error.message;
    return String(this.error);
  }

  async main(client) {
    this.client = client;

    if (client.check_on_init()) {
      this.view_display();
      return;
    }

    if (client.check_on_event(`BUTTON_CONFIRM`)) {
      client.popup_destroy();
      client.nav_app_leave();
    }
  }
}

module.exports = z2ui5_cl_pop_error;
