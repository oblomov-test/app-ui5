const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_150 extends z2ui5_if_app {


  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      const view = z2ui5_cl_xml_view.factory( );
      view.shell(
          ).page({ title: `abap2UI5 - Popup To Confirm`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) }).button({ text: `Open Popup..;`, press: this.client._event( `POPUP` ) });
      this.client.view_display( view.stringify( ) );

    } else if (this.client.check_on_event( `POPUP` )) {

      const lo_app = z2ui5_cl_pop_to_confirm.factory({ i_question_text: `this is a question`, i_event_confirm: `POPUP_TRUE`, i_event_cancel: `POPUP_FALSE` });
      this.client.nav_app_call( lo_app );

    } else if (this.client.check_on_event( `POPUP_TRUE` )) {

      this.client.message_box_display( `the result is SUCCESS` );

    } else if (this.client.check_on_event( `POPUP_FALSE` )) {

      this.client.message_box_display( `the result is CANCEL` );

    }
}
}

module.exports = z2ui5_cl_demo_app_150;
