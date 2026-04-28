const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_005 extends z2ui5_if_app {

  value1 = 0;
  value2 = 0;

  async main(client) {

    if (client.check_on_init()) {

      this.value1 = 10;
      this.value2 = 90;

    } else if (client.check_on_event(`SLIDER_CHANGE`)) {
      client.message_toast_display(`Range Slider \nvalue1 ${this.value1} \nvalue2 ${this.value2}`);
    }

    const view = z2ui5_cl_xml_view.factory();
    const page = view.Shell()
      .Page({
        title:          `abap2UI5 - Range Slider Example`,
        navButtonPress: client._event_nav_app_leave(),
        showNavButton:  client.check_app_prev_stack(),
      });

    page.Grid({ defaultSpan: `L12 M12 S12` })
      .content()
      .SimpleForm({ title: `More Controls`, editable: true })
        .content()
          .Label({ text: `Range Slider` })
          .RangeSlider({
            max:           `100`,
            min:           `0`,
            step:          `10`,
            startValue:    `10`,
            endValue:      `20`,
            showTickmarks: true,
            labelInterval: `2`,
            width:         `80%`,
            class:         `sapUiTinyMargin`,
            value:         client._bind_edit(this.value1),
            value2:        client._bind_edit(this.value2),
            change:        client._event(`SLIDER_CHANGE`),
          });

    client.view_display(view.stringify());

  }
}

module.exports = z2ui5_cl_demo_app_005;
