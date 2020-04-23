module.exports = function (playerId, nickname) {
	if (!new.target) throw 'Player() must be called with new'
	this.playerId = playerId
	this.critterId = "hamster"
	this.nickname = nickname || "NoName"
	this.inventory = []
	this.x = 433
	this.y = 195
	this.r = 0
	this.speed = 5
}