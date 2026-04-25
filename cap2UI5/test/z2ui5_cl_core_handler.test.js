const Handler = require("../srv/z2ui5/01/02/z2ui5_cl_core_handler");
const DB = require("../srv/z2ui5/01/01/z2ui5_cl_core_srv_draft");

// Mock only the async DB methods that need CDS runtime;
// keep static utility methods (findAppClass, serialize, etc.) from the real module
jest.mock("../srv/z2ui5/01/01/z2ui5_cl_core_srv_draft", () => {
  const actual = jest.requireActual("../srv/z2ui5/01/01/z2ui5_cl_core_srv_draft");
  actual.loadApp = jest.fn().mockResolvedValue(null);
  actual.saveApp = jest.fn().mockResolvedValue("mock-uuid-123");
  actual.loadPreviousApp = jest.fn().mockResolvedValue(null);
  return actual;
});

function makeRequest({ event = "", id = "", xx = {}, args = [] } = {}) {
  return {
    data: {
      value: {
        S_FRONT: {
          EVENT: event,
          ID: id,
          CONFIG: {},
          ORIGIN: "http://localhost:4004",
          PATHNAME: "/index.html",
          SEARCH: "",
          VIEW: "",
          HASH: "",
          T_EVENT_ARG: args,
        },
        XX: xx,
      },
    },
  };
}

describe("z2ui5_cl_core_handler", () => {
  let handler;

  beforeEach(() => {
    handler = new Handler();
    jest.clearAllMocks();
  });

  // ===== Initial request =====

  describe("initial request (no ID)", () => {
    test("returns startup app when no ID given", async () => {
      const req = makeRequest();
      const result = JSON.parse(await handler.main(req));

      expect(result.S_FRONT.APP).toBe("z2ui5_cl_app_startup");
      expect(result.S_FRONT.ID).toBe("mock-uuid-123");
      expect(result.S_FRONT.PARAMS.S_VIEW.XML).toBeTruthy();
    });

    test("returns valid XML view", async () => {
      const req = makeRequest();
      const result = JSON.parse(await handler.main(req));

      expect(result.S_FRONT.PARAMS.S_VIEW.XML).toContain("<mvc:View");
      expect(result.S_FRONT.PARAMS.S_VIEW.XML).toContain("</mvc:View>");
    });

    test("calls DB.saveApp", async () => {
      const req = makeRequest();
      await handler.main(req);

      expect(DB.saveApp).toHaveBeenCalled();
    });
  });

  // ===== App loading =====

  describe("app loading from DB", () => {
    test("loads app from DB when ID is provided", async () => {
      const HelloWorld = require("../srv/z2ui5/02/z2ui5_cl_app_hello_world");
      const app = new HelloWorld();
      app.NAME = "Loaded";
      DB.loadApp.mockResolvedValueOnce(app);

      const req = makeRequest({ id: "existing-id" });
      const result = JSON.parse(await handler.main(req));

      expect(DB.loadApp).toHaveBeenCalledWith("existing-id");
      expect(result.S_FRONT.APP).toBe("z2ui5_cl_app_hello_world");
    });

    test("falls back to startup when DB returns null", async () => {
      DB.loadApp.mockResolvedValueOnce(null);

      const req = makeRequest({ id: "missing-id" });
      const result = JSON.parse(await handler.main(req));

      expect(result.S_FRONT.APP).toBe("z2ui5_cl_app_startup");
    });
  });

  // ===== Two-way binding =====

  describe("two-way binding (XX data)", () => {
    test("XX data is applied to loaded app", async () => {
      const HelloWorld = require("../srv/z2ui5/02/z2ui5_cl_app_hello_world");
      const app = new HelloWorld();
      DB.loadApp.mockResolvedValueOnce(app);

      const req = makeRequest({
        id: "some-id",
        event: "BUTTON_POST",
        xx: { NAME: "World" },
      });

      const result = JSON.parse(await handler.main(req));

      // The app should have received the XX data
      expect(result.S_FRONT.APP).toBe("z2ui5_cl_app_hello_world");
      // Toast message should contain the name
      expect(result.S_FRONT.PARAMS.S_MSG_TOAST.TEXT).toContain("World");
    });
  });

  // ===== Navigation =====

  describe("navigation", () => {
    test("NAV_TO_APP event navigates to target app", async () => {
      const StartupApp = require("../srv/z2ui5/02/z2ui5_cl_app_startup");
      const startup = new StartupApp();
      DB.loadApp.mockResolvedValueOnce(startup);

      const req = makeRequest({
        id: "startup-id",
        event: "NAV_TO_APP",
        args: ["z2ui5_cl_app_hello_world"],
        xx: { CLASSNAME: "" },
      });

      const result = JSON.parse(await handler.main(req));

      // Should have navigated to hello world
      expect(result.S_FRONT.APP).toBe("z2ui5_cl_app_hello_world");
      expect(result.S_FRONT.PARAMS.S_VIEW.XML).toContain("Hello World");
    });
  });

  // ===== Response structure =====

  describe("response structure", () => {
    test("response has required S_FRONT fields", async () => {
      const req = makeRequest();
      const result = JSON.parse(await handler.main(req));

      expect(result).toHaveProperty("S_FRONT");
      expect(result.S_FRONT).toHaveProperty("APP");
      expect(result.S_FRONT).toHaveProperty("ID");
      expect(result.S_FRONT).toHaveProperty("PARAMS");
      expect(result.S_FRONT.PARAMS).toHaveProperty("S_MSG_TOAST");
      expect(result.S_FRONT.PARAMS).toHaveProperty("S_MSG_BOX");
      expect(result.S_FRONT.PARAMS).toHaveProperty("S_VIEW");
      expect(result.S_FRONT.PARAMS).toHaveProperty("S_POPUP");
      expect(result.S_FRONT.PARAMS).toHaveProperty("S_POPOVER");
      expect(result.S_FRONT.PARAMS).toHaveProperty("S_VIEW_NEST");
      expect(result.S_FRONT.PARAMS).toHaveProperty("S_VIEW_NEST2");
    });

    test("response has MODEL with XX", async () => {
      const req = makeRequest();
      const result = JSON.parse(await handler.main(req));

      expect(result).toHaveProperty("MODEL");
      expect(result.MODEL).toHaveProperty("XX");
    });

    test("response is valid JSON string", async () => {
      const req = makeRequest();
      const rawResult = await handler.main(req);
      expect(typeof rawResult).toBe("string");
      expect(() => JSON.parse(rawResult)).not.toThrow();
    });
  });

  // ===== Messages =====

  describe("messages in response", () => {
    test("toast message appears in response", async () => {
      const Messages = require("../srv/apps/z2ui5_cl_app_messages");
      const app = new Messages();
      DB.loadApp.mockResolvedValueOnce(app);

      const req = makeRequest({ id: "msg-id", event: "TOAST" });
      const result = JSON.parse(await handler.main(req));

      expect(result.S_FRONT.PARAMS.S_MSG_TOAST).not.toBeNull();
      expect(result.S_FRONT.PARAMS.S_MSG_TOAST.TEXT).toContain("toast");
    });

    test("message box appears in response", async () => {
      const Messages = require("../srv/apps/z2ui5_cl_app_messages");
      const app = new Messages();
      DB.loadApp.mockResolvedValueOnce(app);

      const req = makeRequest({ id: "msg-id", event: "BOX" });
      const result = JSON.parse(await handler.main(req));

      expect(result.S_FRONT.PARAMS.S_MSG_BOX).not.toBeNull();
      expect(result.S_FRONT.PARAMS.S_MSG_BOX.TEXT).toContain("message box");
    });
  });
});
