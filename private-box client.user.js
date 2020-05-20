// ==UserScript==
// @name         Private-box client
// @namespace    http://tampermonkey.net/
// @version      0.2
// @run-at       document-start
// @description  connect to private-box servers
// @author       SArpnt
// @match        https://boxcritters.com/play/*
// @grant        none
// ==/UserScript==

(function () {
	"use strict";

	if (document.head) { // dumdum detector
		alert('Head already exists - make sure to enable instant script injection');
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	let url = {
		ip: urlParams.get("ip"),
		data: JSON.parse(urlParams.get("sendData")),
	};
	if (!url.ip) return;

	new MutationObserver((m, o) => {
		var tag;
		for (let r of m) {
			let e = r.target; // i should probably test if you can use deconstruction in the for loop
			if (e.tagName == "SCRIPT" && /var socketPath/.exec(e.innerHTML)) {
				tag = e;
				break;
			}
		}
		if (tag) {
			o.disconnect();
			//tag.remove(); // yeet the connect script

			tag.innerHTML = tag.innerHTML.replace(/socketPath\s*=\s*'([^']*)'\s*[;\n]/, `socketPath=${JSON.stringify(url.ip)};`);
			console.log(tag.innerHTML);

			World.prototype.login = function (t) {
				socket.open();
				let loginInfo = { playerId: myPlayer.playerId };
				if (url.data) loginInfo = Object.assign(loginInfo, url.data);
				socket.emit("login", loginInfo);
			};

			//(_=>eval(tag.innerHTML)).call(unsafeWindow)
		} // else alert("Can't find connection script! tell SArpnt to update the client");
	})
		.observe(document.documentElement, { childList: true, subtree: true });
})();