const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_236 extends z2ui5_if_app {


  client = null;

view_display() {
const page = z2ui5_cl_xml_view.factory( ).shell(
         ).page({ title: `abap2UI5 - Sample: TextArea - Growing`, navbuttonpress: this.client._event_nav_app_leave( ), shownavbutton: this.client.check_app_prev_stack( ) });

    const layout = page.vertical_layout({ class: `sapUiContentPadding`, width: `100%` }).content( `layout`
                              ).message_strip({ showicon: true, text: `This TextArea shows up to 7 lines, then a scrollbar is presented;` }).text_area({ placeholder: `Enter Text`, growing: true, growingmaxlines: `7`, width: `100%` }).message_strip({ showicon: true, text: `This TextArea shows up to 7 lines, then a scrollbar is presented;`, class: `sapUiMediumMarginTop` }).text_area({ value: `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy ` &&
                                                    `eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                                                    `At vero eos et accusam et justo duo dolores et ea rebum; Stet clita kasd gubergren, ` &&
                                                    `no sea takimata sanctus est Lorem ipsum dolor sit amet; Lorem ipsum dolor sit amet, ` &&
                                                    `consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ` &&
                                                    `magna aliquyam erat, sed diam voluptua; Lorem ipsum dolor sit amet, consetetur sadipscing ` &&
                                                    `elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat; ` &&
                                                    `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ` &&
                                                    `invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; At vero eos et ` &&
                                                    `accusam et justo duo dolores et ea rebum; Stet clita kasd gubergren, no sea takimata ` &&
                                                    `sanctus est Lorem ipsum dolor sit amet; Lorem ipsum dolor sit amet, consetetur sadipscing ` &&
                                                    `elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ` &&
                                                    `sed diam voluptua; Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ` &&
                                                    `nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat;`, growing: true, growingmaxlines: `7`, width: `100%` }).message_strip({ showicon: true, text: `This TextArea adjusts its height according to its content;`, class: `sapUiMediumMarginTop` }).text_area({ value: `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy ` &&
                                                    `eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                                                    `At vero eos et accusam et justo duo dolores et ea rebum; Stet clita kasd gubergren, ` &&
                                                    `no sea takimata sanctus est Lorem ipsum dolor sit amet; Lorem ipsum dolor sit amet, ` &&
                                                    `consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ` &&
                                                    `magna aliquyam erat, sed diam voluptua; Lorem ipsum dolor sit amet, consetetur sadipscing ` &&
                                                    `elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat; ` &&
                                                    `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ` &&
                                                    `invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; At vero eos et ` &&
                                                    `accusam et justo duo dolores et ea rebum; Stet clita kasd gubergren, no sea takimata ` &&
                                                    `sanctus est Lorem ipsum dolor sit amet; Lorem ipsum dolor sit amet, consetetur sadipscing ` &&
                                                    `elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ` &&
                                                    `sed diam voluptua; Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ` &&
                                                    `nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat;`, growing: true, width: `100%` }).message_strip({ showicon: true, text: `Growing TextArea in a SimpleForm`, class: `sapUiMediumMarginTop` }).simple_form({ editable: `true`, layout: `ResponsiveGridLayout` }).label( `Comment`
                              ).text_area({ value: `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy ` &&
                                                    `eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; ` &&
                                                    `At vero eos et accusam et justo duo dolores et ea rebum; Stet clita kasd gubergren, ` &&
                                                    `no sea takimata sanctus est Lorem ipsum dolor sit amet; Lorem ipsum dolor sit amet, ` &&
                                                    `consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore ` &&
                                                    `magna aliquyam erat, sed diam voluptua; Lorem ipsum dolor sit amet, consetetur sadipscing ` &&
                                                    `elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat; ` &&
                                                    `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ` &&
                                                    `invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua; At vero eos et ` &&
                                                    `accusam et justo duo dolores et ea rebum; Stet clita kasd gubergren, no sea takimata ` &&
                                                    `sanctus est Lorem ipsum dolor sit amet; Lorem ipsum dolor sit amet, consetetur sadipscing ` &&
                                                    `elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ` &&
                                                    `sed diam voluptua; Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam ` &&
                                                    `nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat;`, growing: true, width: `100%` });

    this.client.view_display( page.stringify( ) );

  }
async main(client) {
if (this.client.check_on_init( )) {

      view_display( this.client );
    }
}
}

module.exports = z2ui5_cl_demo_app_236;
