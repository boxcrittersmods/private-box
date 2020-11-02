"use strict";

module.exports = function (world) {

	world.crumb = require('./crumb');
	world.storage = require('./storage');
	world.data = world.storage.data;
	world.Room = function (json, id = json.roomId) {
		if (!new.target) throw 'Room() must be called with new';
		this.id = id;
		this.players = [];
		this.start = {
			x: json.startX,
			y: json.startY,
			r: json.startR,
		};
		this.json = json;
		this.addPlayer = session => {
			session.socket.to(this.id).emit("A", world.crumb.player(session.player));
			for (let i in this.start)
				session.player[i] = this.start[i];
			this.players.push(session.player);
		};
		this.removePlayer = session => {
			session.socket.to(this.id).emit("R", world.crumb.leave(session.player));
			this.players = this.players.filter(v => v !== session.player);
		};
	};

	world.rooms = {};
	console.log(world.data);
	for (let i of world.data.rooms)
		world.rooms[i.roomId] = new world.Room(i);

	world.Player = function (playerId, nickname) {
		this.playerId = playerId;
		this.critterId = "hamster";
		this.nickname = nickname || "Hamster";
		this.coins = 0;
		this.eggs = []; // for easter egg hunts
		this.gear = [];
		this.inventory = [];
		this.x = 0;
		this.y = 0;
		this.r = 0;
		this.speed = 5;
	};

	world.commands = {};

	world.commands.speed = function (session, value) {
		session.player.speed = Number(value);
		console.log(session.player);
		return session;
	};

	console.log(require('./listeners')(world));
	world.listeners = Object.assign(world.listeners, require('./listeners')(world));

	return world;
};