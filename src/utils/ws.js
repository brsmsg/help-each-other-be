function createWss(wss) {
  wss.on('connection', function (ws) {
    this.numClients++;
    ws.isAlive = true;
    ws.on('pong', this.heartbeat) //  测速激活链接
    this.handle(wss) //链接第一次广播
    ws.on('close', function () { //监听连接优雅断开
      this.numClients--
    }.bind(this))
    this.wss = wss;
  })
}

let numClients = 0;
async function handle(wss) {
  let data = {}
  console.log('webSocket connectClients: ' + this.numClients);
  client.isAlive = false; //先设置成false
  client.ping(this.noop) //尝试ping如果响应则true
  client.send(JSON.stringify(data)); //发送消息


}