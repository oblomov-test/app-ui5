const z2ui5_if_app      = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");

/**
 * z2ui5_cl_pop_html — JS port of abap2UI5 z2ui5_cl_pop_html.
 *
 * Modal popup that renders a raw HTML string via sap.ui.core.HTML.
 * Single OK button. Caller passes content as `i_html`.
 */
class z2ui5_cl_pop_html extends z2ui5_if_app {

  client = null;
  title  = `HTML View`;
  icon   = `sap-icon://hint`;
  html   = ``;
  button_text_confirm = `OK`;

  static factory({
    i_html,
    i_title       = `HTML View`,
    i_icon        = `sap-icon://hint`,
    i_button_text = `OK`,
  } = {}) {
    const r_result = new z2ui5_cl_pop_html();
    r_result.title               = i_title;
    r_result.icon                = i_icon;
    r_result.html                = String(i_html ?? ``);
    r_result.button_text_confirm = i_button_text;
    return r_result;
  }

  view_display() {
    const c = this.client;
    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({
        title:      this.title,
        icon:       this.icon,
        afterClose: c._event(`BUTTON_CONFIRM`),
      })
      .content()
        .VBox({ class: `sapUiMediumMargin` })
          .HTML({ content: this.html })
        .get_parent()
      .get_parent()
      .get_parent()
      .buttons()
        .Button({
          text:  this.button_text_confirm,
          press: c._event(`BUTTON_CONFIRM`),
          type:  `Emphasized`,
        });

    c.popup_display(popup.stringify());
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

module.exports = z2ui5_cl_pop_html;
