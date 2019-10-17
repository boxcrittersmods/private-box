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


function Room(id,json) {
    if (!new.target) throw 'Room() must be called with new';
    this.id = id;
    this.players = [];
    this.json = json;
}
Room.prototype.addPlayer = function(player) {
    this.players.push(player)
}

Room.prototype.removePlayer = function(player) {
    this.players = this.players.filter(p=>p!==player);
}

module.exports = Room;