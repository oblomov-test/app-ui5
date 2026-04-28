const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_004 extends z2ui5_if_app {

  client    = null;
  view_main = ``;

  async main(client) {

    this.client = client;

    if (client.check_on_init()) {
      this.on_init();

    } else if (client.check_on_event()) {
      this.on_event();
    }

  }

  on_init() {
    this.view_main_display();
    this.client.message_box_display(`app started, init values set`);
  }

  on_event() {
    switch (this.client.get().EVENT) {
      case `BUTTON_ROUNDTRIP`:
        this.client.message_box_display(`server-client roundtrip, method on_event of the abap controller was called`);
        break;
      case `BUTTON_RESTART`:
        this.client.nav_app_leave(new z2ui5_cl_demo_app_004());
        break;
      case `BUTTON_CHANGE_VIEW`:
        if (this.view_main === `MAIN`) this.view_second_display();
        else if (this.view_main === `SECOND`) this.view_main_display();
        break;
      case `BUTTON_ERROR`: {
        const dummy = 1 / 0;  // matches abap CX_SY_ZERO_DIVIDE demo
        return dummy;
      }
    }
  }

  view_main_display() {

    this.view_main = `MAIN`;

    const view = z2ui5_cl_xml_view.factory();
    const page = view.Shell()
      .Page({
        title:          `abap2UI5 - Controller`,
        navButtonPress: this.client._event_nav_app_leave(),
        showNavButton:  this.client.check_app_prev_stack(),
      });

    page.Grid({ defaultSpan: `L6 M12 S12` })
      .content()
      .SimpleForm({ title: `Controller`, editable: true })
        .content()
          .Label({ text: `Roundtrip` })
          .Button({ text: `Client/Server Interaction`, press: this.client._event(`BUTTON_ROUNDTRIP`) })
          .Label({ text: `System` })
          .Button({ text: `Restart App`,                press: this.client._event(`BUTTON_RESTART`)   })
          .Label({ text: `Change View` })
          .Button({ text: `Display View SECOND`,        press: this.client._event(`BUTTON_CHANGE_VIEW`) })
          .Label({ text: `CX_SY_ZERO_DIVIDE` })
          .Button({ text: `Error not catched by the user`, press: this.client._event(`BUTTON_ERROR`) });

    this.client.view_display(view.stringify());

  }

  view_second_display() {

    this.view_main = `SECOND`;

    const view = z2ui5_cl_xml_view.factory();
    const page = view.Shell()
      .Page({
        title:          `abap2UI5 - Controller`,
        navButtonPress: this.client._event_nav_app_leave(),
        showNavButton:  this.client.check_app_prev_stack(),
      });

    page.Grid({ defaultSpan: `L12 M12 S12` })
      .content()
      .SimpleForm({ title: `View Second` })
        .content()
          .Label({ text: `Change View` })
          .Button({ text: `Display View MAIN`, press: this.client._event(`BUTTON_CHANGE_VIEW`) });

    this.client.view_display(view.stringify());

  }
}

module.exports = z2ui5_cl_demo_app_004;
