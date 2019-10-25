const JSONTools = require('./json');
const Room = require('./room');
const path = require('path');

const players = [];
const rooms = [];

/*****************
 * Players
 *****************/
function GetPlayerIndex(nickname) {
    return players.findIndex(p=>p.nickname===nickname);
}

function SaveNewPlayer(player) {
    var index = GetPlayerIndex(player.nickname);
    if(index == -1) {
        players.push(player);
    }
}

function GetPlayer(nickname) {
    return players.find(p=>p.nickname===nickname);
}

/*****************
 * ROOMS
 *****************/
var folder = path.join(global.appDir,"./rooms/");
console.log("ROOMS:",folder)
var roomIds = [
    "tavern"
]

function GetHoliday() {
    if(new Date().getMonth()==9) {
        return "halloween";
    }
    return undefined;
}
 
async function SaveNewRoom(id) {
    var name = id;
    var holiday = GetHoliday();
    if(holiday){
        var holidayJson = name = name + "-" + holiday;
        if(JSONTools.JSONExists(holidayJson)) {
            name = holidayJson;
        }
    }
    var data = await JSONTools.ReadJSON(folder + name + ".json");
    var room = new Room(id,data);
    rooms.push(room);
}


function InitRooms() {
    roomIds.forEach(roomId=>{
        SaveNewRoom(roomId);
    });
}

function GetRoomIndex(roomId) {
    return rooms.findIndex(r=>r.id===roomId);
}

function GetRoom(roomId) {
    return rooms.find(r=>r.id===roomId);
}

InitRooms();

module.exports = {
    SaveNewPlayer,
    GetPlayer,
    GetRoom
}
