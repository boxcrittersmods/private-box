"use strict"

module.exports = function(world) {

	world.crumb = require('./crumb')
	world.storage = require('./storage')
	world.Room = function (json, id = json.RoomId) {
		if (!new.target) throw 'Room() must be called with new'
		this.id = id
		this.players = []
		this.json = json
		this.addPlayer = p => this.players.push(p)
		this.removePlayer = p => this.players = this.players.filter(v => v !== p)
	}

	world.rooms = world.storage.InitRooms(world.Room)
	
	world.Player = function (playerId, nickname) {
		this.playerId = playerId
		this.critterId = "hamster"
		this.nickname = nickname || "NoName"
		this.inventory = []
		this.x = 433
		this.y = 195
		this.r = 0
		this.speed = 5
	}

	world.commands = {}

	world.commands.speed = function(session, value) {
		session.player.speed = Number(value)
		console.log(session.player)
		return session
	}

	console.log(require('./listeners')(world))
	world.listeners = Object.assign(world.listeners, require('./listeners')(world))

	return world
}