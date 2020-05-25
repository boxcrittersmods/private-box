// ==UserScript==
// @name         Private-box client
// @namespace    http://tampermonkey.net/
// @version      Alpha 1.0.0
// @run-at       document-start
// @description  connect to private-box servers
// @author       SArpnt
// @match        https://play.boxcritters.com/*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	const urlParams = new URLSearchParams(window.location.search);
	let url = {
		ip: urlParams.get("ip"),
		data: JSON.parse(urlParams.get("sendData")),
	};
	if (!url.ip) return; // nothing needs to happen if not connecting to a server

	if (document.head) { // dumdum detector
		alert('Enable instant script injection in Tampermonkey settings');
		return;
	}

	let scripts = {
		login: { src: '/scripts/login.js', text: null, done: false },
		index: { src: 'index.js', text: null, done: false },
	};
	for (let i in scripts)
		$.get(scripts[i].src, d => (scripts[i].text = d), 'text');

	//if (!window.cardboard)// cardboard fixes world events
	//	alert('Cardboard missing, mod compatibility is TERRIBLE with non-cardboard mods');

	scripts.login.function = function (oldtag) {
		var tag = document.createElement('script');
		tag.innerHTML = scripts.login.text.replace(
			/['"]handleLogin['"]\s*,\s*{\s*detail\s*:\s*ticket\s*}/,
			`'handleLogin',{detail:(console.log(result),ticket)}`
		);

		oldtag.replaceWith(tag);
	};
	scripts.index.function = function (oldtag) {
		var tag = document.createElement('script');
		tag.innerHTML = scripts.index.text.replace(
			/socketPath\s*=\s*[^\n;\s]*\s*[;\n]/,
			`socketPath=${JSON.stringify(url.ip)};`
		);

		oldtag.replaceWith(tag);
	};
	new MutationObserver((m, o) => {
		for (let i in scripts)
			if (!scripts[i].done) {
				let a = document.querySelector(`script[src='${scripts[i].src}']`);
				if (a) {
					scripts[i].function(a);
					scripts[i].done = true;
					if (Object.values(scripts).every(i => i.done)) o.disconnect();
				}
			}
	}).observe(document.documentElement, { childList: true, subtree: true });
})();