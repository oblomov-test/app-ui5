const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_232 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `Sample: MultiInput - Suggestions wrapping`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.label({ text: `Product`, labelfor: `wrappingMultiInput` });
    layout.multi_input({ id: `wrappingMultiInput`, placeholder: `Enter product`, showsuggestion: true, width: `50%` }).suggestion_items(
                 ).item({ key: `1`, text: `Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, ` &&
                                           `sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ` &&
                                           `ut labore et dolore magna aliquyam erat, sed justo et ea rebum;` }).item({ key: `2`, text: `7" Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor ` &&
                                           `invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                                           `At vero eos et accusam et justo duo dolores et ea rebum; Stet clita kasd gubergen, no sea takimata; ` &&
                                           `Tortor pretium viverra suspendisse potenti nullam;` }).item({ key: `3`, text: `Portable DVD Player with 9" LCD Monitor` });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_232;
