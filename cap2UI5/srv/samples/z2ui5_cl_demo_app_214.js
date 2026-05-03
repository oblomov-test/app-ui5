const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_214 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Standalone Icon Tab Header`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.icon_tab_header({ mode: `Inline` }).items(
                              ).icon_tab_filter({ key: `info`, text: `Info` }).get_parent(
                              ).icon_tab_filter({ key: `attachments`, text: `Attachments`, count: `3` }).get_parent(
                              ).icon_tab_filter({ key: `notes`, text: `Notes`, count: `12` }).get_parent(
                              ).icon_tab_filter({ key: `people`, text: `People` });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_214;
