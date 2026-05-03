const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_022 extends z2ui5_if_app {

  progress_value = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      this.progress_value = `3`;

      const view = z2ui5_cl_xml_view.factory( );
      view.shell(
          ).page({ title: `abap2UI5 - Progress Indicator Example`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) }).vertical_layout({ class: `sapUiContentPadding`, width: `100%` }).label( `ProgressIndicator`
          ).progress_indicator({ percentvalue: this.client._bind( this.progress_value ), displayvalue: `0,44GB of 32GB used`, showvalue: true, state: `Success` });

      this.client.view_display( view.stringify( ) );

    }
}
}

module.exports = z2ui5_cl_demo_app_022;
