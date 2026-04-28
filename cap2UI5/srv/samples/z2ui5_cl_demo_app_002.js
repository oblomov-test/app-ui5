const z2ui5_if_app = require("../z2ui5/02/z2ui5_if_app");
const z2ui5_cl_xml_view = require("../z2ui5/02/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_002 extends z2ui5_if_app {

  s_screen = {
    check_is_active: false,
    colour:          ``,
    combo_key:       ``,
    combo_key2:      ``,
    segment_key:     ``,
    date:            ``,
    date_time:       ``,
    time_start:      ``,
    time_end:        ``,
    check_switch_01: false,
    check_switch_02: false,
  };

  t_suggestions = [];
  t_combo       = [];

  client = null;

  async main(client) {

    this.client = client;

    if (client.check_on_init()) {
      this.on_init();

    } else if (client.check_on_event()) {
      this.on_event();
    }

  }

  on_init() {

    this.s_screen = {
      check_is_active: true,
      colour:          `BLUE`,
      combo_key:       `GRAY`,
      combo_key2:      ``,
      segment_key:     `GREEN`,
      date:            `07.12.22`,
      date_time:       `23.12.2022, 19:27:20`,
      time_start:      `05:24:00`,
      time_end:        `17:23:57`,
      check_switch_01: false,
      check_switch_02: false,
    };

    this.t_suggestions = [
      { descr: `Green`, value: `GREEN` },
      { descr: `Blue`,  value: `BLUE`  },
      { descr: `Black`, value: `BLACK` },
      { descr: `Gray`,  value: `GRAY`  },
      { descr: `Blue2`, value: `BLUE2` },
      { descr: `Blue3`, value: `BLUE3` },
    ];

    this.t_combo = [
      { key: `BLUE`,  text: `green` },
      { key: `GREEN`, text: `blue`  },
      { key: `BLACK`, text: `red`   },
      { key: `GRAY`,  text: `gray`  },
    ];

    this.view_display();

  }

  on_event() {

    switch (this.client.get().EVENT) {
      case `BUTTON_SEND`:
        this.client.message_box_display(`success - values send to the server`);
        break;
      case `BUTTON_CLEAR`:
        for (const k of Object.keys(this.s_screen)) {
          this.s_screen[k] = typeof this.s_screen[k] === `boolean` ? false : ``;
        }
        this.client.message_toast_display(`View initialized`);
        break;
    }

  }

  view_display() {

    const view = z2ui5_cl_xml_view.factory();
    const page = view.Shell()
      .Page({
        title:          `abap2UI5 - Selection-Screen Example`,
        navButtonPress: this.client._event_nav_app_leave(),
        showNavButton:  this.client.check_app_prev_stack(),
      });

    // Bind s_screen as a struct so sub-paths resolve correctly.
    const sScreenBind = this.client._bind_edit(this.s_screen);
    const sScreenPath = sScreenBind.slice(1, -1);
    const screen = (k) => `{${sScreenPath}/${k}}`;

    const grid = page.Grid({ defaultSpan: `L6 M12 S12` }).content();

    const sf1 = grid.SimpleForm({ title: `Input`, editable: true }).content();
    sf1.Label({ text: `Input with suggestion items` });
    sf1.Input({
      id:              `suggInput`,
      value:           screen(`colour`),
      placeholder:     `Fill in your favorite color`,
      suggestionItems: this.client._bind(this.t_suggestions),
      showSuggestion:  true,
    }).get().suggestionItems().ListItem({ text: `{value}`, additionalText: `{descr}` });

    const sf2 = grid.SimpleForm({ title: `Time Inputs`, editable: true }).content();
    sf2.Label({ text: `Date` });
    sf2.DatePicker({ value: screen(`date`) });
    sf2.Label({ text: `Date and Time` });
    sf2.DateTimePicker({ value: screen(`date_time`) });
    sf2.Label({ text: `Time Begin/End` });
    sf2.TimePicker({ value: screen(`time_start`) });
    sf2.TimePicker({ value: screen(`time_end`) });

    const content = page.Grid({ defaultSpan: `L12 M12 S12` })
      .content()
      .SimpleForm({ title: `Input with select options`, editable: true })
        .content();

    content.Label({ text: `Checkbox` });
    content.CheckBox({ selected: screen(`check_is_active`), text: `this is a checkbox`, enabled: true });

    content.Label({ text: `Combobox` });
    content.ComboBox({
      selectedKey: screen(`combo_key`),
      items:       this.client._bind(this.t_combo),
    }).Item({ key: `{key}`, text: `{text}` });

    content.Label({ text: `Combobox2` });
    content.ComboBox({
      selectedKey: screen(`combo_key2`),
      items:       this.client._bind(this.t_combo),
    }).Item({ key: `{key}`, text: `{text}` });

    content.Label({ text: `Segmented Button` });
    content.SegmentedButton({ selectedKey: screen(`segment_key`) })
      .items()
        .SegmentedButtonItem({ key: `BLUE`,  icon: `sap-icon://accept`,        text: `blue`  })
        .SegmentedButtonItem({ key: `GREEN`, icon: `sap-icon://add-favorite`, text: `green` })
        .SegmentedButtonItem({ key: `BLACK`, icon: `sap-icon://attachment`,   text: `black` });

    content.Label({ text: `Switch disabled` });
    content.Switch({ enabled: false, customTextOn: `A`, customTextOff: `B` });

    content.Label({ text: `Switch accept/reject` });
    content.Switch({ state: screen(`check_switch_01`), customTextOn: `on`, customTextOff: `off`, type: `AcceptReject` });

    content.Label({ text: `Switch normal` });
    content.Switch({ state: screen(`check_switch_02`), customTextOn: `YES`, customTextOff: `NO` });

    const footer = page.footer().OverflowToolbar();
    footer.ToolbarSpacer();
    footer.Button({ text: `Clear`,          press: this.client._event(`BUTTON_CLEAR`), type: `Reject`,  icon: `sap-icon://delete` });
    footer.Button({ text: `Send to Server`, press: this.client._event(`BUTTON_SEND`),  type: `Success` });

    this.client.view_display(view.stringify());

  }
}

module.exports = z2ui5_cl_demo_app_002;
