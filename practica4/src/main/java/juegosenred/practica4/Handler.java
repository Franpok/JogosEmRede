package juegosenred.practica4;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Handler extends TextWebSocketHandler {
	public static ObjectMapper mapper = new ObjectMapper();
	public static Map<Long, WebSocketSession> sessions = new ConcurrentHashMap<Long, WebSocketSession>();
	
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		/*
		 * Cuando un jugador mande su estatus al otro jugador, este se enviará como un objeto JSON llamado message que incluirá:
		 * - Si el jugador salta.
		 * - Si el jugador ha recibido daño.
		 * - Las trampas del jugador.
		 * - Los powerups del jugador.
		 * - Las vidas.
		 */
		
		String msg = message.getPayload();
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
			dstSession.sendMessage(new TextMessage(msg));
	}	
}
