package juegosenred.practica4;

import java.util.*;

import java.util.concurrent.atomic.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.Random;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.time.*;
import java.time.temporal.ChronoUnit;

public class Handler extends TextWebSocketHandler {
	public static ObjectMapper mapper = new ObjectMapper(); //MI mapper
	public static Map<Integer, Jugador> jugadores = new ConcurrentHashMap<Integer, Jugador>(); //Mi colección de jugadores (Aunque no estamos pasando JUGADOR? Mirar)
	public static Map<Integer, Partida> partidas = new ConcurrentHashMap <Integer,Partida>(); //Mi colección de partidas
	
	//PROBANDO
	public static List<Partida> partidillas = new CopyOnWriteArrayList <Partida>();
	public static List<Jugador> jugadoriños = new CopyOnWriteArrayList <Jugador>();
	
	
	int idPartida, idJugador;
	int numPartidaActual = 0;
	int numJugadoresActual = 0;
	final int N_JUGADORES = 8;
	final int N_PARTIDAS = 4;
	int JUGADORESACTUALES = 0;
	int PARTIDASACTUALES = 0;
	boolean primeravez = true;
	boolean[] EstadoPartida =new boolean[N_PARTIDAS];
	boolean[] EstadoJugadores =new boolean[N_JUGADORES];
	
	
	//
	
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload()); //Mi nodo que explora
		ObjectNode msg = mapper.createObjectNode(); //Mi explorador de mensajes

		if(primeravez) { // Esto no debería ser así, el server debería ya inicializar todo
			for(int i = 0; i< N_PARTIDAS;i++) {
				EstadoPartida[i] = false;
			}
			for(int i = 0; i< N_JUGADORES;i++) {
				EstadoJugadores[i] = false;
			}
			primeravez = false;
		}
		
		switch(node.get("idFuncion").asInt()) { //Cuando envie mi mensaje, según el parametro en el JSON que llegue "idfuncion", me meteré en una función o en otra
		
		
		case(0): //Creamos la partida (PENDIENTE DE COMPROBACIÓN)
			int idJug = node.get("idJugador").asInt(); //Cojo el id del cliente
		
			String prueba = "He entrado a una partida"; //Debug
			System.err.println(node.get("ayuda").asText()); //Debug
			
			if (numPartidaActual < N_PARTIDAS) { //Si el numero de partidas no es el maximo establecido (4)
				for (Partida p: partidillas)  //Recorro mi lista por cada elemento partida
					if (!p.getHayJugador()) { //SI NO HAY J1 (es decir, no hay jugadores)
						crearPartida(numPartidaActual, jugadoriños.get(idJug)); //Llamo a mi función crearPartida con los datos necesarios
						numPartidaActual++; //Aumento el número de partidas que existen
					}
					else if (!p.getVacio()){ //SI HAY UN J1, compruebo si hay un J2
						llenarPartida(p, jugadoriños.get(idJug)); //Si no lo hay, lleno ese J2
					}
			}else {
				prueba = "No puedo crear partida (Reached Max Games)";
			}
				
	
			
			
			/*if (EstadoPartida[0]) { //SI existe la partida
				System.err.println(EstadoPartida[0]);
				Partida p = partidas.get(0); //Saco esa partida
				if (p.getVacio()) { //Si solo tiene un jugador (Ya que si existe es porque tiene un jugador)
					p.setJugador2(nuevoJugador);
					p.setVacio(false); //Ya tendría 2 jugadores
					partidas.put(0, p); //La devuelvo
					msg.put("idPartida", 0);
					prueba = "He entrado en una partida";
					msg.put("SoyJ1", false);
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
				msg.put("SoyJ1", true);
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
					msg.put("SoyJ1", false);
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
				msg.put("SoyJ1", true);
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
					msg.put("SoyJ1", false);
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
				msg.put("SoyJ1", true);
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
					msg.put("SoyJ1", false);
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
				msg.put("SoyJ1", true);
				msg.put("stringPrueba", prueba);
				msg.put("idFuncion", 0);
				session.sendMessage(new TextMessage(msg.toString()));
				break;
			}*/
			
			msg.put("stringPrueba", prueba);
			session.sendMessage(new TextMessage(msg.toString()));
			
			break;
			
		case(1): // Cerrar partida
			// Sacar objeto partida de partidas teniendo un id
			int idBorrado = node.get("idPartida").asInt(); //id de mi lista
			int idJugadorBorrado = node.get("idJugador").asInt(); //No se si me hace falta esto
			EstadoJugadores[idJugadorBorrado] = false;
			
			partidillas.remove(idBorrado);
			
			/*Jugador jaux = new Jugador(idJugadorBorrado, session);
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
			}*/
			
			String texto = "Se ha borrado la partida";
			msg.put("idPartida", idBorrado);	
			msg.put("mensajeBorrado", texto);
			msg.put("idFuncion", 1);
			session.sendMessage(new TextMessage(msg.toString()));	
			break;
			
		case(2): //ACTUALIZAR JUGADOR
			int idja = node.get("idPartida").asInt(); //id lista 
			Partida x = partidas.get(idja); 
			Partida copia = partidillas.get(idja);
			
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
				J2.setGenerarTrampa(Probabilidad());
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
		
		case(3): //Crear jugador(con skin) (FUNCIONA)
			if (numJugadoresActual < N_JUGADORES) { //Si hay menos de 8 jugadores (indices de 0 a 7)
				Jugador j = new Jugador (numJugadoresActual,session); // Creo al jugador con la sesion del WebSocket
				numJugadoresActual++;
				int skin = node.get("idskin").asInt(); //Cojo del cliente la skin que ha elegido.
				j.setSkin(skin); //Guardo en la instancia de jugador la skin (por si me hiciera falta)
				j.setSession(session); //Guardo en la instancia del jugador la sesion (por si me hiciera falta) 
				numJugadoresActual++; //Actualizo el numero de jugadores que hay en el server
				jugadoriños.add(j); //Añado mi jugador a la lista en la posición correspondiente
				msg.put("idJugador", numJugadoresActual-1); //Le envio el id al jugador para que lo guarde, esto sera util cuando necesite saber en otros métodos que id tiene ese jugador
				String textito = "Se ha creado el jugador "+ (numJugadoresActual-1); //MENSAJE DEBUG(SOBRA)
				msg.put("mensaje", textito); //Debug
			}else {
				String textito = "Jugadores llenos :("; //Debug
			}
			System.err.println(node.get("mensaje").asText()); //Debug
			msg.put("idFuncion", 3); //La función en cliente que quiero que haga al recibir el mensaje del servidor
			session.sendMessage(new TextMessage(msg.toString())); //Envio el mensaje
			
			break;
			
		case(4): //Comprobar (Habrá que ver que pasa con esta función si sigue existiendo o no)
			int idpartidaactual = node.get("idPartida").asInt();
			Partida y = partidas.get(idpartidaactual);
			y.getJ1().setTiempo(LocalDateTime.now());
			if (y.getJ2() != null) {
				System.err.println("Me he metido aquí porque si");
				Jugador jugadorNuevo = y.getJ2();
				int jnId = jugadorNuevo.getId();
				int jnSkin =jugadorNuevo.getSkin();
				
				msg.put("idJugador", jnId);
				msg.put("idSkin", jnSkin);
				msg.put("idFuncion", 4);
				session.sendMessage(new TextMessage(msg.toString()));
			}
			else {
				msg.put("idJugador", 10);
				msg.put("idSkin", 0);
				msg.put("idFuncion", 4);
				msg.put("Mishuevos", 100);
				session.sendMessage(new TextMessage(msg.toString()));
			}
			break;
		
		
		}
		//HACER FOR EACH DONDE RECORRO CADA PARTIDA SACANDO A CADA JUGADOR PARA COMPROBAR SU TIEMPO Y VER SI ALGUNO TARDA MÁS DE 15 SEGUNDOS
		//For each jugador in partida
		
		//Si es true, llamaré a borrar partida
		if(JugadorDesconectado(LocalDateTime.now())) {
			
		}//Else no hago nada ya que sigue conectado correctamente
		
		//HAY QUE VER DONDE COLOCAR INICIALIZAR DE MANERA CORRECTA PARA QUE LO HAGA AL CREAR EL SERVER Y SOLO DURANTE LA CREACIÓN
		inicializar();
		
	}
		
	public void crearPartida(int ID, Jugador player){ //Creación de partidas
		Partida p = new Partida(ID, player); //Creo una partida por el constructor
		p.setHayJugador(true); 
		partidillas.set(ID,p);//añado esa partida a la posición correspondiente (QUE COINCIDE CON SU ID)
	}
	
	public void llenarPartida(Partida p, Jugador J){
		p.setJugador2(J); //Añado a la partida el jugador 2
		p.setVacio(false); 
		partidillas.set(p.getId(), p); //Actualizo en la posición correspondiente esa partida
	}
	
	public void inicializar() { // Cuando se inicie el server, lleno mi lista de partidas de elementos partida con valores por defecto para poder recorrer el for each de creación de partidas.
		Partida p = new Partida();
		for (int i = 0; i < N_PARTIDAS; i++) {
			p.setId(i);
			partidillas.add(p);
		}
	}
		
		
