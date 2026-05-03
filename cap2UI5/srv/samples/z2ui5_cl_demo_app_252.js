const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_252 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Flex Box - Render Type`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `hint_icon`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `POPOVER` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.FlexBox/sample/sap.m.sample.FlexBoxRenderType` });

    const layout = page.vbox(
                          ).panel({ headertext: `Render Type - Div` }).flex_box({ rendertype: `Div` }).button({ text: `Some text`, type: `Emphasized`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `3` }).get_parent( ).get_parent(
                                  ).input({ value: `Some value`, width: `auto`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `2` }).get_parent( ).get_parent(
                                  ).button({ icon: `sap.icon://download` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent( ).get_parent( ).get_parent(
                          ).panel({ headertext: `Render Type - Bare` }).flex_box({ rendertype: `Bare` }).button({ text: `Some text`, type: `Emphasized`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `3` }).get_parent( ).get_parent(
                                  ).input({ value: `Some value`, width: `auto`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `2` }).get_parent( ).get_parent(
                                  ).button({ icon: `sap.icon://download` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( );

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `POPOVER` )) {

      popover_display( `hint_icon` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `Flex items can be rendered differently; By default, they are wrapped in a div element; ` &&
                                                `Optionally, the bare controls can be rendered directly; This can affect the resulting layout;` });

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

module.exports = z2ui5_cl_demo_app_252;
