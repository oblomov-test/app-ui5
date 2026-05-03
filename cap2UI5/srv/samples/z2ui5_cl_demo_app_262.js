const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_262 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Numeric Content of Different Colors`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `hint_icon`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `POPOVER` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.NumericContent/sample/sap.m.sample.NumericContentDifColors` });

    page.numeric_content({ value: `888.8`, scale: `MM`, class: `sapUiSmallMargin`, press: this.client._event( `press` ), truncatevalueto: `4` });
    page.numeric_content({ value: `65.5`, scale: `MM`, valuecolor: `Good`, indicator: `Up`, class: `sapUiSmallMargin`, press: this.client._event( `press` ) });
    page.numeric_content({ value: `6666`, scale: `MM`, valuecolor: `Critical`, indicator: `Up`, class: `sapUiSmallMargin`, press: this.client._event( `press` ) });
    page.numeric_content({ value: `65.5`, scale: `MMill`, valuecolor: `Error`, indicator: `Down`, class: `sapUiSmallMargin`, press: this.client._event( `press` ) });
    page.generic_tile({ class: `sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout`, header: `Country.Specific Profit Margin`, subheader: `Expenses`, press: this.client._event( `press` ) }).tile_content({ unit: `EUR`, footer: `Current Quarter` }).numeric_content({ scale: `M`, value: `1.96`, valuecolor: `Error`, indicator: `Up`, withmargin: false });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
switch (this.client.get( ).event) {
      case `press`:
this.client.message_toast_display( `The numeric content is pressed;` );
        break;
      case `POPOVER`:
popover_display( `hint_icon` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `Shows NumericContent including numbers, units of measurement, and status arrows indicating a trend; ` &&
                                                `The numbers can be colored according to their meaning;` });

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

module.exports = z2ui5_cl_demo_app_262;
