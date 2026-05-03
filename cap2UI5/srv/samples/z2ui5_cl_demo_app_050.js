const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_050 extends z2ui5_if_app {

  product = null;
  quantity = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      this.product  = `tomato`;
      this.quantity = `500`;
    }
switch (this.client.get( ).event) {
      case `BUTTON_POST`:
this.client.message_toast_display( `${this.product} ${this.quantity} - send to the server` );
    }
this.client.view_display( z2ui5_cl_xml_view.factory(
        ).shell(
        ).page({ title: `abap2UI5 - Changed CSS`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) })._generic({ ns: `html`, name: `style` })._cc_plain_xml(
                    `.sapMInput {` && `\n` &&
                         `    height: 80px !important;` && `\n` &&
                         `    font.size: 2.5rem !important;` && `\n` &&
                         `}` && `\n` &&
                         `\n` &&
                         `input {` && `\n` &&
                         `    height: 80% !important;` && `\n` &&
                         `    font.size: 2.5rem !important;` && `\n` &&
                         `}` && `\n` &&
                         `\n` &&
                         `input[role="textbox"] {` && `\n` &&
                         `    height: 80px !important;` && `\n` &&
                         `    font.size: 2.5rem !important;` && `\n` &&
                         `}` && `\n` &&
                         `\n` &&
                         `input[role="text"] {` && `\n` &&
                         `    height: 80px !important;` && `\n` &&
                         `    font.size: 2.5rem !important;` && `\n` &&
                         `}` && `\n` &&
                         `\n` &&
                         `.sapUiSearchField {` && `\n` &&
                         `    height: 35px;` && `\n` &&
                         `    font.size: 2.5rem !important;` && `\n` &&
                         `}` && `\n` &&
                         `\n` &&
                         `.sapUiTfCombo:hover {` && `\n` &&
                         `    height: 2rem;` && `\n` &&
                         `    font.size: 2.5rem !important;` && `\n` &&
                         `}` && `\n` &&
                         `\n` &&
                         `.sapMInputBaseInner::placeholder {` && `\n` &&
                         `    font.size: 1.4rem !important;` && `\n` &&
                         `}`
            ).get_parent(
            ).button({ text: `post`, press: this.client._event( `BUTTON_POST` ), class: `mySuperRedButton` }).input({ value: this.client._bind( this.quantity ) }).simple_form({ title: `Form Title`, editable: true }).content( `form`
                    ).title( `Input`
                    ).label( `quantity`
                    ).input({ value: this.client._bind( this.quantity ) }).label( `product`
                    ).input({ value: this.product, enabled: false }).button({ text: `post`, press: this.client._event( `BUTTON_POST` ) }).stringify( ) );

  }
}

module.exports = z2ui5_cl_demo_app_050;
