/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_125 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA title  TYPE string.
 *     DATA favicon  TYPE string.
 * 
 *   PROTECTED SECTION.
 *     DATA client TYPE REF TO z2ui5_if_client.
 * 
 *     METHODS view_display.
 * 
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_125 IMPLEMENTATION.
 * 
 *   METHOD view_display.
 * 
 *     DATA(view) = z2ui5_cl_xml_view=>factory( ).
 * 
 *     DATA(tmp) = view->_z2ui5( )->title( client->_bind_edit( title )
 *          )->shell(
 *          )->page(
 *                  title          = `abap2UI5 - Change Browser Title`
 *                  navbuttonpress = client->_event_nav_app_leave( )
 *                  shownavbutton  = client->check_app_prev_stack( )
 *              )->simple_form( title    = `Form Title`
 *                              editable = abap_true
 *                  )->content( `form`
 *                      )->title( `Input`
 *                      )->label( `title`
 *                      )->input( client->_bind_edit( title ) ).
 * 
 *     client->view_display( tmp->stringify( ) ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     me->client = client.
 * 
 *     IF client->check_on_init( ).
 *       title = `my title`.
 * 
 *       view_display( ).
 * 
 *     ENDIF.
 * 
 *     CASE client->get( )-event.
 * 
 *       WHEN `SET_VIEW`.
 *         view_display( ).
 *         client->message_toast_display( |{ title } - title changed| ).
 *     ENDCASE.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_125 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_125 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_125;
