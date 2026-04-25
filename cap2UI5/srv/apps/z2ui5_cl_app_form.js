const z2ui5_if_app = require("../z2ui5/z2ui5_if_app");
class z2ui5_cl_app_form extends z2ui5_if_app {

  FIRST_NAME = "";
  LAST_NAME = "";
  EMAIL = "";
  PHONE = "";
  NOTES = "";
  IS_ACTIVE = "true";
  RATING = "3";

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "SUBMIT":
        client.message_toast_display(
          `Saved: ${this.FIRST_NAME} ${this.LAST_NAME} (${this.EMAIL})`
        );
        this.displayView(client);
        break;

      case "CLEAR":
        this.FIRST_NAME = "";
        this.LAST_NAME = "";
        this.EMAIL = "";
        this.PHONE = "";
        this.NOTES = "";
        this.IS_ACTIVE = "true";
        this.RATING = "3";
        client.message_toast_display("Form cleared");
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
        title: "cap2UI5 - Form Layout",
        showNavButton: true,
        navButtonPress: client._event("BACK"),
      });

    const form = page.SimpleForm({
      editable: true,
      layout: "ResponsiveGridLayout",
      columnsL: "1",
      columnsM: "1",
      labelSpanL: "3",
      labelSpanM: "4",
      labelSpanS: "12",
    });

    const content = form.content();
    content.cc("Toolbar", { ns: "m" }).Title({ text: "Person Details" }).get_parent();

    content
      .Label({ text: "First Name", required: true })
      .Input({
        value: client._bind_edit(this.FIRST_NAME),
        placeholder: "Enter first name",
      })
      .Label({ text: "Last Name", required: true })
      .Input({
        value: client._bind_edit(this.LAST_NAME),
        placeholder: "Enter last name",
      })
      .Label({ text: "Email" })
      .Input({
        value: client._bind_edit(this.EMAIL),
        placeholder: "email@example.com",
        type: "Email",
      })
      .Label({ text: "Phone" })
      .Input({
        value: client._bind_edit(this.PHONE),
        placeholder: "+49 ...",
        type: "Tel",
      })
      .Label({ text: "Active" })
      .CheckBox({
        text: "User is active",
        selected: client._bind_edit(this.IS_ACTIVE),
      })
      .Label({ text: "Notes" })
      .TextArea({
        value: client._bind_edit(this.NOTES),
        rows: "4",
        placeholder: "Additional notes...",
        width: "100%",
      });

    content.cc("Toolbar", { ns: "m" }).get_parent();
    content
      .Button({
        text: "Submit",
        press: client._event("SUBMIT"),
        type: "Emphasized",
        icon: "sap-icon://save",
      })
      .Button({
        text: "Clear",
        press: client._event("CLEAR"),
        icon: "sap-icon://eraser",
      });

    client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_app_form;
