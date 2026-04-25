sap.ui.define([], () => {
	"use strict";

	const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

	return {
		sleep: (ms) => new Promise((r) => setTimeout(r, ms)),

		escapeHtml: (s) => String(s).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]),

		parseMs: (val, def) => (val ? +val : def),

		buildDelta(changes, xx) {
			const delta = {};
			for (const { attr, rowIdx, field } of changes.values()) {
				if (field !== undefined) {
					if (!delta[attr]?.__delta) delta[attr] = { __delta: {} };
					delta[attr].__delta[rowIdx] ??= {};
					delta[attr].__delta[rowIdx][field] = xx[attr]?.[rowIdx]?.[field];
				} else {
					delta[attr] = xx[attr];
				}
			}
			return delta;
		},
	};
});
