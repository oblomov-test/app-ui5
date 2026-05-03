const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_038 extends z2ui5_if_app {

  t_msg = null;
  client = null;

popover_display() {
const popup = z2ui5_cl_xml_view.factory_popup( );

    popup.message_popover({ items: this.client._bind( this.t_msg ), groupitems: true, placement: `Top`, initiallyexpanded: true, beforeclose: this.client._event( `POPOVER_CLOSE` ) }).message_item({ type: `{TYPE}`, title: `{TITLE}`, subtitle: `{SUBTITLE}`, description: `{DESCRIPTION}`, groupname: `{GROUP}` });

    this.client.popover_display({ xml: popup.stringify( ), by_id: id });

  }
popup_display() {
const popup = z2ui5_cl_xml_view.factory_popup( );

    popup = popup.dialog({ title: `Messages`, contentheight: `50%`, contentwidth: `50%` });

    popup.message_view({ items: this.client._bind( this.t_msg
             ), groupitems: true }).message_item({ type: `{TYPE}`, title: `{TITLE}`, subtitle: `{SUBTITLE}`, description: `{DESCRIPTION}`, groupname: `{GROUP}` });

    popup.footer( ).overflow_toolbar(
      ).toolbar_spacer(
      ).button({ id: `test2`, text: `test`, press: this.client._event( `TEST` ) }).button({ text: `close`, press: this.client._event_client( this.client.cs_event.popup_close ) });

    this.client.popup_display( popup.stringify( ) );

  }
view_display() {
const view = z2ui5_cl_xml_view.factory( );
    const page = view.shell(
        ).page({ title: `abap2UI5 - List`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: true });
    page.button({ text: `Messages in Popup`, press: this.client._event( `POPUP` ) });
    page.message_view({ items: this.client._bind( this.t_msg ), groupitems: true }).message_item({ type: `{TYPE}`, title: `{TITLE}`, subtitle: `{SUBTITLE}`, description: `{DESCRIPTION}`, groupname: `{GROUP}` });

    page.footer( ).overflow_toolbar(
         ).button({ id: `test`, text: `Messages (6)`, press: this.client._event( `POPOVER` ), type: `Emphasized` }).toolbar_spacer(
         ).button({ text: `Send to Server`, press: this.client._event( `BUTTON_SEND` ), type: `Success` });

    this.client.view_display( view.stringify( ) );

  }
async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      this.t_msg = [{ description: `descr`, subtitle: `subtitle`, title: `title`, type: `Error`, group: `group 01` }, { description: `descr`, subtitle: `subtitle`, title: `title`, type: `Information`, group: `group 01` }, { description: `descr`, subtitle: `subtitle`, title: `title`, type: `Information`, group: `group 02` }, { description: `descr`, subtitle: `subtitle`, title: `title`, type: `Success`, group: `group 03` }];

      view_display( );

    }
switch (this.client.get( ).event) {
      case `POPOVER_CLOSE`:
this.client.popover_destroy( );
        break;
      case `POPUP`:
popup_display( );
        break;
      case `TEST`:
popover_display( `test2` );
        break;
      case `POPOVER`:
popover_display( `test` );
    }
}
}

module.exports = z2ui5_cl_demo_app_038;
