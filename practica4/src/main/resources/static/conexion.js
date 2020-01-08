var socket = new WebSocket("ws://localhost:8080/race51");

socket.onopen = function() {
	console.log("Conexión establecida");
}


//AÑADIR LAS FUNCIONES NECESARIAS PARA LAS DISTINTAS COSAS QUE HAGAN FALTA


function Actualizar(){ //Mi función que envía los datos que necesito al server
	let message ={
		message: "Actualizar", //Cuando el server mire el mensaje, sabra que función llamar gracias a este nombre
		ID: J1_id
		SKIN: J1_skin,
		SALTO: J1_saltando,
		VIDA+1: J1_Vida+1,
		DAÑO: J1_DañoRecibido,
		MUERTO: J1_Muerto,
		POWERUP: J1_Powerup,
		PINCHO: J1_PinchoGenerado
	}
	socket.send(JSON.stringify(message)); //Por hacer
	socket.onmessage = function (event) {
		var aux = JSON.parse(event.data); //ESTO CONVIERTE CUALQUIER ELEMENTO DE LA FUNCION A JSON PARA PODER ENVIARLO DE UN LADO A OTRO
		
		if(aux."Aqui va el put que has puesto en servidor") //EJEMPLO if(aux.Estado) // EN SERVER ESTARIA msg.put("Estado", partidas.getId(idpartida).getVacio();
			
			//AQUI ACTUALIZARIA LO QUE QUIERO CAMBIAR(LAS VARIABLES)
			
			
			
	}
}

function comprobar(){ //Mi función que recibe los datos que necesito del jugador 2
	let message ={
		message: "Comprobar", //Cuando el server mire el mensaje, sabra que función llamar gracias a este nombre
		ID: J2_id
		SKIN: J2_skin,
		SALTO: J2_saltando,
		VIDA+1: J2_Vida+1,
		DAÑO: J2_DañoRecibido,
		MUERTO: J2_Muerto,
		POWERUP: J2_Powerup,
		PINCHO: J2_PinchoGenerado
	}
	socket.send(JSON.stringify(message)); //No se si tendré que recibir o actualizar en cliente
}

