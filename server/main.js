"use strict"

const socketIo = require('socket.io').listen(global.app, { 'pingInterval': 100, 'pingTimeout': 10000 })

function Listener(session) {
	/* creates socket.on for every listener function
	*  some sockets aren't neccecary and are stuff like constructor() which may cause issues
	*  this should be fixed in the future
	*/
	for (let i of Object.getOwnPropertyNames(Listener.prototype)) {
		session.socket.on(i, this[i])
		console.log(i)
	}
	this.session = session
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
	var listener = new Listener(session) //listener creates
}

function main(server) {
	{
		/* grab all plugins and pass global.World through
		*/
		let plugins = require('../plugins/RunOrder')
		for (let i of plugins) {
			console.log(`loading plugin ${i}`)
			if (/[\\\/:*?"<>|]/.exec(i)) throw `${i} isn't a valid directory name` // regex detects invalid characters
			global.World = require(`../plugins/${i}/main`)(global.World)
		}
	}
	var io = socketIo.listen(server, { 'transports': ['websocket'], 'pingInterval': 100, 'pingTimeout': 10000 })
	io.on("connect", SetupSession)
}

module.exports = main