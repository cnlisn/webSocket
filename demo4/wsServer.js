// var app = require('http').createServer(handler)
var app = require('http').createServer()
var io = require('socket.io')(app);
var fs = require('fs');
//端口号
app.listen(3000);

//运行方式 node wsServer.js

// function handler (req, res) {
//   fs.readFile(__dirname + '/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }

//     res.writeHead(200);
//     res.end(data);
//   });
// }



io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
      