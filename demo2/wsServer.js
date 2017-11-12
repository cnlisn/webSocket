
var ws = require("nodejs-websocket")
//端口号
var PORT = 3000;
//客户端计数
var clientCount=0;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");
    clientCount++;
    //连接名称
    conn.nickname = "user_" + clientCount;
    //定义发送数据对象
    var mes = {};
    mes.type = "enter";
    mes.data = conn.nickname + " comes in";
    //发送广播消息
    broadcast(JSON.stringify(mes));

    //接收到消息回调
    conn.on("text", function (str) {
        console.log("Received " + str);
        var mes = {};
        mes.type = "message";
        mes.data = conn.nickname+" says:"+str.toUpperCase() + "!!!";
        broadcast(JSON.stringify(mes));
        
    })

    //连接断开回调
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        var mes = {};
        mes.type = "leave";
        mes.data = conn.nickname + " left";
        broadcast(JSON.stringify(mes));
    })

    //错误回调
    conn.on("error", function (err) {
        console.log("handle err")
        console.log("err=" + err)
    })
}).listen(PORT)

console.log("WebSocket serverr listening on port " + PORT);

//发送广播消息
function broadcast(str){
    server.connections.forEach(function(connection){
        connection.sendText(str);
    });
}