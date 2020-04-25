/*
ROOM
roomId:string
playerList
json:
	name:string
	minDistance:20
	height:number
	width: number
	margin:number
	roomId:tavern
	tileMap:Array(Array(number)[8])
	tilesize: number
	artwork:
		background
		forground
		props:
			Array(Array(number)[3])
		sprites:
			frames: Array(Array(number)[7])
			images: Array(string)
*/

module.exports = function (id, json) {
	if (!new.target) throw 'Room() must be called with new'
	this.id = id
	this.players = []
	this.json = json
	this.addPlayer = p => this.players.push(p)
	this.removePlayer = p => this.players = this.players.filter(v => v !== p)
}