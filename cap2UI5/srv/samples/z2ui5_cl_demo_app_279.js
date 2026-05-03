const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_279 extends z2ui5_if_app {

  text_input = null;
  dirty = null;
  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory(
                   ).shell(
                   ).page({ title: `abap2UI5 - data loss protection`, navbuttonpress: this.client._event( `BACK` ), shownavbutton: this.client.check_app_prev_stack( ) });

    const box = page.flex_box({ direction: `Row`, alignitems: `Start`, class: `sapUiTinyMargin` });

    box.input({ id: `input`, value: this.client._bind_edit( this.text_input ), submit: this.client._event( `submit` ), width: `40rem`, placeholder: `Enter data, submit and navigate back to trigger data loss protection` });

    box.info_label({ text: `dirty`, colorscheme: `8`, icon: `sap.icon://message.success`, class: `sapUiSmallMarginBegin sapUiTinyMarginTop`, visible: this.client._bind( this.dirty ) });

    box.button({ text: `Reset`, press: this.client._event( `reset` ), class: `sapUiSmallMarginBegin`, visible: this.client._bind( this.dirty ) });

    page._z2ui5( ).focus( `input` );

    page._z2ui5( ).dirty( this.client._bind( this.dirty ) );

    this.client.view_display( page.stringify( ) );

  }
on_event() {
switch (this.client.get( ).event) {
      case `BACK`:
if (this.dirty === true) {

          security_check_popup( );

        } else {
this.client.nav_app_leave( );
        }
case `submit`:
this.dirty = xsdbool( !!(this.text_input) );
      case `reset`:
CLEAR:
          this.dirty,
          text_input;
    }
}
security_check_popup() {
this.client.nav_app_call( z2ui5_cl_pop_to_confirm.factory({ i_question_text: `Your entries will be lost when you leave this page;`, i_title: `Warning`, i_icon: `sap.icon://status.critical`, i_button_text_confirm: `Leave Page`, i_button_text_cancel: `Cancel` }) );

  }
async main(client) {
this.client = this.client;

    if (this.client.get( ).check_on_navigated === true) {

      on_navigation( );
    }
on_event( );

    if (this.client.check_on_init( )) {

      view_display( );

    } else {
this.client.view_model_update( );
    }
}
on_navigation() {
try {
const prev = this.client.get_app( this.client.get( ).s_draft.id_prev_app );
        const confirm_leave = prev.result( );

      } catch (_e) {
}
if (confirm_leave === true) {

      this.dirty = ({});
      this.client.nav_app_leave( );
    }
}
}

module.exports = z2ui5_cl_demo_app_279;
