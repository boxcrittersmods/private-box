/**
 * this isn't acutally used by the server, it's a script that can be ran on the client to allow connecting to servers
 * 
 */

/**
 * important values
 */
var extraPlayerData = { nickname: "" }
var ip = "http://localhost:3000/"
var safeWhitelist = ['playerId']

/**
 * code starts
 */
socket.removeAllListeners() // remove listeners that shouldnt be
socket.disconnect() // disconnect to main boxcritters server

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
	if (ip) {
		loginInfo = Object.filter(loginInfo, (_, i) => safeWhitelist.includes(i))
	}
	loginInfo = Object.assign(loginInfo, extraPlayerData)
	socket.emit("login", loginInfo)
}

if (myPlayer.sessionTicket) {

	var socket = io(ip, {
		autoConnect: false,
		transports: ['websocket'],
		secure: false
	})

	var world = new World('stage', {
		lobby: 'tavern',
		critters: '/data/critters12.json',
		mascots: '/data/mascots2.json',
		effects: '/media/effects/effects2.json',
		items: '/data/items26.json',
		rooms: '/data/rooms20.json'
	})

	socket.on('login', function (data) {
		if (data.error) {
			document.location.href = '/'
		} else {
			$(document).unbind('keypress')
			$(document).keypress(handleKeypress)
			$('.chat-btn').click(sendMessage)
		}
	})

	socket.on('disconnect', function () {
		console.log('disconnected')
		$('#modal').modal({
			backdrop: 'static'
		})
		$('#modal').modal('show')
		$('#modal .modal-body').text('Disconnect')
		$('#buttonLogin').click(function () {
			document.location.reload()
		})
	})

} else {
	console.log('Connection refused!')//document.location.href = '/'
}
$('#modal').modal('hide')