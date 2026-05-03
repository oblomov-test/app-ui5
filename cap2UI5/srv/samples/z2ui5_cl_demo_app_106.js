const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_106 extends z2ui5_if_app {

  mv_value = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      const view = z2ui5_cl_xml_view.factory( );

      const lo_p = view.shell(
                  ).page({ title: `abap2UI5 - Rich Text Editor`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

      lo_p.rich_text_editor({ width: `100%`, height: `400px`, value: this.client._bind_edit( this.mv_value ), customtoolbar: true, showgroupfont: true, showgrouplink: true, showgroupinsert: true, wrapping: false });

      lo_p.footer(
            ).overflow_toolbar(
                ).button({ text: `Send To Server`, type: `Emphasized`, icon: `sap.icon://paper.plane`, press: this.client._event( `SERVER` ) });

      this.client.view_display( view.stringify( ) );

    }
switch (this.client.get( ).event) {
      case `SERVER`:
this.client.message_box_display( this.mv_value );
    }
}
}

module.exports = z2ui5_cl_demo_app_106;
