const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_216 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Action List Item`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.list({ headertext: `Actions` }).action_list_item({ text: `Reject` }).get_parent(
                           ).action_list_item({ text: `Accept` }).get_parent(
                           ).action_list_item({ text: `Email` }).get_parent(
                           ).action_list_item({ text: `Forward` }).get_parent(
                           ).action_list_item({ text: `Delete` });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_216;
