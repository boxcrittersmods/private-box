"use strict"

module.exports = function({Listener, Player, Room, Crumb, Storage, Commands}) {
	
	Commands.speed = function(session, value) {
		session.player.speed = Number(value)
		console.log(session.player)
		return session
	}

	Listener.prototype.code = function({ code, options }) {
		console.log(`Command: ${code}, ${options} from player: ${this.session.player.nickname}`)
		console.log(Commands)
		if (Commands[code]) this.session = Commands[code](this.session, ...options)
	}

	Listener.prototype.login = function({ playerId, nickname }) {
		if (!playerId) this.session.socket.disconnect()
		console.log("login", playerId)
		this.session.player = Storage.GetPlayer(playerId)
		if (!this.session.player) {
			this.session.player = new Player(playerId, nickname)
			Storage.SaveNewPlayer(this.session.player)
		}
		this.session.socket.emit("login", Crumb.loginCrumb(this.session.player))
	}

	Listener.prototype.disconnect = function(reason) {
		console.log(`Client disconnected: ${reason}`)
		if (this.session.room) {
			this.session.room.removePlayer(this.session.player)
			this.session.socket.to(this.session.room.id).emit("R", Crumb.leaveCrumb(this.session.player))
		}
	}
	Listener.prototype.joinRoom = function(roomId) {
		console.log({ session:this.session, roomId })
		if (!this.session.player) return

		this.session.room = Storage.GetRoom(roomId)//LoadRoom
		this.session.room.addPlayer(this.session.player)
		this.session.socket.to(roomId).emit("A", Crumb.playerCrumb(this.session.player))//inform other players of join
		this.session.socket.join(roomId)
		console.log(this.session.room, Crumb.roomCrumb(this.session.room))//send room
		this.session.socket.emit('joinRoom', Crumb.roomCrumb(this.session.room))
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

	Listener.prototype.click = function({ x, y }) {
		if (!this.session.room) return
		if (!this.session.player) return
		console.log("click", x, y)
		//this.session.player.r = this.calcAngle(this.session.player.x, this.session.player.y, x, y)
		this.session.player.x = x
		this.session.player.y = y
		this.session.socket.to(this.session.room.id).emit("X", Crumb.moveCrumb(this.session.player))
		this.session.socket.emit("X", Crumb.moveCrumb(this.session.player)) // might not be neccecary
	}
	Listener.prototype.sendMessage = function({ message }) {
		if (!this.session.room) return
		if (!this.session.player) return
		console.log("sendMessage", message)
		this.session.socket.to(this.session.room.id).emit("M", Crumb.messageCrumb(this.session.player, message))
		this.session.socket.emit("M", Crumb.messageCrumb(this.session.player, message)) // might not be neccecary
	}

	return {Listener, Player, Room, Crumb, Storage, Commands}
}