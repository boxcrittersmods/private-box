"use strict";

const JSONTools = require('./json');
const fs = require('fs');
const path = require('path');

const DATA_FOLDER = path.normalize(require.main.filename + "/../data/");
console.log("DATA:", DATA_FOLDER);
let data = {
	rooms: undefined,
	players: undefined,
};

/*****************
 * Players
 *****************/

function SaveNewPlayer(player) {
	let index = GetPlayer(player.playerId, true); // true to get index
	if (index == -1)
		players.push(player);
	else
		console.log(`player is already connected: ${player.nickname}`);
}

function GetPlayer(playerId, index = false) {
	return players[index ? 'findIndex' : 'find']
		(p => p.playerId === playerId);
}

/*****************
 * ROOMS
 *****************/

data.rooms = JSON.parse(fs.readFileSync(`${DATA_FOLDER}rooms.json`));
/*
function GetHoliday() {
	if (new Date().getMonth() == 9) {
		return "halloween";
	}
}
async function SaveNewRoom(id) {
	let name = id;
	
	let holiday = GetHoliday();
	if (holiday) {
		let holidayJson = name = name + "-" + holiday;
		if (JSONTools.JSONExists(holidayJson)) {
			name = holidayJson;
		}
	}
	
	let data = await JSONTools.ReadJSON(`folder${name}.json"`);
	let room = new Room(id, data);
	rooms.push(room);
}
*/

module.exports = {
	SaveNewPlayer,
	GetPlayer,
	data,
};
