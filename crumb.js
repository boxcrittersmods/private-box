

function loginCrumb(player) {
    return {
        playerId:player.id,
        nickname:player.nickname,
        inventory:player.inventory
    };
}

function playerCrumb(player) {
    return {
        i:player.id,
        n:player.nickname,
        x:player.x,
        y:player.y,
        r:player.r,
        s:player.s
    };
}

function roomCrumb(room) {
    return {
        roomId:room.id,
        name:room.name,
        playerlist:room.players.map(p=>playerCrumb(p)),
        height:room.json.height,
        width:room.json.width,
        margin:room.json.margin,
        minDistance:room.json.minDistance,
        artwork:room.json.artwork,
        tileMap:room.json.tileMap,
        tileSize:room.json.tileSize
    };
}

function moveCrumb(player) {
    return {
        i:player.id,
        x:player.x,
        y:player.y,
        r:player.r
    };
}

function messageCrumb(player,message) {
    return {
        i:player.id,
        m:message
    };
}

function joinCrumb(player) {
    return playerCrumb(player);
}

function leaveCrumb(player) {
    return {
        i:player.id
    };
}

module.exports = {
    loginCrumb,
    playerCrumb,
    roomCrumb,
    moveCrumb,
    messageCrumb,
    leaveCrumb
}

/*
CRUMB
loginCrumb(player) {
    playerId
    nickname
    inventory
}
playerCrumb(player) {
    i
    n
    x
    y
    r
    s
}
roomCrumb(room) {
    roomId
    name
    height
    width
    margin
    minDistance
    artwork
    tileMap
    tileSize
}
moveCrumb(player) {
    x
    y
    r
}
messageCrumb(player,message) {
    i
    m
}
joinCrumb(player) {
    i
    n
    r
    s
    x
    y
}
leaveCrumb(player) {
    i
}
*/