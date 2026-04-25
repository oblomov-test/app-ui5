class z2ui5_cl_xml_view {

  oRoot = {};
  oParent;
  aChild = [];

  name;
  ns;
  aProp = [];

  constructor() {
    this.oRoot = this;
  }

  // --- Core ---

  stringify() {
    if (this === this.oRoot) {
      var result = `<mvc:View xmlns:m="sap.m" xmlns:core="sap.ui.core" xmlns:f="sap.f" xmlns:form="sap.ui.layout.form" xmlns:l="sap.ui.layout" xmlns:mvc="sap.ui.core.mvc" xmlns:table="sap.ui.table" xmlns:unified="sap.ui.unified" xmlns:upload="sap.m.upload" displayBlock="true" height="100%"`;
    } else {
      if (this.ns && this.ns !== "") {
        result = `<${this.ns}:${this.name} `;
      } else {
        result = `<${this.name} `;
      }

      for (const prop of this.aProp) {
        if (prop.v !== undefined && prop.v !== null) {
          result += `${prop.n}="${prop.v}" `;
        }
      }
    }

    if (this.aChild.length > 0) {
      result += `>`;
      for (const child of this.aChild) {
        result += child.stringify();
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
      result += `</mvc:View>`;
    }

    return result;
  }

  get_parent() {
    return this.oParent;
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

  Page({ title, showNavButton, showHeader, navButtonPress, class: cssClass } = {}) {
    return this._container({
      name: "Page",
      ns: "m",
      aProp: this._filterProps([
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
    return this._container({
      name: "content",
      ns: "form",
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

  subHeader(props = {}) {
    return this._container({
      name: "subHeader",
      ns: "m",
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

  Input({ value, placeholder, enabled, type, width, submit, valueState, valueStateText, showValueHelp, valueHelpRequest, description, editable, maxLength } = {}) {
    this.generic({
      name: "Input",
      ns: "m",
      aProp: this._filterProps([
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

  Switch({ state, change, type, enabled } = {}) {
    this.generic({
      name: "Switch",
      ns: "m",
      aProp: this._filterProps([
        { n: "state", v: state },
        { n: "change", v: change },
        { n: "type", v: type },
        { n: "enabled", v: this.boolean_abap_2_json(enabled) },
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

  Dialog({ title, type, state, contentWidth, contentHeight, draggable, resizable, stretch, afterClose } = {}) {
    return this._container({
      name: "Dialog",
      ns: "m",
      aProp: this._filterProps([
        { n: "title", v: title },
        { n: "type", v: type },
        { n: "state", v: state },
        { n: "contentWidth", v: contentWidth },
        { n: "contentHeight", v: contentHeight },
        { n: "draggable", v: this.boolean_abap_2_json(draggable) },
        { n: "resizable", v: this.boolean_abap_2_json(resizable) },
        { n: "stretch", v: this.boolean_abap_2_json(stretch) },
        { n: "afterClose", v: afterClose },
      ]),
    });
  }

  buttons(props = {}) {
    return this._container({
      name: "buttons",
      ns: "",
      aProp: [],
    });
  }

  beginButton(props = {}) {
    return this._container({
      name: "beginButton",
      ns: "",
      aProp: [],
    });
  }

  endButton(props = {}) {
    return this._container({
      name: "endButton",
      ns: "",
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
    return this._container({ name: "header", ns: "f", aProp: [] });
  }

  heading(props = {}) {
    return this._container({ name: "heading", ns: "", aProp: [] });
  }

  expandedHeading(props = {}) {
    return this._container({ name: "expandedHeading", ns: "", aProp: [] });
  }

  snappedHeading(props = {}) {
    return this._container({ name: "snappedHeading", ns: "", aProp: [] });
  }

  actions(props = {}) {
    return this._container({ name: "actions", ns: "", aProp: [] });
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
}

module.exports = z2ui5_cl_xml_view;
