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
	public static Map<Integer, Jugador> jugadores = new ConcurrentHashMap<Integer, Jugador>(); //Mi colección de jugadores (Aunque no estamos pasando JUGADOR? Mirar)
	public static Map<Integer, Partida> partidas = new ConcurrentHashMap <Integer,Partida>(); //Mi colección de partidas
	//public AtomicInteger idJugador = new AtomicInteger();
	//public AtomicInteger idPartida = new AtomicInteger();
	int idPartida, idJugador;
	final int N_JUGADORES = 8;
	final int N_PARTIDAS = 4;
	int JUGADORESACTUALES = 0;
	int PARTIDASACTUALES = 0;
	//Si fuera necesario añadir ints maximos de partidas y sesiones
	
	
	
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload()); //Mi nodo que explora
		ObjectNode msg = mapper.createObjectNode(); //Mi explorador de mensajes
		
		switch(node.get("idFuncion").asInt()) { //Cuando envie mi mensaje, según el parametro en el JSON que llegue "idfuncion", me meteré en una función o en otra
		
		case(0): //Creamos la partida
			// Comprobamos si existen partidas
			Jugador nuevoJugador = new Jugador (node.get("idJugador").asInt(), session);
			if (partidas == null) {
				Partida nuevaPartida = new Partida(PARTIDASACTUALES, nuevoJugador);
				partidas.put(PARTIDASACTUALES, nuevaPartida);
				PARTIDASACTUALES++;
			}
			/*if (partidas == null) { // Si no hay partidas
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
			session.sendMessage(new TextMessage(msg.toString()));*/	
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
		
		case(3): //Crear jugador(con skin)
			if (JUGADORESACTUALES < N_JUGADORES) {
				Jugador j = new Jugador (JUGADORESACTUALES,session);
				JUGADORESACTUALES++;
				int skin = node.get("idskin").asInt();
				j.setSkin(skin);
				j.setSession(session);
				jugadores.put(JUGADORESACTUALES, j);
				String textito = "Jugador creado correctamente";
				msg.put("mensaje", textito);
				msg.put("idJugador", j.getId());
				
				JUGADORESACTUALES++;
				}
			System.err.println(node.get("mensaje").asText());
			
			
			session.sendMessage(new TextMessage(msg.toString()));
			
			break;
			
		case(4):
			Partida y = partidas.get(node.get("idPartida").asInt());
			if (y.getJ2() != null) {
				Jugador jugadorNuevo = y.getJ2();
				int jnId = jugadorNuevo.getId();
				int jnSkin =jugadorNuevo.getSkin();
				
				msg.put("idJugador", jnId);
				msg.put("idSkin", jnSkin);
				session.sendMessage(new TextMessage(msg.toString()));
			}
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
