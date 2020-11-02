"use strict";
module.exports = {
	login: function (player) {
		return {
			coins: player.coins,
			critterId: player.critterId,
			eggs: player.eggs,
			gear: player.gear,
			inventory: player.inventory,
			isMember: true,
			nickname: player.nickname,
			playerId: player.playerId,
		};
	},
	player: function (player) {
		return {
			i: player.playerId,
			n: player.nickname,
			c: player.critterId,
			x: player.x,
			y: player.y,
			r: player.r,
		};
	},
	room: function (room) {
		return {
			roomId: room.id,
			playerCrumbs: room.players.map(p => this.player(p)),
		};
	},
	move: function (player) {
		return {
			i: player.playerId,
			x: player.x,
			y: player.y,
			r: player.r, // causes moonwalk bug
		};
	},
	message: function (player, message) {
		return {
			i: player.playerId,
			n: player.nickname,
			m: message,
		};
	},
	leave: function (player) {
		return {
			i: player.playerId,
		};
	},
};