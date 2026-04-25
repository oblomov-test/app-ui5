const z2ui5_if_app = require("../z2ui5/z2ui5_if_app");
class z2ui5_cl_app_read_people extends z2ui5_if_app {

  NAME = "";
  aPeople = [];

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "BUTTON_POST":
        client.message_toast_display(`Hello ${this.NAME}!`);
        this.displayView(client);
        break;

      case "REFRESH":
        await this.fetchData();
        client.message_toast_display(`Loaded ${this.aPeople.length} entries`);
        this.displayView(client);
        break;

      case "BACK":
        client.nav_app_home();
        break;

      default:
        await this.fetchData();
        this.displayView(client);
        break;
    }
  }

  async fetchData() {
    try {
      const axios = require("axios");
      const response = await axios.get(
        "https://services.odata.org/TripPinRESTierService/People"
      );
      this.aPeople = response.data.value || [];
    } catch (error) {
      console.error("Error fetching people:", error.message);
      this.aPeople = [];
    }
  }

  displayView(client) {
    const Z2UI5_CL_XML_VIEW = require("../z2ui5/02/z2ui5_cl_xml_view");
    const view = new Z2UI5_CL_XML_VIEW();

    const page = view
      .Shell()
      .Page({
        title: "cap2UI5 - External REST API",
        showNavButton: true,
        navButtonPress: client._event("BACK"),
      });

    page
      .Input({
        value: client._bind_edit(this.NAME),
        placeholder: "Your name...",
        enabled: true,
      })
      .Button({
        press: client._event("BUTTON_POST"),
        text: "Post",
        icon: "sap-icon://paper-plane",
      })
      .Button({
        press: client._event("REFRESH"),
        text: "Refresh Data",
        icon: "sap-icon://refresh",
      });

    const table = page.Table({
      items: client._bind_edit(this.aPeople),
      headerText: "People (from TripPin OData Service)",
      alternateRowColors: true,
    });

    const cols = table.columns();
    cols.Column().Text({ text: "UserName" });
    cols.Column().Text({ text: "FirstName" });

    table
      .items()
      .ColumnListItem()
      .cells()
      .Input({ value: "{UserName}", enabled: true })
      .Input({ value: "{FirstName}", enabled: true });

    client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_app_read_people;
