var socket = new WebSocket("ws://localhost:8080/race51");

socket.onopen = function() {
	console.log("Conexión establecida");
}