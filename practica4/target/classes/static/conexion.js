var socket = new WebSocket("ws://localhost:8080/race51");

socket.onopen = function() {
	console.log("Conexión establecida");
}

socket.onmessage = function (event) {
	var aux = JSON.parse(event.data)
	ID_Funcion = aux.idFuncion
	switch(ID_Funcion){

//LO QUE RECIBO DEL SERVIDOR


		case(0): //CrearPartida() (Pending)
		ID_Partida = aux.idPartida;//EJEMPLO if(aux.Estado) // EN SERVER ESTARIA msg.put("Estado", partidas.getId(idpartida).getVacio();
		console.log(aux.stringPrueba);
		console.log(ID_Partida);
		break;
		
		case(1)://borrarPartida()
		console.log(aux.mensajeBorrado + aux.idPartida);
		break;

		case(2)://Jugador coge powerup
		
		console.log("He cogido powerup")
		
		cogerPowerup();
		break;

		case(3)://crearJugador() (WORKS)
		J1_id = aux.idJugador;
		console.log(aux.mensaje);
		console.log(aux.idJugador);
		break;

		case(4)://CUANDO LA PARTIDA ESTA LLENA()
		J2_skin = aux.idSkin;
		StartGame = aux.estadoPartida;
		console.log(aux.estadoPartida);
		
		console.log("El id jugador del server es:"+ aux.idJugador);
		console.log("La skin del jugador 2 es:"+ aux.idSkin);
		//J2_id = aux.idJugador;
		
		break;
		
		case(5):
		console.log("Me han dicho que salte");
		saltoJugador();
		break;
		
		case(6):
		console.log("Me han dicho que genere un powerup ");
		generarPowerup();
		break;
		
		case(7):
		console.log("Me han dicho que he recibido daño");
		recibirDaño();
		break;
		
		case(8):
		console.log("Me han dicho que genere un obstáculo");
		generarObstaculo();
		break;
		
		default:
			
		break;
	}
}


//LO QUE LE ENVIO AL SERVIDOR


function crearPartida(){ //Mi función que envía los datos que necesito al server
	let message = {
		idFuncion: 0, //Cuando el server mire el mensaje, sabra que función llamar gracias a este nombre
		idJugador: J1_id,
		ayuda: "Partida llegue" //debug
			
	}	
	socket.send(JSON.stringify(message)); 
	
}

function borrarPartida() { // POR HACER
	let message = {
			idFuncion: 1,
			idPartida: ID_Partida,
			idJugador: J1_id
	}
	socket.send(JSON.stringify(message));
	
}

function crearJugador(){ //Mi función que recibe los datos que necesito del jugador 2
	let message ={
			idFuncion: 3,
			idskin: J1_skin,
			mensaje: hola
	}
	socket.send(JSON.stringify(message)); //No se si tendré que recibir o actualizar en cliente

}

function jugadorSalto(){ //Mi función que recibe los datos que necesito del jugador 2
	let message ={
			idFuncion: 5,
			idPartida: ID_Partida,
			idJugador: J1_id
	}
	socket.send(JSON.stringify(message)); //No se si tendré que recibir o actualizar en cliente

}

function jugadorPowerup(){ //Mi función que recibe los datos que necesito del jugador 2
	let message ={
			idFuncion: 2,
			idPartida: ID_Partida,
			idJugador: J1_id
	}
	socket.send(JSON.stringify(message)); //No se si tendré que recibir o actualizar en cliente

}

function jugadorDaño(){ //Mi función que recibe los datos que necesito del jugador 2
	let message ={
			idFuncion: 7,
			idPartida: ID_Partida,
			idJugador: J1_id
	}
	socket.send(JSON.stringify(message)); //No se si tendré que recibir o actualizar en cliente

}

function jugadorGenerarObstaculo(){ //Mi función que recibe los datos que necesito del jugador 2
	let message ={
			idFuncion: 8,
			idPartida: ID_Partida,
			idJugador: J1_id
	}
	socket.send(JSON.stringify(message)); //No se si tendré que recibir o actualizar en cliente

}

function jugadorGenerarPowerup(){ //Mi función que recibe los datos que necesito del jugador 2
	let message ={
			idFuncion: 6,
			idPartida: ID_Partida,
			idJugador: J1_id
	}
	socket.send(JSON.stringify(message)); //No se si tendré que recibir o actualizar en cliente

}
