/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_264 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     TYPES:
 *       BEGIN OF ty_a_data,
 *            label       TYPE string,
 *            value_state TYPE string,
 *          END OF ty_a_data.
 * 
 *     DATA
 *       lt_a_data TYPE STANDARD TABLE OF ty_a_data.
 *     DATA ls_a_data TYPE ty_a_data.
 *     DATA s_text TYPE string.
 * 
 *   PROTECTED SECTION.
 *     DATA client TYPE REF TO z2ui5_if_client.
 * 
 *     METHODS view_display
 *       IMPORTING
 *         client TYPE REF TO z2ui5_if_client.
 *     METHODS on_event
 *       IMPORTING
 *         client TYPE REF TO z2ui5_if_client.
 *     METHODS popover_display
 *       IMPORTING
 *         id TYPE string.
 * 
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_264 IMPLEMENTATION.
 * 
 *   METHOD view_display.
 * 
 *     DATA(page) = z2ui5_cl_xml_view=>factory( )->shell(
 *          )->page(
 *             title          = `abap2UI5 - Sample: Step Input - Value States`
 *             navbuttonpress = client->_event_nav_app_leave( )
 *             shownavbutton  = client->check_app_prev_stack( ) ).
 * 
 *     page->header_content(
 *        )->button( id = `hint_icon`
 *            icon      = `sap-icon://hint`
 *            tooltip   = `Sample information`
 *            press     = client->_event( `POPOVER` ) ).
 * 
 *     page->header_content(
 *        )->link(
 *            text   = `UI5 Demo Kit`
 *            target = `_blank`
 *            href   = `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.StepInput/sample/sap.m.sample.StepInputValueState` ).
 * 
 *     page->flex_box( items     = client->_bind( lt_a_data )
 *                     direction = `Column`
 *               )->vbox( `sapUiTinyMargin`
 *                   )->label( text     = `{LABEL}`
 *                             labelfor = `SI`
 *                   )->step_input(
 *                       id         = `SI`
 *                       width      = `100%`
 *                       value      = `5`
 *                       valuestate = `{VALUE_STATE}` ).
 * 
 *     client->view_display( page->stringify( ) ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD on_event.
 * 
 *     IF client->check_on_event( `POPOVER` ).
 *       popover_display( `hint_icon` ).
 *     ENDIF.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD popover_display.
 * 
 *     DATA(view) = z2ui5_cl_xml_view=>factory_popup( ).
 *     view->quick_view( placement = `Bottom`
 *                       width     = `auto`
 *               )->quick_view_page( pageid      = `sampleInformationId`
 *                                   header      = `Sample information`
 *                                   description = `This example shows different StepInput value states.` ).
 * 
 *     client->popover_display(
 *       xml   = view->stringify( )
 *       by_id = id ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     FIELD-SYMBOLS <fs_a_data> TYPE ty_a_data.
 * 
 *     me->client = client.
 * 
 *     IF client->check_on_init( ).
 *       view_display( client ).
 * 
 *       s_text = `StepInput with valueState `.
 * 
 *       lt_a_data = VALUE #(
 *         ( value_state = `None` )
 *         ( value_state = `Information` )
 *         ( value_state = `Success` )
 *         ( value_state = `Warning` )
 *         ( value_state = `Error` ) ).
 * 
 *       " Use field symbols to concatenate the string and store it in the label column
 * 
 *       LOOP AT lt_a_data ASSIGNING <fs_a_data>.
 *         <fs_a_data>-label = s_text && ` ` && <fs_a_data>-value_state.
 *       ENDLOOP.
 *     ENDIF.
 * 
 *     on_event( client ).
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_264 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_264 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_264;
