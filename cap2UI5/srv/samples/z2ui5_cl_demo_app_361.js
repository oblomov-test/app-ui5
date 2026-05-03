const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_361 extends z2ui5_if_app {

  async main(client) {

    if (client.check_on_init()) {

      const view = z2ui5_cl_xml_view.factory();
      view.Shell()
        .Page({
          title:          `abap2UI5 - System Logout`,
          navButtonPress: client._event_nav_app_leave(),
          showNavButton:  client.check_app_prev_stack(),
        })
        .MessageStrip({
          class:    `sapUiMediumMargin`,
          showIcon: true,
          text:     `Trigger SYSTEM_LOGOUT on the client. Inside a Fiori Launchpad the shell container handles the sign-out; otherwise the app navigates to the ICF logoff endpoint.`,
          type:     `Information`,
        })
        .Button({
          class: `sapUiSmallMargin`,
          icon:  `sap-icon://log`,
          text:  `Logout now`,
          type:  `Reject`,
          press: client._event_client(client.cs_event.SYSTEM_LOGOUT),
        });
      client.view_display(view.stringify());

    }

  }
}

module.exports = z2ui5_cl_demo_app_361;
