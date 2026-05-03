const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_138 extends z2ui5_if_app {

  quantity = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      ms_data.ms_data2.ms_data2.ms_data2.ms_data2.ms_data2.ms_data2.val  = `tomato`;
      this.quantity = `500`;

      const view = z2ui5_cl_xml_view.factory( );
      this.client.view_display( view.shell(
            ).page({ title: `abap2UI5 - First Example`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) }).simple_form({ title: `Form Title`, editable: true }).content( `form`
                        ).title( `Input`
                        ).label( `quantity`
                        ).input( this.client._bind_edit( this.quantity )
                        ).label( `product`
                        ).input( this.client._bind_edit( ms_data.ms_data2.ms_data2.ms_data2.ms_data2.ms_data2.ms_data2.val )
                        ).button({ text: `post`, press: this.client._event( `BUTTON_POST` ) }).stringify( ) );

    }
switch (this.client.get( ).event) {
      case `BUTTON_POST`:
this.client.message_toast_display( `${this.quantity} - send to the server` );
    }
}
}

module.exports = z2ui5_cl_demo_app_138;
