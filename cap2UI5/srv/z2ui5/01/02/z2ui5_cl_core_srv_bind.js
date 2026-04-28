const z2ui5_if_core_types = require("./z2ui5_if_core_types");

/**
 * Binding-path resolver — JS port of abap2UI5 z2ui5_cl_core_srv_bind.
 *
 * Maps a value (looked up by reference equality on the client's app) to a
 * stable model path, registering a binding entry on the client's `aBind` list.
 * The handler later walks `aBind` to assemble the response model.
 *
 * Mirrors abap's main(val, type, …) and main_cell(...).
 */
class z2ui5_cl_core_srv_bind {

  /**
   * One-way binding: returns `{/path}` (or raw `/path` when opts.path===true).
   * The data is exposed at the top of the response model (no XX namespace).
   */
  static main_one_way(client, val, opts = {}) {
    const explicit = typeof opts.path === "string" ? opts.path : null;
    const path = explicit ?? this._find_or_create(client, val, z2ui5_if_core_types.cs_bind_type.one_way, "__bind");
    const full = `/${path}`;
    if (opts.path === true) return full;
    return this._build_expr(full, opts);
  }

  /**
   * Two-way binding: returns `{/XX/path}`. Data is exposed under XX so the
   * frontend's JSONModel can write back through the delta channel.
   */
  static main_two_way(client, val, opts = {}) {
    const explicit = typeof opts.path === "string" ? opts.path : null;
    const path = explicit ?? this._find_or_create(client, val, z2ui5_if_core_types.cs_bind_type.two_way, "__edit");
    const full = `/${z2ui5_if_core_types.cs_ui5.two_way_model}/${path}`;
    if (opts.path === true) return full;
    return this._build_expr(full, opts);
  }

  /**
   * Local-only binding: registers an auto-named property. Useful for
   * view-internal state that the user app doesn't own.
   */
  static main_local(client, val) {
    const name = `__local_${client.aBind.length}`;
    client.aBind.push({ name, val, type: z2ui5_if_core_types.cs_bind_type.one_way });
    return `{/${name}}`;
  }

  /**
   * Walks the client's app for a property that === val. Records the find on
   * aBind. Falls back to creating a synthetic prop if no match.
   */
  static _find_or_create(client, val, type, prefix) {
    const skip = client.constructor._FRAMEWORK_FIELDS;
    for (const prop in client.oApp) {
      if (skip && skip.has(prop)) continue;
      if (this._is_equal(client.oApp[prop], val)) {
        client.aBind.push({ name: prop, val, type });
        return prop;
      }
    }
    const name = `${prefix}_${client.aBind.length}`;
    client.oApp[name] = val;
    client.aBind.push({ name, val, type });
    return name;
  }

  /** Wrap a path into a binding expression, optionally with formatter. */
  static _build_expr(path, opts) {
    const formatter = opts.custom_mapper || opts.custom_filter;
    if (!formatter) return `{${path}}`;
    return `{path: '${path}', formatter: '${formatter}'}`;
  }

  /**
   * Reference equality for objects, value equality for primitives.
   * Two refs to the same array/object are considered equal; two empty
   * strings are considered equal (caller must skip framework fields).
   */
  static _is_equal(a, b) {
    if (Object.is(a, b)) return true;
    if (typeof a === typeof b && typeof a !== "object" && a === b) return true;
    return false;
  }
}

module.exports = z2ui5_cl_core_srv_bind;
