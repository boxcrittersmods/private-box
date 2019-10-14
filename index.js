const http = require('http');
const webserver = require('webserver');
const express = require('express');
const socketIo = require('socket.io');

const Player = require('./player');
const Room = require("./room");

var app = express();
var server = webserver(app);
var io = socketIo(server);
app.use(express.static('public'));

io.on('connect',function(socket) {
  var player;
  var room;
    console.log("Client Connected",socket.id,);
    socket.emit("connect");
    socket.on('disconnect', function(){
      console.log('Client disconnected');
    });

    socket.on('click',function({x,y}){
      console.log("click",x,y)
    });

    socket.on('joinRoom',function({roomId}){
      console.log("joinroom",roomId)
      room = Room.GetRoom(roomId);
      Room.AddPlayer(room, player);
      socket.to(room.roomId).emit("A",Player.ToRoomPlayerFormat(player));
      socket.join(roomId);
      socket.emit('joinRoom',room);
    });
    
    socket.on('login',function({username,ticket}){
      console.log("login",username, ticket)
      player = Player.GetPlayerFromNickname(username) || Player.createPlayer(username);
      socket.emit('login', Player.ToNewPlayerFormat(player));
    });
    
    socket.on('sendMessage',function({message}){
      console.log("sendMessage",message)
    });
});