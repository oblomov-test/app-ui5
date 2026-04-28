const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_006 extends z2ui5_if_app {

  t_tab     = [];
  client    = null;
  check_ui5 = false;
  key       = ``;

  async main(client) {

    this.client = client;

    if (client.check_on_init()) {
      this.on_init();

    } else if (client.check_on_event()) {
      this.on_event();
    }

  }

  on_init() {
    this.refresh_data();
    this.view_display();
  }

  on_event() {

    switch (this.client.get().EVENT) {
      case `SORT_ASCENDING`:
        this.t_tab.sort((a, b) => a.count - b.count);
        this.client.message_toast_display(`sort ascending`);
        break;
      case `SORT_DESCENDING`:
        this.t_tab.sort((a, b) => b.count - a.count);
        this.client.message_toast_display(`sort descending`);
        break;
    }

    this.view_display();

  }

  refresh_data() {
    this.t_tab = [];
    for (let i = 1; i <= 10000; i++) {
      this.t_tab.push({
        count:      i,
        value:      `red`,
        descr:      `this is a description`,
        icon:       ``,
        info:       ``,
        checkbox:   true,
        percentage: 0,
        valuecolor: `Good`,
      });
    }
  }

  view_display() {

    const view = z2ui5_cl_xml_view.factory();
    const page = view.Shell()
      .Page({
        title:          `abap2UI5 - Scroll Container with Table and Toolbar`,
        navButtonPress: this.client._event_nav_app_leave(),
        showNavButton:  this.client.check_app_prev_stack(),
      });

    const tab = page.ScrollContainer({ height: `70%`, vertical: true })
      .Table({
        growing:             true,
        growingThreshold:    `20`,
        growingScrollToLoad: true,
        items:               this.client._bind_edit(this.t_tab),
        sticky:              `ColumnHeaders,HeaderToolbar`,
      });

    const tb = tab.headerToolbar().Toolbar();
    tb.Title({ text: `title of the table` });
    tb.Button({ text: `letf side button`, icon: `sap-icon://account`, press: this.client._event(`BUTTON_SORT`) });
    tb.SegmentedButton({ selectedKey: this.client._bind_edit(this.key) })
      .items()
        .SegmentedButtonItem({ key: `BLUE`,  icon: `sap-icon://accept`,        text: `blue`  })
        .SegmentedButtonItem({ key: `GREEN`, icon: `sap-icon://add-favorite`, text: `green` });
    tb.ToolbarSpacer();
    tb.Button({ icon: `sap-icon://sort-descending`, press: this.client._event(`SORT_DESCENDING`) });
    tb.Button({ icon: `sap-icon://sort-ascending`,  press: this.client._event(`SORT_ASCENDING`)  });

    const cols = tab.columns();
    cols.Column().Text({ text: `Color` });
    cols.Column().Text({ text: `Info` });
    cols.Column().Text({ text: `Description` });
    cols.Column().Text({ text: `Checkbox` });
    cols.Column().Text({ text: `Counter` });
    cols.Column().Text({ text: `Radial Micro Chart` });

    const cells = tab.items().ColumnListItem().cells();
    cells.Text({     text:     `{value}` });
    cells.Text({     text:     `{info}` });
    cells.Text({     text:     `{descr}` });
    cells.CheckBox({ selected: `{checkbox}`, enabled: false });
    cells.Text({     text:     `{count}` });

    this.client.view_display(view.stringify());

  }
}

module.exports = z2ui5_cl_demo_app_006;
