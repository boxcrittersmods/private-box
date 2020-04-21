/**
 * this isn't acutally used by the server, it's a script that can be ran on the client to allow connecting to servers
 * 
 */

/**
 * important values
 */
var extraPlayerData = { nickname: "" }
var ip = 'http://localhost:3000/'
var safeWhitelist = ['playerId']

/**
 * code starts
 */
socket.disconnect() // disconnect to main boxcritters server
var socketPath = ip

Object.filter = (obj, predicate) =>
	Object.keys(obj)
		.filter(key => predicate(obj[key], key, obj))
		.reduce((res, key) => (res[key] = obj[key], res), {})


var myPlayer = {
	playerId: sessionStorage.getItem('playerId'),
	sessionTicket: sessionStorage.getItem('sessionTicket'),
	isNewPlayer: sessionStorage.getItem('isNewPlayer'),
}

World.prototype.start = function () {
	this.hasRooms && this.hasCritters && this.hasItems && this.hasEffects && this.login(myPlayer)
}
World.prototype.login = function (t) {
	socket.open()
	let loginInfo = myPlayer
	if (socketPath) {
		loginInfo = Object.filter(loginInfo, (_, i) => safeWhitelist.includes(i))
	}
	loginInfo = Object.assign(loginInfo, extraPlayerData)
	socket.emit("login", loginInfo)
}

if (myPlayer.sessionTicket) {

	var socket = io(socketPath, {
		autoConnect: false,
		transports: ['websocket'],
		"force new connection": false,
		reconnectionAttempts: 1,
		timeout: 10000,
		secure: false
	})

	var world = new World('stage', {
		lobby: 'tavern',
		critters: '/media/critters11.json',
		effects: '/media/effects/effects2.json',
		items: '/data/items25.json',
		rooms: '/data/rooms19.json'
	})

	world.commands.game = function () {
		showGame()
	}
	world.commands.nicknames = function () {
		world.stage.room.toggleNicknames()
	}
	world.commands.balloons = function () {
		world.stage.room.toggleBalloons()
	}
	world.commands.darkmode = function () {
		world.sendCode('darkmode')
		toggleDarkmode()
	}
	world.commands.join = function (options) {
		var roomId = options[0]
		world.joinRoom(roomId.toLowerCase())
	}


} else {
	console.log('Connection refused!')//document.location.href = '/'
}
$('#modal').modal('hide')