/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_325 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA input TYPE string.
 *     DATA text TYPE string.
 * 
 *   PROTECTED SECTION.
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_325 IMPLEMENTATION.
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     IF client->check_on_init( ).
 * 
 *       DATA(view) = z2ui5_cl_xml_view=>factory( ).
 *       DATA(page) = view->object_page_layout(
 *             showtitleinheadercontent = abap_true
 *             showeditheaderbutton     = abap_true
 *             uppercaseanchorbar       = abap_false ).
 * 
 *       DATA(header_title) = page->header_title(
 *          )->object_page_dyn_header_title( ).
 * 
 *       header_title->expanded_heading( )->hbox( )->title( text     = `Test`
 *                                                          wrapping = abap_true ).
 *       header_title->snapped_heading( )->flex_box( alignitems = `Center` )->title( text     = `Test`
 *                                                                                   wrapping = abap_true ).
 * 
 *       DATA(sections) = page->sections( ).
 * 
 *       sections->object_page_section( titleuppercase = abap_false
 *                                      id             = `id_sec1`
 *                                      title          = `...` )->heading( `uxap`
 *         )->get_parent( )->sub_sections( )->object_page_sub_section( id    = `id_input`
 *                                                                     title = `Input field`
 *         )->blocks( )->vbox(
 *         )->input( value = client->_bind_edit( input )
 *                   width = `50%`
 *         )->button( text  = `Copy input`
 *                    type  = `Emphasized`
 *                    press = client->_event( `COPY_INPUT` ) ).
 * 
 *       sections->object_page_section( titleuppercase = abap_false
 *                                      id             = `id_sec2`
 *                                      title          = `...` )->heading( `uxap`
 *         )->get_parent( )->sub_sections( )->object_page_sub_section( id    = `id_text_area`
 *                                                                     title = `Text area`
 *         )->blocks( )->vbox(
 *         )->button( text  = `Copy text area`
 *                    type  = `Emphasized`
 *                    press = client->_event( `COPY_TEXT_AREA` )
 *         )->text_area( valueliveupdate = abap_true
 *                       editable        = abap_true
 *                       value           = client->_bind_edit( text )
 *                       growing         = abap_true
 *         growingmaxlines               = `50`
 *                       width           = `100%`
 *                       rows            = `15`
 *                       id              = `text_id` ).
 * 
 *       client->view_display( page->stringify( ) ).
 * 
 *     ENDIF.
 * 
 *     CASE client->get( )-event.
 *       WHEN `COPY_INPUT`.
 *         client->follow_up_action( client->_event_client(
 *             val   = z2ui5_if_client=>cs_event-clipboard_copy
 *             t_arg = VALUE #( ( input ) ) ) ).
 *         client->message_toast_display( `input field copied` && input ).
 * 
 *       WHEN `COPY_TEXT_AREA`.
 *         client->follow_up_action( client->_event_client(
 *              val   = z2ui5_if_client=>cs_event-clipboard_copy
 *              t_arg = VALUE #( ( text ) ) ) ).
 *         client->message_toast_display( `text area copied: ` && text ).
 * 
 *     ENDCASE.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_325 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_325 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_325;
