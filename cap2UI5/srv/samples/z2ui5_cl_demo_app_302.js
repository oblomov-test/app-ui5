const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_302 extends z2ui5_if_app {

  lt_a_data = null;
  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Object Attribute inside Table`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.ObjectAttribute/sample/sap.m.sample.ObjectAttributeInTable` });

    page.table({ id: `idProductsTable`, items: this.client._bind( this.lt_a_data ) }).columns(
               ).column(
                   ).text( `Products`
               ).get_parent(
               ).column(
                   ).text( `Supplier`
               ).get_parent(
               ).column(
                   ).text( `Supplier (active)`
               ).get_parent( ).get_parent(
           ).column_list_item(
               ).object_identifier({ text: `{PRODUCT}` }).get_parent(
               ).object_attribute({ text: `{SUPPLIER}` }).object_attribute({ text: `{SUPPLIER}`, active: true }).get_parent( );

    this.client.view_display( page.stringify( ) );

  }
on_event() {
switch (this.client.get( ).event) {
      case `CLICK_HINT_ICON`:
popover_display( `button_hint_id` );
        break;
      case `onPress`:
this.client.message_toast_display( this.client.get_event_arg( 1 ) && ` marker pressed!` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `This is an example of Object Attribute used inside Table;` });

    this.client.popover_display({ xml: view.stringify( ), by_id: id });

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      view_display( this.client );

      this.lt_a_data = [{ product: `Power Projector 4713`, supplier: `Robert Brown Entertainment` }, { product: `HT-1022`, supplier: `Pear Computing Services` }, { product: `Ergo Screen E.III`, supplier: `DelBont Industries` }, { product: `Gladiator MX`, supplier: `Asia High tech` }, { product: `Hurricane GX`, supplier: `Telecomunicaciones Star` }, { product: `Notebook Basic 17`, supplier: `Pear Computing Services` }, { product: `ITelO Vault SAT`, supplier: `New Line Design` }, { product: `Hurricane GX`, supplier: `Robert Brown Entertainment` }, { product: `Webcam`, supplier: `Getränkegroßhandel Janssen` }, { product: `Deskjet Super Highspeed`, supplier: `Vente Et Réparation de Ordinateur` }];
    }
on_event( this.client );

  }
}

module.exports = z2ui5_cl_demo_app_302;
