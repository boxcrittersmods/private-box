

function loginCrumb(player) {
	return {
		playerId: player.playerId,
		critterId: player.critterId,
		nickname: player.nickname,
		inventory: player.inventory
	}
}

function playerCrumb(player) {
	return {
		i: player.playerId,
		n: player.nickname,
		c: player.critterId,
		x: player.x,
		y: player.y,
		r: player.r,
		s: player.s
	}
}

function roomCrumb(room) {
	return {
		RoomId: room.id,
		Name: room.json.name,
		PlayerCrumbs: room.players.map(p => playerCrumb(p)),
		Height: room.json.height,
		Width: room.json.width,
		margin: room.json.margin,
		minDistance: room.json.minDistance,
		artwork: room.json.artwork,
		tileMap: room.json.tileMap,
		tileSize: room.json.tileSize
	}
}

function moveCrumb(player) {
	return {
		i: player.playerId,
		x: player.x,
		y: player.y,
		r: player.r
	}
}

function messageCrumb(player, message) {
	return {
		i: player.playerId,
		m: message
	}
}

function joinCrumb(player) {
	return playerCrumb(player)
}

function leaveCrumb(player) {
	return {
		i: player.playerId
	}
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