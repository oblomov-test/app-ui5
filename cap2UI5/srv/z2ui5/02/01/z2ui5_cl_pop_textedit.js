const z2ui5_if_app      = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");

/**
 * z2ui5_cl_pop_textedit — JS port of abap2UI5 z2ui5_cl_pop_textedit.
 *
 * TextArea-based editor popup. Cancel/Confirm buttons; result() returns
 * { text, check_confirmed }.
 *
 * Usage:
 *   const pop = z2ui5_cl_pop_textedit.factory({
 *     i_textarea: existing,
 *     i_title:    'Edit',
 *     i_check_editable: true,
 *   });
 *   client.nav_app_call(pop);
 */
class z2ui5_cl_pop_textedit extends z2ui5_if_app {

  client            = null;
  mv_stretch_active = true;
  mv_title          = `Editor`;
  mv_check_editable = false;
  ms_result         = { text: ``, check_confirmed: false };

  static factory({
    i_textarea       = ``,
    i_title          = `Editor`,
    i_stretch_active = true,
    i_check_editable = false,
  } = {}) {
    const r_result = new z2ui5_cl_pop_textedit();
    r_result.mv_stretch_active = !!i_stretch_active;
    r_result.ms_result.text    = String(i_textarea ?? ``);
    r_result.mv_title          = i_title;
    r_result.mv_check_editable = !!i_check_editable;
    return r_result;
  }

  display() {
    const c = this.client;
    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({
        afterClose: c._event(`BUTTON_TEXTAREA_CANCEL`),
        stretch:    this.mv_stretch_active,
        title:      this.mv_title,
        icon:       `sap-icon://edit`,
      })
      .content()
        .TextArea({
          growing:  true,
          editable: this.mv_check_editable,
          value:    c._bind_edit(this.ms_result.text),
        })
      .get_parent()
      .buttons()
        .Button({
          text:  `Cancel`,
          press: c._event(`BUTTON_TEXTAREA_CANCEL`),
        })
        .Button({
          text:  `Confirm`,
          press: c._event(`BUTTON_TEXTAREA_CONFIRM`),
          type:  `Emphasized`,
        });

    c.popup_display(popup.stringify());
  }

  result() { return this.ms_result; }

  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      this.display();
      return;
    }
    switch (client.get().EVENT) {
      case `BUTTON_TEXTAREA_CONFIRM`:
        this.ms_result.check_confirmed = true;
        client.popup_destroy();
        client.nav_app_leave();
        break;
      case `BUTTON_TEXTAREA_CANCEL`:
        client.popup_destroy();
        client.nav_app_leave();
        break;
    }
  }
}

module.exports = z2ui5_cl_pop_textedit;
