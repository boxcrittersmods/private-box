"use strict"

module.exports = function(world) {
	
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

	world.listeners.code = function(session, { code, options }) {
		console.log(`command: ${code}, ${options} from player: ${session.player.nickname}`)
		console.log(commands)
		if (commands[code]) session = commands[code](session, ...options)
	}

	world.listeners.login = function(session, { playerId, nickname }) {
		if (!playerId) session.socket.disconnect()
		console.log("login", playerId)
		//session.player = Storage.GetPlayer(playerId) // players not yet saved
		if (true/*!session.player*/) {
			session.player = new Player(playerId, nickname)
			//Storage.SaveNewPlayer(session.player)
		}
		session.socket.emit("login", Crumb.loginCrumb(session.player))
	}

	world.listeners.disconnect = function(session, reason) {
		console.log(`client disconnected: ${reason}`)
		if (session.room) {
			session.room.removePlayer(session.player)
			session.socket.to(session.room.id).emit("R", Crumb.leaveCrumb(session.player))
			 
		}
	}
	world.listeners.joinRoom = function(session, roomId) {
		console.log({ session, roomId })
		if (!session.player) return

		session.room = Storage.GetRoom(roomId)//LoadRoom
		session.room.addPlayer(session.player)
		session.socket.to(roomId).emit("A", Crumb.playerCrumb(session.player))//inform other players of join
		session.socket.join(roomId)
		console.log(session.room, Crumb.roomCrumb(session.room))//send room
		session.socket.emit('joinRoom', Crumb.roomCrumb(session.room))
	}

	/*
	calcAngle(cx, cy, ex, ey) { // shouldn't be in listeners
		var dy = ey - cy
		var dx = ex - cx
		var theta = Math.atan2(dy, dx) // range (-PI, PI)
		theta *= 180 / Math.PI // rads to degs, range (-180, 180)
		if (theta < 0) theta = 360 + theta // range (0, 360)
		return theta + 90
	}
	*/

	world.listeners.click = function(session, { x, y }) {
		if (!session.room) return
		if (!session.player) return
		console.log("click", x, y)
		//session.player.r = this.calcAngle(session.player.x, session.player.y, x, y)
		session.player.x = x
		session.player.y = y
		session.socket.to(session.room.id).emit("X", Crumb.moveCrumb(session.player))
		session.socket.emit("X", Crumb.moveCrumb(session.player)) // might not be neccecary
	}
	world.listeners.sendMessage = function(session, { message }) {
		if (!session.room) return
		if (!session.player) return
		console.log("sendMessage", message)
		session.socket.to(session.room.id).emit("M", Crumb.messageCrumb(session.player, message))
		session.socket.emit("M", Crumb.messageCrumb(session.player, message)) // might not be neccecary
	}

	return world
}