const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_003 extends z2ui5_if_app {

  t_tab = [];

  async main(client) {

    if (client.check_on_init()) {

      this.t_tab = [
        { title: `row_01`, value: ``, descr: `this is a description`, icon: `sap-icon://account`, info: `completed`,   selected: false, checkbox: false },
        { title: `row_02`, value: ``, descr: `this is a description`, icon: `sap-icon://account`, info: `incompleted`, selected: false, checkbox: false },
        { title: `row_03`, value: ``, descr: `this is a description`, icon: `sap-icon://account`, info: `working`,     selected: false, checkbox: false },
        { title: `row_04`, value: ``, descr: `this is a description`, icon: `sap-icon://account`, info: `working`,     selected: false, checkbox: false },
        { title: `row_05`, value: ``, descr: `this is a description`, icon: `sap-icon://account`, info: `completed`,   selected: false, checkbox: false },
        { title: `row_06`, value: ``, descr: `this is a description`, icon: `sap-icon://account`, info: `completed`,   selected: false, checkbox: false },
      ];

      const view = z2ui5_cl_xml_view.factory();
      const page = view.Shell()
        .Page({
          title:          `abap2UI5 - List`,
          navButtonPress: client._event_nav_app_leave(),
          showNavButton:  client.check_app_prev_stack(),
        });

      page.List({
        headerText:      `List Output`,
        items:           client._bind_edit(this.t_tab),
        mode:            `SingleSelectMaster`,
        selectionChange: client._event(`SELCHANGE`),
      })
        .StandardListItem({
          title:       `{title}`,
          description: `{descr}`,
          icon:        `{icon}`,
          info:        `{info}`,
          press:       client._event(`TEST`),
          selected:    `{selected}`,
        });

      client.view_display(view.stringify());

    } else if (client.check_on_event(`SELCHANGE`)) {
      const sel = this.t_tab.find((r) => r.selected);
      client.message_box_display(`go to details for item ${sel?.title ?? ``}`);
    }

  }
}

module.exports = z2ui5_cl_demo_app_003;
