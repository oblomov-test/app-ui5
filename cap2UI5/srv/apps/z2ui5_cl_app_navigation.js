const z2ui5_if_app = require("../z2ui5/z2ui5_if_app");
class z2ui5_cl_app_navigation extends z2ui5_if_app {

  COUNTER = 0;

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "NAV_HELLO":
        // Navigate to Hello World app
        const HelloWorld = require("../z2ui5/02/z2ui5_cl_app_hello_world");
        client.nav_app_call(new HelloWorld());
        break;

      case "NAV_MESSAGES":
        const Messages = require("./z2ui5_cl_app_messages");
        client.nav_app_call(new Messages());
        break;

      case "NAV_CHILD":
        // Navigate to a new instance of this same app (child)
        const child = new z2ui5_cl_app_navigation();
        child.COUNTER = this.COUNTER + 1;
        client.nav_app_call(child);
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

    const page = view
      .Shell()
      .Page({
        title: `cap2UI5 - Navigation (Depth: ${this.COUNTER})`,
        showNavButton: true,
        navButtonPress: client._event("BACK"),
      });

    page
      .MessageStrip({
        text: `This demonstrates app-to-app navigation using nav_app_call(). Current depth: ${this.COUNTER}`,
        type: "Information",
        showIcon: true,
      })
      .Button({
        text: "Navigate to Hello World",
        press: client._event("NAV_HELLO"),
        icon: "sap-icon://hello-world",
        type: "Emphasized",
      })
      .Button({
        text: "Navigate to Messages Demo",
        press: client._event("NAV_MESSAGES"),
        icon: "sap-icon://message-popup",
      })
      .Button({
        text: "Navigate Deeper (same app)",
        press: client._event("NAV_CHILD"),
        icon: "sap-icon://drill-down",
      });

    client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_app_navigation;
