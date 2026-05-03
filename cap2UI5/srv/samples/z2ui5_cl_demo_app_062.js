const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_062 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Generic Tag Example`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });
    layout.generic_tag({ arialabelledby: `genericTagLabel`, text: `Project Cost`, design: `StatusIconHidden`, status: `Error`, class: `sapUiSmallMarginBottom` }).object_number({ state: `Error`, emphasized: `false`, number: `3.5M`, unit: `EUR` });

    layout.generic_tag({ arialabelledby: `genericTagLabel`, text: `Project Cost`, design: `StatusIconHidden`, status: `Success`, class: `sapUiSmallMarginBottom` }).object_number({ state: `Success`, emphasized: `false`, number: `3.5M`, unit: `EUR` });

    layout.generic_tag({ arialabelledby: `genericTagLabel`, text: `Input`, design: `StatusIconHidden`, class: `sapUiSmallMarginBottom` }).object_number({ emphasized: `true`, number: `3.5M`, unit: `EUR` });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_062;
