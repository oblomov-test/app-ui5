const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_310 extends z2ui5_if_app {

  check_strip_active = null;
  strip_type = null;
  client = null;

async main(client) {
switch (this.client.get( ).event) {
      case `BUTTON_MESSAGE_BOX_CONFIRM`:
this.client.message_box_display({ text: `Approve purchase order 12345?`, type: `confirm` });

        break;
      case `BUTTON_MESSAGE_BOX_ALERT`:
this.client.message_box_display({ text: `The quantity you have reported exceeds the quantity planned;`, type: `alert` });

        break;
      case `BUTTON_MESSAGE_BOX_ERROR`:
this.client.message_box_display({ text: `Select a team in the "Development" area;` && cl_abap_char_utilities.cr_lf &&
                                            `"Marketing" isn’t assigned to this area;`, type: `error` });

        break;
      case `BUTTON_MESSAGE_BOX_INFO`:
this.client.message_box_display( `Your booking will be reserved for 24 hours;` );

        break;
      case `BUTTON_MESSAGE_BOX_WARNING`:
this.client.message_box_display({ text: `The project schedule was last updated over a year ago;`, type: `warning` });

        break;
      case `BUTTON_MESSAGE_BOX_SUCCESS`:
this.client.message_box_display({ text: `Project 1234567 was created and assigned to team "ABC";`, type: `success` });

        break;
      case `BUTTON_MESSAGE_TOAST`:
this.client.message_toast_display( `this is a message toast` );

        break;
      case `BUTTON_MESSAGE_TOAST2`:
this.client.message_toast_display({ text: `this is a message toast`, at: `left bottom`, offset: `0 -15`, animationtimingfunction: `ease.in`, class: `my.style` });

        break;
      case `BUTTON_MESSAGE_STRIP_INFO`:
this.check_strip_active = true;
        this.strip_type = `Information`;

        break;
      case `BUTTON_MESSAGE_STRIP_ERROR`:
this.check_strip_active = true;
        this.strip_type = `Error`;

        break;
      case `BUTTON_MESSAGE_STRIP_SUCCESS`:
this.check_strip_active = true;
        this.strip_type = `Success`;
    }
const view = z2ui5_cl_xml_view.factory( );
    view._generic({ ns: `html`, name: `style` })._cc_plain_xml( `.my.style{ background: black !important; opacity: 0.6; color: white; }` );

    const page = view.shell(
        ).page({ title: `abap2UI5 - Messages`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: true }).header_content(
                ).link(
            ).get_parent( );

    if (this.check_strip_active === true) {

      page.message_strip({ text: `This is a Message Strip`, type: this.strip_type });
    }
page.grid( `L6 M12 S12`
        ).content( `layout`
            ).simple_form( `Message Box` ).content( `form`
                ).button({ text: `Confirm`, press: this.client._event( `BUTTON_MESSAGE_BOX_CONFIRM` ) }).button({ text: `Alert`, press: this.client._event( `BUTTON_MESSAGE_BOX_ALERT` ) }).button({ text: `Error`, press: this.client._event( `BUTTON_MESSAGE_BOX_ERROR` ) }).button({ text: `Info`, press: this.client._event( `BUTTON_MESSAGE_BOX_INFO` ) }).button({ text: `Warning`, press: this.client._event( `BUTTON_MESSAGE_BOX_WARNING` ) }).button({ text: `Success`, press: this.client._event( `BUTTON_MESSAGE_BOX_SUCCESS` ) });

    page.grid( `L6 M12 S12`
        ).content( `layout`
            ).simple_form( `Message Strip` ).content( `form`
                ).button({ text: `success`, press: this.client._event( `BUTTON_MESSAGE_STRIP_SUCCESS` ) }).button({ text: `error`, press: this.client._event( `BUTTON_MESSAGE_STRIP_ERROR` ) }).button({ text: `information`, press: this.client._event( `BUTTON_MESSAGE_STRIP_INFO` ) });

    page.grid( `L6 M12 S12`
        ).content( `layout`
            ).simple_form( `Display` ).content( `form`
                ).button({ text: `Message Toast`, press: this.client._event( `BUTTON_MESSAGE_TOAST` ) }).button({ text: `Message Toast Customized`, press: this.client._event( `BUTTON_MESSAGE_TOAST2` ) });

    this.client.view_display( view.stringify( ) );

  }
}

module.exports = z2ui5_cl_demo_app_310;
