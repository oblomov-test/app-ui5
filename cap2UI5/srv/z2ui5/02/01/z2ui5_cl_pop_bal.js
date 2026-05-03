const z2ui5_if_app      = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");
const z2ui5_cl_util     = require("../../00/03/z2ui5_cl_util");

/**
 * z2ui5_cl_pop_bal — JS port of abap2UI5 z2ui5_cl_pop_bal.
 *
 * Business Application Log viewer. Accepts anything msg-like (string, Error,
 * msg-table, log object) — uses z2ui5_cl_util.msg_get_t to normalize, then
 * displays as a sap.m.Table with date/time/type/id/no/message columns.
 */
class z2ui5_cl_pop_bal extends z2ui5_if_app {

  client = null;
  title  = `abap2UI5 - Business Application Log`;
  mt_msg = [];

  static factory({ i_messages, i_title = `abap2UI5 - Business Application Log` } = {}) {
    const r_result = new z2ui5_cl_pop_bal();
    const lt = z2ui5_cl_util.msg_get_t(i_messages);
    r_result.mt_msg = lt.map((row) => ({
      TYPE:       z2ui5_cl_util.ui5_get_msg_type(row.type),
      TITLE:      row.text || ``,
      ID:         row.id   || ``,
      NUMBER:     row.no   || ``,
      MESSAGE_V1: row.v1   || ``,
      MESSAGE_V2: row.v2   || ``,
      MESSAGE_V3: row.v3   || ``,
      MESSAGE_V4: row.v4   || ``,
      MESSAGE:    row.text || ``,
      SUBTITLE:   `${row.id || ``} ${row.no || ``}`.trim(),
      DATE:       z2ui5_cl_util.time_get_date_by_stampl(row.timestampl),
      TIME:       z2ui5_cl_util.time_get_time_by_stampl(row.timestampl),
    }));
    r_result.title = i_title;
    return r_result;
  }

  view_display() {
    const c = this.client;

    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({
        title:             this.title,
        contentHeight:     `50%`,
        contentWidth:      `50%`,
        verticalScrolling: false,
        afterClose:        c._event(`BUTTON_CONTINUE`),
      });

    const table = popup.Table({ items: c._bind(this.mt_msg) });

    const cols = table.columns();
    for (const h of [`Date`, `Time`, `Type`, `ID`, `No`, `Message`]) {
      cols.Column().header().Text({ text: h }).get_parent().get_parent();
    }

    const cells = table.items().ColumnListItem().cells();
    for (const path of [`{DATE}`, `{TIME}`, `{TYPE}`, `{ID}`, `{NUMBER}`, `{MESSAGE}`]) {
      cells.Text({ text: path });
    }

    popup.buttons()
      .Button({
        text:  `Continue`,
        press: c._event(`BUTTON_CONTINUE`),
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
    if (client.check_on_event(`BUTTON_CONTINUE`)) {
      client.popup_destroy();
      client.nav_app_leave();
    }
  }
}

module.exports = z2ui5_cl_pop_bal;
