// ==UserScript==
// @name         Private-box client
// @namespace    http://tampermonkey.net/
// @version      Alpha 2.0.0
// @run-at       document-start
// @description  Connect to private-box servers
// @author       SArpnt
// @match        https://play.boxcritters.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://github.com/sarpnt/joinFunction/raw/master/script.js
// @require      https://github.com/sarpnt/EventHandler/raw/master/script.js
// @require      https://github.com/boxcritters/cardboard/raw/master/script.user.js
// ==/UserScript==

(function () {
	"use strict";

	const urlParams = new URLSearchParams(window.location.search);
	let url = {
		ip: urlParams.get("ip"),
		data: JSON.parse(urlParams.get("sendData")),
	};
	if (!url.ip) return; // nothing needs to happen if not connecting to a server

	cardboard.on('loadScriptClient', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/.emit\(\s*['"`]code['"`]\s*,\s*i\s*\)/,
			`.emit("code", i, ...e)`
		)
	});
	cardboard.on('loadScriptLogin', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/(let|var|)\s+ticket\s*=\s*result\.data\.SessionTicket\s*[\n;]/,
			`let data = result.data;
			console.log({data});`
		).replace(
			/['"`]handleLogin['"`]\s*,\s*{\s*['"]?detail['"]?\s*:\s*ticket\s*}/,
			`'handleLogin',{detail:Object.assign({
				sessionTicket: data.SessionTicket,
				playerId: data.PlayFabId
			},${JSON.stringify(url.data)})}`
		);
	});
	cardboard.on('loadScriptIndex', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/socketURL\s*=\s*[^\n;\s]*\s*[;\n]/,
			`socketURL = ${JSON.stringify(url.ip)};`
		).replace(
			/world\.login\(event\.detail\)\s*[;\n]/,
			`console.log({detail:event.detail});
			world.login(event.detail);`
		);
	});
})();