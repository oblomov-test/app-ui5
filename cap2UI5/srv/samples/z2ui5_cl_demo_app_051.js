const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_051 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Label Example`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.label({ text: `Input mandatory`, labelfor: `input1` });
    layout.input({ id: `input1`, required: true });

    layout.label({ text: `Input bold`, labelfor: `input2`, design: `Bold` });
    layout.input({ id: `input2`, value: this.client._bind_edit( screen.input2 ) });

    layout.label({ text: `Input normal`, labelfor: `input3` });
    layout.input({ id: `input3`, value: this.client._bind_edit( screen.input3 ) });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_051;
