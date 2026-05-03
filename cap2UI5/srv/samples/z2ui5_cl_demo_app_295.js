const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_295 extends z2ui5_if_app {

  lt_a_data = null;
  s_text = null;
  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Date Range Selection - Value States`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.DateRangeSelection/sample/sap.m.sample.DateRangeSelectionValueState` });

    page.flex_box({ items: this.client._bind( this.lt_a_data ), direction: `Column` }).vbox( `sapUiTinyMargin`
                 ).label( `{LABEL}`
                 ).date_range_selection({ width: `100%`, valuestate: `{VALUE_STATE}`, valuestatetext: `{VALUE_STATE_TEXT}` }).get_parent(
             ).get_parent( );

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `CLICK_HINT_ICON` )) {

      popover_display( `button_hint_id` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `This example shows different DateRangeSelection value states;` });

    this.client.popover_display({ xml: view.stringify( ), by_id: id });

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      view_display( this.client );
      set_data( );
    }
on_event( this.client );

  }
set_data() {
this.s_text = ({});
    this.lt_a_data = ({});

    this.s_text = `DateRangeSelection with valueState `;


    this.lt_a_data = [{ label: this.s_text && `None`, value_state: `None` }, { label: this.s_text && `Information`, value_state: `Information` }, { label: this.s_text && `Success`, value_state: `Success` }, { label: this.s_text && `Warning and long valueStateText`, value_state: `Warning`, value_state_text: `Warning message; This is an extra long text used as a warning message; ` &&
                                   `It illustrates how the text wraps into two or more lines without truncation to show the full length of the message;` }, { label: this.s_text && `Error`, value_state: `Error` }];

  }
}

module.exports = z2ui5_cl_demo_app_295;
