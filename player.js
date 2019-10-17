/*
PLAYER
playerId
Nickname
Ypos
Xpos
Rotation
s
*/
var lastid = 0;
function generateID(){
    lastid++;
    return lastid.toString();
}
function Player(nickname) {
    if (!new.target) throw 'Player() must be called with new';
    this.id = generateID();
    this.nickname = nickname;
    this.inventory = [];
    this.x = 433;
    this.y = 195;
    this.r = 0;
    this.s = 5;
}

module.exports = Player;