const fs = require("fs");
const path = require("path");

/**
 * Utility helpers — JS port of the most-used static methods on z2ui5_cl_util in
 * the abap2UI5 ABAP backend (RTTI scans, URL building, string utils).
 */
class z2ui5_cl_util {

  /** Returns the class name of an instance (mirrors RTTI by-ref lookup). */
  static rtti_get_classname_by_ref(ref) {
    return ref?.constructor?.name || "";
  }

  /** Trim whitespace + uppercase — matches abap c_trim_upper helper. */
  static c_trim_upper(s) {
    return String(s ?? "").trim().toUpperCase();
  }

  /**
   * Builds a deep-link URL pointing to a specific app instance.
   * Mirrors abap2UI5's app_get_url(classname, origin, pathname, search, hash).
   *
   * Strips any leading "?" / "#" from search/hash, then re-adds them only if
   * the remaining string is non-empty — so a bare "#" or "?" never leaks into
   * the URL. Any pre-existing `app_start=...` params in `search` are dropped
   * so repeated rebuilds don't accumulate (e.g. ?app_start=A&app_start=B&...).
   */
  static app_get_url({ classname, origin = "", pathname = "", search = "", hash = "" } = {}) {
    const cleanSearch = String(search ?? "")
      .replace(/^\?/, "")
      .split("&")
      .filter((p) => p && !/^app_start=/i.test(p))
      .join("&");
    const cleanHash   = String(hash ?? "").replace(/^#/, "");

    const sep = cleanSearch ? "&" : "?";
    const searchPart = cleanSearch ? `?${cleanSearch}` : "";
    const appPart    = `${sep}app_start=${classname}`;
    const hashPart   = cleanHash ? `#${cleanHash}` : "";

    return `${origin}${pathname}${searchPart}${appPart}${hashPart}`;
  }

  /** Returns true if a class file exists in the well-known app folders. */
  static rtti_check_class_exists(className) {
    return this._findClassFile(className) !== null;
  }

  /** Loads a class by name from the well-known app folders, or returns null. */
  static rtti_get_class(className) {
    const filePath = this._findClassFile(className);
    if (!filePath) return null;
    try {
      return require(filePath);
    } catch {
      return null;
    }
  }

  /**
   * Scans the well-known app folders for classes implementing/extending the given interface.
   * Returns an array of { KEY: className, TEXT: className } for use with pop_to_select.
   */
  static rtti_get_classes_impl_intf(intfClass) {
    const baseDirs = [
      path.join(__dirname, "../../02"),
      path.join(__dirname, "../../02/01"),
      path.join(__dirname, "../../../samples"),
    ];
    const results = [];
    const seen = new Set();
    for (const dir of baseDirs) {
      if (!fs.existsSync(dir)) continue;
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith(".js")) continue;
        const className = file.replace(/\.js$/, "");
        if (seen.has(className)) continue;
        try {
          const Cls = require(path.join(dir, file));
          if (Cls?.prototype instanceof intfClass) {
            seen.add(className);
            results.push({ KEY: className, TEXT: className });
          }
        } catch {
          // ignore broken modules
        }
      }
    }
    return results;
  }

  static context_check_abap_cloud() {
    return false;  // we are not in ABAP, ever
  }

  static _findClassFile(className) {
    const searchPaths = [
      path.join(__dirname, "../../02", `${className}.js`),
      path.join(__dirname, "../../02/01", `${className}.js`),
      path.join(__dirname, "../../../samples", `${className}.js`),
    ];
    for (const p of searchPaths) {
      if (fs.existsSync(p)) return p;
    }
    return null;
  }
}

module.exports = z2ui5_cl_util;
