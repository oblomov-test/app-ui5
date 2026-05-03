const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_308 extends z2ui5_if_app {


  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      const view = z2ui5_cl_xml_view.factory( );
      const page = view.shell(
          ).page({ title: `Harvey Chart`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

      page.harvey_ball_micro_chart({ size: `L`, total: `10`, totallabel: `11`, showfractions: true, showtotal: true, totalscale: true }).harveyballmicrochartitem({ color: `Good`, fraction: `8`, fractionscale: `Mrd` });

      this.client.view_display( view.stringify( ) );

    }
}
}

module.exports = z2ui5_cl_demo_app_308;
