const z2ui5_if_app = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");

/**
 * Yes/No confirmation popup — 1:1 port of abap2UI5 z2ui5_cl_pop_to_confirm.
 *
 * Usage:
 *   client.nav_app_call(z2ui5_cl_pop_to_confirm.factory({
 *     i_question: `Delete this row?`,
 *     i_title:    `Confirm`,
 *   }));
 *
 * In the caller's check_on_navigated() branch:
 *   const prev = client.get_app_prev();
 *   if (prev instanceof z2ui5_cl_pop_to_confirm && prev.result()) { ... }
 */
class z2ui5_cl_pop_to_confirm extends z2ui5_if_app {

  client              = null;
  title               = ``;
  icon                = ``;
  question_text       = ``;
  button_text_confirm = ``;
  button_text_cancel  = ``;
  event_confirmed     = ``;
  event_canceled      = ``;
  check_result        = false;

  static factory({
    i_question,
    i_title           = `Confirmation`,
    i_icon            = `sap-icon://question-mark`,
    i_button_confirm  = `OK`,
    i_button_cancel   = `Cancel`,
    i_event_confirmed = ``,
    i_event_canceled  = ``,
  } = {}) {
    const r_result = new z2ui5_cl_pop_to_confirm();
    r_result.title               = i_title;
    r_result.icon                = i_icon;
    r_result.question_text       = i_question;
    r_result.button_text_confirm = i_button_confirm;
    r_result.button_text_cancel  = i_button_cancel;
    r_result.event_confirmed     = i_event_confirmed;
    r_result.event_canceled      = i_event_canceled;
    return r_result;
  }

  result() {
    return this.check_result;
  }

  view_display() {
    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({
        title:      this.title,
        icon:       this.icon,
        afterClose: this.client._event(`BUTTON_CANCEL`),
      })
      .content()
        .VBox({ class: `sapUiMediumMargin` })
          .Text({ text: this.question_text })
        .get_parent()
      .get_parent()
      .buttons()
        .Button({
          text:  this.button_text_cancel,
          press: this.client._event(`BUTTON_CANCEL`),
        })
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
      this.check_result = true;
      client.popup_destroy();
      client.nav_app_leave();
      client.follow_up_action(client._event(this.event_confirmed));
    }

    if (client.check_on_event(`BUTTON_CANCEL`)) {
      this.check_result = false;
      client.popup_destroy();
      client.nav_app_leave();
      client.follow_up_action(client._event(this.event_canceled));
    }

  }
}

module.exports = z2ui5_cl_pop_to_confirm;
