const DB = require("../srv/z2ui5/01/01/z2ui5_cl_core_srv_draft");

describe("z2ui5_cl_db", () => {
  // ===== serialize / deserialize =====

  describe("serialize", () => {
    test("serializes app with class name and file path", () => {
      const HelloWorld = require("../srv/z2ui5/02/z2ui5_cl_app_hello_world");
      const app = new HelloWorld();
      app.NAME = "Test";

      const json = DB.serialize(app);
      const parsed = JSON.parse(json);

      expect(parsed.__className).toBe("z2ui5_cl_app_hello_world");
      expect(parsed.__filePath).toBeDefined();
      expect(parsed.NAME).toBe("Test");
    });

    test("serializes only data properties, not functions", () => {
      const HelloWorld = require("../srv/z2ui5/02/z2ui5_cl_app_hello_world");
      const app = new HelloWorld();

      const json = DB.serialize(app);
      const parsed = JSON.parse(json);

      // main is a function and should NOT be serialized
      expect(parsed.main).toBeUndefined();
      // NAME is a data property and should be serialized
      expect(parsed).toHaveProperty("NAME");
    });
  });

  describe("deserialize", () => {
    test("round-trip: serialize then deserialize restores app", () => {
      const HelloWorld = require("../srv/z2ui5/02/z2ui5_cl_app_hello_world");
      const original = new HelloWorld();
      original.NAME = "RoundTrip";

      const json = DB.serialize(original);
      const restored = DB.deserialize(json);

      expect(restored.constructor.name).toBe("z2ui5_cl_app_hello_world");
      expect(restored.NAME).toBe("RoundTrip");
      expect(typeof restored.main).toBe("function");
    });

    test("deserialize restores app class instance (not plain object)", () => {
      const HelloWorld = require("../srv/z2ui5/02/z2ui5_cl_app_hello_world");
      const original = new HelloWorld();
      const json = DB.serialize(original);
      const restored = DB.deserialize(json);

      expect(restored).toBeInstanceOf(HelloWorld);
    });

    test("deserialize returns plain object when no __className", () => {
      const json = JSON.stringify({ foo: "bar" });
      const result = DB.deserialize(json);
      expect(result).toEqual({ foo: "bar" });
    });
  });

  // ===== serialize apps from /apps/ folder =====

  describe("serialize apps from /apps/ folder", () => {
    test("round-trip for z2ui5_cl_app_messages", () => {
      const AppClass = require("../srv/apps/z2ui5_cl_app_messages");
      const app = new AppClass();

      const json = DB.serialize(app);
      const restored = DB.deserialize(json);

      expect(restored.constructor.name).toBe("z2ui5_cl_app_messages");
      expect(typeof restored.main).toBe("function");
    });

    test("round-trip for z2ui5_cl_app_form", () => {
      const AppClass = require("../srv/apps/z2ui5_cl_app_form");
      const app = new AppClass();
      app.FIRST_NAME = "Max";
      app.LAST_NAME = "Muster";

      const json = DB.serialize(app);
      const restored = DB.deserialize(json);

      expect(restored.FIRST_NAME).toBe("Max");
      expect(restored.LAST_NAME).toBe("Muster");
    });

    test("round-trip for z2ui5_cl_app_table", () => {
      const AppClass = require("../srv/apps/z2ui5_cl_app_table");
      const app = new AppClass();

      const json = DB.serialize(app);
      const restored = DB.deserialize(json);

      expect(restored.ITEMS).toHaveLength(3);
      expect(restored.ITEMS[0].NAME).toBe("Alice");
    });
  });

  // ===== _findAppFile =====

  describe("_findAppFile", () => {
    test("finds hello_world in 02/ folder", () => {
      const filePath = DB._findAppFile("z2ui5_cl_app_hello_world");
      expect(filePath).toContain("z2ui5_cl_app_hello_world.js");
    });

    test("finds messages app in apps/ folder", () => {
      const filePath = DB._findAppFile("z2ui5_cl_app_messages");
      expect(filePath).toContain("z2ui5_cl_app_messages.js");
    });

    test("returns default path for unknown class", () => {
      const filePath = DB._findAppFile("z2ui5_unknown_class");
      expect(filePath).toBe("../../02/z2ui5_unknown_class");
    });
  });

  // ===== findAppClass =====

  describe("findAppClass", () => {
    test("returns class for known app in 02/", () => {
      const AppClass = DB.findAppClass("z2ui5_cl_app_hello_world");
      expect(AppClass).not.toBeNull();
      const app = new AppClass();
      expect(typeof app.main).toBe("function");
    });

    test("returns class for known app in apps/", () => {
      const AppClass = DB.findAppClass("z2ui5_cl_app_messages");
      expect(AppClass).not.toBeNull();
    });

    test("returns null for non-existent class", () => {
      const AppClass = DB.findAppClass("z2ui5_cl_does_not_exist");
      expect(AppClass).toBeNull();
    });
  });
});
