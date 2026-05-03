const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_121 extends z2ui5_if_app {

  longitude = null;
  latitude = null;
  altitude = null;
  speed = null;
  altitudeaccuracy = null;
  accuracy = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      this.client.view_display( z2ui5_cl_xml_view.factory(
        )._z2ui5( ).timer( this.client._event( )
        ).stringify( ) );

      return;
}
switch (this.client.get( ).event) {
      case `TIMER_FINISHED`:
this.client.message_box_display( `Timer finished!` );
        return;
}
const view = z2ui5_cl_xml_view.factory( );

    this.client.view_display( view.shell(
          ).page({ title: `abap2UI5`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) })._z2ui5( ).timer({ finished: this.client._event( `TIMER_FINISHED` ), delayms: `2000` }).simple_form({ title: `Timer Interval 2000 ms`, editable: true }).content( `form`
           ).stringify( ) );

  }
}

module.exports = z2ui5_cl_demo_app_121;
