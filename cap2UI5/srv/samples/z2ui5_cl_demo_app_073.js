/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_073 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA mv_url TYPE string.
 *     DATA mv_check_timer_active TYPE abap_bool.
 * 
 *     DATA client TYPE REF TO z2ui5_if_client.
 * 
 *     METHODS view_display.
 *   PROTECTED SECTION.
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_073 IMPLEMENTATION.
 * 
 *   METHOD view_display.
 * 
 *     DATA(view) = z2ui5_cl_xml_view=>factory( ).
 * 
 *     client->view_display( view->shell(
 *           )->page(
 *                   title          = `abap2UI5 - First Example`
 *                   navbuttonpress = client->_event_nav_app_leave( )
 *                   shownavbutton  = client->check_app_prev_stack( )
 *              )->_z2ui5( )->timer(
 *                   checkactive = client->_bind( mv_check_timer_active )
 *                   finished    = client->_event_client( val     = client->cs_event-open_new_tab
 *                                                          t_arg = VALUE #( ( `$` && client->_bind( mv_url ) ) ) )
 *               )->simple_form( title    = `Form Title`
 *                               editable = abap_true
 *                   )->content( `form`
 *                       )->button(
 *                           text  = `open new tab`
 *                           press = client->_event( val = `BUTTON_OPEN_NEW_TAB` )
 *            )->stringify( ) ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     me->client = client.
 * 
 *     IF client->check_on_init( ).
 *       mv_check_timer_active = abap_false.
 *       view_display( ).
 *     ENDIF.
 * 
 *     CASE client->get( )-event.
 * 
 *       WHEN `BUTTON_OPEN_NEW_TAB`.
 *         mv_check_timer_active = abap_true.
 *         mv_url = `https://www.google.com/search?q=abap2ui5&oq=abap2ui5,123`.
 *         client->view_model_update( ).
 *     ENDCASE.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_073 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_073 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_073;
