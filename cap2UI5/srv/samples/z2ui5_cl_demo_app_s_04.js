/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_s_04 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA unit              TYPE meins.
 *     DATA numc              TYPE z2ui5_numc12.
 *     DATA numc_out          TYPE c LENGTH 12.
 * 
 *   PROTECTED SECTION.
 *     DATA client TYPE REF TO z2ui5_if_client.
 * 
 *     METHODS set_data.
 * 
 *     METHODS view_display
 *       IMPORTING
 *         client TYPE REF TO z2ui5_if_client.
 * 
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_s_04 IMPLEMENTATION.
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     me->client = client.
 * 
 *     IF client->check_on_init( ).
 *       view_display( client ).
 *       set_data( ).
 *     ENDIF.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD view_display.
 * 
 *     DATA(view) = z2ui5_cl_xml_view=>factory( ).
 * 
 *     client->view_display( val = view->shell(
 *            )->page( title          = `abap2UI5 - Conversion Exit`
 *                     navbuttonpress = client->_event_nav_app_leave( )
 *                     shownavbutton  = client->check_app_prev_stack( )
 *         )->simple_form( title    = `Form Title`
 *                         editable = abap_true
 *                    )->content( `form`
 *                        )->title( `Conversion`
 *                        )->label( `Numeric`
 *                        )->input( value   = client->_bind_edit( numc_out )
 *                                  enabled = abap_false
 *                        )->label( `Unit`
 *                        )->input( value   = client->_bind_edit( unit )
 *                                  enabled = abap_false
 *                        )->stringify( ) ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD set_data.
 * 
 *     unit = `ST`.   " internal ST -> external PC (if logged in in english)
 *     numc = 10.     " internal 0000000010 -> external 10
 * 
 *     TRY.
 *         CALL FUNCTION `CONVERSION_EXIT_CUNIT_OUTPUT`
 *           EXPORTING
 *             input  = unit
 *           IMPORTING
 *             output = unit
 *           EXCEPTIONS
 *             OTHERS = 99.
 * 
 * *        numc = |{ numc ALPHA = OUT }|.
 *         CALL FUNCTION `CONVERSION_EXIT_ALPHA_OUTPUT`
 *           EXPORTING
 *             input  = numc
 *           IMPORTING
 *             output = numc_out
 *           EXCEPTIONS
 *             OTHERS = 99.
 * 
 *       CATCH cx_root.
 *     ENDTRY.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_s_04 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_s_04 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_s_04;
