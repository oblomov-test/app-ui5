const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_112 extends z2ui5_if_app {

  mo_view_parent = null;
  mv_class_2 = null;
  mr_data = null;
  client = null;

view_display() {
mo_view_parent.input({ value: this.client._bind_edit( this.mv_class_2 ), placeholder: `Input From Class 2` });

  }
on_event() {
if (this.client.check_on_event( `MESSAGE_SUB` )) {

      this.client.message_box_display( `event sub app` );
    }
}
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      view_display( );

    } else {
on_event( );
    }
}
}

module.exports = z2ui5_cl_demo_app_112;
