package juegosenred.practica4;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class Handler extends TextWebSocketHandler {
	private ObjectMapper mapper;
	private ConcurrentHashMap <WebSocketSession, Jugador> jugadores = new ConcurrentHashMap<WebSocketSession, jugador>();
	private AtomicInteger ids = new AtomicInteger();
	private int N_PLAYERS = 8;
	
	public Handler() {
		mapper = new ObjectMapper();
	}
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		try {
			JsonNode node = mapper.readTree(message.getPayload());
			ObjectNode msg = mapper.createObjectNode();
			switch(node.get("message").asText()) {
			case("HELLO_WORLD"):
				System.err.println(node.get("text").asText());
				msg.put("message", "HELLO_WORLD");
				session.sendMessage(new TextMessage(msg.toString()));
				break;
			case("NEW_PLAYER"):
				if (jugadores.size() < N_PLAYERS) {
					String skin = node.get("skin").asText();
					int id = ids.incrementAndGet();
					
					Jugador j = new Jugador(id, skin, session);
					jugadores.put(session, j);
					
					msg.put("message", "UPDATE_ID");
					msg.put("id", id);
					
					j.sendMessage(msg.toString());
				} else {}
				break;
			case("CLOSE"):
				jugadores.remove(session);
				break;
			default:
				break;
			}
		} catch (Exception e) {
			System.err.println("Exception processing message" + message.getPayload());
			e.printStackTrace(System.err);
		}
	}
	
	synchronized void sendMessage(String msg) throws IOException {
		session.sendMessage(new TextMessage(msg));
	}
}
