const z2ui5_if_app = require("../z2ui5/z2ui5_if_app");
class z2ui5_cl_app_messages extends z2ui5_if_app {

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "BOX":
        client.message_box_display("This is a message box from the CAP backend!");
        this.displayView(client);
        break;
      case "TOAST":
        client.message_toast_display("This is a message toast from the CAP backend!");
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
    const Z2UI5_CL_XML_VIEW = require("../z2ui5/02/z2ui5_cl_xml_view");
    const view = new Z2UI5_CL_XML_VIEW();

    view
      .Shell()
      .Page({
        title: "cap2UI5 - Messages",
        showNavButton: true,
        navButtonPress: client._event("BACK"),
      })
      .MessageStrip({
        text: "Click the buttons to see different message types.",
        type: "Information",
        showIcon: true,
      })
      .Button({
        press: client._event("TOAST"),
        text: "Message Toast",
        icon: "sap-icon://message-success",
        type: "Accept",
      })
      .Button({
        press: client._event("BOX"),
        text: "Message Box",
        icon: "sap-icon://message-popup",
        type: "Emphasized",
      });

    client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_app_messages;
