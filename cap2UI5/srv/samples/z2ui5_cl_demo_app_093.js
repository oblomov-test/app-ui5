const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_093 extends z2ui5_if_app {

  product = null;
  quantity = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      this.product  = `tomato`;
      this.quantity = `500`;

      const view = z2ui5_cl_xml_view.factory( );

      view._generic({ ns: `html`, name: `script` })._cc_plain_xml( `sap.z2ui5.myFunction();` );

      this.client.view_display( view.shell(
            ).page({ title: `abap2UI5 - First Example`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) }).simple_form({ title: `Form Title`, editable: true }).content( `form`
                        ).title( `Input`
                        ).label( `quantity`
                        ).input( this.client._bind_edit( this.quantity )
                        ).label( `product`
                        ).input({ value: this.product, enabled: false }).button({ text: `post`, press: this.client._event({ val: `BUTTON_POST` }) }).stringify( ) );

    }
switch (this.client.get( ).event) {
      case `BUTTON_POST`:
this.client.message_toast_display( `${this.product} ${this.quantity} - send to the server` );
    }
}
}

module.exports = z2ui5_cl_demo_app_093;
