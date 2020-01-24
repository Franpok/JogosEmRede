package juegosenred.practica4;

import java.util.Map;
import java.util.concurrent.atomic.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Random;

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
	boolean primeravez = true;
	boolean[] EstadoPartida =new boolean[N_PARTIDAS];
	boolean[] EstadoJugadores =new boolean[N_JUGADORES];
	
	
	
	
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload()); //Mi nodo que explora
		ObjectNode msg = mapper.createObjectNode(); //Mi explorador de mensajes

		if(primeravez) {
			for(int i = 0; i< N_PARTIDAS;i++) {
				EstadoPartida[i] = false;
			}
			for(int i = 0; i< N_JUGADORES;i++) {
				EstadoJugadores[i] = false;
			}
			primeravez = false;
		}
		
		switch(node.get("idFuncion").asInt()) { //Cuando envie mi mensaje, según el parametro en el JSON que llegue "idfuncion", me meteré en una función o en otra
		
		
		case(0): //Creamos la partida (HECHO CON ÉXITO)
			// Comprobamos si existen partidas
			Jugador nuevoJugador = new Jugador (node.get("idJugador").asInt(), session);
			nuevoJugador.setSkin(node.get("idSkin").asInt());
			
			String prueba = "No he entrado a ninguna partida";
			System.err.println(node.get("ayuda").asText());
			
			if (EstadoPartida[0]) { //SI existe la partida
				System.err.println(EstadoPartida[0]);
				Partida p = partidas.get(0); //Saco esa partida
				if (p.getVacio()) { //Si solo tiene un jugador (Ya que si existe es porque tiene un jugador)
					p.setJugador2(nuevoJugador);
					p.setVacio(false); //Ya tendría 2 jugadores
					partidas.put(0, p); //La devuelvo
					msg.put("idPartida", 0);
					prueba = "He entrado en una partida";
					msg.put("stringPrueba", prueba);
					msg.put("idFuncion", 0);
					session.sendMessage(new TextMessage(msg.toString()));
					break;
				}
			}
			else if (!EstadoPartida[0]) {
				System.err.println(EstadoPartida[0]);
				EstadoPartida[0] = true;
				Partida p = new Partida(0, nuevoJugador);
				partidas.put(0, p);
				prueba = "He entrado en una partida";
				msg.put("idPartida", 0);
				msg.put("stringPrueba", prueba);
				msg.put("idFuncion", 0);
				session.sendMessage(new TextMessage(msg.toString()));
				break;
			}
		
			if (EstadoPartida[1]) { //SI existe la partida
				System.err.println(EstadoPartida[1]);
				Partida p = partidas.get(1); //Saco esa partida
				if (p.getVacio()) { //Vacio solo es true si esta vacio (es false cuando esta lleno, 2 jugadores)
					p.setJugador2(nuevoJugador); 
					p.setVacio(false);
					partidas.put(1, p); //La devuelvo
					msg.put("idPartida", 1);
					prueba = "He entrado en una partida";
					msg.put("stringPrueba", prueba);
					msg.put("idFuncion", 0);
					session.sendMessage(new TextMessage(msg.toString()));
					break;
				}
			}
			else if (!EstadoPartida[1]) {
				System.err.println(EstadoPartida[1]);
				EstadoPartida[1] = true;
				Partida nuevaPartida = new Partida(1, nuevoJugador);
				partidas.put(1, nuevaPartida);
				msg.put("idPartida", 1);
				prueba = "He entrado en una partida";
				msg.put("stringPrueba", prueba);
				msg.put("idFuncion", 0);
				session.sendMessage(new TextMessage(msg.toString()));
				break;
			}
			
			if (EstadoPartida[2]) { //SI existe la partida
				System.err.println(EstadoPartida[2]);
				Partida p = partidas.get(2); //Saco esa partida
				if (p.getVacio()) { //Si solo tiene un jugador (Ya que si existe es porque tiene un jugador)
					p.setJugador2(nuevoJugador);
					p.setVacio(false);
					partidas.put(2, p); //La devuelvo
					msg.put("idPartida", 2);
					prueba = "He entrado en una partida";
					msg.put("stringPrueba", prueba);
					msg.put("idFuncion", 0);
					session.sendMessage(new TextMessage(msg.toString()));
					break;
				}
			}
			else if (!EstadoPartida[2]) {
				System.err.println(EstadoPartida[2]);
				EstadoPartida[2] = true;
				Partida nuevaPartida = new Partida(2, nuevoJugador);
				partidas.put(2, nuevaPartida);
				msg.put("idPartida", 2);
				prueba = "He entrado en una partida";
				msg.put("stringPrueba", prueba);
				msg.put("idFuncion", 0);
				session.sendMessage(new TextMessage(msg.toString()));
				break;
			}
			
			if (EstadoPartida[3]) { //SI existe la partida
				System.err.println(EstadoPartida[3]);
				Partida p = partidas.get(3); //Saco esa partida
				if (p.getVacio()) { //Si solo tiene un jugador (Ya que si existe es porque tiene un jugador)
					p.setJugador2(nuevoJugador);
					p.setVacio(false);
					partidas.put(3, p); //La devuelvo
					msg.put("idPartida", 3);
					prueba = "He entrado en una partida";
					msg.put("stringPrueba", prueba);
					msg.put("idFuncion", 0);
					session.sendMessage(new TextMessage(msg.toString()));
					break;
					
				}
			}
			else if (!EstadoPartida[3]) {
				System.err.println(EstadoPartida[3]);
				EstadoPartida[3] = true;
				Partida nuevaPartida = new Partida(3, nuevoJugador);
				partidas.put(3, nuevaPartida);
				msg.put("idPartida", 3);
				prueba = "He entrado en una partida";
				msg.put("stringPrueba", prueba);
				msg.put("idFuncion", 0);
				session.sendMessage(new TextMessage(msg.toString()));
				break;
			}
			msg.put("stringPrueba", prueba);
			session.sendMessage(new TextMessage(msg.toString()));
			
		
			
			break;
			
		case(1): // Cerrar partida
			// Sacar objeto partida de partidas teniendo un id
			int idBorrado = node.get("idPartida").asInt();
			int idJugadorBorrado = node.get("idJugador").asInt();
			EstadoJugadores[idJugadorBorrado] = false;
			Jugador jaux = new Jugador(idJugadorBorrado, session);
			jaux.setId(10);
			jugadores.put(idJugadorBorrado, jaux);
			String texto = "Se ha borrado la partida";
			Partida p = partidas.get(idBorrado);
			if (!p.getVacio()) {
				EstadoPartida[idBorrado] = false;
				Partida partidaBorrada = new Partida();
				partidaBorrada.setId(idBorrado);
				partidaBorrada.getJ1().setId(10);
				partidaBorrada.getJ2().setId(10);
				partidas.put(idBorrado, partidaBorrada);
			}
			
			msg.put("idPartida", idBorrado);	
			msg.put("mensajeBorrado", texto);
			msg.put("idFuncion", 1);
			session.sendMessage(new TextMessage(msg.toString()));	
			break;
			
		case(2): //ACTUALIZAR JUGADOR
			int idja = node.get("idPartida").asInt();
			Partida x = partidas.get(idja);
			int idJugadorM = node.get("idJugador").asInt();
			
			Jugador J1 = x.getJ1();
			Jugador J2 = x.getJ2();
						
			boolean dañoJ = node.get("jugadorDaño").asBoolean();
			int powerUpJ = node.get("jugadorPowerUp").asInt();
			boolean trampasJ = node.get("jugadorPinchoGenerado").asBoolean();
			boolean powerUpGeneradoJ = node.get("jugadorPowerupGenerado").asBoolean();
			boolean cogerPowerupJ = node.get("jugadorCogerPowerup").asBoolean();
			boolean muerteJ = node.get("jugadorMuerto").asBoolean();
			boolean saltoJ = node.get("jugadorSaltando").asBoolean();
			int vidasJ = node.get("jugadorVida").asInt();
			
			
			if (J1.getId() == idJugadorM) {
				J2.setDaño(dañoJ);
				J2.setPowerup(powerUpJ);
				J2.setGenerarTrampa(trampasJ);
				J2.setMuerte(muerteJ);
				J2.setSalto(saltoJ);	
				J2.setVidas(vidasJ);
				J2.setCogerPowerup(cogerPowerupJ);
				J2.setGenerarPowerup(powerUpGeneradoJ);
			
				msg.put("jugadorDaño", dañoJ);
				msg.put("jugadorPowerUp", powerUpJ);
				msg.put("pinchoGenerado", trampasJ);
				msg.put("jugadorMuerto", muerteJ);
				msg.put("jugadorSaltando", saltoJ);
				msg.put("jugadorSubirVidas", vidasJ);
				msg.put("jugadorPowerupGenerado", powerUpGeneradoJ);
				msg.put("jugadorCogerPowerup", cogerPowerupJ);
				msg.put("idFuncion", 2);
				WebSocketSession sessionJ2 = J2.getSession();
				sessionJ2.sendMessage(new TextMessage(msg.toString()));	
			
			} else if (J2.getId() == idJugadorM) {
				J1.setDaño(dañoJ);
				J1.setPowerup(powerUpJ);
				J1.setGenerarTrampa(trampasJ);
				J1.setMuerte(muerteJ);
				J1.setSalto(saltoJ);	
				J1.setVidas(vidasJ);
				J1.setCogerPowerup(cogerPowerupJ);
				J1.setGenerarPowerup(powerUpGeneradoJ);
				
				msg.put("jugadorDaño", dañoJ);
				msg.put("jugadorPowerUp", powerUpJ);
				msg.put("pinchoGenerado", trampasJ);
				msg.put("jugadorMuerto", muerteJ);
				msg.put("jugadorSaltando", saltoJ);
				msg.put("jugadorSubirVidas", vidasJ);
				msg.put("jugadorPowerupGenerado", powerUpGeneradoJ);
				msg.put("jugadorCogerPowerup", cogerPowerupJ);
				msg.put("idFuncion", 2);
				WebSocketSession sessionJ1 = J1.getSession();
				
				sessionJ1.sendMessage(new TextMessage(msg.toString()));	
			}
			
			break;
		
		case(3): //Crear jugador(con skin) (HECHO CON ÉXITO)
			if (!EstadoJugadores[0]) {
				Jugador j = new Jugador (0,session);
				int skin = node.get("idskin").asInt();
				j.setSkin(skin);
				j.setSession(session);
				jugadores.put(0, j);
				String textito = "Jugador creado correctamente";
				msg.put("mensaje", textito);
				msg.put("idJugador", j.getId());
				EstadoJugadores[0] = true;
				}
			else if (!EstadoJugadores[1]) {
				Jugador j = new Jugador (1,session);
				int skin = node.get("idskin").asInt();
				j.setSkin(skin);
				j.setSession(session);
				jugadores.put(1, j);
				String textito = "Jugador creado correctamente";
				msg.put("mensaje", textito);
				msg.put("idJugador", j.getId());
				EstadoJugadores[1] = true;
				}
			else if (!EstadoJugadores[2]) {
				Jugador j = new Jugador (2,session);
				int skin = node.get("idskin").asInt();
				j.setSkin(skin);
				j.setSession(session);
				jugadores.put(2, j);
				String textito = "Jugador creado correctamente";
				msg.put("mensaje", textito);
				msg.put("idJugador", j.getId());
				EstadoJugadores[2] = true;
				}
			else if (!EstadoJugadores[3]) {
				Jugador j = new Jugador (3,session);
				int skin = node.get("idskin").asInt();
				j.setSkin(skin);
				j.setSession(session);
				jugadores.put(3, j);
				String textito = "Jugador creado correctamente";
				msg.put("mensaje", textito);
				msg.put("idJugador", j.getId());
				EstadoJugadores[3] = true;
				}
			else if (!EstadoJugadores[4]) {
				Jugador j = new Jugador (4,session);
				int skin = node.get("idskin").asInt();
				j.setSkin(skin);
				j.setSession(session);
				jugadores.put(4, j);
				String textito = "Jugador creado correctamente";
				msg.put("mensaje", textito);
				msg.put("idJugador", j.getId());
				EstadoJugadores[4] = true;
				}
			else if (!EstadoJugadores[5]) {
				Jugador j = new Jugador (5,session);
				int skin = node.get("idskin").asInt();
				j.setSkin(skin);
				j.setSession(session);
				jugadores.put(5, j);
				String textito = "Jugador creado correctamente";
				msg.put("mensaje", textito);
				msg.put("idJugador", j.getId());
				EstadoJugadores[5] = true;
				}
			else if (!EstadoJugadores[6]) {
				Jugador j = new Jugador (6,session);
				int skin = node.get("idskin").asInt();
				j.setSkin(skin);
				j.setSession(session);
				jugadores.put(6, j);
				String textito = "Jugador creado correctamente";
				msg.put("mensaje", textito);
				msg.put("idJugador", j.getId());
				EstadoJugadores[6] = true;
				}
			else if (!EstadoJugadores[7]) {
				Jugador j = new Jugador (7,session);
				int skin = node.get("idskin").asInt();
				j.setSkin(skin);
				j.setSession(session);
				jugadores.put(7, j);
				String textito = "Jugador creado correctamente";
				msg.put("mensaje", textito);
				msg.put("idJugador", j.getId());
				EstadoJugadores[7] = true;
				}
			else{
				String textito = "Jugadores llenos :(";
				msg.put("mensaje", textito);
			}
		
			System.err.println(node.get("mensaje").asText());
			
			msg.put("idFuncion", 3);
			session.sendMessage(new TextMessage(msg.toString()));
			
			break;
			
		case(4): //Comprobar
			int idpartidaactual = node.get("idPartida").asInt();
			Partida y = partidas.get(idpartidaactual);
			
			if (y.getJ2() != null) {
				Jugador jugadorNuevo = y.getJ2();
				int jnId = jugadorNuevo.getId();
				int jnSkin =jugadorNuevo.getSkin();
				
				msg.put("idJugador", jnId);
				msg.put("idSkin", jnSkin);
				msg.put("idFuncion", 4);
				session.sendMessage(new TextMessage(msg.toString()));
			}
			else {
				msg.put("idJugador",10);
				msg.put("idSkin", 0);
				msg.put("idFuncion", 4);
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

/*private int Probabilidad(){
	numero = (int) (Math.random() * 100) + 1;
	if (numero<15){
		//Formas de implementar esto:
		//Llamar al case 2 del text Handler pintando las bombas como activadas
		
		//Cuando sea llamado el case 2, podemos poner un if dentro de ese case para ver
		//si sale probabilidad buena o no. Si es buena, devolvemos la generación como un true
		//si no, devolvemos un false (Esto hace que el cliente nunca genere las bombas, sino que 
		//cada vez que llame al server pues este haga un random y decide si va a generar o no)

		//Actualmente no se cual de las dos es mejor, ayer por la noche no podía pensar, hay que decidir
		//Probablemente la segunda sea la mejor, donde habría que implementar un if en case2 llamando a probabilidad
		//Y viendo si es menor que 15 O que probabilidad devuelva un boolean directamente y lo calcule todo en esta función.

	}

}*/