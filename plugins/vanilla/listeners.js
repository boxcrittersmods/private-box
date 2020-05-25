module.exports = function (world) {
	return {
		code: function (session, { code, options }) {
			console.log(`command "${code} ${options}" from player "${session.player.nickname}"`);
			if (world.commands[code]) session = world.commands[code](session, ...options);
		},

		login: function (session, playerInfo) {
			function invalid() {
				console.log("invalid login!");
				session.socket.disconnect();
			}
			console.log(playerInfo)
			if (!playerInfo) { invalid(); return; }
			let playerId = playerInfo.playerId;
			if (!playerId) { invalid(); return; }
			let nickname = playerInfo.nickname;
			console.log("login", playerId);
			//session.player = world.storage.GetPlayer(playerId) // players not yet saved
			if (true/*!session.player*/) {
				session.player = new world.Player(playerId, nickname);
				//world.storage.SaveNewPlayer(session.player)
			}
			session.socket.emit("login", world.crumb.login(session.player));
		},

		disconnect: function (session, reason) {
			console.log(`client disconnected: ${reason}`);
			if (session.room) {
				session.room.removePlayer(session.player);
				session.socket.to(session.room.id).emit("R", world.crumb.leave(session.player));
			}
		},
		joinRoom: function (session, roomId) {
			console.log({ session, roomId });
			if (!session.player) return;

			session.room = world.rooms[roomId];//LoadRoom
			session.room.addPlayer(session.player);
			session.socket.to(roomId).emit("A", world.crumb.player(session.player));//inform other players of join
			session.socket.join(roomId);
			console.log(session.room, world.crumb.room(session.room));//send room
			session.socket.emit('joinRoom', world.crumb.room(session.room));
		},

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

		click: function (session, { x, y }) {
			if (!session.room) return;
			if (!session.player) return;
			console.log("click", x, y);
			//session.player.r = this.calcAngle(session.player.x, session.player.y, x, y)
			session.player.x = x;
			session.player.y = y;
			session.socket.to(session.room.id).emit("X", world.crumb.move(session.player));
			session.socket.emit("X", world.crumb.move(session.player)); // might not be neccecary
		},
		sendMessage: function (session, { message }) {
			if (!session.room) return;
			if (!session.player) return;
			console.log("sendMessage", message);
			session.socket.to(session.room.id).emit("M", world.crumb.message(session.player, message));
			session.socket.emit("M", world.crumb.message(session.player, message)); // might not be neccecary
		},
	};
}