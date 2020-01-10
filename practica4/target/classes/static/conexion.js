var socket = new WebSocket("ws://localhost:8080/race51");

socket.onopen = function() {
	console.log("Conexión establecida");
}


//AÑADIR LAS FUNCIONES NECESARIAS PARA LAS DISTINTAS COSAS QUE HAGAN FALTA


function crearPartida(){ //Mi función que envía los datos que necesito al server
	let message = {
		idFuncion: 0, //Cuando el server mire el mensaje, sabra que función llamar gracias a este nombre
		idJugador: J1_id,
		idSkin: J1_skin,
		ayuda: "Partida llegue"
	}	
	socket.send(JSON.stringify(message)); //Por hacer
	
	socket.onmessage = function (event) {
		var aux = JSON.parse(event.data); //ESTO CONVIERTE CUALQUIER ELEMENTO DE LA FUNCION A JSON PARA PODER ENVIARLO DE UN LADO A OTRO	
		ID_Partida = aux.idPartida; //EJEMPLO if(aux.Estado) // EN SERVER ESTARIA msg.put("Estado", partidas.getId(idpartida).getVacio();
		console.log(aux.stringPrueba);
		console.log(ID_Partida);
	}
}

function borrarPartida() {
	let message = {
			idFuncion: 1,
			idPartida: ID_Partida,
			idJugador: J1_id
	}
	socket.send(JSON.stringify(message));
	
	socket.onmessage = function (event) {
		var aux = JSON.parse(event.data);
		console.log(aux.mensajeBorrado + aux.idPartida);
	}
}

function actualizaJugador() {
	let message = {
			idFuncion: 2,
			idJugador: J1_id,
			idPartida: ID_Partida,
			jugadorSaltando: J1_saltando,
			jugadorDaño: J1_DañoRecibido,
			jugadorVida: J1_Vida,
			jugadorMuerto: J1_Muerto,
			jugadorPowerUp: J1_Powerup,
			jugadorPinchoGenerado: J1_PinchoGenerado,
			jugadorPowerupGenerado: J1_PowerupGenerado,
			jugadorCogerPowerup: J1_CogerPowerup
	}
	socket.send(JSON.stringify(message));
	
	socket.onmessage = function (event) {
		var aux = JSON.parse(event.data);
		J2_DañoRecibido = aux.jugadorDaño;
		J2_Powerup = aux.jugadorPowerUp;
		J2_PinchoGenerado = aux.pinchoGenerado;
		J2_Muerto = aux.jugadorMuerto;
		J2_saltando = aux.jugadorSaltando;
		J2_Vida = aux.jugadorSubirVida;
		J2_PowerupGenerado = aux.jugadorPowerupGenerado;
		J2_CogerPowerup = aux.jugadorCogerPowerup;
	}
}

function crearJugador(){ //Mi función que recibe los datos que necesito del jugador 2
	let message ={
			idFuncion: 3,
			idskin: J1_skin,
			mensaje: hola
	}
	socket.send(JSON.stringify(message)); //No se si tendré que recibir o actualizar en cliente
	
	socket.onmessage = function (event) {
		var aux = JSON.parse(event.data);
		J1_id = aux.idJugador;
		console.log(aux.mensaje);
		console.log(aux.idJugador);
	}
	
	
}

function comprobar() {
	let message = {
			idFuncion: 4,
			idPartida: ID_Partida
	}
	socket.send(JSON.stringify(message));
	
	socket.onmessage = function (event) {
		var aux = JSON.parse(event.data);
		J2_skin = aux.idSkin;
		J2_id = aux.idJugador;
	}
}

