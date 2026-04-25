const z2ui5_if_app = require("../z2ui5_if_app");
class z2ui5_cl_app_hello_world extends z2ui5_if_app {
  async main(client) {
    this.NAME ??= 'testclass';

    client.oView
      .Page({ title: "abap2UI5 - Hello World" })
      .Title({ text: "Make an input here and send it to the server..." })
      .Input({ 
        value: client._bind_edit(this.NAME), 
        enabled: true 
      })
      .Button({ 
        press: client._event('BUTTON_POST'), 
        text: "Post" 
      });

    client.view_display(client.oView.stringify());
  }
}

module.exports = z2ui5_cl_app_hello_world;
