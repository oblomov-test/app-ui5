const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_166 extends z2ui5_if_app {

  ms_struc = null;
  client = null;

set_view() {
const view = z2ui5_cl_xml_view.factory( );
    const page = view.shell(
        ).page({ title: `abap2UI5 - Binding Structure Level`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.input( this.client._bind_edit({ val: ms_struc.title }) );
    page.input( this.client._bind_edit({ val: ms_struc.value }) );
    page.input( this.client._bind_edit({ val: ms_struc.value2 }) );

    page.input( this.client._bind_edit({ val: ms_struc2.title }) );
    page.input( this.client._bind_edit({ val: ms_struc2.value }) );
    page.input( this.client._bind_edit({ val: ms_struc2.value2 }) );

    page.input( this.client._bind_edit({ val: ms_struc2.incl_title }) );
    page.input( this.client._bind_edit({ val: ms_struc2.incl_value }) );
    page.input( this.client._bind_edit({ val: ms_struc2.incl_value2 }) );

    this.client.view_display( view.stringify( ) );

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      ms_struc.title  = `title`;
      ms_struc.value  = `val01`;
      ms_struc.value2 = `val02`;

      ms_struc2.title  = `title`;
      ms_struc2.value  = `val01`;
      ms_struc2.value2 = `val02`;
      ms_struc2.incl_title = `title_incl`;
      ms_struc2.incl_value = `val01_incl`;
      ms_struc2.incl_value2 = `val02_incl`;

      set_view( );
    }
this.client.view_model_update( );

  }
}

module.exports = z2ui5_cl_demo_app_166;
