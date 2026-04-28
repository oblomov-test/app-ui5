const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_001 extends z2ui5_if_app {

  product  = ``;
  quantity = ``;

  async main(client) {

    if (client.check_on_init()) {

      this.product  = `products`;
      this.quantity = `500`;

      const view = z2ui5_cl_xml_view.factory();
      view.Shell()
        .Page({
          title:          `abap2UI5 - First Example`,
          navButtonPress: client._event_nav_app_leave(),
          showNavButton:  client.check_app_prev_stack(),
        })
        .SimpleForm({ title: `Form Title`, editable: true })
          .content()
            .Label({ text: `quantity` })
            .Input({ value: client._bind_edit(this.quantity) })
            .Label({ text: `product` })
            .Input({ value: this.product, enabled: false })
            .Button({ text: `post`, press: client._event(`BUTTON_POST`) });
      client.view_display(view.stringify());

    } else if (client.check_on_event(`BUTTON_POST`)) {
      client.message_toast_display(`${this.product} ${this.quantity} - send to the server`);
    }

  }
}

module.exports = z2ui5_cl_demo_app_001;
