// ==UserScript==
// @name         Private-box client
// @namespace    http://tampermonkey.net/
// @version      Alpha 1.0.0
// @run-at       document-start
// @description  connect to private-box servers
// @author       SArpnt
// @match        https://boxcritters.com/play/*
// @grant        unsafeWindow
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
		alert('Head already exists - make sure to enable instant script injection');
		return;
	}

	//if (!window.cardboard)// cardboard fixes world events
	//	alert('Cardboard missing, mod compatibility is TERRIBLE with non-cardboard mods');

	var worldTags = [];

	new MutationObserver((m, o) => {
		function foundWorld(tag) {
			tag.remove(); // yeet
			worldTags.push(tag); // save for later
		}
		function foundSocketPath(tag) {
			tag.remove(); // yeet

			tag.innerHTML = tag.innerHTML.replace(/socketPath\s*=\s*'([^']*)'\s*[;\n]/, `socketPath=${JSON.stringify(url.ip)};`);
			console.log(tag.innerHTML);

			World.prototype.login = function (t) {
				socket.open();
				let loginInfo = { playerId: myPlayer.playerId };
				if (url.data) loginInfo = Object.assign(loginInfo, url.data);
				socket.emit("login", loginInfo);
			};

			if (worldTags.length > 0)
				throw ("world used before world created? mod may be out of date or other broken mods are being used", { tag, worldTags });

			worldTags.push(tag); // save for later

		}
		for (let r of m) {
			let e = r.target; // i should probably test if you can use deconstruction in the for loop
			if (e.tagName == "SCRIPT" && /world/.exec(e.innerHTML) && !worldTags.includes(e.innerHTML))
				if (/var socketPath/.exec(e.innerHTML))
					foundSocketPath(e);
				else
					foundWorld(e);
		}
	}).observe(document.documentElement, { childList: true, subtree: true });

	window.addEventListener('load', function () {
		for (let script of worldTags) {
			this.document.body.appendChild(script); // lets a go
		}
	});
})();