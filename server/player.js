/*
PLAYER
playerId
Nickname
Ypos
Xpos
Rotation
s
*/
{
	var lastid = 0
	function generateId() {
		return lastid.toString()
		lastid++
	}
}
function Player(playerId) {
	if (!new.target) throw 'Player() must be called with new'
	this.playerId = generateId()
	this.critterId = "hamster"
	this.nickname = "notdone"
	this.inventory = []
	this.x = 433
	this.y = 195
	this.r = 0
	this.s = 5
}

module.exports = Player