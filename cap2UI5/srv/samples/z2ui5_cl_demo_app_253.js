const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_253 extends z2ui5_if_app {


  client = null;

view_display() {
const css = `.equalColumns .columns {`               &&
                `    min.height: 200px;`                 &&
                `}`                                      &&
                ``                                       &&
                `.equalColumns .columns .sapMFlexItem {` &&
                `    padding: 0.5rem;`                   &&
                `}`;

    const view = z2ui5_cl_xml_view.factory( );
    view._generic({ name: `style`, ns: `html` })._cc_plain_xml( css ).get_parent( );

    const page = view.shell(
         ).page({ title: `abap2UI5 - Sample: Flex Box - Equal Height Cols`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `hint_icon`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `POPOVER` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.FlexBox/sample/sap.m.sample.FlexBoxCols` });

    const layout = page.vertical_layout({ class: `sapUiContentPadding equalColumns`, width: `100%` }).flex_box({ class: `columns` }).text( `Although they have different amounts of text, both columns are of equal height;` ).get(
                                  ).layout_data(
                                      ).flex_item_data({ growfactor: `1`, basesize: `0`, backgrounddesign: `Solid`, styleclass: `sapUiTinyMargin` }).get_parent( ).get_parent(
                              ).text( `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ` &&
                                              `sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                                              `At vero eos et accusam et justo hey nonny no duo dolores et ea rebum; ` &&
                                              `Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet; ` &&
                                              `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ` &&
                                              `sed diam voluptua; At vero eos et accusam et justo duo dolores et ea rebum; ` &&
                                              `Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet;` ).get(
                                  ).layout_data(
                                      ).flex_item_data({ growfactor: `1`, basesize: `0`, backgrounddesign: `Solid`, styleclass: `sapUiTinyMargin` }).get_parent( );

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `POPOVER` )) {

      popover_display( `hint_icon` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `You can create balanced areas with Flex Box, such as these columns with equal height regardless of content;` });

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

module.exports = z2ui5_cl_demo_app_253;
