/* AUTO-GENERATED scaffolding — abap2UI5 transpile produced output that doesn't satisfy z2ui5_if_app contract.
 * Manual port required.
 * Original ABAP source preserved at /tmp/abap2UI5-samples/src/z2ui5_cl_demo_app_329.clas.abap
 */
const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_329 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory().Page({ title: "z2ui5_cl_demo_app_329 (TODO: port from abap)" }).Text({ text: "Manual port needed." });
      client.view_display(v.stringify());
    }
  }
}
module.exports = z2ui5_cl_demo_app_329;
