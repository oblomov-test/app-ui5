const z2ui5_if_app = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");

/**
 * Information popup with single OK button — 1:1 port of abap2UI5 z2ui5_cl_pop_to_inform.
 *
 * Usage:
 *   client.nav_app_call(z2ui5_cl_pop_to_inform.factory({ i_text: `Saved.` }));
 */
class z2ui5_cl_pop_to_inform extends z2ui5_if_app {

  client              = null;
  title               = ``;
  icon                = ``;
  question_text       = ``;
  button_text_confirm = ``;

  static factory({
    i_text,
    i_title       = `Information`,
    i_icon        = `sap-icon://information`,
    i_button_text = `OK`,
  } = {}) {
    const r_result = new z2ui5_cl_pop_to_inform();
    r_result.title               = i_title;
    r_result.icon                = i_icon;
    r_result.question_text       = i_text;
    r_result.button_text_confirm = i_button_text;
    return r_result;
  }

  view_display() {
    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({
        title:      this.title,
        icon:       this.icon,
        afterClose: this.client._event(`BUTTON_CONFIRM`),
      })
      .content()
        .VBox({ class: `sapUiMediumMargin` })
          .Text({ text: this.question_text })
        .get_parent()
      .get_parent()
      .buttons()
        .Button({
          text:  this.button_text_confirm,
          press: this.client._event(`BUTTON_CONFIRM`),
          type:  `Emphasized`,
        });

    this.client.popup_display(popup.stringify());
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

module.exports = z2ui5_cl_pop_to_inform;
