/**
 * z2ui5_cl_app_index_html — JS port of abap2UI5 z2ui5_cl_app_index_html.
 *
 * Returns the HTML document the browser receives on GET /rest/root/z2ui5.
 * Bootstraps UI5 and points resource-roots to the static /app_v2_new/webapp/
 * tree (CAP serves those files via its built-in static middleware).
 *
 * abap2UI5 holds the HTML as an ABAP string template; we generate it inline
 * with the same shape so the wire output is structurally equivalent.
 */
class z2ui5_cl_app_index_html {

  /** Returns the bootstrap HTML as a string. */
  static get_source() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
\t<meta charset="UTF-8">
\t<meta name="viewport" content="width=device-width, initial-scale=1.0">
\t<title>cap2UI5</title>

\t<link rel="preconnect" href="https://sdk.openui5.org" crossorigin>
\t<link rel="dns-prefetch" href="https://sdk.openui5.org">

\t<script
\t\tid="sap-ui-bootstrap"
\t\tsrc="https://sdk.openui5.org/1.142.0-legacy-free/resources/sap-ui-core.js"
\t\tdata-sap-ui-theme="sap_horizon"
\t\tdata-sap-ui-async="true"
\t\tdata-sap-ui-compat-version="edge"
\t\tdata-sap-ui-libs="sap.m"
\t\tdata-sap-ui-resource-roots='{"app_v2": "/app_v2_new/webapp/", "z2ui5": "/app_v2_new/webapp/cc/"}'
\t\tdata-sap-ui-frame-options="trusted"
\t\tdata-sap-ui-on-init="module:sap/ui/core/ComponentSupport"
\t></script>
</head>
<body class="sapUiBody sapUiSizeCompact" id="content">
\t<div data-sap-ui-component
\t\tdata-name="app_v2"
\t\tdata-id="container"
\t\tdata-handle-validation="true"
\t\tdata-settings='{"id": "app_v2"}'></div>
</body>
</html>`;
  }
}

module.exports = z2ui5_cl_app_index_html;
