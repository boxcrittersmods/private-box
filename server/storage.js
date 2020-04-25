const JSONTools = require('./json')
const Room = require('./room')
const path = require('path')

const players = []
const rooms = []

/*****************
 * Players
 *****************/

function SaveNewPlayer(player) {
	var index = GetPlayer(player.playerId, true) // true to get index
	if (index == -1) {
		players.push(player)
	}
}

function GetPlayer(playerId, index = false) {
	return players[index ? 'findIndex' : 'find']
		(p => p.playerId === playerId)
}

/*****************
 * ROOMS
 *****************/
var folder = path.join(global.appDir, "./rooms/")
console.log("ROOMS:", folder)
var roomIds = [
	"tavern"
]

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


function InitRooms() {
	roomIds.forEach(roomId => {
		SaveNewRoom(roomId)
	})
}

function GetRoom(roomId, index = false) {
	return rooms[index ? 'findIndex' : 'find']
		(r => r.id === roomId)
}

InitRooms()

module.exports = {
	SaveNewPlayer,
	GetPlayer,
	GetRoom
}
