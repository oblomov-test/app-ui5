sap.ui.define(
	["sap/ui/core/Control", "sap/m/Button", "sap/ui/unified/FileUploader", "sap/m/HBox", "z2ui5/Runtime"],
	(Control, Button, FileUploader, HBox, z2ui5) => {
		"use strict";

		return Control.extend("z2ui5.FileUploader", {
			metadata: {
				properties: {
					value: { type: "string", defaultValue: "" },
					path: { type: "string", defaultValue: "" },
					tooltip: { type: "string", defaultValue: "" },
					fileType: { type: "string", defaultValue: "" },
					placeholder: { type: "string", defaultValue: "" },
					buttonText: { type: "string", defaultValue: "" },
					style: { type: "string", defaultValue: "" },
					uploadButtonText: { type: "string", defaultValue: "Upload" },
					enabled: { type: "boolean", defaultValue: true },
					icon: { type: "string", defaultValue: "sap-icon://browse-folder" },
					iconOnly: { type: "boolean", defaultValue: false },
					buttonOnly: { type: "boolean", defaultValue: false },
					multiple: { type: "boolean", defaultValue: false },
					visible: { type: "boolean", defaultValue: true },
					checkDirectUpload: { type: "boolean", defaultValue: false },
				},

				events: {
					upload: { allowPreventDefault: true, parameters: {} },
				},
			},

			init() {
				this._oFileUploader = new FileUploader({
					change: (oEvent) => this._onChange(oEvent),
					uploadComplete: (oEvent) => this._onUploadComplete(oEvent),
				});
				this._oUploadButton = new Button({
					press: () => this._onUploadPress(),
				});
				this._oHBox = new HBox({ items: [this._oFileUploader, this._oUploadButton] });
			},

			exit() {
				this._oHBox?.destroy();
			},

			_readFile(file) {
				const reader = new FileReader();
				reader.onload = () => {
					if (this.isDestroyed()) return;
					this.setProperty("value", reader.result);
					this.fireUpload();
				};
				reader.onerror = () => z2ui5.logError(`FileUploader: FileReader failed`, reader.error);
				reader.readAsDataURL(file);
			},

			_onChange(oEvent) {
				if (this.getProperty("checkDirectUpload")) return;
				const value = oEvent.getSource().getProperty("value");
				this.setProperty("path", value);
				this._oUploadButton.setEnabled(!!value);
			},

			_onUploadComplete(oEvent) {
				if (!this.getProperty("checkDirectUpload")) return;
				const source = oEvent.getSource();
				this.setProperty("path", source.getProperty("value"));
				const file = source.oFileUpload?.files?.[0];
				if (file) this._readFile(file);
			},

			_onUploadPress() {
				this.setProperty("path", this._oFileUploader.getProperty("value"));
				const file = this._oFileUploader.oFileUpload?.files?.[0];
				if (file) this._readFile(file);
			},

			_syncInnerControls() {
				const directUpload = this.getProperty("checkDirectUpload");
				const path = this.getProperty("path");

				this._oFileUploader
					.setIcon(this.getProperty("icon"))
					.setIconOnly(this.getProperty("iconOnly"))
					.setButtonOnly(this.getProperty("buttonOnly"))
					.setButtonText(this.getProperty("buttonText"))
					.setStyle(this.getProperty("style"))
					.setFileType(this.getProperty("fileType"))
					.setVisible(this.getProperty("visible"))
					.setUploadOnChange(directUpload)
					.setMultiple(this.getProperty("multiple"))
					.setEnabled(this.getProperty("enabled"))
					.setValue(path)
					.setPlaceholder(this.getProperty("placeholder"));

				this._oUploadButton
					.setText(this.getProperty("uploadButtonText"))
					.setEnabled(path !== "")
					.setVisible(!directUpload);
			},

			renderer: {
				apiVersion: 2,
				render(oRm, oControl) {
					oControl._syncInnerControls();
					oRm.renderControl(oControl._oHBox);
				},
			},
		});
	},
);
