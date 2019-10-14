/*
ROOM
artwork:
    background
    forground
    props:
        Array(Array(number)[3])
    sprites:
        frames: Array(Array(number)[7])
        images: Array(string)
    height:number
    margin:number
    minDistance:20
    name:string
    playerList
    roomId:tavern
    tileMap:Array(Array(number)[8])
    tilesize: number
    width: number
*/
const ReadJSON = require('./json');
const Player = require('./player')
var folder = "./rooms/";
var roomIds = [
    "tavern"
]
var rooms = []

async function LoadRoom(id) {
    var data = await ReadJSON(folder + id + ".json");
    rooms.push(data);
}

roomIds.forEach(roomId=>{
    LoadRoom(roomId);
});

function GetRoom(id) {
    return rooms.find(r => r.roomId === id);
}

function AddPlayer(room,player) {
    room.playerList = room.playerList || [];
    room.playerList = Player.ToRoomPlayerFormat(player);
}

function RemovePlayer(room,player) {
    room.playerList = room.playerList.filter(p=>p.i!=player.id);
}

module.exports = {
    AddPlayer
}