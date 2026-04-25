const z2ui5_if_app = require("../z2ui5/z2ui5_if_app");
class z2ui5_cl_app_read_odata extends z2ui5_if_app {

  aCustomers = [];

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "REFRESH":
        await this.fetchData();
        client.message_toast_display(`Loaded ${this.aCustomers.length} customers`);
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
      const northwindAPI = await cds.connect.to("northwind");
      this.aCustomers = await northwindAPI.run(SELECT.from("Customers"));
    } catch (error) {
      console.error("Error fetching customers:", error.message);
      this.aCustomers = [];
    }
  }

  displayView(client) {
    const Z2UI5_CL_XML_VIEW = require("../z2ui5/02/z2ui5_cl_xml_view");
    const view = new Z2UI5_CL_XML_VIEW();

    const page = view
      .Shell()
      .Page({
        title: "cap2UI5 - Northwind OData Service",
        showNavButton: true,
        navButtonPress: client._event("BACK"),
      });

    page.Button({
      press: client._event("REFRESH"),
      text: "Refresh",
      icon: "sap-icon://refresh",
    });

    const table = page.Table({
      items: client._bind_edit(this.aCustomers),
      headerText: "Customers (Northwind OData V2)",
      alternateRowColors: true,
    });

    const cols = table.columns();
    cols.Column().Text({ text: "CompanyName" });
    cols.Column().Text({ text: "ContactName" });

    table
      .items()
      .ColumnListItem()
      .cells()
      .Input({ value: "{CompanyName}", enabled: true })
      .Input({ value: "{ContactName}", enabled: true });

    client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_app_read_odata;
