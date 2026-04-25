const z2ui5_if_app = require("../z2ui5/z2ui5_if_app");
class z2ui5_cl_app_read_view extends z2ui5_if_app {

  features = [
    "Enterprise-Ready Web Toolkit",
    "Powerful Development Concepts",
    "Feature-Rich UI Controls",
    "Consistent User Experience",
    "Free and Open Source",
    "Responsive Across Browsers and Devices",
  ];

  async main(client) {
    const event = client.get().EVENT;

    switch (event) {
      case "BACK":
        client.nav_app_home();
        break;

      default: {
        const fs = require("fs");
        const path = require("path");
        const viewPath = path.join(__dirname, "View1.view.xml");
        const viewContent = fs.readFileSync(viewPath, "utf8");

        client.view_display(viewContent);
        client._bind(this.features);
        break;
      }
    }
  }
}

module.exports = z2ui5_cl_app_read_view;
