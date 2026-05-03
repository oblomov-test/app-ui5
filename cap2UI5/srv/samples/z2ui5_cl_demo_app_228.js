const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_228 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: Numeric Content Without Margins`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.label( `Numeric content with margins` );
    layout.numeric_content({ value: `65.5`, scale: `MM`, class: `sapUiSmallMargin`, withmargin: true });
    layout.numeric_content({ value: `65.5`, scale: `MM`, valuecolor: `Good`, indicator: `Up`, class: `sapUiSmallMargin`, withmargin: true });
    layout.numeric_content({ value: `6666`, scale: `MM`, valuecolor: `Critical`, indicator: `Up`, class: `sapUiSmallMargin`, withmargin: true });
    layout.numeric_content({ value: `65.5`, scale: `MM`, valuecolor: `Error`, indicator: `Down`, class: `sapUiSmallMargin`, withmargin: true });

    layout.label( `Numeric content without margins` );
    layout.numeric_content({ value: `65.5`, scale: `MM`, class: `sapUiSmallMargin`, withmargin: false });
    layout.numeric_content({ value: `65.5`, scale: `MM`, valuecolor: `Good`, indicator: `Up`, class: `sapUiSmallMargin`, withmargin: false });
    layout.numeric_content({ value: `6666`, scale: `MM`, valuecolor: `Critical`, indicator: `Up`, class: `sapUiSmallMargin`, withmargin: false });
    layout.numeric_content({ value: `65.5`, scale: `MM`, valuecolor: `Error`, indicator: `Down`, class: `sapUiSmallMargin`, withmargin: false });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_228;
