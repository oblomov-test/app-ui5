const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");
const z2ui5_cl_util = require("../z2ui5/00/03/z2ui5_cl_util");

/**
 * z2ui5_cl_demo_app_000 — Sample Browser / Launchpad
 * 1:1 port of abap2UI5-samples/src/z2ui5_cl_demo_app_000.clas.abap.
 *
 * The big SECTIONS array mirrors the abap method body (panels + tiles).
 * Tiles whose `p` (press = classname) doesn't resolve to a loadable class
 * silently fail on click — same as the abap CATCH cx_root branch.
 */

// Layout extracted from the abap source — outer panel → sub-panels → tiles.
const SECTIONS =
[
  { outer: "General", var: "basics", sub: [
    { inner: "Binding", tiles: [
        { h: "Binding I", s: "Simple - Send values to the backend", p: "z2ui5_cl_demo_app_001" },
        { h: "Binding II", s: "Structure Component Level", p: "z2ui5_cl_demo_app_166" },
        { h: "Binding III", s: "Table Cell Level", p: "z2ui5_cl_demo_app_144" },
        { h: "setSizeLimit", s: "", p: "z2ui5_cl_demo_app_071" }
    ] },
    { inner: "Events", tiles: [
        { h: "Event I", s: "Handle events & change the view", p: "z2ui5_cl_demo_app_004" },
        { h: "Event II", s: "Call other apps & exchange data", p: "z2ui5_cl_demo_app_024" },
        { h: "Event III", s: "Additional Infos with t_args", p: "z2ui5_cl_demo_app_167" },
        { h: "Event IV", s: "Facet Filter - T_arg with Objects", p: "z2ui5_cl_demo_app_197" },
        { h: "Follow Up Action", s: "", p: "z2ui5_cl_demo_app_180" }
    ] },
    { inner: "Features", tiles: [
        { h: "Timer I", s: "Wait n MS and call again the server", p: "z2ui5_cl_demo_app_028" },
        { h: "Timer II", s: "Set Loading Indicator while Server Request", p: "z2ui5_cl_demo_app_064" },
        { h: "New Tab", s: "Open an URL in a new tab", p: "z2ui5_cl_demo_app_073" },
        { h: "Clipboard", s: "Copy & Paste Text", p: "z2ui5_cl_demo_app_325" },
        { h: "Focus I", s: "", p: "z2ui5_cl_demo_app_133" },
        { h: "Focus II", s: "", p: "z2ui5_cl_demo_app_189" },
        { h: "Scrolling", s: "", p: "z2ui5_cl_demo_app_134" },
        { h: "History", s: "", p: "z2ui5_cl_demo_app_139" },
        { h: "Data Loss Protection", s: "", p: "z2ui5_cl_demo_app_279" },
        { h: "Tab Title", s: "", p: "z2ui5_cl_demo_app_125" },
        { h: "Session Stickyness I", s: "Stateful mode", p: "z2ui5_cl_demo_app_s_02" },
        { h: "Session Stickyness II", s: "Use Locks", p: "z2ui5_cl_demo_app_s_01" },
        { h: "Local/Session Storage", s: "Store data inside localStorage or sessionStorage", p: "z2ui5_cl_demo_app_327" },
        { h: "System Logout", s: "Trigger SYSTEM_LOGOUT client event", p: "z2ui5_cl_demo_app_361" }
    ] },
    { inner: "Messages", tiles: [
        { h: "Basic", s: "Toast, Box & Strip", p: "z2ui5_cl_demo_app_008" },
        { h: "Message Box", s: "sy, bapiret, cx_root", p: "z2ui5_cl_demo_app_187" },
        { h: "Popup", s: "Messages & Exception", p: "z2ui5_cl_demo_app_154" },
        { h: "Message View", s: "Custom Popup, Popover & Output", p: "z2ui5_cl_demo_app_038" },
        { h: "Demo Output", s: "", p: "z2ui5_cl_demo_app_115" }
    ] },
    { inner: "File API", tiles: [
        { h: "Download CSV", s: "Export Table as CSV", p: "z2ui5_cl_demo_app_057" },
        { h: "Upload CSV", s: "Import CSV as internal Table", p: "z2ui5_cl_demo_app_074" },
        { h: "File Uploader", s: "Upload files to the Backend", p: "z2ui5_cl_demo_app_075" },
        { h: "File Download", s: "Download files to the Frontend", p: "z2ui5_cl_demo_app_186" }
    ] },
    { inner: "S-RTTI - Dynamic Typing", tiles: [
        { h: "Dynamic Types", s: "Use S-RTTI to send tables to the frontend", p: "z2ui5_cl_demo_app_061" },
        { h: "Dynamic Objects I", s: "Use S-RTTI to render different Subapps", p: "z2ui5_cl_demo_app_131" },
        { h: "Dynamic Objects II", s: "User Generic Data Refs in Subapps", p: "z2ui5_cl_demo_app_117" },
        { h: "Dynamic Objects III", s: "User Generic Data Refs in Subapps", p: "z2ui5_cl_demo_app_185" }
    ] },
    { inner: "Device Capabilities", tiles: [
        { h: "Geolocation", s: "", p: "z2ui5_cl_demo_app_120" },
        { h: "Frontend Infos", s: "", p: "z2ui5_cl_demo_app_122" },
        { h: "Camera", s: "", p: "z2ui5_cl_demo_app_306" }
    ] },
  ] },
  { outer: "Input & Output", var: "input", sub: [
    { inner: "Output", tiles: [
        { h: "Label", s: "", p: "z2ui5_cl_demo_app_051" },
        { h: "Progress Indicator", s: "", p: "z2ui5_cl_demo_app_022" },
        { h: "PDF Viewer", s: "Display PDFs via iframe", p: "z2ui5_cl_demo_app_079" },
        { h: "Formatted Text", s: "Display HTML", p: "z2ui5_cl_demo_app_015" },
        { h: "Text", s: "Max Lines", p: "z2ui5_cl_demo_app_206" },
        { h: "InfoLabel", s: "", p: "z2ui5_cl_demo_app_209" },
        { h: "Busy Indicator", s: "", p: "z2ui5_cl_demo_app_215" },
        { h: "Object Header", s: "with Circle-shaped Image", p: "z2ui5_cl_demo_app_272" },
        { h: "Object Page Header", s: "with Header Container", p: "z2ui5_cl_demo_app_303" },
        { h: "Object Marker in a table", s: "", p: "z2ui5_cl_demo_app_289" },
        { h: "Link", s: "", p: "z2ui5_cl_demo_app_293" },
        { h: "Object Status", s: "", p: "z2ui5_cl_demo_app_300" },
        { h: "Object Attribute inside Table", s: "", p: "z2ui5_cl_demo_app_302" },
        { h: "ObjectPage ", s: "with Hidden Section Titles", p: "z2ui5_cl_demo_app_330" }
    ] },
    { inner: "Input", tiles: [
        { h: "Step Input", s: "", p: "z2ui5_cl_demo_app_041" },
        { h: "Range Slider", s: "", p: "z2ui5_cl_demo_app_005" },
        { h: "Text Area", s: "", p: "z2ui5_cl_demo_app_021" },
        { h: "Code Editor", s: "", p: "z2ui5_cl_demo_app_035" },
        { h: "Rich Text Editor", s: "", p: "z2ui5_cl_demo_app_106" },
        { h: "Feed Input", s: "", p: "z2ui5_cl_demo_app_101" },
        { h: "Radio Button", s: "", p: "z2ui5_cl_demo_app_207" },
        { h: "Radio Button Group", s: "", p: "z2ui5_cl_demo_app_208" },
        { h: "Input", s: "Types", p: "z2ui5_cl_demo_app_210" },
        { h: "Input", s: "Password", p: "z2ui5_cl_demo_app_213" },
        { h: "Rating Indicator", s: "", p: "z2ui5_cl_demo_app_220" },
        { h: "ComboBox", s: "Suggestions wrapping", p: "z2ui5_cl_demo_app_229" },
        { h: "Segmented Button in Input List Item", s: "", p: "z2ui5_cl_demo_app_230" },
        { h: "Date Range Selection", s: "", p: "z2ui5_cl_demo_app_231" },
        { h: "Multi Input", s: "Suggestions wrapping", p: "z2ui5_cl_demo_app_232" },
        { h: "Multi Combo Box", s: "Suggestions wrapping", p: "z2ui5_cl_demo_app_233" },
        { h: "Text Area", s: "Value States", p: "z2ui5_cl_demo_app_234" },
        { h: "Text Area", s: "Growing", p: "z2ui5_cl_demo_app_236" },
        { h: "Slider", s: "", p: "z2ui5_cl_demo_app_237" },
        { h: "Checkbox", s: "", p: "z2ui5_cl_demo_app_239" },
        { h: "Switch", s: "", p: "z2ui5_cl_demo_app_240" },
        { h: "HTML", s: "", p: "z2ui5_cl_demo_app_242" },
        { h: "Input", s: "Suggestions wrapping", p: "z2ui5_cl_demo_app_246" },
        { h: "Input", s: "Description", p: "z2ui5_cl_demo_app_251" },
        { h: "Button", s: "", p: "z2ui5_cl_demo_app_259" },
        { h: "Step Input", s: "Value States", p: "z2ui5_cl_demo_app_264" },
        { h: "Code Editor", s: "", p: "z2ui5_cl_demo_app_265" },
        { h: "Toggle Button", s: "", p: "z2ui5_cl_demo_app_266" },
        { h: "Multi Input", s: "Value States", p: "z2ui5_cl_demo_app_267" },
        { h: "Icon", s: "", p: "z2ui5_cl_demo_app_268" },
        { h: "InvisibleText", s: "", p: "z2ui5_cl_demo_app_282" },
        { h: "Feed Input 2", s: "", p: "z2ui5_cl_demo_app_283" },
        { h: "Select", s: "", p: "z2ui5_cl_demo_app_288" },
        { h: "Date Picker", s: "Value States", p: "z2ui5_cl_demo_app_294" },
        { h: "Date Range Selection", s: "Value States", p: "z2ui5_cl_demo_app_295" },
        { h: "Select", s: "with icons", p: "z2ui5_cl_demo_app_297" },
        { h: "Select", s: "Validation states", p: "z2ui5_cl_demo_app_298" },
        { h: "Select", s: "Wrapping text", p: "z2ui5_cl_demo_app_299" },
        { h: "Expandable Text", s: "", p: "z2ui5_cl_demo_app_301" }
    ] },
    { inner: "Interaction", tiles: [
        { h: "Search Field I", s: "Filter with enter", p: "z2ui5_cl_demo_app_053" },
        { h: "Search Field II", s: "Filter with Live Change Event", p: "z2ui5_cl_demo_app_059" },
        { h: "Input with Suggestion", s: "Create Suggestion Table on the Server", p: "z2ui5_cl_demo_app_060" },
        { h: "Multi Input", s: "Token & Range Handling", p: "z2ui5_cl_demo_app_078" },
        { h: "Color Picker", s: "", p: "z2ui5_cl_demo_app_270" },
        { h: "Breadcrumbs", s: "sample with current page link", p: "z2ui5_cl_demo_app_292" },
        { h: "Search Field", s: "", p: "z2ui5_cl_demo_app_296" },
        { h: "Sound", s: "Play success and error sounds", p: "z2ui5_cl_demo_app_s_03" },
        { h: "URL Helper", s: "Trigger a phone's native apps like Email, Telephone and SMS", p: "z2ui5_cl_demo_app_316" }
    ] },
    { inner: "Formatting & Calculations", tiles: [
        { h: "Data Types", s: "Use of Integer, Decimals, Dates & Time", p: "z2ui5_cl_demo_app_047" },
        { h: "Formatting", s: "Currencies", p: "z2ui5_cl_demo_app_067" },
        { h: "Mask Input", s: "", p: "z2ui5_cl_demo_app_110" },
        { h: "Expression Binding", s: "Use calculations & more functions directly in views", p: "z2ui5_cl_demo_app_027" }
    ] },
    { inner: "Tiles", tiles: [
        { h: "Tile", s: "Numeric Content Without Margins", p: "z2ui5_cl_demo_app_228" },
        { h: "Tile", s: "Tile Content", p: "z2ui5_cl_demo_app_241" },
        { h: "Tile", s: "News Content", p: "z2ui5_cl_demo_app_261" },
        { h: "Tile", s: "Numeric Content of Different Colors", p: "z2ui5_cl_demo_app_262" },
        { h: "Tile", s: "Numeric Content with Icon", p: "z2ui5_cl_demo_app_263" },
        { h: "Tile", s: "Image Content", p: "z2ui5_cl_demo_app_271" },
        { h: "Tile", s: "Feed Content", p: "z2ui5_cl_demo_app_275" },
        { h: "Tile", s: "Monitor Tile", p: "z2ui5_cl_demo_app_276" },
        { h: "Tile", s: "KPI Tile", p: "z2ui5_cl_demo_app_277" },
        { h: "Tile", s: "Feed and News Tile", p: "z2ui5_cl_demo_app_278" },
        { h: "Tile", s: "Statuses", p: "z2ui5_cl_demo_app_281" }
    ] },
  ] },
  { outer: "Tables & Trees", var: "more", sub: [
    { inner: "Table", tiles: [
        { h: "Toolbar", s: "Add a container & toolbar", p: "z2ui5_cl_demo_app_006" },
        { h: "Selection Modes", s: "Single Select & Multi Select", p: "z2ui5_cl_demo_app_019" },
        { h: "Editable", s: "Set columns editable", p: "z2ui5_cl_demo_app_011" },
        { h: "Focus", s: "Editable & focus edit controls", p: "z2ui5_cl_demo_app_346" },
        { h: "Visualization", s: "Object Number, Object States & Tab Filter", p: "z2ui5_cl_demo_app_072" },
        { h: "Column Menu", s: "", p: "z2ui5_cl_demo_app_183" },
        { h: "Cell Coloring", s: "", p: "z2ui5_cl_demo_app_305" },
        { h: "ui.Table I", s: "Simple example", p: "z2ui5_cl_demo_app_070" },
        { h: "ui.Table II", s: "Events on Cell Level", p: "z2ui5_cl_demo_app_160" },
        { h: "ui.Table III", s: "Focus Handling", p: "z2ui5_cl_demo_app_172" },
        { h: "Grid List", s: "with Drag&Drop", p: "z2ui5_cl_demo_app_307" }
    ] },
    { inner: "Lists", tiles: [
        { h: "List I", s: "Basic", p: "z2ui5_cl_demo_app_003" },
        { h: "List II", s: "Events & Visualization", p: "z2ui5_cl_demo_app_048" },
        { h: "Action List Item", s: "", p: "z2ui5_cl_demo_app_216" },
        { h: "Input List Item", s: "", p: "z2ui5_cl_demo_app_219" },
        { h: "Standard List Item", s: "Info State Inverted", p: "z2ui5_cl_demo_app_286" },
        { h: "Standard List Item", s: "Wrapping", p: "z2ui5_cl_demo_app_287" },
        { h: "Object List Item", s: "markers aggregation", p: "z2ui5_cl_demo_app_290" }
    ] },
    { inner: "Trees", tiles: [
        { h: "Tree Table I", s: "Popup Select Entry", p: "z2ui5_cl_demo_app_068" },
        { h: "Tree Table II", s: "Keep expanded state popup", p: "z2ui5_cl_demo_app_178" },
        { h: "Tree Table III", s: "Keep expanded state normal", p: "z2ui5_cl_demo_app_116" },
        { h: "Tree Table IV", s: "Drag & Drop", p: "z2ui5_cl_demo_app_317" }
    ] },
  ] },
  { outer: "Popups & Popovers", var: "popups", sub: [
    { inner: "Popups", tiles: [
        { h: "Flow Logic", s: "Different ways of calling Popups", p: "z2ui5_cl_demo_app_012" },
        { h: "Call Popup in Popup", s: "Backend Popup Stack Handling", p: "z2ui5_cl_demo_app_161" },
        { h: "F4-Value-Help", s: "Popup for value help", p: "z2ui5_cl_demo_app_009" },
        { h: "LightBox", s: "", p: "z2ui5_cl_demo_app_273" }
    ] },
    { inner: "Popovers", tiles: [
        { h: "Popover", s: "Simple Example", p: "z2ui5_cl_demo_app_026" },
        { h: "Popover Item Level", s: "Create a Popover for a specific entry of a table", p: "z2ui5_cl_demo_app_052" },
        { h: "Popover with List", s: "List to select in Popover", p: "z2ui5_cl_demo_app_081" },
        { h: "Popover with Quick View", s: "", p: "z2ui5_cl_demo_app_109" },
        { h: "Popover with Action Sheet", s: "", p: "z2ui5_cl_demo_app_163" }
    ] },
    { inner: "Built-in Popups", tiles: [
        { h: "Popup to Inform", s: "", p: "z2ui5_cl_demo_app_151" },
        { h: "Popup to Confirm", s: "", p: "z2ui5_cl_demo_app_150" },
        { h: "Popup to Select", s: "", p: "z2ui5_cl_demo_app_174" },
        { h: "Popup Textedit", s: "", p: "z2ui5_cl_demo_app_155" },
        { h: "Popup Input Value", s: "", p: "z2ui5_cl_demo_app_156" },
        { h: "Popup File Upload", s: "", p: "z2ui5_cl_demo_app_157" },
        { h: "Popup Display PDF", s: "", p: "z2ui5_cl_demo_app_158" },
        { h: "Popup Get Range", s: "Create Select-Options in Multi Inputs", p: "z2ui5_cl_demo_app_056" },
        { h: "Popup Get Range Multi", s: "Create Select-Options for Structures & Tables", p: "z2ui5_cl_demo_app_162" },
        { h: "Popup Display Table", s: "", p: "z2ui5_cl_demo_app_164" },
        { h: "Popup Display Download", s: "", p: "z2ui5_cl_demo_app_168" },
        { h: "Popup Display HTML", s: "", p: "z2ui5_cl_demo_app_149" }
    ] },
  ] },
  { outer: "More Controls", var: "features", sub: [
    { inner: "Visualization", tiles: [
        { h: "Planning Calendar", s: "", p: "z2ui5_cl_demo_app_080" },
        { h: "Wizard Control I", s: "", p: "z2ui5_cl_demo_app_175" },
        { h: "Wizard Control II", s: "Next step & SubSequentStep", p: "z2ui5_cl_demo_app_202" },
        { h: "Cards", s: "", p: "z2ui5_cl_demo_app_181" }
    ] },
    { inner: "Layouts", tiles: [
        { h: "Header, Footer, Grid", s: "Split view in different areas", p: "z2ui5_cl_demo_app_010" },
        { h: "Dynamic Page", s: "Display items", p: "z2ui5_cl_demo_app_030" },
        { h: "Flexible Column Layout", s: "Master details with tree", p: "z2ui5_cl_demo_app_069" },
        { h: "Splitting Container", s: "", p: "z2ui5_cl_demo_app_103" },
        { h: "Flex Box", s: "Basic Alignment", p: "z2ui5_cl_demo_app_205" },
        { h: "Icon Tab Header", s: "Standalone Icon Tab Header", p: "z2ui5_cl_demo_app_214" },
        { h: "Overflow Toolbar", s: "Placing a Title in OverflowToolbar/Toolbar", p: "z2ui5_cl_demo_app_217" },
        { h: "Flex Box", s: "Opposing Alignment", p: "z2ui5_cl_demo_app_218" },
        { h: "Standard Margins", s: "Negative Margins", p: "z2ui5_cl_demo_app_243" },
        { h: "Flex Box", s: "Size Adjustments", p: "z2ui5_cl_demo_app_244" },
        { h: "Flex Box", s: "Direction & Order", p: "z2ui5_cl_demo_app_245" },
        { h: "Splitter Layout", s: "2 areas", p: "z2ui5_cl_demo_app_247" },
        { h: "Splitter Layout", s: "2 non-resizable areas", p: "z2ui5_cl_demo_app_248" },
        { h: "Splitter Layout", s: "3 areas", p: "z2ui5_cl_demo_app_249" },
        { h: "OverflowToolbar", s: "Alignment", p: "z2ui5_cl_demo_app_250" },
        { h: "Flex Box", s: "Render Type", p: "z2ui5_cl_demo_app_252" },
        { h: "Flex Box", s: "Equal Height Cols", p: "z2ui5_cl_demo_app_253" },
        { h: "Flex Box", s: "Nested", p: "z2ui5_cl_demo_app_254" },
        { h: "Flex Box", s: "Navigation Examples", p: "z2ui5_cl_demo_app_255" },
        { h: "Fix Flex", s: "Fix container size", p: "z2ui5_cl_demo_app_256" },
        { h: "Generic Tag with Different Configurations", s: "", p: "z2ui5_cl_demo_app_257" },
        { h: "Nested Splitter Layouts", s: "7 Areas", p: "z2ui5_cl_demo_app_260" },
        { h: "Shell Bar", s: "title mega menu", p: "z2ui5_cl_demo_app_269" },
        { h: "Slide Tile", s: "", p: "z2ui5_cl_demo_app_274" }
    ] },
    { inner: "Nested Views", tiles: [
        { h: "Nested Views I", s: "Basic Example", p: "z2ui5_cl_demo_app_065" },
        { h: "Nested Views II", s: "Head & Item Table", p: "z2ui5_cl_demo_app_097" },
        { h: "Nested Views III", s: "Head & Item Table & Detail", p: "z2ui5_cl_demo_app_098" },
        { h: "Nested Views IV", s: "Sub-App", p: "z2ui5_cl_demo_app_104" }
    ] },
    { inner: "Navigation Container", tiles: [
        { h: "Nav Container I", s: "", p: "z2ui5_cl_demo_app_088" },
        { h: "Icon Tab Bar", s: "Icons Only", p: "z2ui5_cl_demo_app_221" },
        { h: "Icon Tab Bar", s: "Text and Count", p: "z2ui5_cl_demo_app_222" },
        { h: "Icon Tab Bar", s: "Inline Mode", p: "z2ui5_cl_demo_app_223" },
        { h: "Icon Tab Bar", s: "Text Only", p: "z2ui5_cl_demo_app_224" },
        { h: "Icon Tab Bar", s: "Separator", p: "z2ui5_cl_demo_app_225" },
        { h: "Icon Tab Bar", s: "Sub tabs", p: "z2ui5_cl_demo_app_226" },
        { h: "Bar", s: "Page, Toolbar & Bar", p: "z2ui5_cl_demo_app_227" },
        { h: "Bar", s: "Toolbar vs Bar vs OverflowToolbar", p: "z2ui5_cl_demo_app_235" },
        { h: "Message Strip", s: "", p: "z2ui5_cl_demo_app_238" },
        { h: "Header Container", s: "Vertical Mode", p: "z2ui5_cl_demo_app_280" },
        { h: "Page", s: "Flexible sizing - Toolbar", p: "z2ui5_cl_demo_app_284" },
        { h: "Page", s: "Flexible sizing - Icon Tab Bar", p: "z2ui5_cl_demo_app_285" },
        { h: "Message Strip", s: "with enableFormattedText", p: "z2ui5_cl_demo_app_291" }
    ] },
    { inner: "Templating", tiles: [
        { h: "Templating I", s: "Basic Example", p: "z2ui5_cl_demo_app_173" },
        { h: "Templating II", s: "Nested Views", p: "z2ui5_cl_demo_app_176" }
    ] },
  ] },
  { outer: "Custom Extensions", var: "extensions", sub: [
    { inner: "JS", tiles: [
        { h: "Follow Up Action with JS Function", s: "", p: "z2ui5_cl_demo_app_309" }
    ] },
    { inner: "CSS", tiles: [
        { h: "Messages with Styles I", s: "", p: "z2ui5_cl_demo_app_310" },
        { h: "Messages with Styles II", s: "", p: "z2ui5_cl_demo_app_311" },
        { h: "Messages with Styles III", s: "More...", p: "z2ui5_cl_demo_app_084" }
    ] },
    { inner: "General", tiles: [
        { h: "Import View", s: "Copy & paste views of the UI5 Documentation", p: "z2ui5_cl_demo_app_031" },
        { h: "Custom Control", s: "Integrate your own JS Custom Control", p: "z2ui5_cl_demo_app_037" },
        { h: "Change CSS", s: "Send your own CSS to the frontend", p: "z2ui5_cl_demo_app_050" },
        { h: "HTML, JS, CSS", s: "Display normal HTML without UI5", p: "z2ui5_cl_demo_app_032" },
        { h: "Canvas & SVG", s: "Integrate more HTML5 functionalities", p: "z2ui5_cl_demo_app_036" },
        { h: "Ext. Library", s: "Load external JS libraries", p: "z2ui5_cl_demo_app_040" },
        { h: "Custom Function", s: "Call imported function", p: "z2ui5_cl_demo_app_093" },
        { h: "Websocket", s: "Consume APC-Messages with Websocket", p: "z2ui5_cl_demo_app_s_05" }
    ] },
  ] },
  { outer: "Demos", var: "demos", sub: [
    { inner: "", tiles: [
        { h: "Selection Screen", s: "Explore Input Controls", p: "z2ui5_cl_demo_app_002" },
        { h: "Sample App", s: "Nested View, Object Page, App Navigation, Tables, Lists, Images, Progress & Rating Indicator", p: "z2ui5_cl_demo_app_085" }
    ] },
  ] },
  { outer: "UI5 Version Specific & WIP", var: "version", sub: [
    { inner: "UI5-Only", strip: "Not working with OpenUI5...", tiles: [
        { h: "Donut Chart", s: "", p: "z2ui5_cl_demo_app_013" },
        { h: "Line Chart", s: "", p: "z2ui5_cl_demo_app_014" },
        { h: "Bar Chart", s: "", p: "z2ui5_cl_demo_app_016" },
        { h: "Radial Chart", s: "", p: "z2ui5_cl_demo_app_029" },
        { h: "Gantt Chart", s: "", p: "z2ui5_cl_demo_app_076" },
        { h: "Harvey Chart", s: "", p: "z2ui5_cl_demo_app_308" },
        { h: "Process Flow", s: "", p: "z2ui5_cl_demo_app_091" },
        { h: "Map Container", s: "", p: "z2ui5_cl_demo_app_123" },
        { h: "Timeline", s: "", p: "z2ui5_cl_demo_app_113" },
        { h: "Network Graph", s: "", p: "z2ui5_cl_demo_app_182" },
        { h: "Status Indicator Library", s: "", p: "z2ui5_cl_demo_app_196" },
        { h: "VizFrame Charts", s: "", p: "z2ui5_cl_demo_app_312" }
    ] },
    { inner: "Higher-Releases-Only", strip: "Only for newer UI5 releases....", tiles: [
        { h: "Object Page with Avatar", s: "Since 1.73", p: "z2ui5_cl_demo_app_017" },
        { h: "Badge", s: "Since 1.80", p: "z2ui5_cl_demo_app_063" },
        { h: "Illustrated Message", s: "Since 1.98", p: "z2ui5_cl_demo_app_033" },
        { h: "Barcode Scanner", s: "Since 1.102", p: "z2ui5_cl_demo_app_124" },
        { h: "Side Panel", s: "Since 1.107", p: "z2ui5_cl_demo_app_108" }
    ] },
    { inner: "For Testing only...", tiles: [
        { h: "Model I", s: "RTTI Data", p: "z2ui5_cl_demo_app_191" },
        { h: "Model II", s: "RTTI Data", p: "z2ui5_cl_demo_app_195" },
        { h: "Model III", s: "RTTI Data", p: "z2ui5_cl_demo_app_199" },
        { h: "Model IV", s: "RTTI Data", p: "z2ui5_cl_demo_app_328" },
        { h: "Model V", s: "RTTI Data - Struc", p: "z2ui5_cl_demo_app_331" },
        { h: "Model VI", s: "RTTI Data - Struc and Cell Binding", p: "z2ui5_cl_demo_app_332" },
        { h: "Model VII", s: "RTTI Data - Struc and Class Data", p: "z2ui5_cl_demo_app_334" },
        { h: "Model VIII", s: "RTTI Data - Struc and Class Data and Popup", p: "z2ui5_cl_demo_app_335" },
        { h: "Model VIIII", s: "RTTI Data - Struc/Table and Class Data and Popup", p: "z2ui5_cl_demo_app_337" },
        { h: "Model X", s: "RTTI Data - Sub Apps with deep truc", p: "z2ui5_cl_demo_app_338" },
        { h: "Model XI", s: "Popups Flow Logic", p: "z2ui5_cl_demo_app_341" },
        { h: "Model XII", s: "Many Sub Objects with Ref", p: "z2ui5_cl_demo_app_344" },
        { h: "Model XIII", s: "Check Error if Binding with Ref", p: "z2ui5_cl_demo_app_343" },
        { h: "Model XIV", s: "Check Error if Binding with Ref", p: "z2ui5_cl_demo_app_345" },
        { h: "Model XV", s: "Check Error Table with Ref", p: "z2ui5_cl_demo_app_347" },
        { h: "Model XVI", s: "Check Error Sruc with Ref", p: "z2ui5_cl_demo_app_348" },
        { h: "Model XVII", s: "Check Error Tabel and Sruc with Ref", p: "z2ui5_cl_demo_app_349" },
        { h: "Date Format Error in internal table", s: "", p: "z2ui5_cl_demo_app_118" },
        { h: "Catch exceptions and display popup", s: "", p: "z2ui5_cl_demo_app_324" }
    ] },
    { inner: "Work in Progress", strip: "Give it a try....", tiles: [
        { h: "Table with OData, HTTP Model and Device Model", s: "", p: "z2ui5_cl_demo_app_314" },
        { h: "Table with different OData Models", s: "", p: "z2ui5_cl_demo_app_315" },
        { h: "Smart Multi Input", s: "", p: "z2ui5_cl_demo_app_319" },
        { h: "Smart Controls with Variants", s: "", p: "z2ui5_cl_demo_app_313" },
        { h: "Avatar Group", s: "", p: "z2ui5_cl_demo_app_320" },
        { h: "App State", s: "", p: "z2ui5_cl_demo_app_321" },
        { h: "Share Button", s: "", p: "z2ui5_cl_demo_app_323" },
        { h: "History", s: "", p: "z2ui5_cl_demo_app_322" },
        { h: "p13n Dialog", s: "Popup for F4 Helps", p: "z2ui5_cl_demo_app_090" },
        { h: "Upload Set", s: "", p: "z2ui5_cl_demo_app_107" },
        { h: "Smart Variant Management", s: "", p: "z2ui5_cl_demo_app_111" },
        { h: "Hide/show Soft Tastatur", s: "", p: "z2ui5_cl_demo_app_352" },
        { h: "Multi Timer Test", s: "", p: "z2ui5_cl_demo_app_353" }
    ] },
  ] },
]
;

