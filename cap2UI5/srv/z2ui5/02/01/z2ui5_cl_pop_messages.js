const z2ui5_if_app = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");

/**
 * Message-list popup — 1:1 port of abap2UI5 z2ui5_cl_pop_messages.
 *
 * Usage:
 *   client.nav_app_call(z2ui5_cl_pop_messages.factory({
 *     i_messages: [
 *       { type: `Error`,       title: `Invalid email`, subtitle: `EMAIL 001` },
 *       { type: `Warning`,     title: `Phone empty`,   subtitle: `PHONE 002` },
 *       { type: `Information`, title: `Draft saved` },
 *     ],
 *   }));
 */
class z2ui5_cl_pop_messages extends z2ui5_if_app {

  client = null;
  title  = ``;
  // mt_msg row: { type, id, title, subtitle, number, message, message_v1..v4, group }
  mt_msg = [];

  static factory({
    i_messages = [],
    i_title    = `abap2UI5 - Message Popup`,
  } = {}) {
    const r_result = new z2ui5_cl_pop_messages();
    // Pre-shaped {type,title,subtitle} entries are passed through as-is — abap
    // here invokes z2ui5_cl_util=>msg_get_t / ui5_get_msg_type which we don't port.
    r_result.mt_msg = Array.isArray(i_messages) ? i_messages.map((m) => ({
      type:     m.type     || ``,
      id:       m.id       || ``,
      title:    m.title    || ``,
      subtitle: m.subtitle || ``,
      number:   m.number   || ``,
      message:  m.message  || ``,
      message_v1: m.message_v1 || ``,
      message_v2: m.message_v2 || ``,
      message_v3: m.message_v3 || ``,
      message_v4: m.message_v4 || ``,
      group:    m.group    || ``,
    })) : [];
    r_result.title = i_title;
    return r_result;
  }

  view_display() {
    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({
        title:             this.title,
        contentHeight:     `50%`,
        contentWidth:      `50%`,
        verticalScrolling: false,
        afterClose:        this.client._event(`BUTTON_CONTINUE`),
      });

    popup.MessageView({ items: this.client._bind(this.mt_msg) })
      .MessageItem({
        type:     `{type}`,
        title:    `{title}`,
        subtitle: `{subtitle}`,
      });

    popup.buttons().Button({
      text:  `Continue`,
      press: this.client._event(`BUTTON_CONTINUE`),
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

    if (client.check_on_event(`BUTTON_CONTINUE`)) {
      client.popup_destroy();
      client.nav_app_leave();
    }

  }
}

module.exports = z2ui5_cl_pop_messages;
