var socket = new WebSocket('ws://127.0.0.1:8080/race51');

let cmessage = {
		message: "HELLO_WORLD",
		text: "AH FILHO DE PUTA AGORA SEM ENTENDO"
}

socket.onopen = function () {
	socket.send(JSON.stringify(cmessage));
	socket.send('Hi');
}

socket.onerror = function(e) {
	console.log("WS error: " + e);
}

socket.onmessage = function(event) {
	console.log("Tengo un mensaje");
	console.log("WS message: " + msg.data);
}

$(document).ready(function() {
	$('#send-btn').click(function() {
		var message = $('#message').val();
		socket.send(message);
	});
});


/*socket.onmessage = function(message) {
	var msg = JSON.parse(message.data)
	switch (msg.event) {
	case "PREPARE_INPUT":
		enableInput();
		break;
	case "WRITE_LINE_OUTPUT":
		console.log(msg.payload)
		break;
	default:
		break;
	}
}*/