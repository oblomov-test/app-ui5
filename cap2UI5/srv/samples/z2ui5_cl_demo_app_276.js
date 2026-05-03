const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_276 extends z2ui5_if_app {


  client = null;

view_display() {
const css = `.tileLayout {`    &&
                `    float: left;` &&
                `}`;

    const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Monitor Tile`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.GenericTile/sample/sap.m.sample.GenericTileAsMonitorTile` });

    page.generic_tile({ class: `sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout`, header: `Cumulative Totals`, subheader: `Expenses`, press: this.client._event( `press` ) }).tile_content({ unit: `Unit`, footer: `Footer Text` }).numeric_content({ value: `1762`, icon: `sap.icon://line.charts`, withmargin: false }).get_parent( ).get_parent( ).get_parent(
      ).generic_tile({ class: `sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout`, header: `Cumulative Totals`, subheader: `Expenses`, press: this.client._event( `press` ) }).tile_content({ unit: `Unit`, footer: `Footer Text` }).numeric_content({ value: `12`, withmargin: false });

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
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `Shows Monitor Tile samples that can contain header, subheader, icon, key value, unit, and a footer;` });

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

module.exports = z2ui5_cl_demo_app_276;
