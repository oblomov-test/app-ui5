/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_065 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA mv_input_main  TYPE string.
 *     DATA mv_input_nest  TYPE string.
 * 
 *   PROTECTED SECTION.
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_065 IMPLEMENTATION.
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     DATA(lo_view) = z2ui5_cl_xml_view=>factory( ).
 * 
 *     DATA(page) = lo_view->shell(
 *         )->page(
 *                 title           = `Main View`
 *                 id              = `test`
 *                 navbuttonpress  = client->_event_nav_app_leave( )
 *                   shownavbutton = abap_true
 *             )->header_content(
 *                 )->link(
 *       )->get_parent( ).
 * 
 *     page->content(
 *       )->button( text  = `Rerender all`
 *                  press = client->_event( `ALL` )
 *       )->button( text  = `Rerender Main without nest`
 *                  press = client->_event( `MAIN` )
 *       )->button( text  = `Rerender only nested view`
 *                  press = client->_event( `NEST` )
 *       )->input( client->_bind_edit( mv_input_main ) ).
 * 
 *     DATA(lo_view_nested) = z2ui5_cl_xml_view=>factory(
 *           )->page( `Nested View`
 *               )->button( text  = `event`
 *                          press = client->_event( `TEST` )
 *               )->button( text  = `frontend event`
 *                          press = client->_event_client( val = client->cs_event-open_new_tab t_arg = VALUE #( ( `https://github.com/abap2UI5/abap2UI5/` ) ) )
 *               )->input( client->_bind_edit( mv_input_nest ) ).
 * 
 *     IF client->check_on_init( ).
 *       client->view_display( lo_view->stringify( ) ).
 * 
 *     ENDIF.
 * 
 *     CASE client->get( )-event.
 * 
 *       WHEN `TEST`.
 *         client->message_box_display( `input ` && mv_input_nest ).
 * 
 *       WHEN `ALL`.
 *         client->view_display( lo_view->stringify( ) ).
 *         client->nest_view_display( val           = lo_view_nested->stringify( )
 *                                    id            = `test`
 *                                    method_insert = `addContent` ).
 * 
 *       WHEN `MAIN`.
 *         client->view_display( lo_view->stringify( ) ).
 * 
 *       WHEN `NEST`.
 *         client->nest_view_display( val           = lo_view_nested->stringify( )
 *                                    id            = `test`
 *                                    method_insert = `addContent` ).
 *     ENDCASE.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_065 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_065 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_065;
