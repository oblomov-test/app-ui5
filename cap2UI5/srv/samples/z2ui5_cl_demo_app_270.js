const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_270 extends z2ui5_if_app {

  name = null;
  color = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      this.client.view_display( z2ui5_cl_xml_view.factory(
        ).shell(
        ).page({ title: `abap2UI5 - Hello World App`, shownavbutton: this.client.check_app_prev_stack( ), navbuttonpress: this.client._event_nav_app_leave( ) }).simple_form({ editable: true }).content({ ns: `form` }).color_picker({ colorstring: this.client._bind_edit( this.color ) }).input( this.client._bind_edit( this.color )
        ).stringify( ) );

    }
}
}

module.exports = z2ui5_cl_demo_app_270;
