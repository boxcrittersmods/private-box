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
    console.log("Client Connected");
    socket.emit("connect");
    socket.on('disconnect', function(){
      console.log('Client disconnected');
    });

    socket.on('click',function({x,y}){
      console.log("click",x,y)
    });

    socket.on('joinRoom',async function({roomId}){
      console.log("joinroom",roomId)
      var room = Room.GetRoomFromID(roomId)|await Room.CreateRoom(roomId);
      socket.join(roomId);
      Room.AddPlayer(room, player);


      socket.emit('joinRoom',room);
    });
    
    socket.on('login',function({username,ticket}){
      console.log("login",username, ticket)
      player = Player.GetPlayerFromNickname(username) | Player.createPlayer(username);
      socket.emit('login',  Player.player);
    });
    
    socket.on('sendMessage',function({message}){
      console.log("sendMessage",message)
    });
});