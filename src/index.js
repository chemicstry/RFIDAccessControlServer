const WebSocket = require('ws');
const { BidirectionalDataInterface } = require('./DataInterface.js');
const ServiceManager = require('./ServiceManager.js');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    var bif = new BidirectionalDataInterface();
    var svcMgr = new ServiceManager(bif.Downstream);

    ws.on('message', function incoming(message) {
        bif.Upstream.Send(JSON.parse(message));
    });

    bif.Upstream.SetCb(data => {
        ws.send(JSON.stringify(data));
    });
});
