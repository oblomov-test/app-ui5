sap.ui.define([], () => {
	"use strict";

	/**
	 * Tokenizes apostrophe-delimited backend custom-JS payloads, returning the
	 * argument list to pass to eF, or null if the input doesn't match the format.
	 *
	 * Accepted shape: anything containing an even number of single-quoted segments
	 * — only the inner segments are returned. Backslash-escaped quotes (\') inside
	 * a segment are preserved literally.
	 *
	 * Returns null for inputs that don't match (caller should logError + skip).
	 */
	const parse = (input) => {
		if (typeof input !== "string") return null;

		const args = [];
		let buf = "";
		let inQuote = false;
		let escape = false;

		for (const ch of input) {
			if (escape) {
				buf += ch;
				escape = false;
				continue;
			}
			if (ch === "\\") {
				escape = true;
				continue;
			}
			if (ch === "'") {
				if (inQuote) {
					args.push(buf);
					buf = "";
					inQuote = false;
				} else {
					inQuote = true;
				}
				continue;
			}
			if (inQuote) buf += ch;
		}

		if (inQuote || escape) return null;
		return args.length ? args : null;
	};

	return { parse };
});
