const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_286 extends z2ui5_if_app {

  lt_o_model = null;
  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Standard List Item - Info State Inverted`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.StandardListItem/sample/sap.m.sample.StandardListItemInfoStateInverted` });

    page.list({ id: `myList`, mode: `MultiSelect`, headertext: `Inverted Info State`, items: this.client._bind( this.lt_o_model ) }).items(
               ).standard_list_item({ title: `{TITLE}`, description: `{DESC}`, icon: `{ICON}`, iconinset: false, highlight: `{HIGHLIGHT}`, info: `{INFO}`, infostate: `{HIGHLIGHT}`, infostateinverted: true });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `CLICK_HINT_ICON` )) {

      popover_display( `button_hint_id` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `This sample demonstrates the inverted rendering behavior of the info text and the info state of the StandardListItem control;` });

    this.client.popover_display({ xml: view.stringify( ), by_id: id });

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      view_display( this.client );

      this.lt_o_model = [{ title: `Title text`, desc: `Description text`, icon: `sap.icon://favorite`, highlight: `Success`, info: `Completed` }, { title: `Title text`, desc: `Description text`, icon: `sap.icon://employee`, highlight: `Error`, info: `Incomplete` }, { title: `Title text`, icon: `sap.icon://accept`, highlight: `Information`, info: `Information` }, { title: `Title text`, icon: `sap.icon://activities`, highlight: `None`, info: `None` }, { title: `Title text`, desc: `Description text`, icon: `sap.icon://badge`, highlight: `Warning`, info: `Warning` }];
    }
on_event( this.client );

  }
}

module.exports = z2ui5_cl_demo_app_286;
