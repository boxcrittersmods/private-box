module.exports = new class {

	loginCrumb(player) {
		return {
			playerId: player.playerId,
			critterId: player.critterId,
			nickname: player.nickname,
			inventory: player.inventory
		}
	}

	playerCrumb(player) {
		return {
			i: player.playerId,
			n: player.nickname,
			c: player.critterId,
			x: player.x,
			y: player.y,
			r: player.r
		}
	}

	roomCrumb(room) {
		return {
			RoomId: room.id,
			Name: room.json.name,
			PlayerCrumbs: room.players.map(p => this.playerCrumb(p)),
			Height: room.json.height,
			Width: room.json.width,
			margin: room.json.margin,
			minDistance: room.json.minDistance,
			artwork: room.json.artwork,
			tileMap: room.json.tileMap,
			tileSize: room.json.tileSize
		}
	}

	moveCrumb(player) {
		return {
			i: player.playerId,
			x: player.x,
			y: player.y,
			//r: player.r // not used because it's unneccecary and rotation acutally breaks
		}
	}

	messageCrumb(player, message) {
		return {
			i: player.playerId,
			m: message
		}
	}

	leaveCrumb(player) {
		return {
			i: player.playerId
		}
	}

}