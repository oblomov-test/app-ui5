const z2ui5_cl_core_handler = require("../01/02/z2ui5_cl_core_handler");

/**
 * CAP CDS-action handler for the z2ui5 roundtrip endpoint.
 *
 * Wired in cat-service.js as `srv.on('z2ui5', ...)`. CDS unwraps the OData/REST
 * action call into `req.data` containing the named `value` parameter — that
 * inner object is the raw oBody that abap2UI5's ICF servlet would receive.
 *
 * The CDS-action wrapper expects an object return value; we return the parsed
 * JSON model so CAP serializes it back to the client as the response.
 */
module.exports = async function service(req) {
  const oBody = req?.data?.value ?? req?.data ?? req;
  const oHandler = new z2ui5_cl_core_handler(oBody);
  const responseJson = await oHandler.main();
  // core_handler returns a JSON string for the abap-equivalent wire shape;
  // CDS will JSON.stringify whatever we return, so parse first to avoid double-encoding.
  return JSON.parse(responseJson);
};