private boolean Probabilidad(){
	int numero = (int) (Math.random() * 100) + 1;
		if (numero<30){
			return true;
		}else
			return false;
		}	

			
				


public boolean JugadorDesconectado(LocalDateTime TiempoJugador) { // Ponerlo o como parametro de Jugador o directamente lo maneja el servidor
	LocalDateTime TiempoActual = LocalDateTime.now();
	long diferencia = ChronoUnit.SECONDS.between(TiempoActual, TiempoJugador);
	
		if(diferencia>15) {
			return true;
			}	
		else
			return false;
		}
		
}	




		//Formas de implementar esto:
		//Llamar al case 2 del text Handler pintando las bombas como activadas
		
		//Cuando sea llamado el case 2, podemos poner un if dentro de ese case para ver
		//si sale probabilidad buena o no. Si es buena, devolvemos la generación como un true
		//si no, devolvemos un false (Esto hace que el cliente nunca genere las bombas, sino que 
		//cada vez que llame al server pues este haga un random y decide si va a generar o no)

		//Actualmente no se cual de las dos es mejor, ayer por la noche no podía pensar, hay que decidir
		//Probablemente la segunda sea la mejor, donde habría que implementar un if en case2 llamando a probabilidad
		//Y viendo si es menor que 15 O que probabilidad devuelva un boolean directamente y lo calcule todo en esta función.

	

