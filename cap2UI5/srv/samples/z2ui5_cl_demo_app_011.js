const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_011 extends z2ui5_if_app {

  t_tab                 = [];
  check_editable_active = false;

  client = null;

  view_display() {

    const view = z2ui5_cl_xml_view.factory();
    const page = view.Shell()
      .Page({
        title:          `abap2UI5 - Tables and editable`,
        navButtonPress: this.client._event_nav_app_leave(),
        showNavButton:  this.client.check_app_prev_stack(),
        id:             `test2`,
      });

    const tab = page.Table({
      items: this.client._bind_edit(this.t_tab),
      mode:  `MultiSelect`,
    });

    const tb = tab.headerToolbar().OverflowToolbar();
    tb.Title({ text: `title of the table` });
    tb.Button({ text: `test`, press: this.client._event(`BUTTON_TEST`) });
    tb.ToolbarSpacer();
    tb.Button({ icon: `sap-icon://delete`, text: `delete selected row`, press: this.client._event(`BUTTON_DELETE`) });
    tb.Button({ icon: `sap-icon://add`,    text: `add`,                 press: this.client._event(`BUTTON_ADD`)    });
    tb.Button({
      icon:  `sap-icon://edit`,
      text:  this.check_editable_active ? `display` : `edit`,
      press: this.client._event(`BUTTON_EDIT`),
    });

    const cols = tab.columns();
    cols.Column().Text({ text: `Title` });
    cols.Column().Text({ text: `Color` });
    cols.Column().Text({ text: `Info` });
    cols.Column().Text({ text: `Description` });
    cols.Column().Text({ text: `Checkbox` });

    const cells = tab.items().ColumnListItem({ selected: `{selkz}` }).cells();
    cells.Input({    value:    `{title}`, enabled: `{editable}`, id: `test` });
    cells.Input({    value:    `{value}`, enabled: `{editable}` });
    cells.Input({    value:    `{info}`,  enabled: `{editable}` });
    cells.Input({    value:    `{descr}`, enabled: `{editable}` });
    cells.CheckBox({ selected: `{checkbox}`, enabled: `{editable}` });

    this.client.view_display(view.stringify());

  }

  async main(client) {

    this.client = client;

    if (client.check_on_init()) {

      this.check_editable_active = false;
      this.t_tab = [
        { selkz: false, title: `entry 01`, value: `red`,    info: `completed`, descr: `this is a description`, icon: ``, editable: false, checkbox: true  },
        { selkz: false, title: `entry 02`, value: `blue`,   info: `completed`, descr: `this is a description`, icon: ``, editable: false, checkbox: true  },
        { selkz: false, title: `entry 03`, value: `green`,  info: `completed`, descr: `this is a description`, icon: ``, editable: false, checkbox: true  },
        { selkz: false, title: `entry 04`, value: `orange`, info: `completed`, descr: ``,                      icon: ``, editable: false, checkbox: true  },
        { selkz: false, title: `entry 05`, value: `grey`,   info: `completed`, descr: `this is a description`, icon: ``, editable: false, checkbox: true  },
        { selkz: false, title: ``,         value: ``,       info: ``,          descr: ``,                      icon: ``, editable: false, checkbox: false },
      ];

      this.view_display();

    } else if (client.check_on_event(`BUTTON_EDIT`)) {
      this.check_editable_active = !this.check_editable_active;
      for (const r of this.t_tab) r.editable = this.check_editable_active;
      client.view_model_update();

    } else if (client.check_on_event(`BUTTON_DELETE`)) {
      this.t_tab = this.t_tab.filter((r) => !r.selkz);
      client.view_model_update();

    } else if (client.check_on_event(`BUTTON_ADD`)) {
      this.t_tab.push({ selkz: false, title: ``, value: ``, descr: ``, icon: ``, info: ``, editable: false, checkbox: false });
      client.view_model_update();
    }

  }
}

module.exports = z2ui5_cl_demo_app_011;
