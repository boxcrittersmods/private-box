import { totalmem } from "os";

/*
PLAYER
playerId: string
nickname: string
inventory: array

room player format
i: playerId
n: Nickname
x: Ypos
y: Xpos
r: Rotation
s: ??
*/


var players = [];

var lastId = 0;

function generateId() {
  lastId++;
  return lastId.toString(16);
}

function createPlayer(nickname) {
  var player = {
    id:generateId(),
    nickname,
    inventory:[],
    xPos,
    yPos,
    rot,
    s
  };
  players.push(player);
  return player
}

function GetPlayerFromID(id) {
  return players.find(p => p.id === id);
}

function GetPlayerFromNickname(nickname) {
  return players.find(p => p.nickname === nickname);
}

function ToNewPlayerFormat(player) {
    return {
        playerId:player.id,
        nickname: player.nickname,
        inventory: player.inventory
    }
}

function ToRoomPlayerFormat(player) {
    return {
        i: player.id,
        n: player.nickname,
        x: player.xPos,
        y: player.yPos,
        r: player.rot,
        s: player.s
    }
}


module.exports {
    createPlayer,
    GetPlayerFromID,
    GetPlayerFromNickname,
    ToNewPlayerFormat,
    ToRoomPlayerFormat
}