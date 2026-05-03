const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_272 extends z2ui5_if_app {


  client = null;

view_display() {
let base_url = `https://sapui5.hana.ondemand.com/`;
    const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Object Header - with Circle.shaped Image`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    page.header_content(
       ).button({ id: `button_hint_id`, icon: `sap.icon://hint`, tooltip: `Sample information`, press: this.client._event( `CLICK_HINT_ICON` ) });

    page.header_content(
       ).link({ text: `UI5 Demo Kit`, target: `_blank`, href: base_url && `sdk/#/entity/sap.m.ObjectHeader/sample/sap.m.sample.ObjectHeaderCircleImage` });

    page.object_header({ icon: base_url && `test.resources/sap/m/images/Woman_04.png`, icondensityaware: false, iconalt: `Denise Smith`, imageshape: `Circle`, responsive: true, title: `Denise Smith`, intro: `Senior Developer`, class: `sapUiResponsivePadding--header` }).object_attribute({ title: `Email address`, text: `DeniseSmith@sap.com`, active: true }).object_attribute({ title: `Office Phone`, text: `+33 6 453 564` }).object_attribute({ title: `Functional Area`, text: `Development` });

    this.client.view_display( page.stringify( ) );

  }
on_event() {
if (this.client.check_on_event( `CLICK_HINT_ICON` )) {

      popover_display( `button_hint_id` );
    }
}
popover_display() {
const view = z2ui5_cl_xml_view.factory_popup( );
    view.quick_view({ placement: `Bottom`, width: `auto` }).quick_view_page({ pageid: `sampleInformationId`, header: `Sample information`, description: `An Object Header can set shape of the image by using 'imageShape' property;`                      &&
                                                `The shapes could be Square (by default) and Circle;`                                              &&
                                                `Note: This example shows the image inside ObjectHeader with the responsive property set to true;` &&
                                                `On phone in portrait mode, the image is hidden;` });

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

module.exports = z2ui5_cl_demo_app_272;
