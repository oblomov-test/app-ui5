class z2ui5_if_app {
  constructor() {
    if (new.target === z2ui5_if_app) {
      throw new Error("z2ui5_if_app cannot be instantiated directly - extend it and implement main(client)");
    }
    if (typeof this.main !== "function") {
      throw new Error(`${this.constructor.name} must implement async main(client) [z2ui5_if_app]`);
    }
  }
}

module.exports = z2ui5_if_app;
