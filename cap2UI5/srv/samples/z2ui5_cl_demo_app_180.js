/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_180 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA mv_url TYPE string.
 * 
 *     METHODS on_event.
 *     METHODS view_display.
 * 
 *   PROTECTED SECTION.
 *     DATA client TYPE REF TO z2ui5_if_client.
 * 
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_180 IMPLEMENTATION.
 * 
 *   METHOD on_event.
 * 
 *     IF client->check_on_event( `CALL_EF` ).
 *       mv_url = `https://www.google.com`.
 *       client->view_model_update( ).
 *       client->follow_up_action( client->_event_client( val = client->cs_event-open_new_tab t_arg = VALUE #( ( mv_url ) ) ) ).
 *     ENDIF.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD view_display.
 * 
 *     DATA(view) = z2ui5_cl_xml_view=>factory( ).
 *     DATA(page) = view->shell( )->page(
 *         title          = `Client->FOLLOW_UP_ACTION use cases`
 *         class          = `sapUiContentPadding`
 *         navbuttonpress = client->_event_nav_app_leave( )
 *         shownavbutton  = client->check_app_prev_stack( ) ).
 *     page = page->vbox( ).
 *     page->button( text  = `call frontend event from backend event`
 *                   press = client->_event( `CALL_EF` ) ).
 *     page->label( `MV_URL was set AFTER backend event and model update to:` ).
 *     page->label( client->_bind_edit( mv_url ) ).
 * 
 *     client->view_display( view->stringify( ) ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     me->client = client.
 * 
 *     IF client->check_on_init( ).
 *       view_display( ).
 *     ENDIF.
 * 
 *     on_event( ).
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_180 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_180 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_180;
