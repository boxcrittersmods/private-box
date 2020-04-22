const socketIo = require('socket.io').listen(global.app, {'pingInterval': 100, 'pingTimeout': 10000});
const Player = require('./player')
const Room = require('./room')
const Crumb = require('./crumb')
const Storage = require('./storage')

function Login(session, {playerId, nickname}) {
	console.log("login", playerId)
	session.player = Storage.GetPlayer(playerId)
	if (!session.player) {
		session.player = new Player(playerId, nickname)
		Storage.SaveNewPlayer(session.player)
	}
	//send out loginCrumb
	session.socket.emit("login", Crumb.loginCrumb(session.player))
}
function JoinRoom(session, roomId) {
	console.log({session,roomId})
	if (!session.player) return
	console.log("joinroom", roomId)
	//LoadRoom
	session.room = Storage.GetRoom(roomId)
	//AddPlayerToRoom
	session.room.addPlayer(session.player)
	//Emit Crum of new of player joining
	session.socket.to(roomId).emit("A", Crumb.playerCrumb(session.player))
	//Join Socket Room
	session.socket.join(roomId)
	//Emit Room Crumb
	console.log(session.room, Crumb.roomCrumb(session.room) )
	session.socket.emit('joinRoom', Crumb.roomCrumb(session.room))
}

function calcAngle(cx, cy, ex, ey) {
	var dy = ey - cy
	var dx = ex - cx
	var theta = Math.atan2(dy, dx) // range (-PI, PI)
	theta *= 180 / Math.PI // rads to degs, range (-180, 180)
	if (theta < 0) theta = 360 + theta // range (0, 360)
	return theta + 90
}

function Click(session, { x, y }) {
	if (!session.room) return
	if (!session.player) return
	console.log("click", x, y)
	session.player.r = calcAngle(session.player.x, session.player.y, x, y)
	session.player.x = x
	session.player.y = y
	session.socket.to(session.room.id).emit("X", Crumb.moveCrumb(session.player))
	session.socket.emit("X", Crumb.moveCrumb(session.player)) // might not be neccecary
}
function SendMessage(session, { message }) {
	if (!session.room) return
	if (!session.player) return
	console.log("sendMessage", message)
	session.socket.to(session.room.id).emit("M", Crumb.messageCrumb(session.player, message))
	session.socket.emit("M", Crumb.messageCrumb(session.player, message))
}

function SetupSession(socket) {
	console.log("Client Connected", socket.id)
	var session = {
		socket,
		player: undefined,
		room: undefined
	}
	socket.emit("connect")
	socket.on('disconnect', function (reason) {
		console.log(`Client disconnected: ${reason}`)
		if (session.room) {
			session.room.removePlayer(session.player)
			session.socket.to(session.room.id).emit("R", Crumb.leaveCrumb(session.player))
		}
	})
	socket.on('login', function (crumb) {
		Login(session, crumb)
	})
	socket.on('joinRoom', function (crumb) {
		console.log(crumb)
		JoinRoom(session, crumb)
	})
	socket.on('click', function (crumb) {
		Click(session, crumb)
	})
	socket.on('sendMessage', function (crumb) {
		SendMessage(session, crumb)
	})
	socket.on('code', function ({code, options}) {
		console.log(`Command: ${code}, ${options} from player: ${session.player.nickname}`)
	})
}

function SetupSocket(server) {
	console.log("Setup Socket")
	var io = socketIo.listen(server, { 'transports': ['websocket']/*, 'pingInterval': 100, 'pingTimeout': 10000*/})
	io.on("connect", SetupSession)
}

module.exports = SetupSocket
