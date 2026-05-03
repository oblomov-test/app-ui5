const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_108 extends z2ui5_if_app {


  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
on_event( this.client );

  }
on_event() {
switch (this.client.get( ).event) {
      case `BUTTON_SEND`:
this.client.message_box_display( `success - values send to the server` );
        break;
      case `BUTTON_CLEAR`:
screen = ({});
        this.client.message_toast_display( `View initialized` );
    }
}
view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Side Panel Example`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: true });

    page.header_content(
         ).link(
         ).get_parent( );

    const side_panel = page.side_panel({ sidepanelposition: `Left` }).main_content(
        ).button({ text: `Button 1` }).button({ text: `Button 2` }).vbox(
          ).label( `Switch 1`
          ).switch(
          ).get_parent(
        ).text( `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut` &&
                        `labore et dolore magna aliqua; Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris` &&
                        `nisi ut aliquip ex ea commodo consequat; Duis aute irure dolor in reprehenderit in voluptate velit esse` &&
                        `cillum dolore eu fugiat nulla pariatur; Excepteur sint occaecat cupidatat non proident, sunt in culpa qui` &&
                        `officia deserunt mollit anim id est laborum`
                        ).get_parent(
          ).items( `f`
            ).side_panel_item({ icon: `sap.icon://physical.activity`, text: `Run` }).vbox(
                ).text({ text: `Static Content`, class: `sapUiSmallMarginBottom` }).switch(
                ).button({ text: `Press Me` }).get_parent(
             ).get_parent(
           ).side_panel_item({ icon: `sap.icon://addresses`, text: `Go Home` }).vbox(
              ).text({ text: `Static Content`, class: `sapUiSmallMarginBottom` }).button({ text: `Press Me` }).button({ text: `Hit Me` }).get_parent(
           ).get_parent(
          ).side_panel_item({ icon: `sap.icon://flight`, text: `Fly abroad` });

    this.client.view_display( page.stringify( ) );

  }
}

module.exports = z2ui5_cl_demo_app_108;
