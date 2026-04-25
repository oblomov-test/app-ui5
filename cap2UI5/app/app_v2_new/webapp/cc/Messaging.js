sap.ui.define(["sap/m/MessageBox", "sap/m/MessageToast", "z2ui5/BackendAdapter", "z2ui5/Helpers"], (MessageBox, MessageToast, Adapter, Helpers) => {
	"use strict";

	const _msgParser = new DOMParser();
	const _sanitizeEl = document.createElement("div");
	const { parseMs } = Helpers;

	const sanitizeMessageDetails = (html) => {
		const doc = _msgParser.parseFromString(html, "text/html");
		const items = [...doc.querySelectorAll("li")];
		if (items.length) {
			return `<ul>${items
				.map((li) => {
					_sanitizeEl.textContent = li.textContent;
					return `<li>${_sanitizeEl.innerHTML}</li>`;
				})
				.join("")}</ul>`;
		}
		_sanitizeEl.textContent = doc.body.textContent;
		return _sanitizeEl.innerHTML;
	};

	const showToast = (msg, controller) => {
		MessageToast.show(msg.TEXT, {
			duration: parseMs(msg.DURATION, 3000),
			width: msg.WIDTH || "15em",
			onClose: msg.ONCLOSE ? () => controller.eB([msg.ONCLOSE]) : null,
			autoClose: !!msg.AUTOCLOSE,
			animationTimingFunction: msg.ANIMATIONTIMINGFUNCTION || "ease",
			animationDuration: parseMs(msg.ANIMATIONDURATION, 1000),
			closeonBrowserNavigation: !!msg.CLOSEONBROWSERNAVIGATION,
		});
		if (msg.CLASS) {
			document.querySelector(".sapMMessageToast")?.classList.add(...msg.CLASS.trim().split(/\s+/).filter(Boolean));
		}
	};

	const showBox = (msg, controller) => {
		const oParams = {
			styleClass: msg.STYLECLASS || "",
			title: msg.TITLE || "",
			onClose: msg.ONCLOSE ? (sAction) => controller.eB([msg.ONCLOSE, sAction]) : null,
			actions: msg.ACTIONS || "OK",
			emphasizedAction: msg.EMPHASIZEDACTION || "OK",
			initialFocus: msg.INITIALFOCUS || null,
			textDirection: msg.TEXTDIRECTION || "Inherit",
			details: msg.DETAILS ? sanitizeMessageDetails(msg.DETAILS) : "",
			closeOnNavigation: !!msg.CLOSEONNAVIGATION,
			...(msg.ICON && msg.ICON !== "NONE" && { icon: msg.ICON }),
		};
		MessageBox[msg.TYPE]?.(msg.TEXT, oParams);
	};

	return {
		showAll(response, controller) {
			const toast = Adapter.msgToast(response);
			if (toast?.TEXT !== undefined) showToast(toast, controller);
			const box = Adapter.msgBox(response);
			if (box?.TEXT !== undefined) showBox(box, controller);
		},
	};
});
