const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_267 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: MultiInput - Value States`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.MultiInput/sample/sap.m.sample.MultiInputValueStates` });

    page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` }).label({ text: `MultiInput with value state 'Warning'`, labelfor: `multiInput` }).multi_input({ id: `multiInput`, valuestate: `Warning`, showsuggestion: false, showvaluehelp: false, width: `70%` }).get_parent(
           ).label({ text: `MultiInput with value state 'Error'`, labelfor: `multiInput1` }).multi_input({ id: `multiInput1`, valuestate: `Error`, showsuggestion: `false`, showvaluehelp: false, width: `70%` }).get_parent(
           ).label({ text: `MultiInput with value state 'Success'`, labelfor: `multiInput2` }).multi_input({ id: `multiInput2`, valuestate: `Success`, showsuggestion: false, showvaluehelp: false, width: `70%` }).get_parent(
           ).label({ text: `MultiInput with value state 'Information'`, labelfor: `multiInput3` }).multi_input({ id: `multiInput3`, valuestate: `Information`, showsuggestion: `false`, showvaluehelp: false, width: `70%` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `CLICK_HINT_ICON` )) {

      popover_display( `button_hint_id` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `This sample illustrates the different value states of the sap.m.MultiInput control;` });

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

module.exports = z2ui5_cl_demo_app_267;
