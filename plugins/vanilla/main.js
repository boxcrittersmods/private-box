"use strict";

module.exports = function (world) {

	world.crumb = require('./crumb');
	world.storage = require('./storage');
	world.data = world.storage.data;
	world.Room = function (json, id = json.roomId) {
		if (!new.target) throw 'Room() must be called with new';
		this.id = id;
		this.players = [];
		this.json = json;
		this.addPlayer = p => this.players.push(p);
		this.removePlayer = p => this.players = this.players.filter(v => v !== p);
	};

	world.rooms = {};
	console.log(world.data)
	for (let i of world.data.rooms)
		world.rooms[i.roomId] = new world.Room(i);

	world.Player = function (playerId, nickname) {
		this.playerId = playerId;
		this.critterId = "hamster";
		this.nickname = nickname || "NoName";
		this.inventory = [];
		this.x = 433;
		this.y = 195;
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