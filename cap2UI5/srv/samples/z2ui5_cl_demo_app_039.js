/* AUTO-GENERATED scaffolding — abap2UI5 transpile failed; manual port required.
 *
 * Original ABAP source:
 * ====================
 * CLASS z2ui5_cl_demo_app_039 DEFINITION PUBLIC.
 * 
 *   PUBLIC SECTION.
 *     INTERFACES z2ui5_if_app.
 * 
 *     DATA mv_value    TYPE string.
 * 
 *   PROTECTED SECTION.
 *     DATA client TYPE REF TO z2ui5_if_client.
 *     DATA:
 *       BEGIN OF app,        get               TYPE z2ui5_if_types=>ty_s_get,
 *       END OF app.
 * 
 *     METHODS on_init.
 *     METHODS on_event.
 *     METHODS view_display_main.
 *     METHODS popup_display_view.
 * 
 *   PRIVATE SECTION.
 * ENDCLASS.
 * 
 * 
 * CLASS z2ui5_cl_demo_app_039 IMPLEMENTATION.
 * 
 *   METHOD z2ui5_if_app~main.
 * 
 *     app-get = client->get( ).
 *     me->client = client.
 * 
 *     IF client->check_on_init( ).
 *       on_init( ).
 *     ENDIF.
 * 
 *     IF app-get-event IS NOT INITIAL.
 *       on_event( ).
 *     ENDIF.
 * 
 *     view_display_main( ).
 *     popup_display_view( ).
 * 
 *     app-get = VALUE #( ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD on_event.
 * 
 *     IF client->check_on_event( `POPUP` ).
 *       client->message_box_display( `Event raised value:` && mv_value ).
 *     ENDIF.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD on_init.
 * 
 *     mv_value  = `200`.
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD view_display_main.
 * 
 *     DATA(lv_xml) = `<mvc:View` && |\n| &&
 *                         `xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc"` && |\n| &&
 *                         `       xmlns:form="sap.ui.layout.form">` && |\n| &&
 *                         `       <form:SimpleForm editable="true" width="40rem">` && |\n| &&
 *                         `       <Label text="Loading time" />` && |\n| &&
 *                         `       <Input id="loadingMinSeconds" width="8rem" type="Number" description="seconds" value="-1"/>` && |\n| &&
 *                         `       <Button text="Start loading" type="Emphasized" press="onFormSubmit"/>` && |\n| &&
 *                         `   </form:SimpleForm>  ` && |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Country-Specific Profit Margin"  press="onPress"` && |\n| &&
 *                         `       frameType="OneByHalf" subheader="Subtitle">` && |\n| &&
 *                         `       <TileContent>` && |\n| &&
 *                         `           <ImageContent src="test-resources/sap/m/demokit/sample/GenericTileAsLaunchTile/images/SAPLogoLargeTile_28px_height.png" />` && |\n| &&
 *                         `       </TileContent>` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Sales Fulfillment Application Title"` && |\n| &&
 *                         `       subheader="Subtitle" press="press" frameType= "TwoByHalf">` && |\n| &&
 *                         `       <TileContent />` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Manage Activity Master Data Type"` && |\n| &&
 *                         `       subheader="Subtitle" press="press" frameType= "TwoByHalf">` && |\n| &&
 *                         `       <TileContent unit="EUR" footer="Current Quarter">` && |\n| &&
 *                         `           <ImageContent src="sap-icon://home-share" />` && |\n| &&
 *                         `       </TileContent>` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Right click to open in new tab"` && |\n| &&
 *                         `       subheader="Link tile" press="press" url="https://www.sap.com/">` && |\n| &&
 *                         `       <TileContent>` && |\n| &&
 *                         `           <ImageContent src="test-resources/sap/m/demokit/sample/GenericTileAsLaunchTile/images/SAPLogoLargeTile_28px_height.png" />` && |\n| &&
 *                         `       </TileContent>` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Sales Fulfillment Application Title"` && |\n| &&
 *                         `       subheader="Subtitle" press="press">` && |\n| &&
 *                         `       <TileContent unit="EUR" footer="Current Quarter">` && |\n| &&
 *                         `           <ImageContent src="sap-icon://home-share" />` && |\n| &&
 *                         `       </TileContent>` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Manage Activity Master Data Type"` && |\n| &&
 *                         `       subheader="Subtitle" press="press">` && |\n| &&
 *                         `       <TileContent>` && |\n| &&
 *                         `           <ImageContent src="test-resources/sap/m/demokit/sample/GenericTileAsLaunchTile/images/SAPLogoLargeTile_28px_height.png" />` && |\n| &&
 *                         `       </TileContent>` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Manage Activity Master Data Type With a Long Title Without an Icon"` && |\n| &&
 *                         `       subheader="Subtitle Launch Tile" mode="HeaderMode" press="press">` && |\n| &&
 *                         `       <TileContent unit="EUR" footer="Current Quarter" />` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Jessica D. Prince Senior Consultant"` && |\n| &&
 *                         `       subheader="Department" press="press" appShortcut = "shortcut" systemInfo = "systeminfo">` && |\n| &&
 *                         `       <TileContent>` && |\n| &&
 *                         `           <ImageContent src="test-resources/sap/m/demokit/sample/GenericTileAsLaunchTile/images/ProfileImage_LargeGenTile.png" />` && |\n| &&
 *                         `       </TileContent>` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Sales Fulfillment Application Title"` && |\n| &&
 *                         `       press="press" frameType= "OneByHalf">` && |\n| &&
 *                         `       <TileContent unit="EUR" footer="Current Quarter">` && |\n| &&
 *                         `       </TileContent>` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Sales Fulfillment Application Title"` && |\n| &&
 *                         `       press="press" frameType= "TwoByHalf">` && |\n| &&
 *                         `       <TileContent unit="EUR" footer="Current Quarter">` && |\n| &&
 *                         `       </TileContent>` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         |\n| &&
 *                         `   <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop tileLayout" header="Jessica D. Prince Senior Consultant"` && |\n| &&
 *                         `       subheader="Department" press="press" frameType="TwoByHalf">` && |\n| &&
 *                         `       <TileContent>` && |\n| &&
 *                         `           <ImageContent src="test-resources/sap/m/demokit/sample/GenericTileAsLaunchTile/images/ProfileImage_LargeGenTile.png" />` && |\n| &&
 *                         `       </TileContent>` && |\n| &&
 *                         `   </GenericTile>` && |\n| &&
 *                         `</mvc:View>`.
 * 
 *     client->view_display( lv_xml ).
 * 
 *   ENDMETHOD.
 * 
 * 
 *   METHOD popup_display_view.
 * 
 *     client->popup_display( `<core:FragmentDefinition` && |\n| &&
 *                          `  xmlns="sap.m"` && |\n| &&
 *                          `  xmlns:core="sap.ui.core">` && |\n| &&
 *                          `  <ViewSettingsDialog` && |\n| &&
 *                          `      confirm="handleConfirm">` && |\n| &&
 *                          `      <sortItems>` && |\n| &&
 *                          `          <ViewSettingsItem text="Field 1" key="1" selected="true" />` && |\n| &&
 *                          `          <ViewSettingsItem text="Field 2" key="2" />` && |\n| &&
 *                          `          <ViewSettingsItem text="Field 3" key="3" />` && |\n| &&
 *                          `      </sortItems>` && |\n| &&
 *                          `      <groupItems>` && |\n| &&
 *                          `          <ViewSettingsItem text="Field 1" key="1" selected="true" />` && |\n| &&
 *                          `          <ViewSettingsItem text="Field 2" key="2" />` && |\n| &&
 *                          `          <ViewSettingsItem text="Field 3" key="3" />` && |\n| &&
 *                          `      </groupItems>` && |\n| &&
 *                          `      <filterItems>` && |\n| &&
 *                          `          <ViewSettingsFilterItem text="Field1" key="1">` && |\n| &&
 *                          `              <items>` && |\n| &&
 *                          `                  <ViewSettingsItem text="Value A" key="1a" />` && |\n| &&
 *                          `                  <ViewSettingsItem text="Value B" key="1b" />` && |\n| &&
 *                          `                  <ViewSettingsItem text="Value C" key="1c" />` && |\n| &&
 *                          `              </items>` && |\n| &&
 *                          `          </ViewSettingsFilterItem>` && |\n| &&
 *                          `          <ViewSettingsFilterItem text="Field2" key="2">` && |\n| &&
 *                          `              <items>` && |\n| &&
 *                          `                  <ViewSettingsItem text="Value A" key="2a" />` && |\n| &&
 *                          `                  <ViewSettingsItem text="Value B" key="2b" />` && |\n| &&
 *                          `                  <ViewSettingsItem text="Value C" key="2c" />` && |\n| &&
 *                          `              </items>` && |\n| &&
 *                          `          </ViewSettingsFilterItem>` && |\n| &&
 *                          `          <ViewSettingsFilterItem text="Field3" key="3">` && |\n| &&
 *                          `              <items>` && |\n| &&
 *                          `                  <ViewSettingsItem text="Value A" key="3a" />` && |\n| &&
 *                          `                  <ViewSettingsItem text="Value B" key="3b" />` && |\n| &&
 *                          `                  <ViewSettingsItem text="Value C" key="3c" />` && |\n| &&
 *                          `              </items>` && |\n| &&
 *                          `          </ViewSettingsFilterItem>` && |\n| &&
 *                          `      </filterItems>` && |\n| &&
 *                          `  </ViewSettingsDialog>` && |\n| &&
 *                          `</core:FragmentDefinition>` ).
 * 
 *   ENDMETHOD.
 * 
 * ENDCLASS.
 */

const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_039 extends z2ui5_if_app {
  client = null;
  async main(client) {
    this.client = client;
    if (client.check_on_init()) {
      const v = z2ui5_cl_xml_view.factory()
        .Page({ title: "z2ui5_cl_demo_app_039 (TODO: port from abap)" })
        .Text({ text: "This sample needs to be ported manually from abap2UI5." });
      client.view_display(v.stringify());
    }
  }
}

module.exports = z2ui5_cl_demo_app_039;
