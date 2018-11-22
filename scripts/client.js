const socket = new WebSocket('ws://localhost:3001');

socket.onopen = function() {
	console.log("Connected");
};

socket.onclose = function(event) {
	if (event.wasClean) {
		console.log('Connection are closed');
	} else {
		console.log('Bad connection'); // например, "убит" процесс сервера
	}
	console.log('Code: ' + event.code + ' reason: ' + event.reason);
};

socket.onmessage = function(event) {
	console.log("received data " + event.data);
	if (event.data) {
		let hash = +window.location.hash.split('#')[1];

		if (!Number.isInteger(hash)) {
			hash = '#cover';
		} else {
			hash = '#' + ++hash;
		}

		window.location.hash = hash;
	}
};

socket.onerror = function(error) {
	console.log("Error " + error.message);
};