/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_149 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA client TYPE REF TO z2ui5_if_client.
 * 
 *     METHODS view_display.
 *     METHODS on_event.
 *     METHODS on_navigation.
 * 
 *   PROTECTED SECTION.
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_149 IMPLEMENTATION.
 * 
 *   METHOD on_navigation.
 * 
 *     TRY.
 *         DATA(lo_prev) = client->get_app( client->get( )-s_draft-id_prev_app ).
 *         DATA(lo_dummy) = CAST z2ui5_cl_pop_to_inform( lo_prev ).
 *         client->message_box_display( `callback after popup to inform` ).
 *       CATCH cx_root.
 *     ENDTRY.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD view_display.
 * 
 *     DATA(view) = z2ui5_cl_xml_view=>factory( ).
 *     view->shell(
 *         )->page(
 *                 title          = `abap2UI5 - Popup HTML`
 *                 navbuttonpress = client->_event_nav_app_leave( )
 *                 shownavbutton  = client->check_app_prev_stack( )
 *            )->button(
 *             text  = `Open Popup...`
 *             press = client->_event( `POPUP` ) ).
 * 
 *     client->view_display( view->stringify( ) ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD on_event.
 * 
 *     CASE client->get( )-event.
 * 
 *       WHEN `POPUP`.
 *         DATA(lo_app) = z2ui5_cl_pop_html=>factory( `<h2>HTML Links</h2>` && |\n| &&
 *                                                      `<p>HTML links are defined with the a tag:</p>` && |\n| &&
 *                                                      |\n| &&
 *                                                      `<a href="https://www.w3schools.com" target="_blank">This is a link</a>` ).
 *         client->nav_app_call( lo_app ).
 *     ENDCASE.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     me->client = client.
 * 
 *     IF client->get( )-check_on_navigated = abap_true.
 *       view_display( ).
 *       on_navigation( ).
 *       RETURN.
 *     ENDIF.
 * 
 *     on_event( ).
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_149 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_149 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_149;
