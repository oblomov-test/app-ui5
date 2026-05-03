const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_155 extends z2ui5_if_app {


  client = null;

on_event() {
switch (this.client.get( ).event) {
      case `POPUP`:
const lo_app = z2ui5_cl_pop_textedit.factory( `this is a text` );
        this.client.nav_app_call( lo_app );
    }
}
view_display() {
const view = z2ui5_cl_xml_view.factory( );
    view.shell(
        ).page({ title: `abap2UI5 - Popup To Text Edit`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) }).button({ text: `Open Popup..;`, press: this.client._event( `POPUP` ) });

    this.client.view_display( view.stringify( ) );

  }
async main(client) {
this.client = this.client;

    if (this.client.get( ).check_on_navigated === true) {

      view_display( );
      on_navigation( );
      return;
}
on_event( );

  }
on_navigation() {
try {
const lo_prev = this.client.get_app( this.client.get( ).s_draft.id_prev_app );
        const lv_text = lo_prev.result( ).text;
        this.client.message_box_display( `the result is ` && lv_text );
      } catch (_e) {
}
}
}

module.exports = z2ui5_cl_demo_app_155;
