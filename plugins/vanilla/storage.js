const JSONTools = require('./json')
const path = require('path')

const players = []

/*****************
 * Players
 *****************/

function SaveNewPlayer(player) {
	var index = GetPlayer(player.playerId, true) // true to get index
	if (index == -1) {
		players.push(player)
	} else {
		console.log(`player is already connected: ${player.nickname}`)
	}
}

function GetPlayer(playerId, index = false) {
	return players[index ? 'findIndex' : 'find']
		(p => p.playerId === playerId)
}

/*****************
 * ROOMS
 *****************/

var folder = require.main.filename + "/../rooms/"
console.log("ROOMS:", folder)
var roomIds = [
	"tavern"
]

var tempRoomList = require(folder + 'rooms')
/*
function GetHoliday() {
	if (new Date().getMonth() == 9) {
		return "halloween"
	}
	return undefined
}
*/
async function SaveNewRoom(id) {
	var name = id
	/*
	var holiday = GetHoliday()
	if (holiday) {
		var holidayJson = name = name + "-" + holiday
		if (JSONTools.JSONExists(holidayJson)) {
			name = holidayJson
		}
	}
	*/
	var data = await JSONTools.ReadJSON(folder + name + ".json")
	var room = new Room(id, data)
	rooms.push(room)
}


function InitRooms(Room) {
	var rooms = {}
	for (let i of tempRoomList)
		rooms[i.RoomId] = new Room(i)

	return rooms
	//for room list or something
	//	SaveNewRoom(i)
}

module.exports = {
	SaveNewPlayer,
	GetPlayer,
	InitRooms,
}
