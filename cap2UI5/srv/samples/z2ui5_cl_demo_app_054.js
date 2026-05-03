/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_054 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     TYPES:
 *       BEGIN OF ty_row,
 *         count    TYPE i,
 *         value    TYPE string,
 *         descr    TYPE string,
 *         icon     TYPE string,
 *         info     TYPE string,
 *         checkbox TYPE abap_bool,
 *       END OF ty_row.
 *     DATA t_tab TYPE STANDARD TABLE OF ty_row WITH EMPTY KEY.
 * 
 *     METHODS refresh_data.
 * 
 *   PROTECTED SECTION.
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_054 IMPLEMENTATION.
 * 
 *   METHOD refresh_data.
 * 
 *     DO 100 TIMES.
 *       DATA(ls_row) = VALUE ty_row( count = sy-index  value = `red`
 *         info = COND #( WHEN sy-index < 50 THEN `completed` ELSE `uncompleted` )
 *         descr = `this is a description` checkbox = abap_true ).
 *       INSERT ls_row INTO TABLE t_tab.
 *     ENDDO.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_054 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_054 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_054;
