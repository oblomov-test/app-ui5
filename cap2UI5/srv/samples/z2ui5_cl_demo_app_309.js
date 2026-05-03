const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_309 extends z2ui5_if_app {

  mv_url = null;
  client = null;

on_event() {
if (this.client.check_on_event( `CUSTOM_JS_FROM_EB` )) {

      this.client.follow_up_action( `alert("afterBE triggered !!");` );
    }
}
view_display() {
const view = z2ui5_cl_xml_view.factory( );
    view._generic({ name: `script`, ns: `html` })._cc_plain_xml( `sap.z2ui5.afterBE = () ; { alert("afterBE triggered !!"); }` );

    const page = view.shell( ).page({ title: `Client.FOLLOW_UP_ACTION use cases`, class: `sapUiContentPadding`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });
    page = page.vbox( );
    page.get_parent( ).hbox({ class: `sapUiSmallMargin` });
    page.button({ text: `call custom JS from EB`, press: this.client._event( `CUSTOM_JS_FROM_EB` ) });

    this.client.view_display( view.stringify( ) );

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      view_display( );

    }
on_event( );

  }
}

module.exports = z2ui5_cl_demo_app_309;
