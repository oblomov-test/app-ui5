class z2ui5_cl_xml_view {

  oRoot = {};
  oParent;
  aChild = [];

  name;
  ns;
  aProp = [];
  _isPopup = false;  // root-only flag — toggled by factory_popup()

  constructor(opts = {}) {
    this.oRoot = this;
    this._isPopup = !!opts.popup;
  }

  /** Default: full XMLView root (for use with client.view_display). */
  static factory() {
    return new z2ui5_cl_xml_view();
  }

  /**
   * Popup/Fragment root (for use with client.popup_display / popover_display).
   * Frontend Fragment.load expects a <core:FragmentDefinition> root so it can
   * return the wrapped Dialog/Popover (with .open()) directly — wrapping in
   * <mvc:View> would return a View instance which has no .open() method.
   */
  static factory_popup() {
    return new z2ui5_cl_xml_view({ popup: true });
  }

  // --- Core ---

  _renderRootOpen() {
    if (this._isPopup) {
      return `<core:FragmentDefinition xmlns:m="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.f" xmlns:form="sap.ui.layout.form" xmlns:l="sap.ui.layout" xmlns:mvc="sap.ui.core.mvc" xmlns:table="sap.ui.table" xmlns:unified="sap.ui.unified" xmlns:upload="sap.m.upload" xmlns:uxap="sap.uxap" xmlns:z2ui5="z2ui5"`;
    }
    return `<mvc:View xmlns:m="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.f" xmlns:form="sap.ui.layout.form" xmlns:l="sap.ui.layout" xmlns:mvc="sap.ui.core.mvc" xmlns:table="sap.ui.table" xmlns:unified="sap.ui.unified" xmlns:upload="sap.m.upload" xmlns:uxap="sap.uxap" xmlns:z2ui5="z2ui5" displayBlock="true" height="100%"`;
  }

  _renderRootClose() {
    return this._isPopup ? `</core:FragmentDefinition>` : `</mvc:View>`;
  }

  /**
   * Escapes the 3 chars XML requires inside double-quoted attribute values.
   * `>` and `'` are technically valid unescaped in this context per XML 1.0,
   * so we leave them readable. UI5's XML parser unescapes the rest back during
   * view parsing — URLs with `&`, expressions with `<` etc. survive the trip.
   */
  static _xmlAttrEscape(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  // Always renders the full tree from the root, regardless of which node it's
  // called on — so the abap-style chain `view = factory().Shell().Page(...)...;
  // view.stringify()` produces the same output as keeping a separate root ref.
  stringify() {
    return this.oRoot._renderXml();
  }

  _renderXml() {
    let result;
    if (this === this.oRoot) {
      result = this._renderRootOpen();
    } else {
      if (this.ns && this.ns !== "") {
        result = `<${this.ns}:${this.name} `;
      } else {
        result = `<${this.name} `;
      }
      for (const prop of this.aProp) {
        if (prop.v !== undefined && prop.v !== null) {
          result += `${prop.n}="${z2ui5_cl_xml_view._xmlAttrEscape(prop.v)}" `;
        }
      }
    }

    if (this.aChild.length > 0) {
      result += `>`;
      for (const child of this.aChild) {
        result += child._renderXml();
      }
      if (this !== this.oRoot) {
        if (this.ns && this.ns !== "") {
          result += `</${this.ns}:${this.name}>`;
        } else {
          result += `</${this.name}>`;
        }
      }
    } else {
      result += `/>`;
    }

    if (this === this.oRoot) {
      result += this._renderRootClose();
    }

    return result;
  }

  get_parent() {
    return this.oParent;
  }

  /**
   * Returns a z2ui5_cl_xml_view_cc wrapper bound to this view — mirrors abap
   * z2ui5_cl_xml_view->_z2ui5( ). Use as `view._z2ui5().info({...})`.
   */
  _z2ui5() {
    const Cc = require("./z2ui5_cl_xml_view_cc");
    return new Cc(this);
  }

  /**
   * Returns the most recently added child — mirrors abap2UI5 z2ui5_cl_xml_view->get( ).
   *
   * Useful after a "leaf" call (Input, CheckBox, Button, …) which returns the
   * parent for chaining; .get() then dives back into the just-created leaf so
   * one can attach an aggregation. Example:
   *
   *   form.Input({ ..., suggestionItems: bind, showSuggestion: true })
   *       .get().suggestionItems().ListItem({ ... });
   */
  get() {
    return this.aChild[this.aChild.length - 1] || this;
  }

  generic(val) {
    const oResult = new z2ui5_cl_xml_view();
    oResult.oParent = this;
    oResult.oRoot = this.oRoot;
    this.aChild.push(oResult);

    oResult.name = val.name;
    oResult.ns = val.ns || "";
    for (const prop of val.aProp) {
      oResult.aProp.push(prop);
    }

    return oResult;
  }

  // Helper: add child and return PARENT (for leaf elements like Input, Button, Text)
  _leaf(val) {
    this.generic(val);
    return this;
  }

  // Helper: add child and return CHILD (for container elements like Page, VBox)
  _container(val) {
    return this.generic(val);
  }

  _filterProps(props) {
    return props.filter((p) => p.v !== undefined && p.v !== null);
  }

  boolean_abap_2_json(value) {
    if (value === undefined || value === null) return undefined;
    if (value === true || value === "true" || value === "X") return "true";
    if (value === false || value === "false" || value === "") return "false";
    return value;
  }

  // ========================================================
  // LAYOUT CONTAINERS
  // ========================================================

  Shell(props = {}) {
    return this._container({
      name: "Shell", 
      ns: "m",
      aProp: this._filterProps([]),
    });
  }

  Page({ id, title, showNavButton, showHeader, navButtonPress, class: cssClass } = {}) {
    return this._container({
      name: "Page",
      ns: "m",
      aProp: this._filterProps([
        { n: "id", v: id },
        { n: "title", v: title },
        { n: "showNavButton", v: this.boolean_abap_2_json(showNavButton) },
        { n: "showHeader", v: this.boolean_abap_2_json(showHeader) },
        { n: "navButtonPress", v: navButtonPress },
        { n: "class", v: cssClass },
      ]),
    });
  }

  VBox({ class: cssClass, alignItems, justifyContent, width, height, visible } = {}) {
    return this._container({
      name: "VBox",
      ns: "m",
      aProp: this._filterProps([
        { n: "class", v: cssClass },
        { n: "alignItems", v: alignItems },
        { n: "justifyContent", v: justifyContent },
        { n: "width", v: width },
        { n: "height", v: height },
        { n: "visible", v: this.boolean_abap_2_json(visible) },
      ]),
    });
  }

  HBox({ class: cssClass, alignItems, justifyContent, width, visible } = {}) {
    return this._container({
      name: "HBox",
      ns: "m",
      aProp: this._filterProps([
        { n: "class", v: cssClass },
        { n: "alignItems", v: alignItems },
        { n: "justifyContent", v: justifyContent },
        { n: "width", v: width },
        { n: "visible", v: this.boolean_abap_2_json(visible) },
      ]),
    });
  }

  FlexBox({ class: cssClass, alignItems, justifyContent, direction, wrap, width, height } = {}) {
    return this._container({
      name: "FlexBox",
      ns: "m",
      aProp: this._filterProps([
        { n: "class", v: cssClass },
        { n: "alignItems", v: alignItems },
        { n: "justifyContent", v: justifyContent },
        { n: "direction", v: direction },
        { n: "wrap", v: wrap },
        { n: "width", v: width },
        { n: "height", v: height },
      ]),
    });
  }

  ScrollContainer({ height, width, vertical, horizontal } = {}) {
    return this._container({
      name: "ScrollContainer",
      ns: "m",
      aProp: this._filterProps([
        { n: "height", v: height },
        { n: "width", v: width },
        { n: "vertical", v: this.boolean_abap_2_json(vertical) },
        { n: "horizontal", v: this.boolean_abap_2_json(horizontal) },
      ]),
    });
  }

  Panel({ headerText, expandable, expanded, width } = {}) {
    return this._container({
      name: "Panel",
      ns: "m",
      aProp: this._filterProps([
        { n: "headerText", v: headerText },
        { n: "expandable", v: this.boolean_abap_2_json(expandable) },
        { n: "expanded", v: this.boolean_abap_2_json(expanded) },
        { n: "width", v: width },
      ]),
    });
  }

  IconTabBar({ select, selectedKey, class: cssClass } = {}) {
    return this._container({
      name: "IconTabBar",
      ns: "m",
      aProp: this._filterProps([
        { n: "select", v: select },
        { n: "selectedKey", v: selectedKey },
        { n: "class", v: cssClass },
      ]),
    });
  }

  IconTabFilter({ text, key, icon, count } = {}) {
    return this._container({
      name: "IconTabFilter",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "key", v: key },
        { n: "icon", v: icon },
        { n: "count", v: count },
      ]),
    });
  }

  // ========================================================
  // FORM LAYOUTS
  // ========================================================

  SimpleForm({
    title,
    editable,
    layout,
    columnsL,
    columnsM,
    columnsXL,
    labelSpanL,
    labelSpanM,
    labelSpanS,
    labelSpanXL,
    emptySpanL,
    emptySpanM,
    emptySpanS,
    emptySpanXL,
    singleContainerFullSize,
  } = {}) {
    return this._container({
      name: "SimpleForm",
      ns: "form",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "editable", v: this.boolean_abap_2_json(editable) },
        { n: "layout", v: layout || "ResponsiveGridLayout" },
        { n: "columnsL", v: columnsL },
        { n: "columnsM", v: columnsM },
        { n: "columnsXL", v: columnsXL },
        { n: "labelSpanL", v: labelSpanL },
        { n: "labelSpanM", v: labelSpanM },
        { n: "labelSpanS", v: labelSpanS },
        { n: "labelSpanXL", v: labelSpanXL },
        { n: "emptySpanL", v: emptySpanL },
        { n: "emptySpanM", v: emptySpanM },
        { n: "emptySpanS", v: emptySpanS },
        { n: "emptySpanXL", v: emptySpanXL },
        { n: "singleContainerFullSize", v: this.boolean_abap_2_json(singleContainerFullSize) },
      ]),
    });
  }

  content(props = {}) {
    // Aggregations inherit the parent's namespace — Dialog/Page/Panel use "m",
    // SimpleForm uses "form", uxap controls use "uxap", etc.
    // Hardcoding ns="form" caused UI5 to try loading sap.ui.layout.form.content
    // as a class when used inside a Dialog.
    return this._container({
      name: "content",
      ns: this.ns || "m",
      aProp: [],
    });
  }

  Grid({ defaultSpan, class: cssClass } = {}) {
    return this._container({
      name: "Grid",
      ns: "l",
      aProp: this._filterProps([
        { n: "defaultSpan", v: defaultSpan },
        { n: "class", v: cssClass },
      ]),
    });
  }

  // ========================================================
  // HEADER / TOOLBAR
  // ========================================================

  Toolbar(props = {}) {
    return this._container({
      name: "Toolbar",
      ns: "m",
      aProp: [],
    });
  }

  OverflowToolbar(props = {}) {
    return this._container({
      name: "OverflowToolbar",
      ns: "m",
      aProp: [],
    });
  }

  ToolbarSpacer(props = {}) {
    this.generic({
      name: "ToolbarSpacer",
      ns: "m",
      aProp: [],
    });
    return this;
  }

  ToolbarSeparator(props = {}) {
    this.generic({
      name: "ToolbarSeparator",
      ns: "m",
      aProp: [],
    });
    return this;
  }

  headerContent(props = {}) {
    return this._container({
      name: "headerContent",
      ns: "m",
      aProp: [],
    });
  }

  footer(props = {}) {
    return this._container({
      name: "footer",
      ns: "m",
      aProp: [],
    });
  }

  suggestionItems(props = {}) {
    return this._container({
      name: "suggestionItems",
      ns: "m",
      aProp: [],
    });
  }

  contentLeft(props = {}) {
    return this._container({
      name: "contentLeft",
      ns: "m",
      aProp: [],
    });
  }

  contentMiddle(props = {}) {
    return this._container({
      name: "contentMiddle",
      ns: "m",
      aProp: [],
    });
  }

  contentRight(props = {}) {
    return this._container({
      name: "contentRight",
      ns: "m",
      aProp: [],
    });
  }

  subHeader(props = {}) {
    return this._container({
      name: "subHeader",
      ns: "m",
      aProp: [],
    });
  }

  headerToolbar(props = {}) {
    return this._container({
      name: "headerToolbar",
      ns: this.ns || "m",
      aProp: [],
    });
  }

  // ========================================================
  // TEXT / LABEL / TITLE
  // ========================================================

  Title({ text, level, wrapping } = {}) {
    this.generic({
      name: "Title",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "level", v: level },
        { n: "wrapping", v: this.boolean_abap_2_json(wrapping) },
      ]),
    });
    return this;
  }

  Label({ text, required, design, width } = {}) {
    this.generic({
      name: "Label",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "required", v: this.boolean_abap_2_json(required) },
        { n: "design", v: design },
        { n: "width", v: width },
      ]),
    });
    return this;
  }

  Text({ text, wrapping, maxLines, width } = {}) {
    this.generic({
      name: "Text",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "wrapping", v: this.boolean_abap_2_json(wrapping) },
        { n: "maxLines", v: maxLines },
        { n: "width", v: width },
      ]),
    });
    return this;
  }

  FormattedText({ htmlText } = {}) {
    this.generic({
      name: "FormattedText",
      ns: "m",
      aProp: this._filterProps([{ n: "htmlText", v: htmlText }]),
    });
    return this;
  }

  Link({ text, href, target, press, enabled } = {}) {
    this.generic({
      name: "Link",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "href", v: href },
        { n: "target", v: target },
        { n: "press", v: press },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
      ]),
    });
    return this;
  }

  ObjectHeader({ title, number, numberUnit, intro, icon } = {}) {
    return this._container({
      name: "ObjectHeader",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "number", v: number },
        { n: "numberUnit", v: numberUnit },
        { n: "intro", v: intro },
        { n: "icon", v: icon },
      ]),
    });
  }

  ObjectAttribute({ title, text } = {}) {
    this.generic({
      name: "ObjectAttribute",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "text", v: text },
      ]),
    });
    return this;
  }

  ObjectStatus({ text, state, icon } = {}) {
    this.generic({
      name: "ObjectStatus",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "state", v: state },
        { n: "icon", v: icon },
      ]),
    });
    return this;
  }

  ObjectNumber({ number, unit, state } = {}) {
    this.generic({
      name: "ObjectNumber",
      ns: "m",
      aProp: this._filterProps([
        { n: "number", v: number },
        { n: "unit", v: unit },
        { n: "state", v: state },
      ]),
    });
    return this;
  }

  // ========================================================
  // INPUT CONTROLS
  // ========================================================

  Input({ id, value, placeholder, enabled, type, width, submit, valueState, valueStateText, showValueHelp, valueHelpRequest, description, editable, maxLength, suggestionItems, showSuggestion } = {}) {
    this.generic({
      name: "Input",
      ns: "m",
      aProp: this._filterProps([
        { n: "id", v: id },
        { n: "value", v: value },
        { n: "placeholder", v: placeholder },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
        { n: "type", v: type },
        { n: "width", v: width },
        { n: "submit", v: submit },
        { n: "valueState", v: valueState },
        { n: "valueStateText", v: valueStateText },
        { n: "showValueHelp", v: this.boolean_abap_2_json(showValueHelp) },
        { n: "valueHelpRequest", v: valueHelpRequest },
        { n: "description", v: description },
        { n: "editable", v: this.boolean_abap_2_json(editable) },
        { n: "maxLength", v: maxLength },
        { n: "suggestionItems", v: suggestionItems },
        { n: "showSuggestion", v: this.boolean_abap_2_json(showSuggestion) },
      ]),
    });
    return this;
  }

  TextArea({ value, rows, cols, growing, growingMaxLines, width, placeholder, enabled, editable } = {}) {
    this.generic({
      name: "TextArea",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "rows", v: rows },
        { n: "cols", v: cols },
        { n: "growing", v: this.boolean_abap_2_json(growing) },
        { n: "growingMaxLines", v: growingMaxLines },
        { n: "width", v: width },
        { n: "placeholder", v: placeholder },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
        { n: "editable", v: this.boolean_abap_2_json(editable) },
      ]),
    });
    return this;
  }

  SearchField({ value, placeholder, search, width, liveChange } = {}) {
    this.generic({
      name: "SearchField",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "placeholder", v: placeholder },
        { n: "search", v: search },
        { n: "width", v: width },
        { n: "liveChange", v: liveChange },
      ]),
    });
    return this;
  }

  DatePicker({ value, displayFormat, valueFormat, placeholder, change } = {}) {
    this.generic({
      name: "DatePicker",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "displayFormat", v: displayFormat },
        { n: "valueFormat", v: valueFormat },
        { n: "placeholder", v: placeholder },
        { n: "change", v: change },
      ]),
    });
    return this;
  }

  DateTimePicker({ value, displayFormat, valueFormat, placeholder, change } = {}) {
    this.generic({
      name: "DateTimePicker",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "displayFormat", v: displayFormat },
        { n: "valueFormat", v: valueFormat },
        { n: "placeholder", v: placeholder },
        { n: "change", v: change },
      ]),
    });
    return this;
  }

  TimePicker({ value, displayFormat, valueFormat, placeholder, change } = {}) {
    this.generic({
      name: "TimePicker",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "displayFormat", v: displayFormat },
        { n: "valueFormat", v: valueFormat },
        { n: "placeholder", v: placeholder },
        { n: "change", v: change },
      ]),
    });
    return this;
  }

  CheckBox({ text, selected, select, enabled } = {}) {
    this.generic({
      name: "CheckBox",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "selected", v: selected },
        { n: "select", v: select },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
      ]),
    });
    return this;
  }

  Switch({ state, change, type, enabled, customTextOn, customTextOff } = {}) {
    this.generic({
      name: "Switch",
      ns: "m",
      aProp: this._filterProps([
        { n: "state", v: state },
        { n: "change", v: change },
        { n: "type", v: type },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
        { n: "customTextOn", v: customTextOn },
        { n: "customTextOff", v: customTextOff },
      ]),
    });
    return this;
  }

  Select({ selectedKey, change, forceSelection, width, items: itemsPath } = {}) {
    return this._container({
      name: "Select",
      ns: "m",
      aProp: this._filterProps([
        { n: "selectedKey", v: selectedKey },
        { n: "change", v: change },
        { n: "forceSelection", v: this.boolean_abap_2_json(forceSelection) },
        { n: "width", v: width },
        { n: "items", v: itemsPath },
      ]),
    });
  }

  ComboBox({ selectedKey, value, change, placeholder, width, items: itemsPath } = {}) {
    return this._container({
      name: "ComboBox",
      ns: "m",
      aProp: this._filterProps([
        { n: "selectedKey", v: selectedKey },
        { n: "value", v: value },
        { n: "change", v: change },
        { n: "placeholder", v: placeholder },
        { n: "width", v: width },
        { n: "items", v: itemsPath },
      ]),
    });
  }

  MultiComboBox({ selectedKeys, selectionChange, placeholder, width, items: itemsPath } = {}) {
    return this._container({
      name: "MultiComboBox",
      ns: "m",
      aProp: this._filterProps([
        { n: "selectedKeys", v: selectedKeys },
        { n: "selectionChange", v: selectionChange },
        { n: "placeholder", v: placeholder },
        { n: "width", v: width },
        { n: "items", v: itemsPath },
      ]),
    });
  }

  Item({ key, text } = {}) {
    this.generic({
      name: "Item",
      ns: "core",
      aProp: this._filterProps([
        { n: "key", v: key },
        { n: "text", v: text },
      ]),
    });
    return this;
  }

  ListItem({ text, additionalText, icon } = {}) {
    this.generic({
      name: "ListItem",
      ns: "core",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "additionalText", v: additionalText },
        { n: "icon", v: icon },
      ]),
    });
    return this;
  }

  Slider({ value, min, max, step, width, change } = {}) {
    this.generic({
      name: "Slider",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "min", v: min },
        { n: "max", v: max },
        { n: "step", v: step },
        { n: "width", v: width },
        { n: "change", v: change },
      ]),
    });
    return this;
  }

  RatingIndicator({ value, maxValue, change, editable } = {}) {
    this.generic({
      name: "RatingIndicator",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "maxValue", v: maxValue },
        { n: "change", v: change },
        { n: "editable", v: this.boolean_abap_2_json(editable) },
      ]),
    });
    return this;
  }

  StepInput({ value, min, max, step, change, editable } = {}) {
    this.generic({
      name: "StepInput",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "min", v: min },
        { n: "max", v: max },
        { n: "step", v: step },
        { n: "change", v: change },
        { n: "editable", v: this.boolean_abap_2_json(editable) },
      ]),
    });
    return this;
  }

  // ========================================================
  // BUTTONS
  // ========================================================

  Button({ text, press, icon, type, enabled, visible, width } = {}) {
    this.generic({
      name: "Button",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "press", v: press },
        { n: "icon", v: icon },
        { n: "type", v: type },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
        { n: "visible", v: this.boolean_abap_2_json(visible) },
        { n: "width", v: width },
      ]),
    });
    return this;
  }

  SegmentedButton({ selectedKey, selectionChange } = {}) {
    return this._container({
      name: "SegmentedButton",
      ns: "m",
      aProp: this._filterProps([
        { n: "selectedKey", v: selectedKey },
        { n: "selectionChange", v: selectionChange },
      ]),
    });
  }

  SegmentedButtonItem({ key, text, icon } = {}) {
    this.generic({
      name: "SegmentedButtonItem",
      ns: "m",
      aProp: this._filterProps([
        { n: "key", v: key },
        { n: "text", v: text },
        { n: "icon", v: icon },
      ]),
    });
    return this;
  }

  // ========================================================
  // TABLE (sap.m.Table)
  // ========================================================

  Table({ items, mode, headerText, sticky, growing, growingThreshold, width, alternateRowColors } = {}) {
    return this._container({
      name: "Table",
      ns: "m",
      aProp: this._filterProps([
        { n: "items", v: items },
        { n: "mode", v: mode },
        { n: "headerText", v: headerText },
        { n: "sticky", v: sticky },
        { n: "growing", v: this.boolean_abap_2_json(growing) },
        { n: "growingThreshold", v: growingThreshold },
        { n: "width", v: width },
        { n: "alternateRowColors", v: this.boolean_abap_2_json(alternateRowColors) },
      ]),
    });
  }

  columns(props = {}) {
    return this._container({
      name: "columns",
      ns: "m",
      aProp: [],
    });
  }

  Column({ width, hAlign, vAlign, minScreenWidth, demandPopin, popinDisplay } = {}) {
    return this._container({
      name: "Column",
      ns: "m",
      aProp: this._filterProps([
        { n: "width", v: width },
        { n: "hAlign", v: hAlign },
        { n: "vAlign", v: vAlign },
        { n: "minScreenWidth", v: minScreenWidth },
        { n: "demandPopin", v: this.boolean_abap_2_json(demandPopin) },
        { n: "popinDisplay", v: popinDisplay },
      ]),
    });
  }

  items(props = {}) {
    return this._container({
      name: "items",
      ns: "m",
      aProp: [],
    });
  }

  ColumnListItem({ type, press, selected } = {}) {
    return this._container({
      name: "ColumnListItem",
      ns: "m",
      aProp: this._filterProps([
        { n: "type", v: type },
        { n: "press", v: press },
        { n: "selected", v: selected },
      ]),
    });
  }

  cells(props = {}) {
    return this._container({
      name: "cells",
      ns: "m",
      aProp: [],
    });
  }

  // ========================================================
  // LIST
  // ========================================================

  List({ items: itemsPath, mode, headerText, selectionChange } = {}) {
    return this._container({
      name: "List",
      ns: "m",
      aProp: this._filterProps([
        { n: "items", v: itemsPath },
        { n: "mode", v: mode },
        { n: "headerText", v: headerText },
        { n: "selectionChange", v: selectionChange },
      ]),
    });
  }

  StandardListItem({ title, description, icon, type, press, info, infoState } = {}) {
    this.generic({
      name: "StandardListItem",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "description", v: description },
        { n: "icon", v: icon },
        { n: "type", v: type },
        { n: "press", v: press },
        { n: "info", v: info },
        { n: "infoState", v: infoState },
      ]),
    });
    return this;
  }

  CustomListItem({ type, press } = {}) {
    return this._container({
      name: "CustomListItem",
      ns: "m",
      aProp: this._filterProps([
        { n: "type", v: type },
        { n: "press", v: press },
      ]),
    });
  }

  ObjectListItem({ title, number, numberUnit, type, press, icon } = {}) {
    return this._container({
      name: "ObjectListItem",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "number", v: number },
        { n: "numberUnit", v: numberUnit },
        { n: "type", v: type },
        { n: "press", v: press },
        { n: "icon", v: icon },
      ]),
    });
  }

  // ========================================================
  // DIALOG / POPUP
  // ========================================================

  Dialog({ title, icon, type, state, contentWidth, contentHeight, verticalScrolling, draggable, resizable, stretch, afterClose } = {}) {
    return this._container({
      name: "Dialog",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "icon", v: icon },
        { n: "type", v: type },
        { n: "state", v: state },
        { n: "contentWidth", v: contentWidth },
        { n: "contentHeight", v: contentHeight },
        { n: "verticalScrolling", v: this.boolean_abap_2_json(verticalScrolling) },
        { n: "draggable", v: this.boolean_abap_2_json(draggable) },
        { n: "resizable", v: this.boolean_abap_2_json(resizable) },
        { n: "stretch", v: this.boolean_abap_2_json(stretch) },
        { n: "afterClose", v: afterClose },
      ]),
    });
  }

  TableSelectDialog({ title, items, cancel, search, confirm, growing, contentWidth, contentHeight, growingThreshold, multiSelect } = {}) {
    return this._container({
      name: "TableSelectDialog",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "items", v: items },
        { n: "cancel", v: cancel },
        { n: "search", v: search },
        { n: "confirm", v: confirm },
        { n: "growing", v: this.boolean_abap_2_json(growing) },
        { n: "contentWidth", v: contentWidth },
        { n: "contentHeight", v: contentHeight },
        { n: "growingThreshold", v: growingThreshold },
        { n: "multiSelect", v: this.boolean_abap_2_json(multiSelect) },
      ]),
    });
  }

  buttons(props = {}) {
    return this._container({
      name: "buttons",
      ns: this.ns || "m",
      aProp: [],
    });
  }

  beginButton(props = {}) {
    return this._container({
      name: "beginButton",
      ns: this.ns || "m",
      aProp: [],
    });
  }

  endButton(props = {}) {
    return this._container({
      name: "endButton",
      ns: this.ns || "m",
      aProp: [],
    });
  }

  Popover({ title, placement, contentWidth, contentHeight } = {}) {
    return this._container({
      name: "Popover",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "placement", v: placement },
        { n: "contentWidth", v: contentWidth },
        { n: "contentHeight", v: contentHeight },
      ]),
    });
  }

  // ========================================================
  // MESSAGES / INDICATORS
  // ========================================================

  MessageStrip({ text, type, showIcon, showCloseButton } = {}) {
    this.generic({
      name: "MessageStrip",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "type", v: type },
        { n: "showIcon", v: this.boolean_abap_2_json(showIcon) },
        { n: "showCloseButton", v: this.boolean_abap_2_json(showCloseButton) },
      ]),
    });
    return this;
  }

  BusyIndicator({ size, text } = {}) {
    this.generic({
      name: "BusyIndicator",
      ns: "m",
      aProp: this._filterProps([
        { n: "size", v: size },
        { n: "text", v: text },
      ]),
    });
    return this;
  }

  ProgressIndicator({ percentValue, displayValue, state, showValue } = {}) {
    this.generic({
      name: "ProgressIndicator",
      ns: "m",
      aProp: this._filterProps([
        { n: "percentValue", v: percentValue },
        { n: "displayValue", v: displayValue },
        { n: "state", v: state },
        { n: "showValue", v: this.boolean_abap_2_json(showValue) },
      ]),
    });
    return this;
  }

  // ========================================================
  // ICONS / IMAGES / AVATARS
  // ========================================================

  Icon({ src, size, color, press } = {}) {
    this.generic({
      name: "Icon",
      ns: "core",
      aProp: this._filterProps([
        { n: "src", v: src },
        { n: "size", v: size },
        { n: "color", v: color },
        { n: "press", v: press },
      ]),
    });
    return this;
  }

  Image({ src, width, height, alt, mode } = {}) {
    this.generic({
      name: "Image",
      ns: "m",
      aProp: this._filterProps([
        { n: "src", v: src },
        { n: "width", v: width },
        { n: "height", v: height },
        { n: "alt", v: alt },
        { n: "mode", v: mode },
      ]),
    });
    return this;
  }

  Avatar({ src, initials, displaySize, displayShape, press } = {}) {
    this.generic({
      name: "Avatar",
      ns: "m",
      aProp: this._filterProps([
        { n: "src", v: src },
        { n: "initials", v: initials },
        { n: "displaySize", v: displaySize },
        { n: "displayShape", v: displayShape },
        { n: "press", v: press },
      ]),
    });
    return this;
  }

  // ========================================================
  // FIORI ELEMENTS (sap.f)
  // ========================================================

  DynamicPage({ headerExpanded, toggleHeaderOnTitleClick } = {}) {
    return this._container({
      name: "DynamicPage",
      ns: "f",
      aProp: this._filterProps([
        { n: "headerExpanded", v: this.boolean_abap_2_json(headerExpanded) },
        { n: "toggleHeaderOnTitleClick", v: this.boolean_abap_2_json(toggleHeaderOnTitleClick) },
      ]),
    });
  }

  DynamicPageTitle(props = {}) {
    return this._container({
      name: "DynamicPageTitle",
      ns: "f",
      aProp: [],
    });
  }

  DynamicPageHeader({ pinnable } = {}) {
    return this._container({
      name: "DynamicPageHeader",
      ns: "f",
      aProp: this._filterProps([
        { n: "pinnable", v: this.boolean_abap_2_json(pinnable) },
      ]),
    });
  }

  // Aggregation accessors for DynamicPage
  title(props = {}) {
    return this._container({ name: "title", ns: "f", aProp: [] });
  }

  header(props = {}) {
    return this._container({ name: "header", ns: this.ns || "m", aProp: [] });
  }

  heading(props = {}) {
    return this._container({ name: "heading", ns: this.ns || "m", aProp: [] });
  }

  expandedHeading(props = {}) {
    return this._container({ name: "expandedHeading", ns: this.ns || "m", aProp: [] });
  }

  snappedHeading(props = {}) {
    return this._container({ name: "snappedHeading", ns: this.ns || "m", aProp: [] });
  }

  actions(props = {}) {
    return this._container({ name: "actions", ns: this.ns || "m", aProp: [] });
  }

  // ========================================================
  // GENERIC ELEMENT
  // ========================================================

  cc(name, { ns, ...props } = {}) {
    const aProp = [];
    for (const [key, val] of Object.entries(props)) {
      if (val !== undefined && val !== null) {
        aProp.push({ n: key, v: val });
      }
    }
    return this._container({
      name: name,
      ns: ns || "",
      aProp: aProp,
    });
  }

  // Leaf version (returns parent)
  ccl(name, { ns, ...props } = {}) {
    const aProp = [];
    for (const [key, val] of Object.entries(props)) {
      if (val !== undefined && val !== null) {
        aProp.push({ n: key, v: val });
      }
    }
    this.generic({
      name: name,
      ns: ns || "",
      aProp: aProp,
    });
    return this;
  }

  // ========================================================
  // OBJECT PAGE LAYOUT (uxap namespace)
  // ========================================================

  ObjectPageLayout({ showTitleInHeaderContent, upperCaseAnchorBar, useIconTabBar } = {}) {
    return this._container({
      name: "ObjectPageLayout",
      ns: "uxap",
      aProp: this._filterProps([
        { n: "showTitleInHeaderContent", v: this.boolean_abap_2_json(showTitleInHeaderContent) },
        { n: "upperCaseAnchorBar", v: this.boolean_abap_2_json(upperCaseAnchorBar) },
        { n: "useIconTabBar", v: this.boolean_abap_2_json(useIconTabBar) },
      ]),
    });
  }

  ObjectPageSection({ title, titleUppercase } = {}) {
    return this._container({
      name: "ObjectPageSection",
      ns: "uxap",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "titleUppercase", v: this.boolean_abap_2_json(titleUppercase) },
      ]),
    });
  }

  ObjectPageSubSection({ title } = {}) {
    return this._container({
      name: "ObjectPageSubSection",
      ns: "uxap",
      aProp: this._filterProps([{ n: "title", v: title }]),
    });
  }

  // ========================================================
  // ILLUSTRATED + MESSAGE
  // ========================================================

  IllustratedMessage({ illustrationType, illustrationSize, title, description, enableVerticalResponsiveness, enableFormattedText } = {}) {
    return this._container({
      name: "IllustratedMessage",
      ns: "m",
      aProp: this._filterProps([
        { n: "illustrationType", v: illustrationType },
        { n: "illustrationSize", v: illustrationSize },
        { n: "title", v: title },
        { n: "description", v: description },
        { n: "enableVerticalResponsiveness", v: this.boolean_abap_2_json(enableVerticalResponsiveness) },
        { n: "enableFormattedText", v: this.boolean_abap_2_json(enableFormattedText) },
      ]),
    });
  }

  MessagePopover({ items, headerButton, asyncDescriptionHandler } = {}) {
    return this._container({
      name: "MessagePopover",
      ns: "m",
      aProp: this._filterProps([
        { n: "items", v: items },
        { n: "headerButton", v: headerButton },
        { n: "asyncDescriptionHandler", v: asyncDescriptionHandler },
      ]),
    });
  }

  MessageView({ items, asyncDescriptionHandler } = {}) {
    return this._container({
      name: "MessageView",
      ns: "m",
      aProp: this._filterProps([
        { n: "items", v: items },
        { n: "asyncDescriptionHandler", v: asyncDescriptionHandler },
      ]),
    });
  }

  MessagePage({ title, text, description, icon, showHeader, showNavButton, navButtonPress } = {}) {
    return this._container({
      name: "MessagePage",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "text", v: text },
        { n: "description", v: description },
        { n: "icon", v: icon },
        { n: "showHeader", v: this.boolean_abap_2_json(showHeader) },
        { n: "showNavButton", v: this.boolean_abap_2_json(showNavButton) },
        { n: "navButtonPress", v: navButtonPress },
      ]),
    });
  }

  MessageItem({ type, title, subtitle, description, longtextUrl, groupName, counter, activeTitle } = {}) {
    return this._leaf({
      name: "MessageItem",
      ns: "m",
      aProp: this._filterProps([
        { n: "type", v: type },
        { n: "title", v: title },
        { n: "subtitle", v: subtitle },
        { n: "description", v: description },
        { n: "longtextUrl", v: longtextUrl },
        { n: "groupName", v: groupName },
        { n: "counter", v: counter },
        { n: "activeTitle", v: this.boolean_abap_2_json(activeTitle) },
      ]),
    });
  }

  // ========================================================
  // TABLES (advanced — sap.ui.table namespace)
  // ========================================================

  AnalyticalTable({ rows, selectionMode, visibleRowCount, threshold, enableColumnReordering, enableGrouping, enableSelectAll } = {}) {
    return this._container({
      name: "AnalyticalTable",
      ns: "table",
      aProp: this._filterProps([
        { n: "rows", v: rows },
        { n: "selectionMode", v: selectionMode },
        { n: "visibleRowCount", v: visibleRowCount },
        { n: "threshold", v: threshold },
        { n: "enableColumnReordering", v: this.boolean_abap_2_json(enableColumnReordering) },
        { n: "enableGrouping", v: this.boolean_abap_2_json(enableGrouping) },
        { n: "enableSelectAll", v: this.boolean_abap_2_json(enableSelectAll) },
      ]),
    });
  }

  TreeTable({ rows, selectionMode, visibleRowCount, threshold, enableColumnReordering } = {}) {
    return this._container({
      name: "TreeTable",
      ns: "table",
      aProp: this._filterProps([
        { n: "rows", v: rows },
        { n: "selectionMode", v: selectionMode },
        { n: "visibleRowCount", v: visibleRowCount },
        { n: "threshold", v: threshold },
        { n: "enableColumnReordering", v: this.boolean_abap_2_json(enableColumnReordering) },
      ]),
    });
  }

  // ========================================================
  // TILES
  // ========================================================

  GenericTile({ header, subheader, frameType, press, mode, state, scope, class: cssClass } = {}) {
    return this._container({
      name: "GenericTile",
      ns: "m",
      aProp: this._filterProps([
        { n: "header", v: header },
        { n: "subheader", v: subheader },
        { n: "frameType", v: frameType },
        { n: "press", v: press },
        { n: "mode", v: mode },
        { n: "state", v: state },
        { n: "scope", v: scope },
        { n: "class", v: cssClass },
      ]),
    });
  }

  TileContent({ unit, footer, footerColor } = {}) {
    return this._container({
      name: "TileContent",
      ns: "m",
      aProp: this._filterProps([
        { n: "unit", v: unit },
        { n: "footer", v: footer },
        { n: "footerColor", v: footerColor },
      ]),
    });
  }

  NumericContent({ value, scale, indicator, valueColor, icon, withMargin, animateTextChange } = {}) {
    return this._leaf({
      name: "NumericContent",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "scale", v: scale },
        { n: "indicator", v: indicator },
        { n: "valueColor", v: valueColor },
        { n: "icon", v: icon },
        { n: "withMargin", v: this.boolean_abap_2_json(withMargin) },
        { n: "animateTextChange", v: this.boolean_abap_2_json(animateTextChange) },
      ]),
    });
  }

  ImageContent({ src, description, press } = {}) {
    return this._leaf({
      name: "ImageContent",
      ns: "m",
      aProp: this._filterProps([
        { n: "src", v: src },
        { n: "description", v: description },
        { n: "press", v: press },
      ]),
    });
  }

  // ========================================================
  // AVATAR GROUP
  // ========================================================

  AvatarGroup({ groupType, items, press } = {}) {
    return this._container({
      name: "AvatarGroup",
      ns: "m",
      aProp: this._filterProps([
        { n: "groupType", v: groupType },
        { n: "items", v: items },
        { n: "press", v: press },
      ]),
    });
  }

  AvatarGroupItem({ src, initials, fallbackIcon } = {}) {
    return this._leaf({
      name: "AvatarGroupItem",
      ns: "m",
      aProp: this._filterProps([
        { n: "src", v: src },
        { n: "initials", v: initials },
        { n: "fallbackIcon", v: fallbackIcon },
      ]),
    });
  }

  // ========================================================
  // TAB CONTAINER + CAROUSEL + WIZARD
  // ========================================================

  TabContainer({ items, itemSelect, itemClose, addNewButtonPress, showAddNewButton } = {}) {
    return this._container({
      name: "TabContainer",
      ns: "m",
      aProp: this._filterProps([
        { n: "items", v: items },
        { n: "itemSelect", v: itemSelect },
        { n: "itemClose", v: itemClose },
        { n: "addNewButtonPress", v: addNewButtonPress },
        { n: "showAddNewButton", v: this.boolean_abap_2_json(showAddNewButton) },
      ]),
    });
  }

  TabContainerItem({ name, key, icon, modified } = {}) {
    return this._container({
      name: "TabContainerItem",
      ns: "m",
      aProp: this._filterProps([
        { n: "name", v: name },
        { n: "key", v: key },
        { n: "icon", v: icon },
        { n: "modified", v: this.boolean_abap_2_json(modified) },
      ]),
    });
  }

  Carousel({ pages, activePage, pageChanged, loop, showPageIndicator } = {}) {
    return this._container({
      name: "Carousel",
      ns: "m",
      aProp: this._filterProps([
        { n: "pages", v: pages },
        { n: "activePage", v: activePage },
        { n: "pageChanged", v: pageChanged },
        { n: "loop", v: this.boolean_abap_2_json(loop) },
        { n: "showPageIndicator", v: this.boolean_abap_2_json(showPageIndicator) },
      ]),
    });
  }

  Wizard({ steps, complete, currentStep, showNextButton, finishButtonText } = {}) {
    return this._container({
      name: "Wizard",
      ns: "m",
      aProp: this._filterProps([
        { n: "steps", v: steps },
        { n: "complete", v: complete },
        { n: "currentStep", v: currentStep },
        { n: "showNextButton", v: this.boolean_abap_2_json(showNextButton) },
        { n: "finishButtonText", v: finishButtonText },
      ]),
    });
  }

  WizardStep({ title, validated, complete, activate } = {}) {
    return this._container({
      name: "WizardStep",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "validated", v: this.boolean_abap_2_json(validated) },
        { n: "complete", v: complete },
        { n: "activate", v: activate },
      ]),
    });
  }

  // ========================================================
  // LAYOUT DATA
  // ========================================================

  FlexItemData({ growFactor, shrinkFactor, baseSize, alignSelf, order, styleClass } = {}) {
    return this._leaf({
      name: "FlexItemData",
      ns: "m",
      aProp: this._filterProps([
        { n: "growFactor", v: growFactor },
        { n: "shrinkFactor", v: shrinkFactor },
        { n: "baseSize", v: baseSize },
        { n: "alignSelf", v: alignSelf },
        { n: "order", v: order },
        { n: "styleClass", v: styleClass },
      ]),
    });
  }

  GridData({ span, indent, linebreak, visibleL, visibleM, visibleS } = {}) {
    return this._leaf({
      name: "GridData",
      ns: "l",
      aProp: this._filterProps([
        { n: "span", v: span },
        { n: "indent", v: indent },
        { n: "linebreak", v: this.boolean_abap_2_json(linebreak) },
        { n: "visibleL", v: this.boolean_abap_2_json(visibleL) },
        { n: "visibleM", v: this.boolean_abap_2_json(visibleM) },
        { n: "visibleS", v: this.boolean_abap_2_json(visibleS) },
      ]),
    });
  }

  // ========================================================
  // MENU + MORE BUTTONS
  // ========================================================

  MenuButton({ text, icon, type, defaultAction, menuPosition, useDefaultActionOnly } = {}) {
    return this._container({
      name: "MenuButton",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "icon", v: icon },
        { n: "type", v: type },
        { n: "defaultAction", v: defaultAction },
        { n: "menuPosition", v: menuPosition },
        { n: "useDefaultActionOnly", v: this.boolean_abap_2_json(useDefaultActionOnly) },
      ]),
    });
  }

  Menu({ items, itemSelected } = {}) {
    return this._container({
      name: "Menu",
      ns: "m",
      aProp: this._filterProps([
        { n: "items", v: items },
        { n: "itemSelected", v: itemSelected },
      ]),
    });
  }

  MenuItem({ text, icon, press, enabled } = {}) {
    return this._container({
      name: "MenuItem",
      ns: "m",
      aProp: this._filterProps([
        { n: "text", v: text },
        { n: "icon", v: icon },
        { n: "press", v: press },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
      ]),
    });
  }

  BarcodeScannerButton({ scanSuccess, scanFail, dialogTitle, type, provideFallback } = {}) {
    return this._leaf({
      name: "BarcodeScannerButton",
      ns: "m",
      aProp: this._filterProps([
        { n: "scanSuccess", v: scanSuccess },
        { n: "scanFail", v: scanFail },
        { n: "dialogTitle", v: dialogTitle },
        { n: "type", v: type },
        { n: "provideFallback", v: this.boolean_abap_2_json(provideFallback) },
      ]),
    });
  }

  // ========================================================
  // MULTI INPUT + TOKENS
  // ========================================================

  MultiInput({ value, valueState, valueStateText, tokens, suggestionItems, tokenUpdate, submit, change, placeholder, enabled } = {}) {
    return this._container({
      name: "MultiInput",
      ns: "m",
      aProp: this._filterProps([
        { n: "value", v: value },
        { n: "valueState", v: valueState },
        { n: "valueStateText", v: valueStateText },
        { n: "tokens", v: tokens },
        { n: "suggestionItems", v: suggestionItems },
        { n: "tokenUpdate", v: tokenUpdate },
        { n: "submit", v: submit },
        { n: "change", v: change },
        { n: "placeholder", v: placeholder },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
      ]),
    });
  }

  Token({ key, text, editable, selected } = {}) {
    return this._leaf({
      name: "Token",
      ns: "m",
      aProp: this._filterProps([
        { n: "key", v: key },
        { n: "text", v: text },
        { n: "editable", v: this.boolean_abap_2_json(editable) },
        { n: "selected", v: this.boolean_abap_2_json(selected) },
      ]),
    });
  }

  // ========================================================
  // BAR + BREADCRUMBS
  // ========================================================

  Bar({ contentLeft, contentMiddle, contentRight, design, translucent } = {}) {
    return this._container({
      name: "Bar",
      ns: "m",
      aProp: this._filterProps([
        { n: "contentLeft", v: contentLeft },
        { n: "contentMiddle", v: contentMiddle },
        { n: "contentRight", v: contentRight },
        { n: "design", v: design },
        { n: "translucent", v: this.boolean_abap_2_json(translucent) },
      ]),
    });
  }

  Breadcrumbs({ links, currentLocationText, separatorStyle } = {}) {
    return this._container({
      name: "Breadcrumbs",
      ns: "m",
      aProp: this._filterProps([
        { n: "links", v: links },
        { n: "currentLocationText", v: currentLocationText },
        { n: "separatorStyle", v: separatorStyle },
      ]),
    });
  }

  RangeSlider({ min, max, step, startValue, endValue, value, value2, showTickmarks, labelInterval, width, change, enabled, class: cssClass } = {}) {
    return this._leaf({
      name: "RangeSlider",
      ns: "m",
      aProp: this._filterProps([
        { n: "min", v: min },
        { n: "max", v: max },
        { n: "step", v: step },
        { n: "startValue", v: startValue },
        { n: "endValue", v: endValue },
        { n: "value", v: value },
        { n: "value2", v: value2 },
        { n: "showTickmarks", v: this.boolean_abap_2_json(showTickmarks) },
        { n: "enableTickmarks", v: this.boolean_abap_2_json(showTickmarks) },
        { n: "labelInterval", v: labelInterval },
        { n: "width", v: width },
        { n: "change", v: change },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
        { n: "class", v: cssClass },
      ]),
    });
  }
}

module.exports = z2ui5_cl_xml_view;
