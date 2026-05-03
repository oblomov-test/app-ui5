const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_046 extends z2ui5_if_app {

  t_tab = null;
  mv_display = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      this.mv_display = `LIST`;

      this.t_tab = [{ title: `Peter`, info: `completed`, descr: `this is a description`, icon: `sap.icon://account` }, { title: `Peter`, info: `incompleted`, descr: `this is a description`, icon: `sap.icon://account` }, { title: `Peter`, info: `working`, descr: `this is a description`, icon: `sap.icon://account` }, { title: `Peter`, info: `working`, descr: `this is a description`, icon: `sap.icon://account` }, { title: `Peter`, info: `completed`, descr: `this is a description`, icon: `sap.icon://account` }, { title: `Peter`, info: `completed`, descr: `this is a description`, icon: `sap.icon://account` }];

    } else {
switch (this.client.get( ).event) {
        default:
this.mv_display = this.client.get( ).event;
      }
}
const page = z2ui5_cl_xml_view.factory( ).shell(
        ).page({ title: `abap2UI5 - Table output in two different Ways - Changing UI without Model`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) }).header_content(
                ).button({ text: `Display List`, press: this.client._event( `LIST` ) }).button({ text: `Display Table`, press: this.client._event( `TABLE` ) }).link(
      ).get_parent( );

    switch (this.mv_display) {
      case `LIST`:
page.list({ headertext: `List Control`, items: this.client._bind( this.t_tab ) }).standard_list_item({ title: `{TITLE}`, description: `{DESCR}`, icon: `{ICON}`, info: `{INFO}` });

        break;
      case `TABLE`:
const tab = page.table({ headertext: `Table Control`, items: this.client._bind( this.t_tab ) });

        tab.columns(
            ).column(
                ).text( `Title` ).get_parent(
            ).column(
                ).text( `Descr` ).get_parent(
            ).column(
                ).text( `Icon` ).get_parent(
             ).column(
                ).text( `Info` );

        tab.items( ).column_list_item( ).cells(
           ).text( `{TITLE}`
           ).text( `{DESCR}`
           ).text( `{ICON}`
           ).text( `{INFO}` );

    }
this.client.view_display( page.stringify( ) );

  }
}

module.exports = z2ui5_cl_demo_app_046;
