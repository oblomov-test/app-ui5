const z2ui5_if_app = require("./z2ui5_if_app");
const z2ui5_cl_xml_view = require("./z2ui5_cl_xml_view");

class z2ui5_cl_app_hello_world extends z2ui5_if_app {

  name = "";

  async main(client) {

    if (client.check_on_init()) {
      const view = z2ui5_cl_xml_view.factory()
        .Shell()
        .Page({ title: `abap2UI5 - Hello World` })
        .SimpleForm({ editable: true })
        .content()
        .Title({ text: `Make an input here and send it to the server...` })
        .Label({ text: `Name` })
        .Input({ value: client._bind_edit(this.name) })
        .Button({ text: `Send`, press: client._event(`BUTTON_POST`) });
      client.view_display(view.stringify());

    } else if (client.check_on_event(`BUTTON_POST`)) {
      client.message_box_display(`Your name is ${this.name}`);
    }

  }
}

module.exports = z2ui5_cl_app_hello_world;
