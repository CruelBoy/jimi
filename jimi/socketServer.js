var socketIo = require("socket.io");

var custorms = [];
var questions = [
    "请选择您要咨询的业务",
    "请选择咨询订单",
    "请选择咨询商品",
    "返修退换货查询",
    "账户和财务咨询",
    "发票和少件咨询",
    "意见与建议反馈",
    "一起帮-您的购物助手",
    "配送服务",
    "乡村推广员招募"
]

var key = {
    "请选择咨询订单" : "您的订单有误，请稍等，正在帮您查询",
    "请选择咨询商品" : "抱歉！您咨询的商品已下架",
    "返修退换货查询" : "正在为您查询详细退货信息，请稍等！",
    "账户和财务咨询" : "正在返回您的账户消费信息！请稍等！",
    "发票和少件咨询" : "正在查询您的单号，请稍等！",
    "意见与建议反馈" : "非常感谢您抽出时间为我们提取宝贵的意见",
    "一起帮-您的购物助手" : "感谢您对中国经济的增长做出的巨大贡献",
    "配送服务" : "正在为您查询配送服务员所在位置",
    "乡村推广员招募" : "欢迎您参加乡村推广员活动"
}

module.exports = function(httpServer){
    var socketServer = socketIo.listen(httpServer);
    socketServer.on("connect",function(socket){
        console.log("有客户端连接服务器！"+socket.id)
        custorms.push(socket.id);

        //初始问题列表
        var msg1 = {
            type : "quelist",
            id : "京东咚咚",
            message : questions
        };
        setTimeout(function(){
            socket.send(msg1);
        },500)


        //服务端监听客户端发过来的消息
        socket.on("message",function(Rmessage){
            var msg2 = {
                type : "answer",
                id : "京东咚咚",
                result : key[Rmessage.msg]
            };

            var msg3 = {
               type : "other",
               content : [
                   "您好，我是机器人咚咚，很高兴为您服务！",
                   "你说的是什么啊？我听不懂！",
                   "你是不是想欺负咚咚！",
                   "老板说上班的时候聊天会扣工资的",
                   "上班的时间不能聊天的",
                   "您知道我叫什么名字吗？我叫咚咚",
                   "我都还不知道你叫什么了？"]
            }

            if(Rmessage.type == "onclikmsg"){
                console.log(Rmessage.type)
                setTimeout(function(){
                    console.log(msg2.result)
                    socket.send(msg2);
                },500)
            };

            if(Rmessage.type == "active"){
                setTimeout(function(){
                    socket.send(msg3);
                },500)
            }

        });


    })
}
