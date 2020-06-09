const JSONTools = require('./json');
const fs = require('fs')
const path = require('path');

const DATA_FOLDER = require.main.filename + "/../data/";
console.log("DATA:", DATA_FOLDER);
var data = {
	rooms: undefined,
	players: undefined,
};

/*****************
 * Players
 *****************/

function SaveNewPlayer(player) {
	var index = GetPlayer(player.playerId, true); // true to get index
	if (index == -1) {
		players.push(player);
	} else {
		console.log(`player is already connected: ${player.nickname}`);
	}
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
		return "halloween"
	}
	return undefined
}
async function SaveNewRoom(id) {
	var name = id
	
	var holiday = GetHoliday()
	if (holiday) {
		var holidayJson = name = name + "-" + holiday
		if (JSONTools.JSONExists(holidayJson)) {
			name = holidayJson
		}
	}
	
	var data = await JSONTools.ReadJSON(folder + name + ".json")
	var room = new Room(id, data)
	rooms.push(room)
}
*/

module.exports = {
	SaveNewPlayer,
	GetPlayer,
	data,
};
