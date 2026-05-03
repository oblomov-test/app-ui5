const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_323 extends z2ui5_if_app {

  mv_quantity = null;
  client = null;

async main(client) {
if (this.client.check_on_navigated( )) {

      const view = z2ui5_cl_xml_view.factory( );
      this.client.view_display( view.shell(
             ).page({ title: `abap2UI5 - Navigation with app state`, navbuttonpress: this.client._event( `BACK` ), shownavbutton: this.client.check_app_prev_stack( ) }).simple_form({ title: `Form Title`, editable: true }).content( `form`
                         ).title( `Input`
                         ).label( `quantity`
                         ).input( this.client._bind_edit( this.mv_quantity )
                         ).button({ text: `share`, press: this.client._event( `BUTTON_POST` ) }).stringify( ) );
    }
switch (this.client.get( ).event) {
      case `BUTTON_POST`:
this.client.follow_up_action( this.client._event_client( z2ui5_if_client.cs_event.clipboard_app_state ) );
        this.client.message_toast_display( `clipboard copied` );

        break;
      case `BACK`:
this.client.nav_app_leave( );
    }
}
}

module.exports = z2ui5_cl_demo_app_323;
