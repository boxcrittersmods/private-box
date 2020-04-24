"use strict"

const socketIo = require('socket.io').listen(global.app, { 'pingInterval': 100, 'pingTimeout': 10000 })
const JSONTools = require('./json')

function Listener(session) {
	this.session = session

	// creates socket.on for every listener function
	// some sockets aren't neccecary and are stuff like constructor() which may cause issues
	// this should be fixed in the future
	this.socket = Object.keys(this) // [] // find way for this to be set before initialization
	for (let i of this.socket) {
		session.socket.on(i, this[i])
		console.log(i)
	}

	// run other starter code
	//this.
}

var world = {
listeners: {},
Session: function (socket, listeners) {
	this.socket = socket
	for (let i of listeners) {
		this.socket.on(i, this[i])
		console.log(i)
	}
	socket.emit("connect")
},
//Player
// Room: require('./room'),
//Crumb: require('./crumb'),
//Storage: require('./storage') // work on this file,
Commands: {}
}

function SetupSession(socket) {
	console.log("Client connected:", socket.id)
	var session = new Session(socket)
	//var listener = new Listener(session) //listener creates
}

function main(server) {
	var io = socketIo.listen(server, { 'transports': ['websocket'], 'pingInterval': 100, 'pingTimeout': 10000 })
	io.on("connect", SetupSession)
}

{
	// grab all plugins and pass world through
	let plugins = require('../plugins/RunOrder')
	for (let i of plugins) {
		console.log(`loading plugin ${i}`)
		if (/[\\\/:*?"<>|]/.exec(i)) throw `${i} isn't a valid directory name` // regex detects invalid characters
		world = require(`../plugins/${i}/main`)(world)
	}
}

module.exports = { main, world }