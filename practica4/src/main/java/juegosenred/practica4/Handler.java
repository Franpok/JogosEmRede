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
	public static Map<Jugador, WebSocketSession> jugadores = new ConcurrentHashMap<Jugador, WebSocketSession>(); //Mi colección de jugadores (Aunque no estamos pasando JUGADOR? Mirar)
	public static Map<Integer, Partida> partidas = new ConcurrentHashMap <Integer,Partida>(); //Mi colección de partidas
	//public AtomicInteger idJugador = new AtomicInteger();
	//public AtomicInteger idPartida = new AtomicInteger();
	int idPartida, idJugador;
	final int N_JUGADORES = 8;
	final int N_PARTIDAS = 4;
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
		
		switch(node.get("idFuncion").asInt()) { //Cuando envie mi mensaje, según el parametro en el JSON que llegue "idfuncion", me meteré en una función o en otra
		
		case(0): //Creamos la partida
			// Comprobamos si existen partidas
			if (partidas == null) { // Si no hay partidas
				Partida nuevaPartida1 = new Partida(1);
				partidas.put(0, nuevaPartida1);
				Partida nuevaPartida2 = new Partida(2);
				partidas.put(1, nuevaPartida2);
				Partida nuevaPartida3 = new Partida(3);
				partidas.put(2, nuevaPartida3);
				Partida nuevaPartida4 = new Partida(4);
				partidas.put(3, nuevaPartida4);
			}
		
			int idp = 0;
			String prueba = "No he entrado a ninguna partida";
		
			if (partidas.get(0).getJ1() != null) {
				if (partidas.get(0).getVacio() == false) {
					partidas.get(0).setJugador2(new Jugador(node.get("idJugador").asInt(), session));
					idp = 0;
					prueba = "He entrado en una partida";
				}
			}
			
			if (partidas.get(1).getJ1() != null) {
				if (partidas.get(1).getVacio() == false) {
					partidas.get(1).setJugador2(new Jugador(node.get("idJugador").asInt(), session));
					idp = 1;
					prueba = "He entrado en una partida";
				}
			}
			
			if (partidas.get(2).getJ1() != null) {
				if (partidas.get(2).getVacio() == false) {
					partidas.get(2).setJugador2(new Jugador(node.get("idJugador").asInt(), session));
					idp = 2;
					prueba = "He entrado en una partida";
				}
			}
			
			if (partidas.get(3).getJ1() != null) {
				if (partidas.get(3).getVacio() == false) {
					partidas.get(3).setJugador2(new Jugador(node.get("idJugador").asInt(), session));
					idp = 3;
					prueba = "He entrado en una partida";
				}
			}
			
			if(!partidas.get(0).getVacio()) {
				partidas.get(0).setJugador1(new Jugador(node.get("idJugador").asInt(), session));
				idp = 0;
				prueba = "He entrado en una partida";
			}
			
			if(!partidas.get(1).getVacio()) {
				partidas.get(1).setJugador1(new Jugador(node.get("idJugador").asInt(), session));
				idp = 1;
				prueba = "He entrado en una partida";
			}
			
			if(!partidas.get(2).getVacio()) {
				partidas.get(2).setJugador1(new Jugador(node.get("idJugador").asInt(), session));
				idp = 2;
				prueba = "He entrado en una partida";
			}
			
			if(!partidas.get(3).getVacio()) {
				partidas.get(3).setJugador1(new Jugador(node.get("idJugador").asInt(), session));
				idp = 3;
				prueba = "He entrado en una partida";
			}
			
			msg.put("idPartida", idp);
			msg.put("stringPrueba", prueba);
			session.sendMessage(new TextMessage(msg.toString()));	
			break;
			
		case(1): // Cerrar partida
			// Sacar objeto partida de partidas teniendo un id
			int idBorrado = node.get("idPartida").asInt();
			String texto = "Se ha borrado la partida";
			Partida p = partidas.get(node.get("idPartida").asInt());
			if (!p.getVacio()) {
				Partida partidaBorrada = new Partida();
				partidaBorrada.setId(idBorrado);
				partidas.put(idBorrado, partidaBorrada);
			}
			int idJugadorBorrado = node.get("idJugador").asInt();
			msg.put("idPartida", idBorrado);	
			msg.put("mensajeBorrado", texto);
			session.sendMessage(new TextMessage(msg.toString()));	
			break;
			
		case(2): //ACTUALIZAR JUGADOR
			Partida x = partidas.get(node.get("idPartida").asInt());
			int idJugadorM = node.get("idJugador").asInt();
			Jugador J1 = x.getJ1();
			Jugador J2 = x.getJ2();
						
			boolean dañoJ2 = node.get("jugadorDaño").asBoolean();
			int powerUpJ2 = node.get("jugadorPowerUp").asInt();
			boolean trampasJ2 = node.get("pinchoGenerado").asBoolean();
			boolean muerteJ2 = node.get("jugadorMuerto").asBoolean();
			boolean saltoJ2 = node.get("jugadorSaltando").asBoolean();
			int vidasJ2 = node.get("jugadorSubirVidas").asInt();
			
			if (J1.getId() == idJugadorM) {
				J2.setDaño(dañoJ2);
				J2.setPowerup(powerUpJ2);
				J2.setGenerarTrampa(trampasJ2);
				J2.setMuerte(muerteJ2);
				J2.setSalto(saltoJ2);	
				J2.setVidas(vidasJ2);
				
				msg.put("jugadorDaño", dañoJ2);
				msg.put("jugadorPowerUp", powerUpJ2);
				msg.put("pinchoGenerado", trampasJ2);
				msg.put("jugadorMuerto", muerteJ2);
				msg.put("jugadorSaltando", saltoJ2);
				msg.put("jugadorSubirVidas", vidasJ2);
				
				WebSocketSession sessionJ2 = J2.getSession();
				
				sessionJ2.sendMessage(new TextMessage(msg.toString()));	
			} else if (J2.getId() == idJugadorM) {
				J1.setDaño(dañoJ2);
				J1.setPowerup(powerUpJ2);
				J1.setGenerarTrampa(trampasJ2);
				J1.setMuerte(muerteJ2);
				J1.setSalto(saltoJ2);	
				J1.setVidas(vidasJ2);
				
				msg.put("jugadorDaño", dañoJ2);
				msg.put("jugadorPowerUp", powerUpJ2);
				msg.put("pinchoGenerado", trampasJ2);
				msg.put("jugadorMuerto", muerteJ2);
				msg.put("jugadorSaltando", saltoJ2);
				msg.put("jugadorSubirVidas", vidasJ2);
				
				WebSocketSession sessionJ1 = J1.getSession();
				
				sessionJ1.sendMessage(new TextMessage(msg.toString()));	
			}
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
