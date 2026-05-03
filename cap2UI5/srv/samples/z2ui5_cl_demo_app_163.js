/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_163 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *   PROTECTED SECTION.
 *     DATA client TYPE REF TO z2ui5_if_client.
 * 
 *     METHODS on_event.
 *     METHODS view_display.
 *     METHODS view_action_sheet.
 * 
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_163 IMPLEMENTATION.
 * 
 *   METHOD on_event.
 * 
 *     IF client->check_on_event( `OPEN_ACTION_SHEET` ).
 *       view_action_sheet( ).
 *     ENDIF.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD view_action_sheet.
 * 
 *     DATA(action_sheet_view) = z2ui5_cl_xml_view=>factory_popup( ).
 * 
 *     action_sheet_view->_generic_property( VALUE #( n = `core:require` v = `{ MessageToast: 'sap/m/MessageToast' }` ) ).
 * 
 *     action_sheet_view->action_sheet( placement        = `Botton`
 *                                      showcancelbutton = abap_true
 *                                      title            = `Choose Your Action`
 *       )->button( text  = `Accept`
 *                  icon  = `sap-icon://accept`
 *                  press = `MessageToast.show('selected action is ' + ${$source>/text})`
 *       )->button( text  = `Reject`
 *                  icon  = `sap-icon://decline`
 *                  press = `MessageToast.show('selected action is ' + ${$source>/text})`
 *       )->button( text  = `Email`
 *                  icon  = `sap-icon://email`
 *                  press = `MessageToast.show('selected action is ' + ${$source>/text})`
 *       )->button( text  = `Forward`
 *                  icon  = `sap-icon://forward`
 *                  press = `MessageToast.show('selected action is ' + ${$source>/text})`
 *       )->button( text  = `Delete`
 *                  icon  = `sap-icon://delete`
 *                  press = `MessageToast.show('selected action is ' + ${$source>/text})`
 *       )->button( text  = `Other`
 *                  press = `MessageToast.show('selected action is ' + ${$source>/text})` ).
 * 
 *     client->popover_display( xml   = action_sheet_view->stringify( )
 *                              by_id = `actionSheet` ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD view_display.
 * 
 *     DATA(view) = z2ui5_cl_xml_view=>factory( ).
 * 
 *     view = view->shell( )->page( id = `page_main`
 *              title                  = `abap2UI5 - Action Sheet`
 *              navbuttonpress         = client->_event_nav_app_leave( )
 *              shownavbutton          = client->check_app_prev_stack( ) ).
 * 
 *     DATA(vbox) = view->vbox( ).
 * 
 *     vbox->button( text  = `Open Action Sheet`
 *                   press = client->_event( `OPEN_ACTION_SHEET` )
 *                   id    = `actionSheet`
 *                   class = `sapUiSmallMargin` ).
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
 * 
 *     ELSE.
 *       on_event( ).
 *     ENDIF.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_163 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_163 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_163;
