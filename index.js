const webserver = require("webserver");
const express = require('express');
const socket = require('socket.io');

var app = express();
var server = webserver(app);
var io = socket(server);

io.on('connect',function(socket) {
    console.log("Client Connected");
    socket.on('disconnect', function(){
      console.log('Client disconnected');
    });
})