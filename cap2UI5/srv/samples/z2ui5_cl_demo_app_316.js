/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_316 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES if_serializable_object.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA phone  TYPE string.
 *     DATA mobile TYPE string.
 * 
 *     DATA: BEGIN OF email,
 *             email      TYPE string,
 *             subject    TYPE string,
 *             body       TYPE string,
 *             cc         TYPE string,
 *             bcc        TYPE string,
 *             new_window TYPE string,
 *           END OF email.
 * 
 *     DATA: BEGIN OF url,
 *             url        TYPE string,
 *             new_window TYPE string,
 *           END OF url.
 * 
 *   PROTECTED SECTION.
 *     METHODS view_display
 *       IMPORTING client TYPE REF TO z2ui5_if_client.
 * 
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_316 IMPLEMENTATION.
 *   METHOD view_display.
 * 
 *     url = VALUE #( url        = `http://www.sap.com`
 *                    new_window = `true` ).
 *     email = VALUE #( email      = `email@email.com`
 *                      subject    = `subject`
 *                      body       = `body`
 *                      new_window = `true` ).
 * 
 *     DATA(page) = z2ui5_cl_xml_view=>factory(
 *         )->_z2ui5( )->title( `URL Helper Sample`
 *         )->shell(
 *             )->page( title          = `abap2UI5 - Sample: URL Helper`
 *                      navbuttonpress = client->_event_nav_app_leave( )
 *                      shownavbutton  = client->check_app_prev_stack( ) ).
 * 
 *     DATA(layout) = page->vertical_layout( class = `sapUiContentPadding`
 *                                           width = `100%` ).
 * 
 *     DATA(email_form) = layout->simple_form( `Trigger E-Mail` ).
 * 
 *     email_form->label( text     = `E-Mail`
 *                        labelfor = `inputEmail` ).
 *     email_form->input( id          = `inputEmail`
 *                        value       = client->_bind_edit( email-email )
 *                        type        = `Email`
 *                        placeholder = `Enter email`
 *                        class       = `sapUiSmallMarginBottom` ).
 * 
 *     email_form->input( id          = `inputCcEmail`
 *                        value       = client->_bind_edit( email-cc )
 *                        type        = `Email`
 *                        placeholder = `Enter cc email`
 *                        class       = `sapUiSmallMarginBottom` ).
 * 
 *     email_form->input( id          = `inputBccEmail`
 *                        value       = client->_bind_edit( email-bcc )
 *                        type        = `Email`
 *                        placeholder = `Enter bcc email`
 *                        class       = `sapUiSmallMarginBottom` ).
 * 
 *     email_form->label( text     = `Subject`
 *                        labelfor = `inputText` ).
 *     email_form->input( id          = `inputText`
 *                        value       = client->_bind_edit( email-subject )
 *                        placeholder = `Enter text`
 *                        class       = `sapUiSmallMarginBottom` ).
 * 
 *     email_form->label( `Mail Body`
 *          )->text_area( valueliveupdate = abap_true
 *                        value           = client->_bind_edit( email-body )
 *                        growing         = abap_true
 *                        growingmaxlines = `7`
 *                        width           = `100%` ).
 * 
 *     email_form->button( text  = `Trigger Email`
 *                         press = client->_event_client( val   = client->cs_event-urlhelper
 *                                                        t_arg = VALUE #( ( `TRIGGER_EMAIL` )
 *                                                                         ( |${ client->_bind_edit( email ) }| ) ) ) ).
 * 
 *     DATA(telephone_form) = layout->simple_form( `Trigger Telephone` ).
 * 
 *     telephone_form->label( text     = `Telephone`
 *                            labelfor = `inputTel` ).
 *     telephone_form->input( id          = `inputTel`
 *                            value       = client->_bind_edit( phone )
 *                            type        = `Tel`
 *                            placeholder = `Enter telephone number`
 *                            class       = `sapUiSmallMarginBottom` ).
 *     telephone_form->button(
 *         text  = `Trigger Telephone`
 *         press = client->_event_client( val   = client->cs_event-urlhelper
 *                                        t_arg = VALUE #( ( `TRIGGER_TEL` )
 *                                                         ( |${ client->_bind_edit( phone ) }| ) ) ) ).
 * 
 *     DATA(mobile_form) = layout->simple_form( `Trigger SMS` ).
 * 
 *     mobile_form->label( text     = `Number`
 *                         labelfor = `inputNumber` ).
 *     mobile_form->input( id          = `inputNumber`
 *                         value       = client->_bind_edit( mobile )
 *                         type        = `Number`
 *                         placeholder = `Enter a number`
 *                         class       = `sapUiSmallMarginBottom` ).
 *     mobile_form->button( text  = `Trigger SMS`
 *                          press = client->_event_client( val   = client->cs_event-urlhelper
 *                                                         t_arg = VALUE #( ( `TRIGGER_SMS` )
 *                                                                          ( |${ client->_bind_edit( mobile ) }| ) ) ) ).
 * 
 *     DATA(url_form) = layout->simple_form( `Redirect` ).
 *     url_form->label( text     = `URL`
 *                      labelfor = `inputUrl` ).
 *     url_form->input( id          = `inputUrl`
 *                      value       = client->_bind_edit( url-url )
 *                      type        = `Url`
 *                      placeholder = `Enter URL`
 *                      class       = `sapUiSmallMarginBottom` ).
 *     url_form->button( text  = `Redirect`
 *                       press = client->_event_client( val   = client->cs_event-urlhelper
 *                                                      t_arg = VALUE #( ( `REDIRECT` )
 *                                                                       ( |${ client->_bind_edit( url ) }| ) ) ) ).
 * 
 *     client->view_display( page->stringify( ) ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     IF client->check_on_init( ).
 *       view_display( client ).
 *     ENDIF.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_316 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_316 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_316;
