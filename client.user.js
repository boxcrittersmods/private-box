// ==UserScript==
// @name         Private-box
// @description  Connect to private-box / other boxcritters servers
// @author       SArpnt
// @version      Alpha 3.0.0
// @namespace    https://boxcrittersmods.ga/authors/sarpnt/
// @homepage     https://boxcrittersmods.ga/projects/private-box/
// @updateURL    https://github.com/boxcrittersmods/private-box/raw/master/client.user.js
// @downloadURL  https://github.com/boxcrittersmods/private-box/raw/master/client.user.js
// @supportURL   https://github.com/boxcrittersmods/private-box/issues
// @run-at       document-start
// @grant        none
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/index.html?*
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// @require      https://github.com/SArpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// @require      https://unpkg.com/json5@^2.0.0/dist/index.min.js
// ==/UserScript==

(function () {
	'use strict';
	let modData = cardboard.register('privateBox');

	const urlParams = new URLSearchParams(window.location.search);
	let url = {
		ip: urlParams.get("ip"),
		data: JSON.parse(urlParams.get("sendData")),
	};
	if (!url.ip) return; // nothing needs to happen if not connecting to a server
	modData = url;

	cardboard.on('loadScriptCreatejs', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/var\s+i\s*=\s*d\.src/,
			`var i = d.ourl`
		).replace(
			/i\s*=\s*b\s*\+\s*i,/,
			``
		);
	});
	cardboard.on('runScriptCreatejs', function (t) {
		let o = createjs.LoadItem.create;
		createjs.LoadItem.create = function (u) {
			let li = o.call(this, u);
			li.ourl = li.src;
			li.src = li.src.replace(
				'::ip::',
				url.ip
			);
			return li;
		};
	});
	cardboard.on('loadScriptClient', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/this\.code\s*\(\s*['"`]code['"`]\s*,\s*i\s*\)/,
			`this\.code("code", i, ...e)`
		);
	});
	cardboard.on('loadScriptIndex', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/world\.preload\s*\(([^)]*)\)/,
			(_, p) => {
				let preload = JSON5.parse(p);
				for (let a of preload)
					a.src = a.src.replace(
						/^https?:\/\/([^/]*)/,
						(_, domain) => {
							if (domain == 'media.boxcritters.com')
								return url.ip + '/media';
							else
								return url.ip;
						}
					);
				console.log(preload);
				return `world.preload(${JSON.stringify(preload)})`;
			}
		).replace(
			/world\.connect\s*\([^\)\n]*\)/,
			`world.connect(${JSON.stringify(url.ip)})`
		).replace(
			/world\.login\s*\(\s*sessionStorage\.getItem\s*\(\s*['"`]sessionTicket['"`]\s*\)\s*\)\s*[;\n]/,
			`world.login(Object.assign(
					{
						playerId: sessionStorage.getItem('playerId'),
						//sessionTicket: sessionStorage.getItem('sessionTicket'),
					},
					${JSON.stringify(url.data)}
				)
			);`
		).replace(
			/world\.joinRoom\s*\(\s*['"`]port['"`]\s*\)/,
			`world.joinLobby()`
		);
	});
})();