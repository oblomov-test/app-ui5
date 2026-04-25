const z2ui5_if_app = require("../z2ui5/z2ui5_if_app");
class z2ui5_cl_app_table extends z2ui5_if_app {

  ITEMS = [
    { NAME: "Alice", ROLE: "Developer", STATUS: "Active" },
    { NAME: "Bob", ROLE: "Designer", STATUS: "Active" },
    { NAME: "Charlie", ROLE: "Manager", STATUS: "Inactive" },
  ];

  NEW_NAME = "";
  NEW_ROLE = "";

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "ADD_ROW":
        if (this.NEW_NAME && this.NEW_ROLE) {
          this.ITEMS.push({
            NAME: this.NEW_NAME,
            ROLE: this.NEW_ROLE,
            STATUS: "Active",
          });
          this.NEW_NAME = "";
          this.NEW_ROLE = "";
          client.message_toast_display("Row added");
        } else {
          client.message_toast_display("Please fill in Name and Role");
        }
        this.displayView(client);
        break;

      case "DELETE_ROW": {
        const idx = parseInt(client.get().T_EVENT_ARG[0], 10);
        if (!isNaN(idx) && idx >= 0 && idx < this.ITEMS.length) {
          const removed = this.ITEMS.splice(idx, 1);
          client.message_toast_display(`Removed: ${removed[0].NAME}`);
        }
        this.displayView(client);
        break;
      }

      case "SAVE":
        client.message_toast_display(
          `Saved ${this.ITEMS.length} entries to backend`
        );
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
        title: "cap2UI5 - Editable Table",
        showNavButton: true,
        navButtonPress: client._event("BACK"),
      });

    // Add row form
    const hbox = page.HBox({ class: "sapUiSmallMargin", alignItems: "End" });
    hbox
      .Input({
        value: client._bind_edit(this.NEW_NAME),
        placeholder: "Name",
        width: "200px",
      })
      .Input({
        value: client._bind_edit(this.NEW_ROLE),
        placeholder: "Role",
        width: "200px",
      })
      .Button({
        text: "Add Row",
        press: client._event("ADD_ROW"),
        icon: "sap-icon://add",
        type: "Emphasized",
      })
      .Button({
        text: "Save All",
        press: client._event("SAVE"),
        icon: "sap-icon://save",
      });

    // Table
    const table = page.Table({
      items: client._bind_edit(this.ITEMS),
      alternateRowColors: true,
    });

    const cols = table.columns();
    cols.Column().Text({ text: "Name" });
    cols.Column().Text({ text: "Role" });
    cols.Column().Text({ text: "Status" });
    cols.Column({ width: "80px" }).Text({ text: "Action" });

    const cells = table.items().ColumnListItem().cells();
    cells
      .Input({ value: "{NAME}", enabled: true })
      .Input({ value: "{ROLE}", enabled: true })
      .Text({ text: "{STATUS}" });

    // Delete button per row - using generic approach
    cells.Button({
      icon: "sap-icon://delete",
      type: "Reject",
      press: client._event("DELETE_ROW", "${$source>/bindingContext/sPath}"),
    });

    client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_app_table;
