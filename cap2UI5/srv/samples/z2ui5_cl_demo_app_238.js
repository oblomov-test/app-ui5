const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_238 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Message Strip`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `hint_icon`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `POPOVER` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.MessageStrip/sample/sap.m.sample.MessageStrip` });

    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });

    layout.message_strip({ text: `Default (Information) with default icon and close button:`, showicon: true, showclosebutton: true, class: `sapUiMediumMarginBottom` });

    layout.message_strip({ text: `Error with default icon and close button:`, type: `Error`, showicon: true, showclosebutton: true, class: `sapUiMediumMarginBottom` });

    layout.message_strip({ text: `Warning with default icon and close button:`, type: `Warning`, showicon: true, showclosebutton: true, class: `sapUiMediumMarginBottom` });

    layout.message_strip({ text: `Success with default icon and close button:`, type: `Success`, showicon: true, showclosebutton: true, class: `sapUiMediumMarginBottom` });

    layout.message_strip({ text: `Information with default icon;`, type: `Information`, showicon: true, class: `sapUiMediumMarginBottom` });

    layout.message_strip({ text: `Information with custom icon`, type: `Information`, showicon: true, customicon: `sap.icon://locked`, class: `sapUiMediumMarginBottom` });

    layout.message_strip({ text: `Error with link`, type: `Error`, showclosebutton: true, class: `sapUiMediumMarginBottom` }).get(
                       ).link({ text: `Open SAP Homepage`, target: `_blank`, href: `http://www.sap.com` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `POPOVER` )) {

      popover_display( `hint_icon` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `MessageStrip for showing status messages;` });

    this.client.popover_display({ xml: view.stringify( ), by_id: id });

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      view_display( this.client );
    }
on_event( this.client );

  }
}

module.exports = z2ui5_cl_demo_app_238;
