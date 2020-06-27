var socket = new WebSocket("ws://localhost:8080/race51");

socket.onopen = function() {
	console.log("Conexión establecida");
}

socket.onmessage = function (event) {
	var aux = JSON.parse(event.data)
	ID_Funcion = aux.idFuncion
	switch(ID_Funcion){

		case(0): //CrearPartida()
		ID_Partida = aux.idPartida;//EJEMPLO if(aux.Estado) // EN SERVER ESTARIA msg.put("Estado", partidas.getId(idpartida).getVacio();
		Soy_J1 = aux.SoyJ1;
		console.log(aux.stringPrueba);
		console.log(ID_Partida);
		break;
		
		case(1)://borrarPartida()
		console.log(aux.mensajeBorrado + aux.idPartida);
		break;

		case(2)://actualizaJugador()
		J2_DañoRecibido = aux.jugadorDaño;
		J2_Powerup = aux.jugadorPowerUp;
		J2_PinchoGenerado = aux.pinchoGenerado;
		J2_Muerto = aux.jugadorMuerto;
		J2_saltando = aux.jugadorSaltando;
		J2_Vida = aux.jugadorSubirVida;
		J2_PowerupGenerado = aux.jugadorPowerupGenerado;
		J2_CogerPowerup = aux.jugadorCogerPowerup;
		break;

		case(3)://crearJugador()
		J1_id = aux.idJugador;
		console.log(aux.mensaje);
		console.log(aux.idJugador);
		break;

		case(4)://comprobar()
		J2_skin = aux.idSkin;
		console.log("El id jugador del server es:"+ aux.idJugador);
		console.log("La skin del jugador 2 es:"+ aux.idSkin);
		J2_id = aux.idJugador;
		
		break;
		
		default:
			
<<<<<<< HEAD
			break;
=======
		break;
>>>>>>> 67dbd14300d9559c6e8cb888af72ec8c391b3060
	}
}


//AÑADIR LAS FUNCIONES NECESARIAS PARA LAS DISTINTAS COSAS QUE HAGAN FALTA


function crearPartida(){ //Mi función que envía los datos que necesito al server
	let message = {
		idFuncion: 0, //Cuando el server mire el mensaje, sabra que función llamar gracias a este nombre
		idJugador: J1_id,
		idSkin: J1_skin,
		SoyJ1: Soy_J1,
		ayuda: "Partida llegue"
			
	}	
	socket.send(JSON.stringify(message)); //Por hacer
	
}

function borrarPartida() {
	let message = {
			idFuncion: 1,
			idPartida: ID_Partida,
			idJugador: J1_id
	}
	socket.send(JSON.stringify(message));
	
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
	
}

function crearJugador(){ //Mi función que recibe los datos que necesito del jugador 2
	let message ={
			idFuncion: 3,
			idskin: J1_skin,
			mensaje: hola
	}
	socket.send(JSON.stringify(message)); //No se si tendré que recibir o actualizar en cliente

}

function comprobar() {
	let message = {
			idFuncion: 4,
			idPartida: ID_Partida,
			idJugador: 10
	}
	socket.send(JSON.stringify(message));
	
}

