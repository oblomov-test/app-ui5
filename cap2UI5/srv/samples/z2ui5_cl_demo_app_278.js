const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_278 extends z2ui5_if_app {


  client = null;

view_display() {
const css = `.tileLayout {`    &&
                `    float: left;` &&
                `}`;
let base_url = `https://sapui5.hana.ondemand.com/`;
    const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Feed and News Tile`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: base_url && `sdk/#/entity/sap.m.GenericTile/sample/sap.m.sample.GenericTileAsFeedTile` });

    page.generic_tile({ class: `sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout`, header: `Feed Tile that shows updates of the last feeds given to a specific topic:`, frametype: `TwoByOne`, press: this.client._event( `press` ) }).tile_content({ footer: `New Notifications` }).feed_content({ contenttext: `@@notify Great outcome of the Presentation today; New functionality well received;`, subheader: `About 1 minute ago in Computer Market`, value: `352` }).get_parent( ).get_parent( ).get_parent(
      ).slide_tile({ class: `sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout` }).tiles(
           ).generic_tile({ backgroundimage: base_url && `test.resources/sap/m/demokit/sample/GenericTileAsFeedTile/images/NewsImage1.png`, frametype: `TwoByOne`, press: this.client._event( `press` ) }).tile_content({ footer: `August 21, 2016` }).news_content({ contenttext: `Wind Map: Monitoring Real.Time and Fore.casted Wind Conditions across the Globe`, subheader: `Today, SAP News` }).get_parent( ).get_parent( ).get_parent(
           ).generic_tile({ backgroundimage: base_url && `test.resources/sap/m/demokit/sample/GenericTileAsFeedTile/images/NewsImage2.png`, frametype: `TwoByOne`, press: this.client._event( `press` ) }).tile_content({ footer: `August 21, 2016` }).news_content({ contenttext: `SAP Unveils Powerful New Player Comparision Tool Exclusively on NFL.com`, subheader: `Today, SAP News` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
switch (this.client.get( ).event) {
      case `CLICK_HINT_ICON`:
popover_display( `button_hint_id` );
        break;
      case `press`:
this.client.message_toast_display( `The GenericTile is pressed;` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `Shows Feed Tile and News Tile samples that can contain feed content, news content, and a footer;` });

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

module.exports = z2ui5_cl_demo_app_278;
