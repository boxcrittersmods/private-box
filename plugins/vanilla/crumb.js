module.exports = new class {

	login(player) {
		return {
			coins: 0,
			critterId: player.critterId,
			eggs: [],
			gear: [],
			inventory: player.inventory,
			isMember: true,
			nickname: player.nickname,
			playerId: player.playerId,

			_pb_: {
				manifest: [
					
				]
			},
		};
	}

	player(player) {
		return {
			i: player.playerId,
			n: player.nickname,
			c: player.critterId,
			x: player.x,
			y: player.y,
			r: player.r
		};
	}

	room(room) {
		return {
			roomId: room.id,
			playerCrumbs: room.players.map(p => this.player(p)),

			//Name: room.json.name,
			//Height: room.json.height,
			//Width: room.json.width,
			//margin: room.json.margin,
			//minDistance: room.json.minDistance,
			//artwork: room.json.artwork,
			//tileMap: room.json.tileMap,
			//tileSize: room.json.tileSize
		};
	}

	move(player) {
		return {
			i: player.playerId,
			x: player.x,
			y: player.y,
			//r: player.r // not used because it's unneccecary and rotation acutally breaks
		};
	}

	message(player, message) {
		return {
			i: player.playerId,
			m: message
		};
	}

	leave(player) {
		return {
			i: player.playerId
		};
	}

}