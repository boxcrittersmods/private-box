"use strict"

const socketIo = require('socket.io').listen(global.app, { 'pingInterval': 100, 'pingTimeout': 10000 })

function Listener(session) {
	this.session = session
	for (let i of Object.getOwnPropertyNames(Listener.prototype)) {
		this.session.socket.on(i, this[i])
		console.log(i)
	}
}

const Player = require('./player')
const Room = require('./room')
const Crumb = require('./crumb')
const Storage = require('./storage') // work on this file
var Commands = {}

global.World = {Listener, Player, Room, Crumb, Storage, Commands}

function SetupSession(socket) {
	console.log("Client connected:", socket.id)
	var session = {
		socket,
		player: undefined,
		room: undefined
	}
	socket.emit("connect")
	var listener = new Listener(session)
}

function main(server) {
	{
		let plugins = require('../plugins/RunOrder')
		for (let i of plugins) {
			console.log(`loading plugin ${i}`)
			if (/[\\\/:*?"<>|]/.exec(i)) throw `${i} isn't a valid directory name`
			global.World = require(`../plugins/${i}/main`)(global.World)
		}
	}
	var io = socketIo.listen(server, { 'transports': ['websocket'], 'pingInterval': 100, 'pingTimeout': 10000 })
	io.on("connect", SetupSession)
}

module.exports = main