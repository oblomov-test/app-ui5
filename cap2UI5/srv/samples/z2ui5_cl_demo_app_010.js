const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_010 extends z2ui5_if_app {

  client = null;

  async main(client) {

    this.client = client;

    if (client.check_on_init()) {
      this.view_display();
    }

  }

  view_display() {

    const view = z2ui5_cl_xml_view.factory();
    const page = view.Shell()
      .Page({
        title:          `abap2UI5 - Demo Layout`,
        navButtonPress: this.client._event_nav_app_leave(),
        showNavButton:  this.client.check_app_prev_stack(),
      });

    page.headerContent().Button({ text: `button` });

    page.subHeader()
      .OverflowToolbar()
        .Button({ text: `button` })
        .Text({ text: `text` })
        .Link({ text: `link` })
        .ToolbarSpacer()
        .Text({ text: `subheader` })
        .ToolbarSpacer()
        .Button({ text: `button` })
        .Text({ text: `text` })
        .Link({ text: `link` });

    let grid = page.Grid({ defaultSpan: `L4 M4 S4` }).content();

    for (let i = 0; i < 3; i++) {
      grid.SimpleForm({ title: `Grid width 33%` })
        .content()
          .Button({ text: `button` })
          .Text({ text: `text` })
          .Link({ text: `link` });
    }

    grid = page.Grid({ defaultSpan: `L12 M12 S12` }).content();

    grid.SimpleForm({ title: `grid width 100%` })
      .content()
        .Button({ text: `button` })
        .Text({ text: `text` })
        .Link({ text: `link` });

    page.footer()
      .OverflowToolbar()
        .Button({ text: `button` })
        .Text({ text: `text` })
        .Link({ text: `link` })
        .ToolbarSpacer()
        .Text({ text: `footer` })
        .ToolbarSpacer()
        .Text({ text: `text` })
        .Link({ text: `link` })
        .Button({ text: `reject`, type: `Reject` })
        .Button({ text: `accept`, type: `Success` });

    this.client.view_display(view.stringify());

  }
}

module.exports = z2ui5_cl_demo_app_010;
