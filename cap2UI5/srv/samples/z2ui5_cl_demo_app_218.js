const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_218 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Flex Box - Opposing Alignment`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.panel({ headertext: `Horizontally opposing flex items` }).flex_box({ alignitems: `Start`, justifycontent: `SpaceBetween` }).button({ text: `1`, type: `Accept` }).button({ text: `2`, type: `Reject` });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_218;
