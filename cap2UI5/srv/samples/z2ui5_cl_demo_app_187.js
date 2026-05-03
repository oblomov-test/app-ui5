const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_187 extends z2ui5_if_app {


  client = null;

async main(client) {
let ls_msg;
    if (this.client.check_on_init( )) {

      this.client.view_display( z2ui5_cl_xml_view.factory( ).shell(
        ).page({ title: `abap2UI5 - Popup To Confirm`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) }).button({ text: `SY`, press: this.client._event( `SY` ) }).button({ text: `BAPIRET`, press: this.client._event( `BAPIRET` ) }).button({ text: `CX_ROOT`, press: this.client._event( `CX_ROOT` ) }).stringify( ) );

      return;
}
switch (this.client.get( ).event) {
      case `SY`:
const ls_msg2 = z2ui5_cl_util.msg_get_by_msg({ id: `NET`, no: `001` });
        this.client.message_box_display( ls_msg2 );

        break;
      case `BAPIRET`:
ls_msg = ({id: `NET`, number: `001`});
        this.client.message_box_display( ls_msg );

        break;
      case `CX_ROOT`:
try {
const lv_val = 1 / 0;
          } catch (lx) {
this.client.message_box_display( lx );
        }
}
}
}

module.exports = z2ui5_cl_demo_app_187;
