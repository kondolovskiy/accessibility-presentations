const WebSocket = require('ws');
let clients = {};

const webSocketServer = new WebSocket.Server({
	port: 3001
});

webSocketServer.on('connection', function(ws) {

	const id = Math.random();
	clients[id] = ws;
	console.log("new connection " + id);

	ws.on('message', function(message) {
		console.log('message received ' + message);

		for (let key in clients) {
			clients[key].send(message);
		}
	});

	ws.on('close', function() {
		console.log('connection are closed ' + id);
		delete clients[id];
	});
});
