const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_313 extends z2ui5_if_app {

  t_tab = null;
  check_ui5 = null;
  mv_key = null;
  client = null;

async main(client) {
if (this.client.check_on_init( )) {

      const view = z2ui5_cl_xml_view.factory( );

      const page = view.shell(
          ).page({ title: `abap2UI5 - Smart Controls with Variants`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

      page.smart_filter_bar({ id: `smartFilterBar`, persistencykey: `SmartFilterPKey`, entityset: `BookingSupplement` })._control_configuration(
          ).control_configuration({ previnitdatafetchinvalhelpdia: false, visibleinadvancedarea: true, key: `TravelID` }).get_parent(
        ).smart_table({ id: `smartFiltertable`, smartfilterid: `smartFilterBar`, tabletype: `ResponsiveTable`, editable: false, initiallyvisiblefields: `TravelID,BookingID`, entityset: `BookingSupplement`, usevariantmanagement: true, useexporttoexcel: true, usetablepersonalisation: true, header: `Test`, showrowcount: true, enableexport: false, enableautobinding: true });

      this.client.view_display({ val: view.stringify( ), switch_default_model_path: `/sap/opu/odata/DMO/API_TRAVEL_U_V2/` });

    }
}
}

module.exports = z2ui5_cl_demo_app_313;
