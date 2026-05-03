const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_291 extends z2ui5_if_app {

  lv_default = null;
  lv_error = null;
  lv_warning = null;
  lv_success = null;
  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Message Strip with enableFormattedText`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.MessageStrip/sample/sap.m.sample.MessageStripWithEnableFormattedText` });

    page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` }).content( `layout`
      ).message_strip({ text: this.client._bind( this.lv_default ), enableformattedtext: true, showicon: true, showclosebutton: true, class: `sapUiMediumMarginBottom` }).message_strip({ text: this.client._bind( this.lv_error ), type: `Error`, enableformattedtext: true, showicon: true, showclosebutton: true, class: `sapUiMediumMarginBottom` }).message_strip({ text: this.client._bind( this.lv_warning ), type: `Warning`, enableformattedtext: true, showicon: true, showclosebutton: true, class: `sapUiMediumMarginBottom` }).message_strip({ text: this.client._bind( this.lv_success ), type: `Success`, enableformattedtext: true, showicon: true, showclosebutton: true, class: `sapUiMediumMarginBottom` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `CLICK_HINT_ICON` )) {

      popover_display( `button_hint_id` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `A sample MessageStrip that shows status messages with additional formatting;` });

    this.client.popover_display({ xml: view.stringify( ), by_id: id });

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      view_display( this.client );

      this.lv_default = `Default <em>(Information)</em> with default icon and <strong>close button</strong>:`;
      this.lv_error   = `<strong>Error</strong> with link to ` && `<a target="_blank" href="http://www.sap.com">SAP Homepage</a> <em>(For more info)</em>`;
      this.lv_warning = `<strong>Warning</strong> with default icon and close button:`;
      this.lv_success = `<strong>Success</strong> with default icon and close button:`;

    }
on_event( this.client );

  }
}

module.exports = z2ui5_cl_demo_app_291;
