/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_324 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES if_serializable_object.
 *     INTERFACES z2ui5_if_app.
 * 
 *   PROTECTED SECTION.
 *     DATA client TYPE REF TO z2ui5_if_client.
 * 
 *     METHODS call_dynpro.
 * 
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_324 IMPLEMENTATION.
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     me->client = client.
 * 
 *     TRY.
 *         IF client->check_on_init( ).
 *           client->view_display( z2ui5_cl_xml_view=>factory(
 *                                     )->page( shownavbutton  = client->check_app_prev_stack( )
 *                                              navbuttonpress = client->_event_nav_app_leave( )
 *                                     )->button( text  = `Call dynpro`
 *                                                press = client->_event( `PRESS` )
 *                                     )->stringify( ) ).
 *         ENDIF.
 * 
 *         CASE client->get( )-event.
 *           WHEN `PRESS`.
 *             call_dynpro( ).
 *         ENDCASE.
 * 
 *       CATCH cx_root INTO DATA(x).
 *         client->nav_app_call( z2ui5_cl_pop_error=>factory( x ) ).
 *     ENDTRY.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD call_dynpro.
 * 
 *     " of course this makes no sense in abap2UI5.
 *     " It's just to provoke "Sending of dynpro SAPLSPO1 0500 not possible" error.
 *     DATA(fm) = `POPUP_TO_CONFIRM`.
 *     CALL FUNCTION fm
 *       EXPORTING
 *         text_question  = `Test`
 *       EXCEPTIONS
 *         text_not_found = 1
 *         OTHERS         = 2.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_324 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_324 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_324;
