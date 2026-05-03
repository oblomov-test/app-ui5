const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_240 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Switch`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `hint_icon`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `POPOVER` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.Switch/sample/sap.m.sample.Switch` });

    const layout = page.vbox(
                            `sapUiSmallMargin`
                            ).hbox(
                                ).switch({ state: true }).get(
                                    ).layout_data(
                                        ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                ).switch({ state: false }).get(
                                    ).layout_data(
                                        ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                                ).switch({ state: true, enabled: false }).get(
                                    ).layout_data(
                                        ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent( ).get_parent(
      ).hbox(
                              ).switch({ state: true, customtexton: `Yes`, customtextoff: `No` }).get(
                                  ).layout_data(
                                      ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                              ).switch({ state: false, customtexton: `Yes`, customtextoff: `No` }).get(
                                  ).layout_data(
                                      ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                              ).switch({ state: true, customtexton: `Yes`, customtextoff: `No`, enabled: false }).get(
                                  ).layout_data(
                                      ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent( ).get_parent(
      ).hbox(
                              ).switch({ state: true, customtexton: ` `, customtextoff: ` ` }).get(
                                  ).layout_data(
                                      ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                              ).switch({ state: false, customtexton: ` `, customtextoff: ` ` }).get(
                                  ).layout_data(
                                      ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                              ).switch({ state: true, customtexton: ` `, customtextoff: ` `, enabled: false }).get(
                                 ).layout_data(
                                     ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent( ).get_parent(
      ).hbox(
                              ).switch({ type: `AcceptReject`, state: true }).get(
                                  ).layout_data(
                                      ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                              ).switch({ type: `AcceptReject` }).get(
                                  ).layout_data(
                                     ).flex_item_data({ growfactor: `1` }).get_parent( ).get_parent(
                              ).switch({ type: `AcceptReject`, state: true, enabled: false }).get(
                                  ).layout_data(
                                      ).flex_item_data({ growfactor: `1` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `POPOVER` )) {

      popover_display( `hint_icon` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `"Some say it is only a switch, I say it is one of the most stylish controls in the universe of mobile UI controls;" (unknown developer)` });

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

module.exports = z2ui5_cl_demo_app_240;
