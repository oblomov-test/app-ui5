const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_096 extends z2ui5_if_app {

  mo_view_parent = null;
  mv_descr = null;
  mr_data = null;
  client = null;

async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      on_init( );

    } else {
on_event( );
    }
}
on_init() {
this.mv_descr = `data sub app`;
    view_display( );

  }
on_event() {
if (this.client.check_on_event( `MESSAGE_SUB` )) {

      this.client.message_box_display( `event sub app` );
    }
}
view_display() {
if ((this.mo_view_parent == null)) {

      const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page( `Main View` );

      this.mo_view_parent = page.grid( `L6 M12 S12`
          ).content( `layout` );

      page.footer( ).overflow_toolbar(
                 ).toolbar_spacer(
                 ).button({ text: `event sub app`, press: this.client._event( `BUTTON_SAVE` ), type: `Success` });

    }
mo_view_parent.input( this.client._bind_edit( this.mv_descr ) );
    mo_view_parent.button({ text: `event sub app`, press: this.client._event( `MESSAGE_SUB` ) });

  }
}

module.exports = z2ui5_cl_demo_app_096;
