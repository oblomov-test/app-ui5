const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_lp_01 extends z2ui5_if_app {


  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      if (this.client.get( ).check_launchpad_active === false) {

        this.client.message_box_display( `No Launchpad Active, Sample not working!` );
      }
const view = z2ui5_cl_xml_view.factory( );
      const page = view.shell( ).page({ showheader: false });
      this.client.view_display( page.simple_form({ title: `Laucnhpad I - Read Startup Parameters`, editable: true }).content( `form`
                         ).label( ``
                         ).button({ text: `Read Parameters`, press: this.client._event( `READ_PARAMS` ) }).label( ``
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

module.exports = z2ui5_cl_demo_app_lp_01;
