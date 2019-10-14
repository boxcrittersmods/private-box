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
var folder = "./rooms/"
var rooms = []

async function CreateRoom(id) {
    var data = await ReadJSON(folder + id + ".json");
    rooms.push(data);
    return data;
}

function GetRoomFromID(id) {
    return rooms.find(r => r.roomId === roomId);
}

function AddPlayer(room,player) {
    room.playerList = room.playerList || [];
    room.playerList = Player.ToRoomPlayerFormat(player);
}

module.exports = {
    CreateRoom,
    GetRoomFromID,
    AddPlayer
}