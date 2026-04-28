const cds = require("@sap/cds");
const z2ui5_cl_app_index_html = require("./z2ui5/01/03/z2ui5_cl_app_index_html");

/**
 * The z2ui5 roundtrip itself is wired as a CDS REST action (see cat-service.cds
 * + cat-service.js — `srv.on('z2ui5', …)` on the rootService). That gives us
 * the same `{value: <oBody>}` action-param shape the abap2UI5 ABAP backend's
 * ICF wrapper produces internally before passing the inner body to the
 * z2ui5_cl_core_handler.
 *
 * What we still need to register manually:
 *   GET  /rest/root/z2ui5  → returns the bootstrap HTML (mirrors abap GET on
 *                            /sap/bc/z2ui5 → z2ui5_cl_app_index_html). Visiting
 *                            the endpoint in a browser launches the UI5 app.
 *   HEAD /rest/root/z2ui5  → CSRF-prefetch + sap-terminate ack. CDS REST
 *                            actions don't expose HEAD, so we register it here.
 */
cds.on("bootstrap", (app) => {
  app.get("/rest/root/z2ui5", (_req, res) => {
    res.set("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(z2ui5_cl_app_index_html.get_source());
  });

  app.head("/rest/root/z2ui5", (_req, res) => {
    res.set("X-CSRF-Token", "disabled");
    res.status(200).end();
  });
});

module.exports = cds.server;
