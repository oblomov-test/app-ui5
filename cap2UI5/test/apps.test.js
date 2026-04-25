const Client = require("../srv/z2ui5/01/02/z2ui5_cl_core_client");

function createClient(app, { event = "", args = [] } = {}) {
  const client = new Client();
  client.oApp = app;
  client.oReq = {
    S_FRONT: { EVENT: event, T_EVENT_ARG: args },
  };
  return client;
}

describe("sample apps", () => {
  // ===== z2ui5_cl_app_hello_world =====

  describe("z2ui5_cl_app_hello_world", () => {
    let AppClass;

    beforeEach(() => {
      AppClass = require("../srv/z2ui5/02/z2ui5_cl_app_hello_world");
    });

    test("default event renders view with input and button", async () => {
      const app = new AppClass();
      const client = createClient(app);
      await app.main(client);

      expect(client.S_VIEW.XML).toContain("Hello World");
      expect(client.S_VIEW.XML).toContain("<m:Input");
      expect(client.S_VIEW.XML).toContain("<m:Button");
      expect(client.S_VIEW.XML).toContain("BUTTON_POST");
    });

    test("BUTTON_POST shows toast with name", async () => {
      const app = new AppClass();
      app.NAME = "TestUser";
      const client = createClient(app, { event: "BUTTON_POST" });
      await app.main(client);

      expect(client.S_MSG_TOAST.TEXT).toContain("TestUser");
    });

    test("BACK triggers nav_app_home", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "BACK" });
      await app.main(client);

      expect(client._navTarget).not.toBeNull();
      expect(client._navTarget.constructor.name).toBe("z2ui5_cl_app_startup");
    });

    test("view includes back navigation button", async () => {
      const app = new AppClass();
      const client = createClient(app);
      await app.main(client);

      expect(client.S_VIEW.XML).toContain('showNavButton="true"');
      expect(client.S_VIEW.XML).toContain("BACK");
    });
  });

  // ===== z2ui5_cl_app_messages =====

  describe("z2ui5_cl_app_messages", () => {
    let AppClass;

    beforeEach(() => {
      AppClass = require("../srv/apps/z2ui5_cl_app_messages");
    });

    test("default event renders view", async () => {
      const app = new AppClass();
      const client = createClient(app);
      await app.main(client);

      expect(client.S_VIEW).toBeTruthy();
      expect(client.S_VIEW.XML).toContain("Messages");
    });

    test("TOAST event shows toast message", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "TOAST" });
      await app.main(client);

      expect(client.S_MSG_TOAST).not.toBeNull();
      expect(client.S_MSG_TOAST.TEXT).toBeTruthy();
    });

    test("BOX event shows message box", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "BOX" });
      await app.main(client);

      expect(client.S_MSG_BOX).not.toBeNull();
      expect(client.S_MSG_BOX.TEXT).toBeTruthy();
    });
  });

  // ===== z2ui5_cl_app_form =====

  describe("z2ui5_cl_app_form", () => {
    let AppClass;

    beforeEach(() => {
      AppClass = require("../srv/apps/z2ui5_cl_app_form");
    });

    test("default event renders form view", async () => {
      const app = new AppClass();
      const client = createClient(app);
      await app.main(client);

      expect(client.S_VIEW.XML).toContain("Form Layout");
      expect(client.S_VIEW.XML).toContain("<m:Input");
      expect(client.S_VIEW.XML).toContain("<m:CheckBox");
      expect(client.S_VIEW.XML).toContain("<m:TextArea");
    });

    test("SUBMIT event shows toast with name", async () => {
      const app = new AppClass();
      app.FIRST_NAME = "Max";
      app.LAST_NAME = "Muster";
      app.EMAIL = "max@test.de";
      const client = createClient(app, { event: "SUBMIT" });
      await app.main(client);

      expect(client.S_MSG_TOAST.TEXT).toContain("Max");
      expect(client.S_MSG_TOAST.TEXT).toContain("Muster");
    });

    test("CLEAR event resets all fields", async () => {
      const app = new AppClass();
      app.FIRST_NAME = "Old";
      app.LAST_NAME = "Name";
      const client = createClient(app, { event: "CLEAR" });
      await app.main(client);

      expect(app.FIRST_NAME).toBe("");
      expect(app.LAST_NAME).toBe("");
      expect(client.S_MSG_TOAST.TEXT).toContain("cleared");
    });
  });

  // ===== z2ui5_cl_app_table =====

  describe("z2ui5_cl_app_table", () => {
    let AppClass;

    beforeEach(() => {
      AppClass = require("../srv/apps/z2ui5_cl_app_table");
    });

    test("default event renders table view", async () => {
      const app = new AppClass();
      const client = createClient(app);
      await app.main(client);

      expect(client.S_VIEW.XML).toContain("Editable Table");
      expect(client.S_VIEW.XML).toContain("<m:Table");
      expect(client.S_VIEW.XML).toContain("<m:columns");
    });

    test("ADD_ROW adds new item", async () => {
      const app = new AppClass();
      app.NEW_NAME = "Dave";
      app.NEW_ROLE = "Tester";
      const initialLen = app.ITEMS.length;
      const client = createClient(app, { event: "ADD_ROW" });
      await app.main(client);

      expect(app.ITEMS).toHaveLength(initialLen + 1);
      expect(app.ITEMS[app.ITEMS.length - 1].NAME).toBe("Dave");
      expect(app.NEW_NAME).toBe("");
    });

    test("ADD_ROW without data shows warning", async () => {
      const app = new AppClass();
      app.NEW_NAME = "";
      app.NEW_ROLE = "";
      const initialLen = app.ITEMS.length;
      const client = createClient(app, { event: "ADD_ROW" });
      await app.main(client);

      expect(app.ITEMS).toHaveLength(initialLen);
      expect(client.S_MSG_TOAST.TEXT).toContain("fill in");
    });

    test("DELETE_ROW removes item by index", async () => {
      const app = new AppClass();
      const initialLen = app.ITEMS.length;
      const firstName = app.ITEMS[0].NAME;
      const client = createClient(app, {
        event: "DELETE_ROW",
        args: ["0"],
      });
      await app.main(client);

      expect(app.ITEMS).toHaveLength(initialLen - 1);
      expect(client.S_MSG_TOAST.TEXT).toContain(firstName);
    });

    test("SAVE shows toast", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "SAVE" });
      await app.main(client);

      expect(client.S_MSG_TOAST.TEXT).toContain("Saved");
    });
  });

  // ===== z2ui5_cl_app_navigation =====

  describe("z2ui5_cl_app_navigation", () => {
    let AppClass;

    beforeEach(() => {
      AppClass = require("../srv/apps/z2ui5_cl_app_navigation");
    });

    test("default event renders navigation view", async () => {
      const app = new AppClass();
      const client = createClient(app);
      await app.main(client);

      expect(client.S_VIEW.XML).toContain("Navigation");
      expect(client.S_VIEW.XML).toContain("NAV_HELLO");
      expect(client.S_VIEW.XML).toContain("NAV_MESSAGES");
    });

    test("NAV_HELLO navigates to hello world", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "NAV_HELLO" });
      await app.main(client);

      expect(client._navTarget).not.toBeNull();
      expect(client._navTarget.constructor.name).toBe(
        "z2ui5_cl_app_hello_world"
      );
    });

    test("NAV_MESSAGES navigates to messages app", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "NAV_MESSAGES" });
      await app.main(client);

      expect(client._navTarget).not.toBeNull();
      expect(client._navTarget.constructor.name).toBe("z2ui5_cl_app_messages");
    });

    test("NAV_CHILD creates child with incremented counter", async () => {
      const app = new AppClass();
      app.COUNTER = 5;
      const client = createClient(app, { event: "NAV_CHILD" });
      await app.main(client);

      expect(client._navTarget).not.toBeNull();
      expect(client._navTarget.COUNTER).toBe(6);
    });
  });

  // ===== z2ui5_cl_app_popup =====

  describe("z2ui5_cl_app_popup", () => {
    let AppClass;

    beforeEach(() => {
      AppClass = require("../srv/apps/z2ui5_cl_app_popup");
    });

    test("default event renders main view", async () => {
      const app = new AppClass();
      const client = createClient(app);
      await app.main(client);

      expect(client.S_VIEW.XML).toContain("Popup");
      expect(client.S_VIEW.XML).toContain("OPEN_SIMPLE");
    });

    test("OPEN_SIMPLE shows dialog popup", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "OPEN_SIMPLE" });
      await app.main(client);

      expect(client.S_POPUP).not.toBeNull();
      expect(client.S_POPUP.XML).toContain("<m:Dialog");
    });

    test("OPEN_INPUT shows input dialog popup", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "OPEN_INPUT" });
      await app.main(client);

      expect(client.S_POPUP.XML).toContain("<m:Dialog");
      expect(client.S_POPUP.XML).toContain("<m:Input");
    });

    test("OPEN_CONFIRM shows confirm dialog", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "OPEN_CONFIRM" });
      await app.main(client);

      expect(client.S_POPUP.XML).toContain("Confirm");
      expect(client.S_POPUP.XML).toContain("Warning");
    });

    test("DIALOG_OK updates result", async () => {
      const app = new AppClass();
      app.INPUT_VAL = "my input";
      const client = createClient(app, { event: "DIALOG_OK" });
      await app.main(client);

      expect(app.RESULT).toContain("my input");
      expect(client.S_MSG_TOAST.TEXT).toContain("Confirmed");
    });

    test("DIALOG_CANCEL updates result", async () => {
      const app = new AppClass();
      const client = createClient(app, { event: "DIALOG_CANCEL" });
      await app.main(client);

      expect(app.RESULT).toContain("cancelled");
    });
  });

  // ===== z2ui5_cl_app_startup =====

  describe("z2ui5_cl_app_startup", () => {
    let AppClass;

    beforeEach(() => {
      AppClass = require("../srv/z2ui5/02/z2ui5_cl_app_startup");
    });

    test("default event renders startup view with app list", async () => {
      const app = new AppClass();
      const client = createClient(app);
      await app.main(client);

      expect(client.S_VIEW.XML).toContain("cap2UI5");
      expect(client.S_VIEW.XML).toContain("Quick Start");
      expect(client.S_VIEW.XML).toContain("Sample Applications");
      expect(client.S_VIEW.XML).toContain("z2ui5_cl_app_hello_world");
    });

    test("BUTTON_CHECK with valid class navigates", async () => {
      const app = new AppClass();
      app.CLASSNAME = "z2ui5_cl_app_hello_world";
      const client = createClient(app, { event: "BUTTON_CHECK" });
      await app.main(client);

      expect(client._navTarget).not.toBeNull();
      expect(client._navTarget.constructor.name).toBe(
        "z2ui5_cl_app_hello_world"
      );
    });

    test("BUTTON_CHECK with invalid class shows error", async () => {
      const app = new AppClass();
      app.CLASSNAME = "z2ui5_does_not_exist";
      const client = createClient(app, { event: "BUTTON_CHECK" });
      await app.main(client);

      expect(client.S_MSG_BOX).not.toBeNull();
      expect(client.S_MSG_BOX.TEXT).toContain("not found");
    });

    test("BUTTON_CHECK with empty class shows toast", async () => {
      const app = new AppClass();
      app.CLASSNAME = "";
      const client = createClient(app, { event: "BUTTON_CHECK" });
      await app.main(client);

      expect(client.S_MSG_TOAST.TEXT).toContain("class name");
    });

    test("NAV_TO_APP navigates to specified app", async () => {
      const app = new AppClass();
      const client = createClient(app, {
        event: "NAV_TO_APP",
        args: ["z2ui5_cl_app_messages"],
      });
      await app.main(client);

      expect(client._navTarget).not.toBeNull();
      expect(client._navTarget.constructor.name).toBe("z2ui5_cl_app_messages");
    });
  });
});
