"use strict";

const socketIo = require('socket.io');

var world = {
	listeners: {},
	Session: function (socket, listeners) {
		this.socket = socket;
		this.listeners = listeners;
		for (let i in this.listeners) {
			this.socket.on(i, (...c) => this.listeners[i](this, ...c));
			console.log(i);
		}
		this.socket.emit("connect");
	},
	//Player
	// Room: require('./room'),
	//Crumb: require('./crumb'),
	//Storage: require('./storage') // work on this file
};

{
	// grab all plugins and pass world through
	let plugins = require('../plugins/RunOrder');

	for (let i of plugins) {
		console.log(`loading plugin ${i}`);
		if (/[\\\/:*?"<>|]/.exec(i)) throw `${i} isn't a valid directory name`; // regex detects invalid characters
		world = require(`../plugins/${i}/main`)(world);
	}
}

function SetupSession(socket) {
	console.log("client connected:", socket.id);
	new world.Session(socket, world.listeners);
}

function main(server) {
	var io = socketIo.listen(server, { transports: ['websocket'] });
	io.on("connect", SetupSession);
}

module.exports = { main, world };