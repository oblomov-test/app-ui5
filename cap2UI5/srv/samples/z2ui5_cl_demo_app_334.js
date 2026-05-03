/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_334 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA ms_struc     TYPE z2ui5_t_01.
 *     DATA mo_layout_obj TYPE REF TO z2ui5_cl_demo_app_333.
 *     DATA mo_layout_obj_2 TYPE REF TO z2ui5_cl_demo_app_333.
 * 
 *     METHODS get_data.
 * 
 *     METHODS view_display
 *       IMPORTING
 *         client TYPE REF TO z2ui5_if_client.
 * 
 *   PROTECTED SECTION.
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_334 IMPLEMENTATION.
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     IF client->check_on_init( ).
 * 
 *       get_data( ).
 * 
 *       mo_layout_obj = z2ui5_cl_demo_app_333=>factory( i_data   = REF #( ms_struc )
 *                                                       vis_cols = 3 ).
 *       mo_layout_obj_2 = z2ui5_cl_demo_app_333=>factory( i_data   = REF #( ms_struc )
 *                                                         vis_cols = 5 ).
 * 
 *       view_display( client ).
 * 
 *     ENDIF.
 * 
 *     IF ms_struc IS INITIAL.
 *       client->message_toast_display( `ERROR - MS_STRUC is initial!` ).
 *     ENDIF.
 * 
 *     IF mo_layout_obj->mr_data  IS NOT BOUND.
 *       client->message_toast_display( `ERROR - mo_layout_obj->mr_data is not bound!` ).
 *     ENDIF.
 * 
 *     IF mo_layout_obj_2->mr_data IS NOT BOUND.
 *       client->message_toast_display( `ERROR - mo_layout_obj_2->mr_data  is not bound!` ).
 *     ENDIF.
 * 
 *     IF mo_layout_obj_2->ms_data-guid = mo_layout_obj->ms_data-guid.
 *       client->message_toast_display( `ERROR - GUIDS!` ).
 *     ENDIF.
 * 
 *     client->view_model_update( ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD view_display.
 * 
 *     DATA(page) = z2ui5_cl_xml_view=>factory( )->shell( )->page( title          = `RTTI IV`
 *                                                                 navbuttonpress = client->_event_nav_app_leave( )
 *                                                                 shownavbutton  = client->check_app_prev_stack( ) ).
 * 
 *     page->button( text  = `GO`
 *                   press = client->_event( `GO` )
 *                   type  = `Success` ).
 * 
 *     DATA(form) = page->simple_form( editable        = abap_true
 *                                     layout          = `ResponsiveGridLayout`
 *                                     adjustlabelspan = abap_true
 *                               )->content( `form` ).
 * 
 *     DATA(index) = 0.
 * 
 *     LOOP AT mo_layout_obj->ms_data-t_layout REFERENCE INTO DATA(layout).
 * 
 *       index = index + 1.
 * 
 *       ASSIGN mo_layout_obj->mr_data->* TO FIELD-SYMBOL(<val>).
 * 
 *       ASSIGN COMPONENT layout->name OF STRUCTURE <val> TO FIELD-SYMBOL(<value>).
 *       " assign component layout->name of structure ms_struc to field-symbol(<value>).
 * 
 *       IF <value> IS NOT ASSIGNED.
 *         RETURN.
 *       ENDIF.
 * 
 *       DATA(line) = form->label( wrapping = abap_false
 *                                 text     = layout->name ).
 * 
 *       line->input( value   = client->_bind( <value> )
 *                    visible = client->_bind( val       = layout->visible
 *                                             tab       = mo_layout_obj->ms_data-t_layout
 *                                             tab_index = index )
 *                    enabled = abap_false ).
 *     ENDLOOP.
 * 
 *     client->view_display( page->stringify( ) ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD get_data.
 * 
 *     SELECT SINGLE * FROM z2ui5_t_01
 *       INTO CORRESPONDING FIELDS OF @ms_struc.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_334 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_334 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_334;
