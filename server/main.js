"use strict";

const socketIo = require('socket.io');

let world = {
	listeners: {},
	Session: function (socket, listeners = world.listeners) {
		this.socket = socket;
		this.listeners = listeners;
		for (let i in this.listeners)
			this.socket.on(i, (...c) => this.listeners[i](this, ...c));
		console.log("created player socket listeners");
		//this.socket.emit("connect");
	},
	//Player
	//Room: require('./room'),
	//Crumb: require('./crumb'),
	//Storage: require('./storage') // work on this file
};

{
	// grab all plugins and pass world through
	let plugins = require('../plugins/RunOrder');

	for (let i of plugins) {
		console.log(`loading plugin ${i}`);
		if (/[\.:*?"<>|]/.exec(i)) // regex detects invalid characters
			throw `${i} isn't a valid directory name`;
		world = require(`../plugins/${i}/main`)(world); // TODO: improve path system
	}
}

function SetupSession(socket) {
	console.log("client connected:", socket.id);
	new world.Session(socket);
}

function main(server) {
	let io = socketIo(server, { transports: ['websocket'] });
	io.on("connect", SetupSession);
}

module.exports = { main, world };