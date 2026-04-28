const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_008 extends z2ui5_if_app {

  client             = null;
  check_strip_active = false;
  strip_type         = "";

  async main(client) {

    this.client = client;

    if (client.check_on_init()) {
      this.view_display();

    } else if (client.check_on_event()) {
      this.on_event();
    }

  }

  on_event() {

    const event = this.client.get().EVENT;
    switch (event) {
      case `BUTTON_MESSAGE_BOX_CONFIRM`:
        this.client.message_box_display(`Approve purchase order 12345?`, `confirm`);
        break;
      case `BUTTON_MESSAGE_BOX_ALERT`:
        this.client.message_box_display(`The quantity you have reported exceeds the quantity planned.`, `alert`);
        break;
      case `BUTTON_MESSAGE_BOX_ERROR`:
        this.client.message_box_display(`Select a team in the "Development" area.\n"Marketing" isn't assigned to this area.`, `error`);
        break;
      case `BUTTON_MESSAGE_BOX_INFO`:
        this.client.message_box_display(`Your booking will be reserved for 24 hours.`);
        break;
      case `BUTTON_MESSAGE_BOX_WARNING`:
        this.client.message_box_display(`The project schedule was last updated over a year ago.`, `warning`);
        break;
      case `BUTTON_MESSAGE_BOX_SUCCESS`:
        this.client.message_box_display(`Project 1234567 was created and assigned to team "ABC".`, `success`);
        break;
      case `BUTTON_MESSAGE_TOAST`:
        this.client.message_toast_display(`this is a message toast`);
        break;
      case `BUTTON_MESSAGE_TOAST2`:
        this.client.message_toast_display(`this is a message toast`, {
          at:                      `left bottom`,
          offset:                  `0 -15`,
          animationtimingfunction: `ease-in`,
          class:                   `my-style`,
        });
        break;
      case `BUTTON_MESSAGE_STRIP_INFO`:
        this.check_strip_active = true;
        this.strip_type         = `Information`;
        break;
      case `BUTTON_MESSAGE_STRIP_ERROR`:
        this.check_strip_active = true;
        this.strip_type         = `Error`;
        break;
      case `BUTTON_MESSAGE_STRIP_SUCCESS`:
        this.check_strip_active = true;
        this.strip_type         = `Success`;
        break;
    }

    this.view_display();

  }

  view_display() {

    const view = z2ui5_cl_xml_view.factory();
    const page = view.Shell()
      .Page({
        title:          `abap2UI5 - Messages`,
        navButtonPress: this.client._event_nav_app_leave(),
        showNavButton:  this.client.check_app_prev_stack(),
      })
      .headerContent()
        .Link({})
        .get_parent();

    if (this.check_strip_active) {
      page.MessageStrip({
        text: `This is a Message Strip`,
        type: this.strip_type,
      });
    }

    page.Grid({ defaultSpan: `L6 M12 S12` })
      .content()
      .SimpleForm({ title: `Message Box` })
        .content()
          .Button({ text: `Confirm`, press: this.client._event(`BUTTON_MESSAGE_BOX_CONFIRM`) })
          .Button({ text: `Alert`,   press: this.client._event(`BUTTON_MESSAGE_BOX_ALERT`)   })
          .Button({ text: `Error`,   press: this.client._event(`BUTTON_MESSAGE_BOX_ERROR`)   })
          .Button({ text: `Info`,    press: this.client._event(`BUTTON_MESSAGE_BOX_INFO`)    })
          .Button({ text: `Warning`, press: this.client._event(`BUTTON_MESSAGE_BOX_WARNING`) })
          .Button({ text: `Success`, press: this.client._event(`BUTTON_MESSAGE_BOX_SUCCESS`) });

    page.Grid({ defaultSpan: `L6 M12 S12` })
      .content()
      .SimpleForm({ title: `Message Strip` })
        .content()
          .Button({ text: `success`,     press: this.client._event(`BUTTON_MESSAGE_STRIP_SUCCESS`) })
          .Button({ text: `error`,       press: this.client._event(`BUTTON_MESSAGE_STRIP_ERROR`)   })
          .Button({ text: `information`, press: this.client._event(`BUTTON_MESSAGE_STRIP_INFO`)    });

    page.Grid({ defaultSpan: `L6 M12 S12` })
      .content()
      .SimpleForm({ title: `Display` })
        .content()
          .Button({ text: `Message Toast`,            press: this.client._event(`BUTTON_MESSAGE_TOAST`)  })
          .Button({ text: `Message Toast Customized`, press: this.client._event(`BUTTON_MESSAGE_TOAST2`) });

    this.client.view_display(view.stringify());

  }
}

module.exports = z2ui5_cl_demo_app_008;
