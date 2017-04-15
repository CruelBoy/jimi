//引入依赖模块
var http = require("http");
var express = require("express");
var socketIo = require("socket.io");

//创建中间栈
var app = express();
//读取静态资源
app.use(express.static("public"));

//搭建web服务器
var httpServer = http.createServer(app);

//指定服务器端口
httpServer.listen(3000,function(){
    console.log("服务器正运行在3000端口...")
});

//引入socket模块
require("./socketServer")(httpServer);
