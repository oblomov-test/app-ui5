const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_215 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Busy Indicator`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.busy_indicator({ text: `..; something is happening`, class: `sapUiTinyMarginBottom` });
    layout.hbox({ justifycontent: `Start`, alignitems: `Center` }).busy_indicator({ size: `3em` });
    layout.busy_indicator({ size: `1.6rem`, class: `sapUiMediumMarginBegin` });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_215;
