const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_171 extends z2ui5_if_app {


  client = null;

async main(client) {
try {
if (this.client.check_on_init( )) {

        } else if (this.client.check_on_navigated( )) {

          const lo_app_prev = this.client.get_app_prev( );


        } else if (this.client.check_on_event( )) {

          switch (this.client.get( ).event) {
            case `OK`:
const lt_arg = this.client.get_event_arg( );


        break;
            case `CANCEL`:
}
}
} catch (lx) {
this.client.message_box_display( lx );
    }
}
}

module.exports = z2ui5_cl_demo_app_171;
