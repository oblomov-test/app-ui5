const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_248 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Splitter Layout - 2 non.resizable areas`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `hint_icon`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `POPOVER` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.ui.layout.Splitter/sample/sap.ui.layout.sample.Splitter3` });

    const layout = page.splitter(
                          ).text( `Content 1` ).get(
                              ).layout_data(
                                  ).splitter_layout_data({ size: `30%`, resizable: false }).get_parent( ).get_parent( ).get_parent(
                          ).text( `Content 2` ).get(
                              ).layout_data(
                                  ).splitter_layout_data({ size: `auto` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `POPOVER` )) {

      popover_display( `hint_icon` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `Simple splitter example with two content areas that cannot be resized` });

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

module.exports = z2ui5_cl_demo_app_248;
