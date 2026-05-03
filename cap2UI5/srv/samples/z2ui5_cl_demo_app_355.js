const z2ui5_if_app = require("abap2UI5/z2ui5_if_app");
const z2ui5_cl_xml_view = require("abap2UI5/z2ui5_cl_xml_view");

class z2ui5_cl_demo_app_355 extends z2ui5_if_app {

  wlan = null;
  flight = null;
  high_perf = null;
  battery = null;
  price = null;
  address = null;
  country = null;
  volume = null;
  client = null;

async main(client) {
this.client = this.client;

    if (this.client.check_on_init( )) {

      on_init( );
    }
}
on_init() {
this.wlan      = true;
    this.flight    = true;
    this.high_perf = true;
    this.price     = `799`;
    this.address   = `Main Rd, Manchester`;
    this.country   = `GR`;
    this.volume    = `7`;

    view_display( );

  }
view_display() {
const view = z2ui5_cl_util_xml.factory( );
    const root = view.__({ n: `View`, ns: `mvc`, p: [{ n: `displayBlock`, v: true }, { n: `height`, v: `100%` }, { n: `xmlns`, v: `sap.m` }, { n: `xmlns:core`, v: `sap.ui.core` }, { n: `xmlns:mvc`, v: `sap.ui.core.mvc` }] });

    const page = root.__( `Shell`
       ).__({ n: `Page`, p: [{ n: `navButtonPress`, v: this.client._event_nav_app_leave( ) }, { n: `showNavButton`, v: this.client.check_app_prev_stack( ) }, { n: `title`, v: `abap2UI5 - InputListItem` }] });

    page.__( `headerContent`
       )._({ n: `Link`, p: [{ n: `href`, v: `https://sapui5.hana.ondemand.com/sdk/#/entity/sap.m.InputListItem/sample/sap.m.sample.InputListItem` }, { n: `target`, v: `_blank` }, { n: `text`, v: `UI5 Demo Kit` }] });

    const list = page.__({ n: `List`, a: `headerText`, v: `Input` });

    list.__({ n: `InputListItem`, a: `label`, v: `WLAN` })._({ n: `Switch`, a: `state`, v: this.client._bind_edit( this.wlan ) });

    list.__({ n: `InputListItem`, a: `label`, v: `Flight Mode` })._({ n: `CheckBox`, a: `selected`, v: this.client._bind_edit( this.flight ) });

    list.__({ n: `InputListItem`, a: `label`, v: `High Performance` })._({ n: `RadioButton`, p: [{ n: `groupName`, v: `GroupPerf` }, { n: `selected`, v: this.client._bind_edit( this.high_perf ) }] });

    list.__({ n: `InputListItem`, a: `label`, v: `Battery Saving` })._({ n: `RadioButton`, p: [{ n: `groupName`, v: `GroupPerf` }, { n: `selected`, v: this.client._bind_edit( this.battery ) }] });

    list.__({ n: `InputListItem`, a: `label`, v: `Price (EUR)` })._({ n: `Input`, p: [{ n: `placeholder`, v: `Price` }, { n: `type`, v: `Number` }, { n: `value`, v: this.client._bind_edit( this.price ) }] });

    list.__({ n: `InputListItem`, a: `label`, v: `Address` })._({ n: `Input`, p: [{ n: `placeholder`, v: `Address` }, { n: `value`, v: this.client._bind_edit( this.address ) }] });

    list.__({ n: `InputListItem`, a: `label`, v: `Country` }).__({ n: `Select`, a: `selectedKey`, v: this.client._bind_edit( this.country ) })._({ n: `Item`, ns: `core`, p: [{ n: `key`, v: `GR` }, { n: `text`, v: `Greece` }] })._({ n: `Item`, ns: `core`, p: [{ n: `key`, v: `MX` }, { n: `text`, v: `Mexico` }] })._({ n: `Item`, ns: `core`, p: [{ n: `key`, v: `NO` }, { n: `text`, v: `Norway` }] })._({ n: `Item`, ns: `core`, p: [{ n: `key`, v: `NZ` }, { n: `text`, v: `New Zealand` }] })._({ n: `Item`, ns: `core`, p: [{ n: `key`, v: `NL` }, { n: `text`, v: `Netherlands` }] });

    list.__({ n: `InputListItem`, a: `label`, v: `Volume` }).__({ n: `HBox`, a: `justifyContent`, v: `End` })._({ n: `Slider`, p: [{ n: `max`, v: `10` }, { n: `min`, v: `0` }, { n: `value`, v: this.client._bind_edit( this.volume ) }, { n: `width`, v: `200px` }] });

    this.client.view_display( view.stringify( ) );

  }
}

module.exports = z2ui5_cl_demo_app_355;
