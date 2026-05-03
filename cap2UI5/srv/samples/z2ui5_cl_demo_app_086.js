const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_086 extends z2ui5_if_app {

  ls_detail_supplier = null;
  client = null;

async main(client) {
const view = z2ui5_cl_xml_view.factory( );
    const page = view.shell(
        ).page({ title: `abap2UI5 - Flow Logic - APP 85`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.grid( `L6 M12 S12` ).content( `layout`
      ).simple_form( `Supplier` ).content( `form`
      ).label( `Value set by previous app`
           ).input({ value: ls_detail_supplier.suppliername, editable: `false` });

    this.client.view_display( view.stringify( ) );

  }
}

module.exports = z2ui5_cl_demo_app_086;
