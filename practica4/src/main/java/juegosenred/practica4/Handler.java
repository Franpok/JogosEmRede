package juegosenred.practica4;

import java.util.Map;
import java.util.concurrent.atomic.*;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class Handler extends TextWebSocketHandler {
	public static ObjectMapper mapper = new ObjectMapper(); //MI mapper
	public static Map<Long, WebSocketSession> sessions = new ConcurrentHashMap<Long, WebSocketSession>(); //Mi colección de jugadores (Aunque no estamos pasando JUGADOR? Mirar)
	public static Map<Integer, Partida> partidas = new ConcurrentHashMap <Integer,Partida>(); //Mi colección de partidas
	public AtomicInteger idsesion = new AtomicInteger();
	public AtomicInteger idpartida = new AtomicInteger();
	//Si fuera necesario añadir ints maximos de partidas y sesiones
	
	
	
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		/*
		 * Cuando un jugador mande su estatus al otro jugador, este se enviará como un objeto JSON llamado message que incluirá:
		 * - Si el jugador salta.
		 * - Si el jugador ha recibido daño.
		 * - Las trampas del jugador.
		 * - Los powerups del jugador.
		 * - Las vidas.
		 */
		
		/*CASOS DEL SWITCH NECESARIOS
		
		-CREAR UNA NUEVA PARTiDA
		-ACTUALIZAR JUGADOR
		-MUERTE JUGADOR
		-CERRAR PARTIDA
		
		
		//SI HICIERA FALTA MAS CASOS, HACERLOS CUANDO SURJAN
		
		
		*/
		
		
		//METODO DE CARMEN (POR DANI)
		/*String msg = message.getPayload();
		System.out.println("Message received: " + msg);
		
		// Se obtienen los ids de los jugadores
		JsonNode node = mapper.readTree(message.getPayload());
		Long P1 = node.get("P1").asLong();
		Long P2 = node.get("P2").asLong();
		
		// Se comprueba si hay que añadir la sesión al mapa de sesiones
		WebSocketSession srcSession = sessions.get(P1);
		if (srcSession != null) 
			sessions.put(P1, session);
		
		// Si existe la sesión de destino, se le envía el mensaje
		WebSocketSession dstSession = sessions.get(P2);
		if (dstSession != null)
			dstSession.sendMessage(new TextMessage(msg));*/
		
		JsonNode node = mapper.readTree(message.getPayload()); //Mi nodo que explora
		
		ObjectNode msg = mapper.createObjectNode(); //Mi explorador de mensajes
		
		switch(node.get("idfuncion").asInt()) { //Cuando envie mi mensaje, según el parametro en el JSON que llegue "idfuncion", me meteré en una función o en otra
		
		case(0): //MI caso de prueba para ver si se comunica perfectamente 
			System.err.println(node.get("texto").asText()); //Saco por consola mi variable texto que esta en el JSON y que si se ha hecho bien debería tener lo del cliente
		
			msg.put("idfuncion", 0); //Envio esto al cliente de vuelta (Es decir, le voy a mandar que haga la función 0
			session.sendMessage(new TextMessage(msg.toString())); //Lo envio
		
			break;
			
		case(1): //CREAR PARTIDA
			//SACAR ID PARTIDA DEL JSON QUE HA LLEGADO
			
			//CREAMOS UN NUEVO JUGADOR
			
			
			//CREAMOS LA PARTIDA COMPROBANDO SI HAY PARTIDAS VACIAS O NO Y DEPENDIENDO DEL CASO LO AÑADIMOS
			
			//DEPENDIENDO DE SI SOMOS J1 o J2, seremos añadido de una forma u otra.
			
			break;
			
		case(2): //ACTUALIZAR JUGADOR
			
			//SACAMOS LOS DATOS DEL JSON RELACIONADOS CON EL JUGADOR
			
			
			//CREAMOS UN NUEVO JUGADOR GRACIAS A ESOS DATOS
			
			//ENVIAMOS ESE JUGADOR AL OTRO CLIENTE PARA QUE LO ACTUALICE COMO CORRESPONDA (LA ID (DEL JUGADOR)IDENTIFICA AL CLIENTE QUE SE LO ESTAS ENVIANDO
			
		break;
		
		case(3): //COMPROBAR SI HAY PARTIDAS PA UNIRSE
			//RECIBO  EL ID DE PARTIDA Y EL ID DEL JUGADOR 1
			
			//CREAMOS OTRO JUGADOR QUE COGE SU ID Y LA DE PARTIDA 
			
			//COMPROBAMOS SI NUESTRO ID DE PARTIDA SU ESTADO ES TRUE(ES DECIR COMPROBAMOS SI PODEMOS ENTRAR YA QUE EXISTE HUECO)
			
			//SI ES TRUE, LO AÑADIMOS A ESA PARTIDA
			
			//SI NO, devuelve un mensaje que dice que la partida en cuestión que ha llegado con ese id esta llena
			break;
			
		case(4): //SI HA MUERTO ALGUN JUGADOR
			
			//RECIBO EL ID DE LA PARTIDA DONDE HA SUCEDIDO Y EL ID DEL JUGADOR
			
			//LE ASIGNO AL JUGADOR QUE ESTA MUERTO por ejemplo (Jugador J1 = partida.get(IDPARTIDA).getJugador(ID).setMuerte(MUERTE) Tener las variables de jugador, no del json
		
			// Enviar
			
			break;
		
		case(5): //Perder una vida (QUIZAS ESTO VA DIRECTAMENTE EN ACTUALIZAR 
			//Recibo el id de partida y del jugador
			
			//Actualizo el valor de vidas de ese jugador (Decrementar 1) EJ: J1.setVida(J1.getVida() -1 );
			
			//Enviar de vuelta
			
			break;
		
		case(6): // Cerrar partida
			//RECIBO ID PARTIDA Y JUGADOR 
			
			//SI ESTA PARTIDA Y JUGADOR EXISTE, COJO LAS ID DE PARTIDA DEL J1 Y J2 como ids auxiliares y Si los auxiliares son distintos de null(es decir que esta o el 1 o el jugador 2 en partida), LO PASO TODO A CERO O NULL (segun el parámetro)
			
			
			break;
		
			
			
		
		}
		
		
	}	
}
