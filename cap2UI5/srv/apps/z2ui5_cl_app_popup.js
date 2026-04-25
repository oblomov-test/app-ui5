const z2ui5_if_app = require("../z2ui5/z2ui5_if_app");
class z2ui5_cl_app_popup extends z2ui5_if_app {

  RESULT = "No action yet";
  INPUT_VAL = "";

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "OPEN_SIMPLE":
        this.showSimpleDialog(client);
        this.displayView(client);
        break;

      case "OPEN_INPUT":
        this.showInputDialog(client);
        this.displayView(client);
        break;

      case "OPEN_CONFIRM":
        this.showConfirmDialog(client);
        this.displayView(client);
        break;

      case "DIALOG_OK":
        this.RESULT = `Dialog confirmed with input: "${this.INPUT_VAL}"`;
        client.message_toast_display("Confirmed!");
        this.displayView(client);
        break;

      case "DIALOG_CANCEL":
        this.RESULT = "Dialog cancelled";
        this.displayView(client);
        break;

      case "CONFIRM_YES":
        this.RESULT = "User confirmed: YES";
        client.message_toast_display("Confirmed!");
        this.displayView(client);
        break;

      case "CONFIRM_NO":
        this.RESULT = "User confirmed: NO";
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

    const page = view
      .Shell()
      .Page({
        title: "cap2UI5 - Popup / Dialog",
        showNavButton: true,
        navButtonPress: client._event("BACK"),
      });

    page
      .MessageStrip({
        text: `Last result: ${this.RESULT}`,
        type: "Information",
        showIcon: true,
      })
      .Button({
        text: "Simple Dialog",
        press: client._event("OPEN_SIMPLE"),
        icon: "sap-icon://message-information",
        type: "Emphasized",
      })
      .Button({
        text: "Input Dialog",
        press: client._event("OPEN_INPUT"),
        icon: "sap-icon://edit",
      })
      .Button({
        text: "Confirmation Dialog",
        press: client._event("OPEN_CONFIRM"),
        icon: "sap-icon://question-mark",
      });

    client.view_display(view.stringify());
  }

  showSimpleDialog(client) {
    const Z2UI5_CL_XML_VIEW = require("../z2ui5/02/z2ui5_cl_xml_view");
    const view = new Z2UI5_CL_XML_VIEW();

    const dialog = view.Dialog({
      title: "Information",
      contentWidth: "400px",
    });

    dialog.Text({
      text: "This is a simple dialog displayed from the CAP backend using popup_display().",
    });

    dialog
      .beginButton()
      .Button({
        text: "OK",
        press: client._event("DIALOG_OK"),
        type: "Emphasized",
      });

    client.popup_display(view.stringify());
  }

  showInputDialog(client) {
    const Z2UI5_CL_XML_VIEW = require("../z2ui5/02/z2ui5_cl_xml_view");
    const view = new Z2UI5_CL_XML_VIEW();

    const dialog = view.Dialog({
      title: "Enter a Value",
      contentWidth: "400px",
    });

    const vbox = dialog.VBox({ class: "sapUiSmallMargin" });
    vbox
      .Label({ text: "Your input:" })
      .Input({
        value: client._bind_edit(this.INPUT_VAL),
        placeholder: "Type something...",
        width: "100%",
      });

    dialog.beginButton().Button({
      text: "OK",
      press: client._event("DIALOG_OK"),
      type: "Emphasized",
    });
    dialog.endButton().Button({
      text: "Cancel",
      press: client._event("DIALOG_CANCEL"),
    });

    client.popup_display(view.stringify());
  }

  showConfirmDialog(client) {
    const Z2UI5_CL_XML_VIEW = require("../z2ui5/02/z2ui5_cl_xml_view");
    const view = new Z2UI5_CL_XML_VIEW();

    const dialog = view.Dialog({
      title: "Confirm Action",
      type: "Message",
      state: "Warning",
      contentWidth: "400px",
    });

    dialog.Text({ text: "Are you sure you want to proceed with this action?" });

    dialog.beginButton().Button({
      text: "Yes",
      press: client._event("CONFIRM_YES"),
      type: "Emphasized",
    });
    dialog.endButton().Button({
      text: "No",
      press: client._event("CONFIRM_NO"),
    });

    client.popup_display(view.stringify());
  }
}

module.exports = z2ui5_cl_app_popup;
