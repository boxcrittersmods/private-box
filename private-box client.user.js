// ==UserScript==
// @name         Private-box client
// @namespace    http://tampermonkey.net/
// @version      Alpha 1.1.0
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

	cardboard.on('loadScriptLogin', function (tag) {
		tag.innerHTML = tag.innerHTML.replace(
			/(let|var|)\s+ticket\s*=\s*result\.data\.SessionTicket\s*[\n;]/,
			`let data = result.data;
			console.log({data});`
		).replace(
			/['"]handleLogin['"]\s*,\s*{\s*detail\s*:\s*ticket\s*}/,
			`'handleLogin',{detail:Object.assign({
				sessionTicket: data.SessionTicket,
				playerId: data.PlayFabId
			},${JSON.stringify(url.data)})}`
		);
	});
	cardboard.on('loadScriptIndex', function (tag) {
		tag.innerHTML = tag.innerHTML.replace(
			/socketURL\s*=\s*[^\n;\s]*\s*[;\n]/,
			`socketURL = ${JSON.stringify(url.ip)};`
		).replace(
			/world\.login\(event\.detail\)\s*[;\n]/,
			`console.log({detail:event.detail});
			world.login(event.detail);`
		);
	});
})();