const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_293 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Link`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Link/sample/sap.m.sample.Link` });

    page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` }).content( `layout`
                ).link({ text: `Open message box`, press: this.client._event( `handleLinkPress` ) }).link({ text: `Disabled link`, enabled: false }).link({ text: `Open SAP Homepage`, target: `_blank`, href: `http://www.sap.com` }).get_parent( );

    page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` }).content( `layout`
               ).label({ text: `Links with Icons`, design: `Bold`, wrapping: true, class: `sapUiSmallMarginTop` }).link({ text: `Show more information`, endicon: `sap.icon://inspect`, press: this.client._event( `handleLinkPress` ) }).link({ text: `Disabled link with icon`, icon: `sap.icon://cart`, enabled: false }).link({ text: `Open SAP Homepage`, icon: `sap.icon://globe`, href: `http://www.sap.com` }).get_parent( );

    this.client.view_display( page.stringify( ) );

  }
on_event() {
switch (this.client.get( ).event) {
      case `CLICK_HINT_ICON`:
popover_display( `button_hint_id` );
        break;
      case `handleLinkPress`:
this.client.message_box_display( `Link was clicked!` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `Here are some links; Typically links are used in user interfaces to trigger navigation to related content inside or outside of the current application;` });

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

module.exports = z2ui5_cl_demo_app_293;