class z2ui5_cl_demo_app_000 extends z2ui5_if_app {

  ms_check_expanded = {
    basics:          false,
    more:            false,
    features:        false,
    extensions:      false,
    demos:           false,
    custom_controls: false,
    input:           false,
    popups:          false,
    version:         false,
    built_in:        false,
  };

  mt_scroll     = [];
  mv_set_scroll = false;

  expand_all() {
    for (const k of Object.keys(this.ms_check_expanded)) {
      this.ms_check_expanded[k] = true;
    }
  }

  async main(client) {

    const C_TITLE = ` abap2UI5 - Samples`;

    // Pre-init mt_scroll so the frontend's z2ui5.Scrolling has at least one
    // entry to track from the very first scroll event. abap2UI5's source only
    // sets this inside `check_on_navigated`, but its RTTI-driven JSON
    // serializer auto-emits a default row for typed internal tables — JS has
    // no such behavior, so without this eager init the first-cycle scroll is
    // lost (Scrolling.setBackend iterates an empty `items` array → nothing
    // gets recorded → backend's mt_scroll stays empty → no V to restore on BACK).
    //
    // Field names are uppercase N / V because abap's serializer uppercases
    // struct fields on the wire (frontend reads `item.N` / `item.V`).
    if (this.mt_scroll.length === 0) {
      this.mt_scroll = [{ N: `page`, V: `` }];
    }
    if (client.check_on_navigated()) {
      this.mv_set_scroll = true;
    }

    const event = client.get().EVENT;
    switch (event) {
      case `expand-all`:
        this.expand_all();
        break;
      case `collapse-all`:
        for (const k of Object.keys(this.ms_check_expanded)) {
          this.ms_check_expanded[k] = false;
        }
        break;
      default:
        if (event) {
          try {
            const Cls = z2ui5_cl_util.rtti_get_class(event.toLowerCase());
            if (Cls) {
              const li_app = new Cls();
              if (li_app instanceof z2ui5_if_app) {
                client.nav_app_call(li_app);
                return;
              }
            }
          } catch {
            // CATCH cx_root — silently ignore
          }
        }
    }

    // Bind the whole struct once; build per-field expanded paths from it.
    const msCheckBind = client._bind_edit(this.ms_check_expanded);
    const msCheckPath = msCheckBind.slice(1, -1);
    const expandedFor = (key) => `{${msCheckPath}/${key}}`;

    const page = z2ui5_cl_xml_view.factory()
      .Shell()
      .Page({
        id:             `page`,
        title:          C_TITLE,
        navButtonPress: client._event_nav_app_leave(),
        showNavButton:  client.check_app_prev_stack(),
      });

    page.headerContent()
      .ToolbarSpacer()
      .Link({
        text:   `Install with abapGit from GitHub`,
        target: `_blank`,
        href:   `https://github.com/abap2UI5/samples`,
      });

    // Scroll-position memo: the frontend's z2ui5.Scrolling reads scrollTop of
    // each control by id (item.N), stores it in item.V, and ships the delta
    // back on the next roundtrip. setUpdate=true triggers restore on render.
    // Mirrors abap page->_z2ui5( )->scrolling( setupdate=…, items=… ).
    page._z2ui5().scrolling({
      setupdate: client._bind_edit(this.mv_set_scroll),
      items:     client._bind_edit(this.mt_scroll),
    });

    const layout = page
      .Grid({ defaultSpan: `L12 M12 S12` })
      .content();

    layout.FormattedText({
      htmlText:
        `<p><strong>Explore and copy code samples!</strong> All samples are abap2UI5 implementations of the <a href="https://sapui5.` +
        `hana.ondemand.com/#/controls" style="color:blue; font-weight:600;">SAP UI5 sample page.</a> If you miss a control or find a b` +
        `ug please create an ` +
        `<a href="https://github.com/abap2UI5/abap2UI5/issues" style="color:blue; font-weight:600;">issue</a> or send a <a href="https` +
        `://github.com/abap2UI5/abap2UI5-samples/pulls" style="color:blue; font-weight:600;">PR</a>` +
        `.</p>` +
        `<p>Always press CTRL+F12 to see code samples and classname of the app.</p>`,
    });

    layout.HBox()
      .Button({ press: client._event(`expand-all`),   icon: `sap-icon://expand-all` })
      .Button({ press: client._event(`collapse-all`), icon: `sap-icon://collapse-all` });

    for (const o of SECTIONS) {
      const outerPanel = layout.Panel({
        expandable: true,
        expanded:   expandedFor(o.var),
        headerText: o.outer,
      });
      for (const s of o.sub) {
        const innerHost = s.inner !== ``
          ? outerPanel.Panel({ expandable: false, expanded: true, headerText: s.inner })
          : outerPanel;
        if (s.strip) {
          innerHost.MessageStrip({ text: s.strip });
        }
        for (const t of s.tiles) {
          innerHost.GenericTile({
            header:    t.h,
            subheader: t.s,
            press:     client._event(t.p),
            mode:      `LineMode`,
            class:     `sapUiTinyMarginEnd sapUiTinyMarginBottom`,
          });
        }
      }
    }

    client.view_display(page.stringify());
  }
}

module.exports = z2ui5_cl_demo_app_000;
