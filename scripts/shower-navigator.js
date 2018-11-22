shower.modules.define('shower-navigator', [
	'util.extend'
], function(provide, extend) {

	function Navigator (shower, options) {
		options = options || {};
		this._shower = shower;

		this._initSocket();
	}

	extend(Navigator.prototype, {

		_initSocket: function() {
			const socket = new WebSocket('wss://kondolovskiy.herokuapp.com');

			socket.onopen = this._onOpen;
			socket.onclose = this._onClose.bind(this);
			socket.onmessage = this._onMessage.bind(this);
			socket.onerror = this._onError;
		},

		_onOpen: function() {
			console.log("Connected");
		},

		_onClose: function (event) {
			if (event.wasClean) {
				console.log('Connection are closed');
			} else {
				console.log('Bad connection');
			}
			console.log('Code: ' + event.code + ' reason: ' + event.reason);

			setTimeout(() => {
				this._initSocket()
			}, 1000); // try to reconnect when connection was closed
		},

		_onMessage: function (event) {
			console.log("received data " + event.data);
			const shower = this._shower;

			switch (event.data) {
				case 'prev': shower.player.prev();
					break;
				case 'next': shower.player.next();
					break
			}
		},

		_onError: function(error) {
			console.log("Error " + error.message);
		}
	});

	provide(Navigator);

});

shower.modules.require(['shower'], function(sh) {
	sh.plugins.add('shower-navigator');
});