sap.ui.define([], () => {
	"use strict";
	const parseDmy = (d) => [+d.slice(0, 4), +d.slice(4, 6) - 1, +d.slice(6, 8)];
	return {
		DateCreateObject: (s) => new Date(s),
		DateAbapDateToDateObject: (d) => new Date(...parseDmy(d)),
		DateAbapDateTimeToDateObject: (d, t = "000000") =>
			new Date(...parseDmy(d), +t.slice(0, 2), +t.slice(2, 4), +t.slice(4, 6)),
	};
});
