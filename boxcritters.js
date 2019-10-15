const socketIo = require('socket.io');
const Player = require('./player');
const Room = require('./room');
const Crumb = require('./crumb');
const Storage = require('./storage');

function Login(session,{username,ticket}) {
    console.log("login",username, ticket);
    //LoadPlayer
    session.player = Storage.GetPlayer(username);
    if(!session.player) {
        session.player = new Player(username);
        Storage.SaveNewPlayer(session.player);
    }
    //send out loginCrumb
    session.socket.emit("login",Crumb.loginCrumb(session.player));
}
function JoinRoom(session,{roomId}) {
    console.log("joinroom",roomId);
    //LoadRoom
    session.room = Storage.GetRoom(roomId);
    //AddPlayerToRoom
    session.room.addPlayer(session.player);
    //Emit Crum of new of player joining
    session.socket.to(roomId).emit("A",Crumb.playerCrumb(session.player));
    //Join Socket Room
    session.socket.join(roomId);
    //Emit Room Crumb
    session.socket.emit('joinRoom',Crumb.roomCrumb(session.room));
}
function Click(session,{x,y}) {
    console.log("click",x,y);
    session.player.r = Math.atan2(y - session.player.y, x - session.player.x) * 180 / Math.PI;
    session.player.x = x;
    session.player.y = y;
    session.socket.to(session.room.id).emit("P",Crumb.moveCrumb(session.player));
    session.socket.emit("P",Crumb.moveCrumb(session.player));
}
function SendMessage(session,{message}) {
    console.log("sendMessage",message);
}

function SetupSession(socket) {
    console.log("Client Connected",socket.id);
    var session = {
        socket,
        player:undefined,
        room:undefined
    };
    socket.emit("connect");
    socket.on('disconnect',function() {
        console.log('Client disconnected');
        if(session.room){
            session.room.removePlayer(session.player);
            session.socket.to(session.room.id).emit("R",Crumb.leaveCrumb(session.player));
        }
    });
    socket.on('login',function(crumb){
        Login(session,crumb);
    });
    socket.on('joinRoom',function(crumb){
        JoinRoom(session,crumb);
    });
    socket.on('click',function(crumb){
        Click(session,crumb);
    });
    socket.on('sendMessage',function(crumb){
        SendMessage(session,crumb);
    });
}

function SetupSocket(server) {
    console.log("Setup Socket");
    var io = socketIo(server);
    io.on("connect",SetupSession);
}

module.exports = SetupSocket;
