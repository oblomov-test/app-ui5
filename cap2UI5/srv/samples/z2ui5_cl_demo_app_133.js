const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_133 extends z2ui5_if_app {

  field_01 = null;
  field_02 = null;
  focus_id = null;
  selstart = null;
  selend = null;
  update_focus = null;
  client = null;

view_display() {
const view = z2ui5_cl_xml_view.factory( );
    this.client.view_display( view.shell(
      ).page({ title: `abap2UI5 - Focus`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) })._z2ui5( ).focus({ focusid: this.client._bind_edit( this.focus_id ), selectionstart: this.client._bind_edit( this.selstart ), selectionend: this.client._bind_edit( this.selend ), setupdate: this.client._bind_edit( this.update_focus ) }).simple_form({ title: `Focus & Cursor`, editable: true }).content( `form`
                      ).title( `Input`
                      ).label( `Sel_Start`
                      ).input({ value: this.client._bind_edit( this.selstart ) }).label( `Sel_End`
                      ).input({ value: this.client._bind_edit( this.selend ) }).label( `field_01`
                      ).input({ value: this.client._bind_edit( this.field_01 ), id: `BUTTON01` }).button({ text: `focus here`, press: this.client._event( `BUTTON01` ) }).label( `field_02`
                      ).input({ value: this.client._bind_edit( this.field_02 ), id: `BUTTON02` }).button({ text: `focus here`, press: this.client._event( `BUTTON02` ) }).stringify( ) );

  }
init() {
this.field_01 = `this is a text`;
    this.field_02 = `this is another text`;
    this.selstart = `3`;
    this.selend = `7`;
    view_display( this.client );

  }
async main(client) {
if (this.client.check_on_init( )) {

      init( this.client );
      return;
}
switch (this.client.get( ).event) {
      case `BUTTON01`: case `BUTTON02`:
this.update_focus = true;
        this.focus_id = this.client.get( ).event;
        this.client.view_model_update( );
        this.client.message_toast_display( `focus changed` );
    }
}
}

module.exports = z2ui5_cl_demo_app_133;
