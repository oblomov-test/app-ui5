const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_287 extends z2ui5_if_app {

  lt_o_model = null;
  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Standard List Item - Wrapping`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.StandardListItem/sample/sap.m.sample.StandardListItemWrapping` });

    page.list({ id: `myList`, mode: `MultiSelect`, headertext: `Wrapping texts`, items: this.client._bind( this.lt_o_model ) }).items(
               ).standard_list_item({ title: `{TITLE}`, description: `{DESC}`, icon: `{ICON}`, iconinset: false, highlight: `{HIGHLIGHT}`, info: `{INFO}`, infostate: `{HIGHLIGHT}`, type: `Detail`, wrapping: true, wrapcharlimit: `{WRAPCHARLIMIT}` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `CLICK_HINT_ICON` )) {

      popover_display( `button_hint_id` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `This sample demonstrates the wrapping behavior of the title text and the description text; ` &&
                                                `In desktop mode, the character limit is set to 300 characters, whereas in the phone mode, the character limit is set to 100 characters;` });

    this.client.popover_display({ xml: view.stringify( ), by_id: id });

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      view_display( this.client );

      this.lt_o_model = [{ title: `wrapCharLimit is set to Default; Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                  `At vero eos et accusam et justo duo dolores et ea rebum; Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet; ` &&
                  `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                  `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat;`, desc: `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                 `At vero eos et accusam et justo duo dolores et ea rebum; Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet; ` &&
                 `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                 `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat;`, icon: `sap.icon://favorite`, highlight: `Success`, info: `Completed` }, { title: `wrapCharLimit is set to 100; Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                  `At vero eos et accusam et justo duo dolores et ea rebum; Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet; ` &&
                  `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua;`, desc: `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua;`, icon: `sap.icon://employee`, highlight: `Error`, info: `Incomplete`, wrapcharlimit: 100 }, { title: `Title text`, desc: `Description text`, icon: `sap.icon://accept`, highlight: `Information`, info: `Information`, wrapcharlimit: 10 }];
    }
on_event( this.client );

  }
}

module.exports = z2ui5_cl_demo_app_287;
