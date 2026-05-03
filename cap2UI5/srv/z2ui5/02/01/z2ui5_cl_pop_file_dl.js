const z2ui5_if_app      = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");

/**
 * z2ui5_cl_pop_file_dl — JS port of abap2UI5 z2ui5_cl_pop_file_dl.
 *
 * File-download dialog. The user clicks "Download", the popup re-renders
 * with a hidden <iframe src="data:…"> (the actual download trigger), and a
 * z2ui5.Timer fires CALLBACK_DOWNLOAD on completion which closes the popup.
 *
 * Usage:
 *   const pop = z2ui5_cl_pop_file_dl.factory({
 *     i_file: base64String,
 *     i_type: 'data:text/csv;base64,',
 *   });
 *   client.nav_app_call(pop);
 */
class z2ui5_cl_pop_file_dl extends z2ui5_if_app {

  client = null;
  title  = `File Download`;
  question_text       = `Choose the file to download:`;
  button_text_confirm = `Download`;
  button_text_cancel  = `Cancel`;

  mv_name           = ``;
  mv_type           = ``;
  mv_size           = ``;
  mv_value          = ``;       // base64-encoded payload
  mv_check_download = false;
  check_confirmed   = false;

  static factory({
    i_text                = `Choose the file to download:`,
    i_title               = `File Download`,
    i_button_text_confirm = `Download`,
    i_button_text_cancel  = `Cancel`,
    i_file                = ``,
    i_type                = `data:text/csv;base64,`,
  } = {}) {
    const r_result = new z2ui5_cl_pop_file_dl();
    r_result.title               = i_title;
    r_result.question_text       = i_text;
    r_result.button_text_confirm = i_button_text_confirm;
    r_result.button_text_cancel  = i_button_text_cancel;
    r_result.mv_type             = i_type;
    r_result.mv_value            = String(i_file ?? ``);
    r_result.mv_size             = String(Math.floor((r_result.mv_value.length || 0) / 1000));
    return r_result;
  }

  result() { return this.check_confirmed; }

  view_display() {
    const c = this.client;
    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({
        title:      this.title,
        afterClose: c._event(`BUTTON_CANCEL`),
      })
      .content();

    if (this.mv_check_download) {
      // Embed the data URI in a hidden iframe — same trigger pattern abap uses.
      // The base64 conversion is the responsibility of the caller (mv_value
      // is expected to already be base64 in the JS port — Node has no
      // conv_get_xstring_by_string analogue).
      popup._generic({
        ns:   `html`,
        name: `iframe`,
        p: [
          { n: `src`,    v: `${this.mv_type}${this.mv_value}` },
          { n: `hidden`, v: `hidden` },
        ],
      });
      popup._z2ui5().timer({ finished: c._event(`CALLBACK_DOWNLOAD`) });
    }

    popup
      .VBox({ class: `sapUiMediumMargin` })
        .Label({ text: `Name` })
        .Input({ value: this.mv_name, enabled: false })
        .Label({ text: `Type` })
        .Input({ value: this.mv_type, enabled: false })
        .Label({ text: `Size` })
        .Input({ value: this.mv_size, enabled: false })
      .get_parent()
      .get_parent()
      .buttons()
        .Button({ text: this.button_text_cancel,  press: c._event(`BUTTON_CANCEL`) })
        .Button({
          text:  this.button_text_confirm,
          press: c._event(`BUTTON_CONFIRM`),
          type:  `Emphasized`,
        });

    c.popup_display(popup.stringify());
  }

  async main(client) {
    this.client = client;

    if (client.check_on_init()) {
      this.view_display();
      return;
    }

    switch (client.get().EVENT) {
      case `CALLBACK_DOWNLOAD`:
        this.check_confirmed = true;
        client.popup_destroy();
        client.nav_app_leave();
        break;
      case `BUTTON_CONFIRM`:
        this.mv_check_download = true;
        this.view_display();
        break;
      case `BUTTON_CANCEL`:
        client.popup_destroy();
        client.nav_app_leave();
        break;
    }
  }
}

module.exports = z2ui5_cl_pop_file_dl;
