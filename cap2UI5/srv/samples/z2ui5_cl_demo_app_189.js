const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_189 extends z2ui5_if_app {

  one = null;
  two = null;
  three = null;
  focus_field = null;
  client = null;

dispatch() {
switch (this.client.get( ).event) {
      case `one_enter`:
this.focus_field = `IdTwo`;
        break;
      case `two_enter`:
this.focus_field = `IdThree`;
    }
this.client.view_model_update( );

  }
render() {
const page = z2ui5_cl_xml_view.factory( ).shell(
          ).page({ title: `abap2UI5 - Focus II`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.simple_form(
       ).content( `form`
       ).label( `One (Press Enter)` ).input({ id: `IdOne`, value: this.client._bind_edit( this.one ), submit: this.client._event( `one_enter` ) }).label( `Two` ).input({ id: `IdTwo`, value: this.client._bind_edit( this.two ), submit: this.client._event( `two_enter` ) }).label( `Three` ).input({ id: `IdThree`, value: this.client._bind_edit( this.three ) });

    page._z2ui5( ).focus( this.client._bind( this.focus_field ) );

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      this.focus_field = `IdOne`;
      render( );
    }
dispatch( );

  }
}

module.exports = z2ui5_cl_demo_app_189;
