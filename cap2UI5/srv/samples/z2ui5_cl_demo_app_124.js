/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_124 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA mv_scan_input TYPE string.
 *     DATA mv_scan_type TYPE string.
 * 
 *   PROTECTED SECTION.
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_124 IMPLEMENTATION.
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     CASE client->get( )-event.
 * 
 *       WHEN `ON_SCAN_SUCCESS`.
 *         client->message_box_display( `Scan finished!`).
 *         DATA(lt_arg) = client->get( )-t_event_arg.
 *         mv_scan_input = lt_arg[ 1 ].
 *         mv_scan_type  = lt_arg[ 2 ].
 *         "implement further processing here...
 *         "...
 *         client->view_model_update( ).
 *         RETURN.
 *     ENDCASE.
 * 
 *     client->view_display( z2ui5_cl_xml_view=>factory( )->shell(
 *           )->page(
 *                  showheader      = xsdbool( abap_false = client->get( )-check_launchpad_active )
 *                   title          = `abap2UI5`
 *                   navbuttonpress = client->_event_nav_app_leave( )
 *                   shownavbutton  = client->check_app_prev_stack( )
 *               )->simple_form( title    = `Information`
 *                               editable = abap_true
 *                   )->content( `form`
 *                       )->label( `mv_scan_input`
 *                       )->input( client->_bind_edit( mv_scan_input )
 *                       )->label( `mv_scan_type`
 *                       )->input( client->_bind_edit( mv_scan_type )
 *                       )->label( `scanner`
 *                       )->barcode_scanner_button(
 *                         scansuccess = client->_event( val = `ON_SCAN_SUCCESS` t_arg = VALUE #( ( `${$parameters>/text}` ) ( `${$parameters>/format}` ) ) )
 *                         dialogtitle = `Barcode Scanner`
 *            )->stringify( ) ).
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_124 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_124 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_124;
