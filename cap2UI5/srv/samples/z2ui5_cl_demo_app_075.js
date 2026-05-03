const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_075 extends z2ui5_if_app {

  mv_path = null;
  mv_value = null;
  mr_table = null;
  mv_check_edit = null;
  mv_check_download = null;
  mv_file = null;
  client = null;

on_event() {
try {
switch (this.client.get( ).event) {
          case `START`: case `CHANGE`:
view_display( );

        break;
          case `UPLOAD`:
const [lv_dummy, lv_data] = mv_value.split(`;`);
            [lv_dummy, lv_data] = lv_data.split(`,`);

            const lv_data2 = z2ui5_cl_util.conv_decode_x_base64( lv_data );
            this.mv_file = z2ui5_cl_util.conv_get_string_by_xstring( lv_data2 );

            this.client.message_box_display( `CSV loaded to table` );

            view_display( );

            this.mv_value = ({});
            this.mv_path = ({});
        }
} catch (x) {
this.client.message_box_display({ text: x.get_text( ), type: `error` });
    }
}
view_display() {
const view = z2ui5_cl_xml_view.factory( );
    const page = view.shell( ).page({ title: `abap2UI5 - Upload Files`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    if (!!(this.mv_file)) {

      page.code_editor({ value: this.client._bind( this.mv_file ), editable: false });

    }
const footer = page.footer( ).overflow_toolbar( );

    footer._z2ui5( ).file_uploader({ value: this.client._bind_edit( this.mv_value ), path: this.client._bind_edit( this.mv_path ), placeholder: `filepath here..;`, upload: this.client._event( `UPLOAD` ) });

    this.client.view_display( view.stringify( ) );

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      view_display( );
      return;
}
if (this.client.get( ).check_on_navigated === true) {

      view_display( );
    }
on_event( );

  }
}

module.exports = z2ui5_cl_demo_app_075;
