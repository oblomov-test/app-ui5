const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_009 extends z2ui5_if_app {

  s_screen = {
    color_01: "",
    color_02: "",
    color_03: "",
    city:     "",
    name:     "",
    lastname: "",
    quantity: "",
    unit:     "",
  };

  t_suggestion     = [];
  t_suggestion_sel = [];
  t_cities         = [];
  t_employees_sel  = [];

  client      = null;
  t_employees = [];

  async main(client) {

    this.client = client;

    if (client.check_on_init()) {
      this.on_init();

    } else if (client.check_on_event()) {
      this.on_event();
    }

  }

  on_init() {

    this.t_suggestion = [
      { selkz: false, descr: `this is the color Green`, value: `GREEN` },
      { selkz: false, descr: `this is the color Blue`,  value: `BLUE`  },
      { selkz: false, descr: `this is the color Black`, value: `BLACK` },
      { selkz: false, descr: `this is the color Grey`,  value: `GREY`  },
      { selkz: false, descr: `this is the color Blue2`, value: `BLUE2` },
      { selkz: false, descr: `this is the color Blue3`, value: `BLUE3` },
    ];

    this.t_cities = [
      { value: `London`, descr: `London` },
      { value: `Paris`,  descr: `Paris`  },
      { value: `Rome`,   descr: `Rome`   },
    ];

    this.t_employees = [
      { selkz: false, city: `London`, name: `Tom`,       lastname: `lastname1`,  nr: `00001` },
      { selkz: false, city: `London`, name: `Tom2`,      lastname: `lastname2`,  nr: `00002` },
      { selkz: false, city: `London`, name: `Tom3`,      lastname: `lastname3`,  nr: `00003` },
      { selkz: false, city: `London`, name: `Tom4`,      lastname: `lastname4`,  nr: `00004` },
      { selkz: false, city: `Rome`,   name: `Michaela1`, lastname: `lastname5`,  nr: `00005` },
      { selkz: false, city: `Rome`,   name: `Michaela2`, lastname: `lastname6`,  nr: `00006` },
      { selkz: false, city: `Rome`,   name: `Michaela3`, lastname: `lastname7`,  nr: `00007` },
      { selkz: false, city: `Rome`,   name: `Michaela4`, lastname: `lastname8`,  nr: `00008` },
      { selkz: false, city: `Paris`,  name: `Hermine1`,  lastname: `lastname9`,  nr: `00009` },
      { selkz: false, city: `Paris`,  name: `Hermine2`,  lastname: `lastname10`, nr: `00010` },
      { selkz: false, city: `Paris`,  name: `Hermine3`,  lastname: `lastname11`, nr: `00011` },
    ];

    this.view_display();

  }

  on_event() {

    const event = this.client.get().EVENT;

    switch (event) {
      case `POPUP_TABLE_value`:
        this.t_suggestion_sel = this.t_suggestion;
        this.popup_value_suggestion();
        break;
      case `POPUP_TABLE_value_CUSTOM`:
        this.t_employees_sel = [];
        this.popup_value_employee();
        break;
      case `SEARCH`:
        this.t_employees_sel = this.t_employees;
        if (this.s_screen.city) {
          this.t_employees_sel = this.t_employees_sel.filter((r) => r.city === this.s_screen.city);
        }
        this.popup_value_employee();
        break;
      case `POPUP_TABLE_value_CUSTOM_CONTINUE`: {
        this.t_employees_sel = this.t_employees_sel.filter((r) => r.selkz);
        if (this.t_employees_sel.length === 1) {
          this.s_screen.name     = this.t_employees_sel[0].name;
          this.s_screen.lastname = this.t_employees_sel[0].lastname;
          this.client.message_toast_display(`value value selected`);
          this.client.popup_destroy();
        }
        break;
      }
      case `POPUP_TABLE_value_CONTINUE`: {
        this.t_suggestion_sel = this.t_suggestion_sel.filter((r) => r.selkz);
        if (this.t_suggestion_sel.length === 1) {
          this.s_screen.color_02 = this.t_suggestion_sel[0].value;
          this.client.message_toast_display(`value value selected`);
          this.client.popup_destroy();
        }
        break;
      }
      case `BUTTON_SEND`:
        this.client.message_box_display(`success - values send to the server`);
        break;
      case `BUTTON_CLEAR`:
        for (const k of Object.keys(this.s_screen)) this.s_screen[k] = ``;
        this.client.message_box_display(`View initialized`);
        break;
    }

    this.view_display();

  }

  view_display() {

    const view = z2ui5_cl_xml_view.factory();
    const page = view.Shell()
      .Page({
        title:          `abap2UI5 - Value Help Examples`,
        navButtonPress: this.client._event_nav_app_leave(),
        showNavButton:  this.client.check_app_prev_stack(),
      });

    // Bind the struct once; build per-field sub-paths from it. Mirrors abap's
    // `client->_bind_edit( s_screen-color_01 )` which compiles to /XX/s_screen/COLOR_01.
    const sScreenBind = this.client._bind_edit(this.s_screen);
    const sScreenPath = sScreenBind.slice(1, -1);
    const screen = (key) => `{${sScreenPath}/${key}}`;

    const form = page.Grid({ defaultSpan: `L7 M7 S7` })
      .content()
      .SimpleForm({ title: `Input with Value Help` })
        .content();

    form.Label({ text: `Input with suggestion items` });
    form.Input({
      value:           screen(`color_01`),
      placeholder:     `fill in your favorite colour`,
      suggestionItems: this.client._bind(this.t_suggestion),
      showSuggestion:  true,
    }).get().suggestionItems().ListItem({ text: `{value}`, additionalText: `{descr}` });

    form.Label({ text: `Input only numbers allowed` });
    form.Input({
      value:       screen(`quantity`),
      type:        `Number`,
      placeholder: `quantity`,
    });

    form.Label({ text: `Input with value` });
    form.Input({
      value:            screen(`color_02`),
      placeholder:      `fill in your favorite colour`,
      showValueHelp:    true,
      valueHelpRequest: this.client._event(`POPUP_TABLE_value`),
    });

    form.Label({ text: `Custom value Popup` });
    form.Input({
      value:            screen(`name`),
      placeholder:      `name`,
      showValueHelp:    true,
      valueHelpRequest: this.client._event(`POPUP_TABLE_value_CUSTOM`),
    });
    form.Input({
      value:            screen(`lastname`),
      placeholder:      `lastname`,
      showValueHelp:    true,
      valueHelpRequest: this.client._event(`POPUP_TABLE_value_CUSTOM`),
    });

    const footer = page.footer().OverflowToolbar();
    footer.ToolbarSpacer();
    footer.Button({
      text:    `Clear`,
      press:   this.client._event(`BUTTON_CLEAR`),
      type:    `Reject`,
      enabled: false,
      icon:    `sap-icon://delete`,
    });
    footer.Button({
      text:    `Send to Server`,
      press:   this.client._event(`BUTTON_SEND`),
      enabled: false,
      type:    `Success`,
    });

    this.client.view_display(view.stringify());

  }

  popup_value_suggestion() {

    const popup  = z2ui5_cl_xml_view.factory_popup();
    const dialog = popup.Dialog({ title: `abap2UI5 - value Value Help` });

    const tab = dialog.Table({
      mode:  `SingleSelectLeft`,
      items: this.client._bind_edit(this.t_suggestion_sel),
    });

    const cols = tab.columns();
    cols.Column({ width: `20rem` }).Text({ text: `Color` });
    cols.Column().Text({ text: `Description` });

    tab.items().ColumnListItem({ selected: `{selkz}` })
      .cells()
      .Text({ text: `{value}` })
      .Text({ text: `{descr}` });

    dialog.buttons().Button({
      text:  `continue`,
      press: this.client._event(`POPUP_TABLE_value_CONTINUE`),
      type:  `Emphasized`,
    });

    this.client.popup_display(popup.stringify());

  }

  popup_value_employee() {

    const popup  = z2ui5_cl_xml_view.factory_popup();
    const dialog = popup.Dialog({ title: `abap2UI5 - value Value Help` });

    const sScreenBind = this.client._bind_edit(this.s_screen);
    const sScreenPath = sScreenBind.slice(1, -1);

    const sf = dialog.SimpleForm();
    sf.Label({ text: `Location` });
    sf.Input({
      value:           `{${sScreenPath}/city}`,
      suggestionItems: this.client._bind(this.t_cities),
      showSuggestion:  true,
    }).get().suggestionItems().ListItem({ text: `{value}`, additionalText: `{descr}` });
    sf.Button({ text: `search...`, press: this.client._event(`SEARCH`) });

    const tab = dialog.Table({
      headerText: `Employees`,
      mode:       `SingleSelectLeft`,
      items:      this.client._bind_edit(this.t_employees_sel),
    });

    const cols = tab.columns();
    cols.Column({ width: `10rem` }).Text({ text: `City` });
    cols.Column({ width: `10rem` }).Text({ text: `Nr` });
    cols.Column({ width: `15rem` }).Text({ text: `Name` });
    cols.Column({ width: `30rem` }).Text({ text: `Lastname` });

    tab.items().ColumnListItem({ selected: `{selkz}` })
      .cells()
      .Text({ text: `{city}` })
      .Text({ text: `{nr}` })
      .Text({ text: `{name}` })
      .Text({ text: `{lastname}` });

    dialog.buttons().Button({
      text:  `continue`,
      press: this.client._event(`POPUP_TABLE_value_CUSTOM_CONTINUE`),
      type:  `Emphasized`,
    });

    this.client.popup_display(popup.stringify());

  }
}

module.exports = z2ui5_cl_demo_app_009;
