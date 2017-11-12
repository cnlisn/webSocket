
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');
//端口号
var PORT = 3000;
app.listen(PORT);

var clientCount = 0;

//运行方式 node wsServer.js

// io.on('connection', function (socket) {
  io.on('connect', function (socket) {
  clientCount++;
  socket.nickname = 'user_' + clientCount;
  //发送用户进入消息
  io.emit('enter', socket.nickname + " comes in");

  console.log(socket.nickname + " comes in");

  //接收消息 message
  socket.on('message', function (str) {
    //广播消息
    io.emit('message', socket.nickname + " says: " + str);

    console.log(socket.nickname + " says: " + str);
  });
  //接收断开连接消息 disconnect
  socket.on('disconnect', function () {
    //广播消息
    io.emit('leave', socket.nickname + ' left');

    console.log(socket.nickname + " left");
  });

});

console.log("WebSocket serverr listening on port " + PORT);