const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_352 extends z2ui5_if_app {

  input = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
on_event( this.client );

  }
view_display() {
const view = z2ui5_cl_xml_view.factory( );

    view._generic({ name: `script`, ns: `html` })._cc_plain_xml( `z2ui5.afterBE = (id , mode) ; { ` &&
                       `debugger;` &&
                        `var this.input = z2ui5.oView.byId(id).getDomRef();` &&
                        `input = input.childNodes[0].childNodes[0];` &&
                        `input.setAttribute("inputmode" , mode);` &&
                        ` alert("inputmode changed to" + mode); }` );

    const page = view.shell(
             ).page({ title: `abap2UI5 - Softkeyboard on/off`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) })._z2ui5( ).focus( `ZINPUT`
      ).simple_form({ editable: true }).content( `form`
                     ).title( `Keyboard on/off`
                     ).label( `Input`
                     ).input({ id: `ZINPUT`, value: this.client._bind_edit( this.input ), showvaluehelp: true, valuehelprequest: this.client._event( `CALL_KEYBOARD` ), valuehelpiconsrc: `sap.icon://keyboard.and.mouse` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `CALL_KEYBOARD` )) {

      this.client.follow_up_action( `z2ui5.afterBE("ZINPUT", "none");` );
    }
}
}

module.exports = z2ui5_cl_demo_app_352;
