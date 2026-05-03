const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_271 extends z2ui5_if_app {


  client = null;

view_display() {
let base_url = `https://sapui5.hana.ondemand.com`;
    const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: ImageContent`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: base_url && `/sdk/#/entity/sap.m.ImageContent/sample/sap.m.sample.ImageContent` });

    page.image_content({ class: `sapUiLargeMarginTop sapUiLargeMarginBottom`, src: `sap.icon://area.chart`, description: `Icon`, press: this.client._event( `press` ) }).get_parent(
          ).image_content({ class: `sapUiLargeMarginTop sapUiLargeMarginBottom`, src: base_url && `/test.resources/sap/m/demokit/sample/ImageContent/images/ProfileImage_LargeGenTile.png`, description: `Profile image`, press: this.client._event( `press` ) }).get_parent(
          ).image_content({ class: `sapUiLargeMarginTop sapUiLargeMarginBottom`, src: base_url && `/test.resources/sap/m/demokit/sample/ImageContent/images/SAPLogoLargeTile_28px_height.png`, description: `Logo`, press: this.client._event( `press` ) });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
switch (this.client.get( ).event) {
      case `CLICK_HINT_ICON`:
popover_display( `button_hint_id` );
        break;
      case `press`:
this.client.message_toast_display( `The ImageContent is pressed;` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `Shows ImageContent that can include an icon, a profile image, or a logo with a tooltip;` });

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

module.exports = z2ui5_cl_demo_app_271;
