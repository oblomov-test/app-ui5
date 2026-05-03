const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_336 extends z2ui5_if_app {

  ms_struc = null;
  mo_layout_obj = null;
  mo_layout_obj_2 = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      this.mo_layout_obj = z2ui5_cl_demo_app_333.factory({ i_data: ({ value: this.ms_struc }), vis_cols: 3 });
      this.mo_layout_obj_2 = z2ui5_cl_demo_app_333.factory({ i_data: ({ value: this.ms_struc }), vis_cols: 3 });

      view_display( this.client );

    }
this.client.view_model_update( );

  }
view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell( ).page({ title: `RTTI IV`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.button({ text: `BACK`, press: this.client._event_nav_app_leave( ), type: `Success` });

    this.client.view_display( page.stringify( ) );

  }
factory() {
result = {};

  }
}

module.exports = z2ui5_cl_demo_app_336;
