const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_251 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Input - Description`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `hint_icon`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `POPOVER` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Input/sample/sap.m.sample.InputDescription` });

    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` });

    layout.input({ value: `10`, description: `PC`, width: `100px`, fieldwidth: `60%`, class: `sapUiSmallMarginBottom` });

    layout.input({ value: `220`, description: `EUR / 5 pieces`, width: `200px`, fieldwidth: `60px`, class: `sapUiSmallMarginBottom` });

    layout.input({ value: `220.00`, description: `EUR`, width: `250px`, fieldwidth: `80%`, showclearicon: true, class: `sapUiSmallMarginBottom` });

    layout.input({ value: `007`, description: `Bastian Schweinsteiger`, width: `300px`, fieldwidth: `50px`, class: `sapUiSmallMarginBottom` });

    layout.input({ value: `EDP_LAPTOP`, ariadescribedby: `descriptionNodeId`, description: `IT Laptops`, width: `400px`, fieldwidth: `75%`, class: `sapUiSmallMarginBottom` });

    layout.invisible_text({ ns: `core`, id: `descriptionNodeId`, text: `Additional input description refferenced by aria.describedby;` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `POPOVER` )) {

      popover_display( `hint_icon` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `This sample illustrates the usage of the description with input fields, e.g; description for units of measurements and currencies;` });

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

module.exports = z2ui5_cl_demo_app_251;
