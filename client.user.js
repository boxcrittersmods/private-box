// ==UserScript==
// @name         Private-box
// @description  Connect to private-box / other boxcritters servers
// @author       SArpnt
// @version      Alpha 3.3.0
// @namespace    https://boxcrittersmods.ga/authors/sarpnt/
// @homepage     https://boxcrittersmods.ga/projects/private-box/
// @updateURL    https://github.com/boxcrittersmods/private-box/raw/master/client.user.js
// @downloadURL  https://github.com/boxcrittersmods/private-box/raw/master/client.user.js
// @supportURL   https://github.com/boxcrittersmods/private-box/issues
// @run-at       document-start
// @grant        none
// @include      /^https:\/\/boxcritters\.com\/play\/(index\.html)?([\?#].*)?$/
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// @require      https://github.com/SArpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// @require      https://unpkg.com/json5@^2.0.0/dist/index.min.js
// ==/UserScript==

(function () {
	'use strict';
	let modData = cardboard.register('privateBox');

	if (!window.location.search) {
		let search = sessionStorage.getItem('privateBox');
		if (search) {
			sessionStorage.removeItem('privateBox');
			window.location.search = search;
		}
		return;
	}

	const urlParams = new URLSearchParams(window.location.search);
	let url = {
		ip: urlParams.get("ip"),
	};
	if (!url.ip) return; // nothing needs to happen if not connecting to a server
	try {
		url.sendData = JSON5.parse(urlParams.get("sendData"));
	} catch (e) {
		url.sendData = e;
	}
	for (let i in url)
		modData[i] = url[i];

	modData.urlParse = u => u.replace('::ip::', url.ip);

	cardboard.on('loadScriptCreatejs', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/var\s+i\s*=\s*d\.src/, // get loadItem ourl instead of source in b._createLoadItem
			`var i = d.ourl`
		).replace(
			/i\s*=\s*b\s*\+\s*i,/, // don't add whatever url b is in b._createLoadItem
			``
		).replace(
			/f\s*=\s*document\.createElement\s*\(\s*['"`]img['"`]\s*\)\s*,\s*f\.src\s*=\s*g/, // change source of loaded images in b._parseData
			`f = document.createElement("img"), f.src = cardboard.mods.privateBox.urlParse(g)`
		);
	});
	cardboard.on('runScriptCreatejs', function (t) {
		let o = createjs.LoadItem.create;
		createjs.LoadItem.create = function (u) {
			let li = o.call(this, u);
			li.ourl = li.src;
			li.src = modData.urlParse(li.src);
			return li;
		};
	});
	cardboard.on('loadScriptWorld', function (t) {
		t.innerHTML = t.innerHTML/*.replace(
			/this\.code\s*\(\s*['"`]code['"`]\s*,\s*i\s*\)/,
			`this\.code("code", i, ...e)`
		)*/.replace(
			/new\s*createjs\.LoadQueue\((?:([^\),]*),?)*\)/g,
			(...a) => {
				let x = a.slice(1, a.length - 2); // get previous params
				return `new createjs.LoadQueue(${x[0]},${x[1]},true)`; // allow cross origin when loading assets
			}
		);
	});
	cardboard.on('runScriptWorld', function () {
		convertToImgElement = function (t) {
			if ("string" == typeof t) {
				var i = document.createElement("img");
				return i.crossOrigin = "Anonymous",
					i.src = modData.urlParse(t),
					i;
			}
			return t;
		};
	});
	cardboard.on('loadScriptInit', function (t) {
		t.innerHTML = t.innerHTML.replace(
			/world\.preload\s*\(([^)]*)\)/,
			/*(_, p) => {
				let preload = JSON5.parse(p);
				function editPreload(p) {
					if (/^https?:\/\/([^/]*)/.test(p.src))
						p.src = p.src.replace(
							/^https?:\/\/([^/]*)/,
							(_, domain) => {
								if (domain == 'media.boxcritters.com')
									return url.ip + '/data/media';
								else
									return url.ip + '/data';
							}
						);
					else
						p.src = url.ip + '/data/' + p.src;
				}
				if (Array.isArray(preload))
					for (let p of preload)
						editPreload(p);
				else
					editPreload(preload);
				return `world.preload(${JSON.stringify(preload)})`;
			}*/
			/*`{
				let PBxhttp = new XMLHttpRequest();
				PBxhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						let m = PBxhttp.response;
						if (typeof m == 'string')
							m = JSON.parse(m);
						console.debug("[Private Box]", "Manifest:", m);
						world.preload(m);
					}
				};
				PBxhttp.open("GET", "${JSON.stringify(url.ip)}/data/manifest.json", true);
				PBxhttp.send();
			}`*/
			`world.preload({src: \`\${${JSON.stringify(url.ip)}}/data/manifest.json\`, type: 'manifest'})` // get manifest (assets) from server
		).replace(
			/world\.connect\s*\([^\)\n]*\)/,
			`world.connect(${JSON.stringify(url.ip)})` // connect to server
		).replace(
			/world\.login\s*\(\s*sessionStorage\.getItem\s*\(\s*['"`]sessionTicket['"`]\s*\)\s*\)\s*/, // send playerId, url sendData, and not sessionTicket
			`world.login(Object.assign(
					{
						playerId: sessionStorage.getItem('playerId'),
						//sessionTicket: sessionStorage.getItem('sessionTicket'),
					},
					${JSON.stringify(url.sendData)}
				)
			)`
		).replace(
			/world\.joinRoom\s*\(\s*['"`]port['"`]\s*\)/, // join server lobby instead of hardcoding to port
			`world.joinLobby()`
		).replace(
			/window\.location\.href\s*=\s*['"`]\.\.\/index\.html['"`][;\n]/, // store server information before redirecting to login
			`sessionStorage.setItem('privateBox', window.location.search);
			window.location.href = "../index.html";`
		);
	});
})();