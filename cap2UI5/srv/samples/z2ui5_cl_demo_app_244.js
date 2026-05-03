const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_244 extends z2ui5_if_app {


  client = null;

view_display() {
const css = `.sapUiDemoFlexBoxSizeAdjustments .sapMFlexItem {`               &&
                `    border: 1px dashed #000;`                                   &&
                `    margin: 0.1875rem;`                                         &&
                `    padding: 0.1875rem;`                                        &&
                `}`                                                              &&
      `.sapUiDemoFlexBoxSizeAdjustmentsZeroWidthItems .sapMFlexItem {` &&
                `    width: 0;`                                                  &&
                `}`                                                              &&
      `.sapMFlexItem {`                                                &&
                `    position: relative;`                                        &&
                `}`;

    const view = z2ui5_cl_xml_view.factory( );
    view._generic({ name: `style`, ns: `html` })._cc_plain_xml( css ).get_parent( );

    const page = view.shell(
         ).page({ title: `abap2UI5 - Sample: Flex Box - Size Adjustments`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `hint_icon`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `POPOVER` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.FlexBox/sample/sap.m.sample.FlexBoxSizeAdjustments` });

    const layout = page.vbox(
                          ).panel({ headertext: `Equal flexibility and content`, class: `sapUiDemoFlexBoxSizeAdjustments` }).flex_box({ alignitems: `Start` }).button({ text: `1`, width: `100%`, type: `Emphasized`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                  ).button({ text: `2`, width: `100%`, type: `Reject`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                         ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                  ).button({ text: `3`, width: `100%`, type: `Accept` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent( ).get_parent( ).get_parent(
      ).panel({ headertext: `Different flexibility, equal content`, class: `sapUiDemoFlexBoxSizeAdjustments` }).flex_box({ alignitems: `Start` }).button({ text: `1`, width: `100%`, type: `Emphasized`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                  ).button({ text: `2`, width: `100%`, type: `Reject`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                         ).flex_item_data({ growfactor: `2` }).get_parent( ).get_parent(
                                  ).button({ text: `3`, width: `100%`, type: `Accept` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `3` }).get_parent( ).get_parent( ).get_parent( ).get_parent(
      ).panel({ headertext: `Equal flexibility, different content`, class: `sapUiDemoFlexBoxSizeAdjustments` }).flex_box({ alignitems: `Start` }).button({ text: `1`, width: `50px`, type: `Emphasized`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                  ).button({ text: `2`, width: `100px`, type: `Reject`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                         ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                  ).button({ text: `3`, width: `150px`, type: `Accept` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent( ).get_parent( ).get_parent(
      ).panel({ headertext: `Equal flexibility, different content, width 0`, class: `sapUiDemoFlexBoxSizeAdjustments` }).flex_box({ alignitems: `Start`, class: `sapUiDemoFlexBoxSizeAdjustmentsZeroWidthItems` }).button({ text: `1`, width: `100%`, type: `Emphasized`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                  ).button({ text: `2`, width: `100%`, type: `Reject`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                         ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                  ).button({ text: `3`, width: `100%`, type: `Accept` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent( ).get_parent( ).get_parent(
      ).panel({ headertext: `Different flexibility and content, width 0`, class: `sapUiDemoFlexBoxSizeAdjustments` }).flex_box({ alignitems: `Start`, class: `sapUiDemoFlexBoxSizeAdjustmentsZeroWidthItems` }).button({ text: `1`, width: `50px`, type: `Emphasized`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                          ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                  ).button({ text: `2`, width: `100px`, type: `Reject`, class: `sapUiSmallMarginEnd` }).get(
                                      ).layout_data(
                                         ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                  ).button({ text: `3`, width: `150px`, type: `Accept` }).get(
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
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `Automatic size adjustments can be achieved for Flex Items with the use of Flex Item Data settings on the contained controls;` });

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

module.exports = z2ui5_cl_demo_app_244;
