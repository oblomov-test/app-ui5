const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_280 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Header Container - Vertical Mode`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.HeaderContainer/sample/sap.m.sample.HeaderContainerVM` });

    page.header_container({ scrollstep: `124`, scrolltime: `500`, orientation: `Vertical`, height: `400px` }).numeric_content({ scale: `M`, value: `1.75`, valuecolor: `Good`, indicator: `Up`, press: this.client._event( `press` ) }).get_parent(
         ).numeric_content({ scale: `M`, value: `0.57`, valuecolor: `Error`, indicator: `Down`, press: this.client._event( `press` ) }).get_parent(
         ).numeric_content({ scale: `M`, value: `1.04`, valuecolor: `Neutral`, indicator: `Up`, press: this.client._event( `press` ) }).get_parent(
         ).numeric_content({ scale: `M`, value: `3.65`, valuecolor: `Good`, indicator: `Up`, press: this.client._event( `press` ) }).get_parent(
         ).numeric_content({ scale: `M`, value: `0.73`, valuecolor: `Error`, indicator: `Down`, press: this.client._event( `press` ) }).get_parent(
         ).numeric_content({ scale: `M`, value: `1.01`, valuecolor: `Critical`, indicator: `Down`, press: this.client._event( `press` ) }).get_parent(
         ).numeric_content({ scale: `M`, value: `1.42`, valuecolor: `Good`, indicator: `Up`, press: this.client._event( `press` ) }).get_parent(
         ).numeric_content({ scale: `M`, value: `0.21`, valuecolor: `Error`, indicator: `Down`, press: this.client._event( `press` ) }).get_parent( ).get_parent(
       ).header_container({ scrollstep: `200`, orientation: `Vertical`, height: `400px` }).tile_content({ unit: `EUR`, footer: `Current Quarter` }).content(
             ).numeric_content({ value: `1.96`, valuecolor: `Error`, indicator: `Down`, press: this.client._event( `press` ) }).get_parent( ).get_parent( ).get_parent(
         ).tile_content({ footer: `Leave Requests` }).content(
             ).numeric_content({ value: `35`, icon: `sap.icon://travel.expense` }).get_parent( ).get_parent( ).get_parent(
         ).tile_content({ footer: `Hours since last Activity` }).content(
             ).numeric_content({ value: `9`, icon: `sap.icon://horizontal.bar.chart` }).get_parent( ).get_parent( ).get_parent(
         ).tile_content({ unit: `EUR`, footer: `Current Quarter` }).content(
             ).numeric_content({ scale: `M`, value: `88`, valuecolor: `Good`, indicator: `Up` }).get_parent( ).get_parent( ).get_parent(
         ).tile_content({ unit: `Unit`, footer: `Footer Text` }).content(
             ).numeric_content({ value: `1522`, icon: `sap.icon://bubble.chart` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
switch (this.client.get( ).event) {
      case `CLICK_HINT_ICON`:
popover_display( `button_hint_id` );
        break;
      case `press`:
this.client.message_toast_display( `Fire press` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `The Header Container with a vertical layout and with divider lines;` });

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

module.exports = z2ui5_cl_demo_app_280;
