const z2ui5_if_core_types = require("./z2ui5_if_core_types");

/**
 * Model serializer — JS port of abap2UI5 z2ui5_cl_core_srv_model.
 *
 * Two responsibilities:
 *   - main_json_to_attri: apply incoming XX deltas from the frontend onto the
 *     app instance (full-replace OR `__delta` row-field patch).
 *   - main_json_stringify: walk the client's aBind list and assemble the
 *     response model object that the frontend's JSONModel will load.
 *
 * In abap this class is much heavier — it drives RTTI dissolve / serialize /
 * upper-case mapping. JS uses plain JSON + reference equality, so the API is
 * the same but the implementation is much smaller.
 */
class z2ui5_cl_core_srv_model {

  /**
   * Apply frontend XX changes onto the given app instance.
   *
   * Wire shapes per property:
   *   - Full replace:    XX[attr] = newValue        (scalar / array reassignment)
   *   - Row-field delta: XX[attr] = { __delta: { rowIdx: { field: value } } }
   *
   * @param {object}  oApp            the app instance
   * @param {object}  xx              the XX payload from the frontend
   * @param {boolean} requireOwnProp  skip props that the app doesn't already declare
   *                                  (used in nav-loop to avoid leaking caller state)
   */
  static main_json_to_attri(oApp, xx, requireOwnProp = false) {
    if (!xx) return;
    for (const prop in xx) {
      if (requireOwnProp && !oApp.hasOwnProperty(prop)) continue;
      const change = xx[prop];
      if (change && typeof change === "object" && change.__delta && Array.isArray(oApp[prop])) {
        this._apply_table_delta(oApp[prop], change.__delta);
      } else {
        oApp[prop] = change;
      }
    }
  }

  /** Patch existing rows in `tab` from a `__delta` map keyed by row index. */
  static _apply_table_delta(tab, delta) {
    for (const rowIdxStr in delta) {
      const rowIdx = +rowIdxStr;
      if (!tab[rowIdx]) continue;
      Object.assign(tab[rowIdx], delta[rowIdxStr]);
    }
  }

  /**
   * Build the response model from the client's aBind list.
   * One-way bindings sit at the model root; two-way bindings live under XX.
   */
  static main_json_stringify(aBind) {
    const xxKey = z2ui5_if_core_types.cs_ui5.two_way_model;
    const oModel = { [xxKey]: {} };
    for (const binding of aBind) {
      if (binding.type === z2ui5_if_core_types.cs_bind_type.one_way) {
        oModel[binding.name] = binding.val;
      } else {
        oModel[xxKey][binding.name] = binding.val;
      }
    }
    return oModel;
  }
}

module.exports = z2ui5_cl_core_srv_model;
