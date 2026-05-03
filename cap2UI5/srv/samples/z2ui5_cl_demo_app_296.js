const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_296 extends z2ui5_if_app {


  client = null;

view_display() {
const page_01 = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Search Field`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page_01.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page_01.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.SearchField/sample/sap.m.sample.SearchField` });

    page_01.page({ showheader: false }).sub_header(
                  ).toolbar(
                      ).search_field({ width: `100%`, search: this.client._event( `onSearch` ) }).text({ text: `Default Search`, id: `idSearchListToolbar` }).get_parent(
              ).get_parent(
              ).vbox( `sapUiSmallMargin`
                  ).label( `Default Search Field:`
                  ).search_field({ width: `90%`, class: `sapUiSmallMargin` }).get_parent( );

    this.client.view_display( page_01.stringify( ) );

  }
on_event() {
switch (this.client.get( ).event) {
      case `CLICK_HINT_ICON`:
popover_display( `button_hint_id` );
        break;
      case `onSearch`:
this.client.message_toast_display( `'search' event fired with 'searchButtonPressed' parameter` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `Use the Search Field to let the user enter a search string and trigger the search process;` });

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

module.exports = z2ui5_cl_demo_app_296;
