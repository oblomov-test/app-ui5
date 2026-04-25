const z2ui5_if_app = require("../z2ui5_if_app");
const DB = require("../01/01/z2ui5_cl_core_srv_draft");

class z2ui5_cl_app_startup extends z2ui5_if_app {

  CLASSNAME = "";

  // Registry of available apps
  static APP_REGISTRY = [
    { className: "z2ui5_cl_app_hello_world",   title: "Hello World",             description: "Simple input & button with two-way binding" },
    { className: "z2ui5_cl_app_messages",       title: "Messages",                description: "Toast and MessageBox examples" },
    { className: "z2ui5_cl_app_form",           title: "Form Layout",             description: "SimpleForm with various input controls" },
    { className: "z2ui5_cl_app_table",          title: "Table",                   description: "Editable table with add/delete rows" },
    { className: "z2ui5_cl_app_navigation",     title: "Navigation",              description: "App-to-app navigation with nav_app_call" },
    { className: "z2ui5_cl_app_popup",          title: "Popup / Dialog",          description: "Dialog and popup examples" },
    { className: "z2ui5_cl_app_read_people",    title: "External API (REST)",     description: "Fetch data from external REST API" },
    { className: "z2ui5_cl_app_read_odata",     title: "External API (OData)",    description: "Fetch data via Northwind OData service" },
    { className: "z2ui5_cl_app_view_xml",       title: "Static XML View",         description: "Load and display a static XML view file" },
  ];

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "BUTTON_CHECK": {
        const className = this.CLASSNAME?.trim();
        if (!className) {
          client.message_toast_display("Please enter a class name");
          break;
        }
        const AppClass = DB.findAppClass(className);
        if (AppClass) {
          const app = new AppClass();
          client.nav_app_call(app);
        } else {
          client.message_box_display(
            `Class "${className}" not found. Check the name and try again.`,
            "Error",
            "error"
          );
        }
        break;
      }

      case "NAV_TO_APP": {
        const className = client.get().T_EVENT_ARG[0];
        if (className) {
          const AppClass = DB.findAppClass(className);
          if (AppClass) {
            client.nav_app_call(new AppClass());
          }
        }
        break;
      }

      default:
        this.displayView(client);
        break;
    }
  }

  displayView(client) {
    const Z2UI5_CL_XML_VIEW = require("./z2ui5_cl_xml_view");
    const view = new Z2UI5_CL_XML_VIEW();

    const shell = view.Shell();
    const page = shell.Page({
      title: "cap2UI5 - Developing UI5 Apps with CAP Backend",
    });

    // Header
    const headerContent = page.headerContent();
    headerContent.ToolbarSpacer();
    headerContent
      .Button({
        icon: "sap-icon://hint",
        text: "GitHub",
        press: `.eF('OPEN_NEW_TAB', 'https://github.com/niclas-niclas/cap2UI5')`,
      });

    // Quick start form
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
    content.cc("Toolbar", { ns: "m" }).Title({ text: "Quick Start" }).get_parent();

    content
      .Label({ text: "Step 1" })
      .Text({ text: "Create a new JavaScript class in srv/apps/" })
      .Label({ text: "Step 2" })
      .Text({ text: "Implement an async main(client) method" })
      .Label({ text: "Step 3" })
      .Text({ text: "Use client._bind_edit(), client._event(), and the XML view builder" })
      .Label({ text: "Step 4" });

    content.Input({
      placeholder: "Enter the class name and press 'Go'",
      value: client._bind_edit(this.CLASSNAME),
      submit: client._event("BUTTON_CHECK"),
      width: "70%",
    });

    content.Label({});
    content.Button({
      press: client._event("BUTTON_CHECK"),
      text: "Go",
      icon: "sap-icon://initiative",
      type: "Emphasized",
      width: "70%",
    });

    // Sample apps section
    content.cc("Toolbar", { ns: "m" }).Title({ text: "Sample Applications" }).get_parent();

    // Build a list of sample apps
    for (const app of z2ui5_cl_app_startup.APP_REGISTRY) {
      content.Label({ text: app.title });
      content.Button({
        text: `${app.className}`,
        press: client._event("NAV_TO_APP", app.className),
        width: "70%",
        icon: "sap-icon://play",
      });
    }

    // Contribution section
    content.cc("Toolbar", { ns: "m" }).Title({ text: "About" }).get_parent();
    content
      .Label({ text: "Backend" })
      .Text({ text: "SAP CAP (Node.js)" })
      .Label({ text: "Frontend" })
      .Text({ text: "SAP UI5 (synced from abap2UI5)" })
      .Label({ text: "Concept" });
    content.Link({
      href: "https://github.com/abap2UI5/abap2UI5",
      text: "Based on abap2UI5 by Oblomov-dev",
      target: "_blank",
    });

    client.view_display(view.stringify());
  }
}

module.exports = z2ui5_cl_app_startup;
