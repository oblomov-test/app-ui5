sap.ui.define(["z2ui5/_NoopControl", "z2ui5/Runtime"], (NoopControl, z2ui5) => {
	"use strict";

	const opSymbols = { EQ: "", NE: "!", LT: "<", LE: "<=", GT: ">", GE: ">=" };
	const filterDisplayFns = {
		Contains: (v) => `*${v ?? ""}*`,
		StartsWith: (v) => `^${v ?? ""}`,
		EndsWith: (v) => `${v ?? ""}$`,
	};

	return NoopControl.extend("z2ui5.UITableExt", {
		metadata: {
			properties: {
				tableId: { type: "string" },
			},
		},

		init() {
			this._unhooks = [
				z2ui5.hooks.on("beforeRoundtrip", () => {
					this.readFilter();
					this.readSort();
				}),
				z2ui5.hooks.on("afterRoundtrip", () => {
					this.setFilter();
					this.setSort();
				}),
			];
		},

		exit() {
			this._unhooks?.forEach((u) => u());
		},

		_getTable() {
			return z2ui5.oView?.byId(this.getProperty("tableId"));
		},

		readFilter() {
			try {
				this.aFilters = this._getTable()?.getBinding()?.aFilters;
			} catch (e) {
				z2ui5.logError(`UITableExt.readFilter failed`, e);
			}
		},

		_applyWhenRendered(oTable, fn) {
			if (oTable.getDomRef()) {
				fn();
				return;
			}
			const delegate = {
				onAfterRendering: () => {
					oTable.removeEventDelegate(delegate);
					if (!this.isDestroyed()) fn();
				},
			};
			oTable.addEventDelegate(delegate);
		},

		_applyFilters(oTable, aFilters) {
			if (!aFilters) return;
			const binding = oTable.getBinding();
			if (!binding) return;
			binding.filter(aFilters);
			const columns = oTable.getColumns();

			for (const oFilter of aFilters) {
				const sProperty = oFilter.sPath || oFilter.aFilters?.[0]?.sPath;
				if (!sProperty) continue;

				const operator = oFilter.sOperator;
				const vValue = oFilter.oValue1 ?? oFilter.oValue2 ?? oFilter.aFilters?.[0]?.oValue1;
				const displayFn =
					operator === "BT"
						? (v) => `${v ?? ""}...${oFilter.oValue2 ?? ""}`
						: (filterDisplayFns[operator] ?? ((v) => `${opSymbols[operator] || ""}${v ?? ""}`));
				const display = displayFn(vValue);

				for (const oCol of columns) {
					if (oCol.getFilterProperty?.() === sProperty) {
						oCol.setFilterValue(display);
						oCol.setFiltered(!!display);
					}
				}
			}
		},

		_applyToTable(applyFn, errorMsg) {
			try {
				const oTable = this._getTable();
				if (!oTable) return;
				this._applyWhenRendered(oTable, () => applyFn(oTable));
			} catch (e) {
				z2ui5.logError(errorMsg, e);
			}
		},

		setFilter() {
			this._applyToTable((oTable) => this._applyFilters(oTable, this.aFilters), `UITableExt.setFilter failed`);
		},

		readSort() {
			try {
				this.aSorters = this._getTable()?.getBinding()?.aSorters;
			} catch (e) {
				z2ui5.logError(`UITableExt.readSort failed`, e);
			}
		},

		_applySorters(oTable, aSorters) {
			if (!aSorters) return;
			const binding = oTable.getBinding();
			if (!binding) return;
			binding.sort(aSorters);
			const columns = oTable.getColumns();
			for (const [idx, srt] of aSorters.entries()) {
				for (const oCol of columns) {
					if (oCol.getSortProperty?.() === srt.sPath) {
						oCol.setSorted(true);
						oCol.setSortOrder(srt.bDescending ? "Descending" : "Ascending");
						oCol.setSortIndex?.(idx);
					}
				}
			}
		},

		setSort() {
			this._applyToTable((oTable) => this._applySorters(oTable, this.aSorters), `UITableExt.setSort failed`);
		},
	});
});
