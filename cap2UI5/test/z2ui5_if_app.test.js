const z2ui5_if_app = require("../srv/z2ui5/z2ui5_if_app");

describe("z2ui5_if_app", () => {
  test("cannot be instantiated directly", () => {
    expect(() => new z2ui5_if_app()).toThrow("cannot be instantiated directly");
  });

  test("subclass without main() throws on instantiation", () => {
    class BadApp extends z2ui5_if_app {}
    expect(() => new BadApp()).toThrow("must implement async main(client)");
  });

  test("subclass with main() can be instantiated", () => {
    class GoodApp extends z2ui5_if_app {
      async main(client) {}
    }
    expect(() => new GoodApp()).not.toThrow();
  });

  test("instanceof check works", () => {
    class MyApp extends z2ui5_if_app {
      async main(client) {}
    }
    const app = new MyApp();
    expect(app instanceof z2ui5_if_app).toBe(true);
  });

  test("all sample apps extend z2ui5_if_app", () => {
    const apps = [
      require("../srv/z2ui5/02/z2ui5_cl_app_hello_world"),
      require("../srv/z2ui5/02/z2ui5_cl_app_startup"),
      require("../srv/apps/z2ui5_cl_app_form"),
      require("../srv/apps/z2ui5_cl_app_messages"),
      require("../srv/apps/z2ui5_cl_app_table"),
      require("../srv/apps/z2ui5_cl_app_navigation"),
      require("../srv/apps/z2ui5_cl_app_popup"),
      require("../srv/apps/z2ui5_cl_app_read_people"),
      require("../srv/apps/z2ui5_cl_app_read_odata"),
      require("../srv/apps/z2ui5_cl_app_view_xml"),
    ];

    for (const AppClass of apps) {
      const app = new AppClass();
      expect(app instanceof z2ui5_if_app).toBe(true);
      expect(typeof app.main).toBe("function");
    }
  });
});
