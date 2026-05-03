const z2ui5_if_app      = require("../z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5_cl_xml_view");

/**
 * z2ui5_cl_pop_image_editor — JS port of abap2UI5 z2ui5_cl_pop_image_editor.
 *
 * Wraps the third-party ImageEditor / DrawingBoard.js custom control. The
 * Save button fires the IMAGE_EDITOR_POPUP_CLOSE frontend action which
 * harvests the edited image bytes and round-trips them as the SAVE event's
 * first arg.
 *
 * NOTE: requires `ImageEditorContainer` + `ImageEditor` controls in xml_view.
 * Those aren't ported yet — emit them via the generic `_emit` API.
 */
class z2ui5_cl_pop_image_editor extends z2ui5_if_app {

  client = null;
  mv_title       = `Edit Image`;
  mv_cancel_text = `Cancel`;
  mv_save_text   = `Save`;
  mv_image       = ``;
  mv_confirmed   = false;
  mv_customshapesrc        = ``;
  mv_keepcropaspectratio   = ``;
  mv_keepresizeaspectratio = ``;
  mv_scalecroparea         = ``;
  mv_customshapesrctype    = ``;
  mv_enabledbuttons        = ``;
  mv_mode                  = ``;

  static factory({
    iv_image,
    iv_title                 = `Edit Image`,
    iv_cancel_text           = `Cancel`,
    iv_save_text             = `Save`,
    iv_customshapesrc        = ``,
    iv_keepcropaspectratio   = ``,
    iv_keepresizeaspectratio = ``,
    iv_scalecroparea         = ``,
    iv_customshapesrctype    = ``,
    iv_enabledbuttons        = ``,
    iv_mode                  = ``,
  } = {}) {
    const r_result = new z2ui5_cl_pop_image_editor();
    r_result.mv_image                 = String(iv_image ?? ``);
    r_result.mv_title                 = iv_title;
    r_result.mv_cancel_text           = iv_cancel_text;
    r_result.mv_save_text             = iv_save_text;
    r_result.mv_customshapesrc        = iv_customshapesrc;
    r_result.mv_keepcropaspectratio   = iv_keepcropaspectratio;
    r_result.mv_keepresizeaspectratio = iv_keepresizeaspectratio;
    r_result.mv_scalecroparea         = iv_scalecroparea;
    r_result.mv_customshapesrctype    = iv_customshapesrctype;
    r_result.mv_enabledbuttons        = iv_enabledbuttons;
    r_result.mv_mode                  = iv_mode;
    return r_result;
  }

  result() {
    return { image: this.mv_image, check_confirmed: this.mv_confirmed };
  }

  display() {
    const c = this.client;
    const popup = z2ui5_cl_xml_view.factory_popup()
      .Dialog({
        title:               this.mv_title,
        icon:                `sap-icon://edit`,
        contentHeight:       `80%`,
        contentWidth:        `80%`,
        verticalScrolling:   false,
        horizontalScrolling: false,
      });

    // ImageEditor* controls not yet in xml_view — use the generic XML emitter
    // (mirrors abap _generic call). Same wire shape as a hand-written XML.
    const container = popup._emit(`ImageEditorContainer`, {
      ns: `z2ui5`,
      attrs: [
        { n: `enabledButtons`, v: this.mv_enabledbuttons },
        { n: `mode`,           v: this.mv_mode },
      ],
    });
    container._emit(`ImageEditor`, {
      ns: `z2ui5`,
      attrs: [
        { n: `id`,                    v: `imageEditor` },
        { n: `src`,                   v: this.mv_image },
        { n: `customShapeSrc`,        v: this.mv_customshapesrc },
        { n: `keepCropAspectRatio`,   v: this.mv_keepcropaspectratio },
        { n: `keepResizeAspectRatio`, v: this.mv_keepresizeaspectratio },
        { n: `scaleCropArea`,         v: this.mv_scalecroparea },
        { n: `customShapeSrcType`,    v: this.mv_customshapesrctype },
      ],
    });

    popup.buttons()
      .Button({
        text:  this.mv_cancel_text,
        type:  `Reject`,
        press: c._event(`CANCEL`),
      })
      .Button({
        text:  this.mv_save_text,
        type:  `Emphasized`,
        // Frontend-only event — pulls the edited image out of the editor and
        // dispatches a SAVE event with the bytes as arg[0]. abap uses
        // client._event_client(client.cs_event-image_editor_popup_close).
        press: c._event_client(c.cs_event.image_editor_popup_close),
      });

    c.popup_display(popup.stringify());
  }

  async main(client) {
    this.client = client;

    if (client.check_on_init()) {
      this.display();
      return;
    }

    switch (client.get().EVENT) {
      case `SAVE`:
        this.mv_confirmed = true;
        this.mv_image     = client.get_event_arg(1);
        client.popup_destroy();
        client.nav_app_leave();
        break;
      case `CANCEL`:
        this.mv_confirmed = false;
        client.popup_destroy();
        client.nav_app_leave();
        break;
    }
  }
}

module.exports = z2ui5_cl_pop_image_editor;
