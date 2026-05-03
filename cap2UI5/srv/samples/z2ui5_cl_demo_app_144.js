/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_144 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     TYPES:
 *       BEGIN OF ty_row,
 *         title TYPE string,
 *         value TYPE string,
 *       END OF ty_row.
 *     DATA t_tab TYPE STANDARD TABLE OF ty_row WITH EMPTY KEY.
 * 
 *     DATA client TYPE REF TO z2ui5_if_client.
 * 
 *     METHODS set_view.
 * 
 *   PROTECTED SECTION.
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_144 IMPLEMENTATION.
 * 
 *   METHOD set_view.
 * 
 *     DATA(view) = z2ui5_cl_xml_view=>factory( ).
 *     DATA(page) = view->shell(
 *         )->page(
 *                 title          = `abap2UI5 - Binding Cell Level`
 *                 navbuttonpress = client->_event_nav_app_leave( )
 *                 shownavbutton  = client->check_app_prev_stack( ) ).
 * 
 *     LOOP AT t_tab REFERENCE INTO DATA(lr_row).
 *       DATA(lv_tabix) = sy-tabix.
 *       page->input( client->_bind_edit( val = lr_row->title tab = t_tab tab_index = lv_tabix ) ).
 *       page->input( client->_bind_edit( val = lr_row->value tab = t_tab tab_index = lv_tabix ) ).
 *     ENDLOOP.
 * 
 *     DATA(tab) = page->table(
 *             items = client->_bind_edit( t_tab )
 *             mode  = `MultiSelect`
 *         )->header_toolbar(
 *             )->overflow_toolbar(
 *                 )->title( `title of the table`
 *         )->get_parent( )->get_parent(
 *       )->columns(
 *         )->column( )->text( `Title` )->get_parent(
 *         )->column( )->text( `Value` )->get_parent( )->get_parent(
 *       )->items( )->column_list_item( selected = `{SELKZ}`
 *       )->cells(
 *           )->input( `{TITLE}`
 *           )->input( `{VALUE}` ).
 * 
 *     page->input( client->_bind_edit( val = t_tab[ 1 ]-title tab = t_tab tab_index = 1 ) ).
 *     page->input( client->_bind_edit( val = t_tab[ 1 ]-value tab = t_tab tab_index = 1 ) ).
 *     page->input( client->_bind_edit( val = t_tab[ 2 ]-title tab = t_tab tab_index = 2 ) ).
 *     page->input( client->_bind_edit( val = t_tab[ 2 ]-value tab = t_tab tab_index = 2 ) ).
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
 * 
 *       DO 1 TIMES.
 *         t_tab = VALUE #( BASE t_tab
 *             ( title = `entry 01`  value = `red` )
 *             ( title = `entry 02`  value = `blue` ) ).
 *       ENDDO.
 *       set_view( ).
 *     ENDIF.
 *     client->view_model_update( ).
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_144 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_144 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_144;
