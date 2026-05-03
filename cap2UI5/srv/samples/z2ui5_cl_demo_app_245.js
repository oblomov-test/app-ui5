const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_245 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Flex Box - Direction & Order`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `hint_icon`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `POPOVER` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.FlexBox/sample/sap.m.sample.FlexBoxDirectionOrder` });

    const layout = page.vbox(
                          ).panel({ headertext: `Reverse, horizontal` }).flex_box({ direction: `RowReverse`, alignitems: `Start` }).button({ text: `1`, type: `Emphasized` }).button({ text: `2`, type: `Reject` }).button({ text: `3`, type: `Accept` }).get_parent( ).get_parent(
      ).panel({ headertext: `Top to bottom, vertical` }).flex_box({ direction: `Column`, alignitems: `Start` }).button({ text: `1`, type: `Emphasized` }).button({ text: `2`, type: `Reject` }).button({ text: `3`, type: `Accept` }).get_parent( ).get_parent(
      ).panel({ headertext: `Bottom to top, reverse vertical` }).flex_box({ direction: `ColumnReverse`, alignitems: `Start` }).button({ text: `1`, type: `Emphasized` }).button({ text: `2`, type: `Reject` }).button({ text: `3`, type: `Accept` }).get_parent( ).get_parent(
      ).panel({ headertext: `Arbitrary flex item order` }).flex_box({ alignitems: `Start` }).button({ text: `1`, type: `Emphasized`, class: `sapUiTinyMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ order: `2` }).get_parent( ).get_parent(
                                  ).button({ text: `2`, type: `Reject`, class: `sapUiTinyMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ order: `3` }).get_parent( ).get_parent(
                                  ).button({ text: `3`, type: `Accept`, class: `sapUiTinyMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ order: `1` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `POPOVER` )) {

      popover_display( `hint_icon` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `You can influence the direction and order of elements in horizontal and vertical Flex Box controls with the direction property;` });

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

module.exports = z2ui5_cl_demo_app_245;
