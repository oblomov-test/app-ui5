const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_044 extends z2ui5_if_app {


  client = null;

async main(client) {
this.client.view_display( z2ui5_cl_xml_view.factory( ).label( `Hello World!` ).stringify( ) );

  }
}

module.exports = z2ui5_cl_demo_app_044;
