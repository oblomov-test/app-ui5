const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_lp_02 extends z2ui5_if_app {

  mv_title = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      if (this.client.get( ).check_launchpad_active === false) {

        this.client.message_box_display( `No Launchpad Active, Sample not working!` );
      }
const shell = z2ui5_cl_xml_view.factory( ).shell( );

      if (this.client.get( ).check_launchpad_active === true) {

        const page = shell.page({ showheader: false });
        page._z2ui5( ).lp_title( this.client._bind_edit( this.mv_title ) );

      } else {
page = shell.page( this.client._bind_edit( this.mv_title ) );
      }
this.client.view_display( page.simple_form({ title: `Set Launchpad Title Dynamically`, editable: true }).content( `form`
                         ).label( ``
                         ).input( this.client._bind_edit( this.mv_title )
                         ).label( ``
                         ).button({ text: `Go Back`, press: this.client._event_nav_app_leave( ) }).stringify( ) );

    }
switch (this.client.get( ).event) {
      case `READ_PARAMS`:
const lv_text = `Start Parameter: `;
        const lt_params = this.client.get( ).t_comp_params;
        for (const ls_param of lt_params) {
lv_text = `${lv_text} / ${ls_param.n} = ${ls_param.v}`;
        }
this.client.message_box_display( lv_text );
    }
}
}

module.exports = z2ui5_cl_demo_app_lp_02;
