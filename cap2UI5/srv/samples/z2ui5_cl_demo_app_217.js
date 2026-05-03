const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_217 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Placing a Title in OverflowToolbar/Toolbar`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.overflow_toolbar({ design: `Transparent`, height: `3rem` }).title( `Title Only` );
    page.overflow_toolbar({ design: `Transparent`, height: `3rem` }).title( `Title and Actions`
                          ).toolbar_spacer(
                          ).button({ icon: `sap.icon://group-2` }).button({ icon: `sap.icon://action.settings` });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_217;
