const z2ui5_if_app = require("../z2ui5_if_app");
class z2ui5_cl_app_hello_world extends z2ui5_if_app {

  NAME = "";

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "BUTTON_POST":
        client.message_toast_display(`Hello ${this.NAME}! Your input was sent to the CAP server and back.`);
        this.displayView(client);
        break;

      case "BACK":
        client.nav_app_home();
        break;

      default:
        this.displayView(client);
        break;
    }
  }

  displayView(client) {
    const Z2UI5_CL_XML_VIEW = require("./z2ui5_cl_xml_view");
    const view = new Z2UI5_CL_XML_VIEW();

    view
      .Shell()
      .Page({
        title: "cap2UI5 - Hello World",
        showNavButton: true,
        navButtonPress: client._event("BACK"),
      })
      .Title({ text: "Enter your name and send it to the server..." })
      .Input({
        value: client._bind_edit(this.NAME),
        placeholder: "Your name here...",
        enabled: true,
        submit: client._event("BUTTON_POST"),
      })
      .Button({
        press: client._event("BUTTON_POST"),
        text: "Post",
        type: "Emphasized",
        icon: "sap-icon://paper-plane",
      });

    client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_app_hello_world;
