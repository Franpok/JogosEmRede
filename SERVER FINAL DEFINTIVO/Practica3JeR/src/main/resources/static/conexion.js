function Pet_jugadoresConectados() {
	$.ajax({
		url : '/jugadores'
	}).done(function(jugadores) {
		for (var i = 0; i < jugadores.length; i++) {
			mostrarJugadores(jugadores[i]);
		}
		document.getElementById("conectados").innerHTML = i;
			return i;
		}).fail(function() {
			console.log("Lamentablemente, tenemos que informarle de que no se ha podido hacer su increible petición GET, por lo que revise su conexión o pregunte al dueño del server si está encendido JAJA xD")
			return 0;
	})
}

// Create item in server
function Pet_añadirJugador(jugador /* callback */) {
	jugador.id = 0;
	jugador.nombre = '';
	jugador.hora = '';
	jugador.ultConexion = '';
	$.ajax({
		method : "POST",
		url : '/jugadores',
		data : JSON.stringify(jugador),
		processData : false,
		headers : {
			"Content-Type" : "application/json"
		}
	}).done(function(jugadores) {
			console.log("Jugador creado: " + JSON.stringify(jugadores));
			jugador.id = jugadores.id;
			jugador.nombre = jugadores.nombre;
			jugador.hora = jugadores.hora;
			jugador.ultConexion = jugadores.ultConexion;
				// callback(item);
	}).fail(function() {
			console.log("Lamentablemente, tenemos que informarle de que no se ha podido llevar a cabo su increible petición POST, por lo que revise su conexión o pregunte al dueño del server si está encendido JAJA xD")
	})
}

function mostrarJugadores(jugadores) {
	console.log("id: " + jugadores.id + " nombre: " + jugadores.nombre
			+ " hora: " + jugadores.hora + " ultimaConexion :"
			+ jugadores.ultConexion);
}

function actualizarJugador(jugadores) {
	$.ajax({
		method: "PUT",
		url: "/jugadores/" + jugadores.id,
		data: JSON.stringify(jugadores),
		processData: false,
		headers: {
			"Content-Type": "application/json"
		}
	}).done (function (jugadores) {
		console.log("Updated item: " + JSON.stringify(jugadores))
	})
}

function borrarJugadores(jugadores) {
	console.log(jugadores.id)
	$.ajax({
		method : 'DELETE',
		url : '/jugadores/' + jugadores.id
	}).done(function(jugadores) {
		console.log("Deleted item " + jugadores.id)
		jugador.id++
	})
}
$(document).ready(function() {

})
