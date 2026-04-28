sap.ui.define([], () => {
	"use strict";

	const MAX_ERRORS = 100;
	const HOOK_NAMES = ["beforeRoundtrip", "afterRoundtrip", "afterRendering", "beforeEventFrontend"];

	const z2ui5 = (window.z2ui5 ??= {});

	const initDefaults = () => {
		z2ui5.errors ??= [];
		z2ui5.oConfig ??= {};
	};

	initDefaults();

	z2ui5.logError ??= function (message, error) {
		this.errors.push({
			message,
			...(error !== undefined && { error }),
			ts: new Date().toISOString(),
		});
		if (this.errors.length > MAX_ERRORS) {
			this.errors.splice(0, this.errors.length - MAX_ERRORS);
		}
	};

	// Pub/Sub for roundtrip lifecycle hooks. Returns an unsubscribe function.
	// Controls register in init() and call the unsubscribe in exit() — no manual array bookkeeping.
	z2ui5.hooks ??= (() => {
		const lists = Object.fromEntries(HOOK_NAMES.map((n) => [n, new Set()]));
		const get = (name) => {
			const set = lists[name];
			if (!set) throw new Error(`Unknown hook: '${name}'. Valid: ${HOOK_NAMES.join(", ")}`);
			return set;
		};
		return {
			on(name, fn) {
				const set = get(name);
				set.add(fn);
				return () => set.delete(fn);
			},
			emit(name, ...args) {
				const set = get(name);
				if (set.size === 0) return;
				for (const fn of set) {
					try {
						fn(...args);
					} catch (e) {
						z2ui5.logError(`hook '${name}' callback failed`, e);
					}
				}
			},
			clear() {
				for (const set of Object.values(lists)) set.clear();
			},
		};
	})();

	// Records a property change at the given UI5 path "/XX/attr[/rowIdx/field]".
	// Parses once on event, stores structured record in xxChanges Map.
	//
	// Only EXACTLY 3 segments (flat-table row-field) become a __delta patch.
	// Anything shallower (scalar/struct) or deeper (nested tree) falls back to
	// full-attr replace. The Map is keyed so that multiple writes to the same
	// attr in full-replace mode dedupe to a single entry.
	z2ui5.recordChange ??= function (fullPath) {
		if (!fullPath?.startsWith("/XX/")) return;
		const parts = fullPath.slice(4).split("/");
		const attr = parts[0];
		const isRowField = parts.length === 3 && parts[1] !== "" && !isNaN(parts[1]) && parts[2] !== "";
		const record = isRowField ? { attr, rowIdx: +parts[1], field: parts[2] } : { attr };
		const key = isRowField ? fullPath : `/XX/${attr}`;
		(this.xxChanges ??= new Map()).set(key, record);
	};

	// Cycle-safe JSON.stringify — replaces circular refs with "[Circular]" sentinel.
	// Use for serializing UI5 control objects, models, or any user-provided structure.
	z2ui5.safeStringify ??= function (val, indent = 3) {
		const seen = new WeakSet();
		return JSON.stringify(
			val ?? null,
			(_key, v) => {
				if (typeof v === "object" && v !== null) {
					if (seen.has(v)) return "[Circular]";
					seen.add(v);
				}
				return v;
			},
			indent,
		);
	};

	// Reset preserves object identity (other modules hold this reference) but clears state.
	z2ui5.reset ??= function () {
		const keep = new Set(["logError", "hooks", "recordChange", "safeStringify", "reset"]);
		for (const k of Object.keys(this)) {
			if (!keep.has(k)) delete this[k];
		}
		this.hooks.clear();
		initDefaults();
	};

	return z2ui5;
});
