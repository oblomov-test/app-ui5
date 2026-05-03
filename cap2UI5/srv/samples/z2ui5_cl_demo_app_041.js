const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_041 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Step Input Example`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.label( `StepInput`
        ).step_input({ value: this.client._bind_edit( screen.step_val_01 ), step: `2`, min: `0`, max: `20` }).step_input({ value: this.client._bind_edit( screen.step_val_02 ), step: `10`, min: `0`, max: `100` }).button({ text: `OK`, press: this.client._event( `POST` ) });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `POST` )) {

      this.client.message_box_display( `success - values send to the server` );
    }
}
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
on_event( this.client );

  }
}

module.exports = z2ui5_cl_demo_app_041;
