const http = require('http');
const webserver = require('webserver');
const express = require('express');
const socketIo = require('socket.io');

var app = express();
var server = webserver(app);
var io = socketIo(server);

var lastId = 0;
var players = [];

function generateId() {
  lastId++;
  return lastId.toString(16);
}

function createPlayer(nickname) {
  return{
    playerId:generateId(),
    nickname,
    inventory:[]
  };
}

app.use(express.static('public'));

io.on('connect',function(socket) {
    console.log("Client Connected");
    socket.emit("connect");
    socket.on('disconnect', function(){
      console.log('Client disconnected');
    });

    socket.on('click',function({x,y}){
    });

    socket.on('joinRoom',function({roomId}){
      socket.join(roomId);
      socket.emit('joinRoom')
    });
    
    socket.on('login',function({username,ticket}){
      var player = createPlayer(username);
      players.push(player);
      sockek.emit('login',player);
    });
    
    socket.on('sendMessage',function({message}){
    
    });
});