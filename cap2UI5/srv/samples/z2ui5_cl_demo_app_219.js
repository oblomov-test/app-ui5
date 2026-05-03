const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_219 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Input List Item`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.list({ headertext: `Input` }).input_list_item( `WLAN`
                               ).switch({ state: `true` }).get_parent(
                           ).input_list_item( `Flight Mode`
                               ).checkbox( `true` ).get_parent(
                           ).input_list_item( `High Performance`
                               ).radio_button({ groupname: `GroupInputListItem`, selected: true }).get_parent( ).get_parent(
                           ).input_list_item( `Battery Saving`
                               ).radio_button({ groupname: `GroupInputListItem` }).get_parent( ).get_parent(
                           ).input_list_item( `Price (EUR)`
                               ).input({ placeholder: `Price`, value: `799`, type: `Number` }).get_parent(
                           ).input_list_item( `Address`
                               ).input({ placeholder: `Address`, value: `Main Rd, Manchester` }).get_parent(
                           ).input_list_item( `Country`
                               ).select(
                                   ).item({ key: `GR`, text: `Greece` }).item({ key: `MX`, text: `Mexico` }).item({ key: `NO`, text: `Norway` }).item({ key: `NX`, text: `New Zealand` }).item({ key: `NL`, text: `Netherlands` }).get_parent( ).get_parent(
                           ).input_list_item( `Volume`
                               ).slider({ min: `0`, max: `10`, value: `7`, width: `200px` });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_219;
