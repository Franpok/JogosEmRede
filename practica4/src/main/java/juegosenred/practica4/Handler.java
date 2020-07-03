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
		ObjectNode msgaux = mapper.createObjectNode(); //Para situaciones donde tenga que enviar a dos clientes a la vez información distinta

		
		switch(node.get("idFuncion").asInt()) { //Cuando envie mi mensaje, según el parametro en el JSON que llegue "idfuncion", me meteré en una función o en otra
		
		
		case(0): //Creamos la partida (Funciona)
			int idJug = node.get("idJugador").asInt(); //Cojo el id del cliente
			int idLocal = 0;
			Partida f = new Partida();
			String prueba = "Me he unido a una partida";
			if (numPartidaActual < N_PARTIDAS) { //Si el numero de partidas no es el maximo establecido (4)
				for (Partida p: partidillas){//Recorro mi lista por cada elemento partida
					if (!p.getHayJugador()) { //SI NO HAY J1 (es decir, no hay jugadores)
						crearPartida(numPartidaActual, jugadoriños.get(idJug));//Llamo a mi función crearPartida con los datos necesarios
						break;
					}
					else if (p.getVacio()){ //SI HAY UN J1, compruebo si hay un J2
						llenarPartida(p, jugadoriños.get(idJug), msg); //Si no lo hay, lleno ese J2
						numPartidaActual++; //Aumento el número de partidas que existen
						 f = p;
						
						break;
					}
					idLocal++;
				}
			}else {
				prueba = "No puedo crear partida (Reached Max Games)";
			}
			msg.put("idPartida", idLocal);
			msgaux.put("idPartida", idLocal);
			
			msg.put("stringPrueba", prueba);
			session.sendMessage(new TextMessage(msg.toString()));
			
			if (!f.getVacio()) {
				WebSocketSession sesionLocalJ1 = f.getJ1().getSession();
				WebSocketSession sesionLocalJ2 = f.getJ2().getSession();
				
				msg.put("idFuncion", 4);
				msgaux.put("idFuncion", 4);
				
				msg.put("estadoPartida", true);
				msgaux.put("estadoPartida", true);
				
				msg.put("idSkin", f.getJ2().getSkin()); //Le envio a J1 la skin de J2
				msgaux.put("idSkin", f.getJ1().getSkin()); // Le envio a J2 la skin de J1
				
				sesionLocalJ1.sendMessage(new TextMessage(msg.toString()));
				sesionLocalJ2.sendMessage(new TextMessage(msgaux.toString()));
				System.err.println("He llegado");
			}
			
			break;
			
		/*case(1): // Cerrar partida
			int idJugador = node.get("idJugador").asInt();
			int idPartidita = node.get("idPartida").asInt();
			Partida borrada = partidillas.get(idPartidita);
			Jugador borradito = jugadoriños.get(idJugador);
			int idAnt = borrada.getId();

			if (borrada.getJ1().getSession() == borradito.getSession()) {
				Partida nueva = new Partida();
				partidillas.set(idAnt, nueva);
				
			}
				
				
			
			
			String texto = "Se ha borrado la partida";
			msg.put("idPartida", idBorrado);	
			msg.put("mensajeBorrado", texto);
			msg.put("idFuncion", 1);
			session.sendMessage(new TextMessage(msg.toString()));	
			break;*/
			
		case(2): // Comunicar Jugador coge Powerup
			System.err.println("Tengo Powerup");
			int a2 = node.get("idPartida").asInt();
			int b2 = node.get("idJugador").asInt();
			Partida A2 = partidillas.get(a2);
			msg.put("idFuncion", 2);
			if (b2 == A2.getJ1().getId()) {
				WebSocketSession sesionaux2 = A2.getJ2().getSession();
				sesionaux2.sendMessage(new TextMessage(msg.toString()));
			}else {
				WebSocketSession sesionaux22 = A2.getJ1().getSession();
				sesionaux22.sendMessage(new TextMessage(msg.toString()));
			}
			
			break;
		
		case(3): //Crear jugador(con skin) (FUNCIONA)
			if(primeravez) {
				inicializar();
				primeravez=false;
			}
			
			if (numJugadoresActual < N_JUGADORES) { //Si hay menos de 8 jugadores (indices de 0 a 7)
				Jugador j = new Jugador (numJugadoresActual,session); // Creo al jugador con la sesion del WebSocket
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
			msg.put("idFuncion", 3); //La función en cliente que quiero que haga al recibir el mensaje del servidor
			session.sendMessage(new TextMessage(msg.toString())); //Envio el mensaje
			
			break;
			
		case(5): 
			System.err.println("Quiero saltar");
			int a5 = node.get("idPartida").asInt();
			int b5 = node.get("idJugador").asInt();
			Partida A5 = partidillas.get(a5);
			msg.put("idFuncion", 5);
			if (b5 == A5.getJ1().getId()) {
				WebSocketSession sesionaux5 = A5.getJ2().getSession();
				sesionaux5.sendMessage(new TextMessage(msg.toString()));
			}else {
				WebSocketSession sesionaux25 = A5.getJ1().getSession();
				sesionaux25.sendMessage(new TextMessage(msg.toString()));
			}
			break;
			
		case(6): 
			System.err.println("Quiero generar powerup");
			int a6 = node.get("idPartida").asInt();
			int b6 = node.get("idJugador").asInt();
			Partida A6 = partidillas.get(a6);
			msg.put("idFuncion", 6);
			if (b6 == A6.getJ1().getId()) {
				WebSocketSession sesionaux5 = A6.getJ2().getSession();
				sesionaux5.sendMessage(new TextMessage(msg.toString()));
			}else {
				WebSocketSession sesionaux25 = A6.getJ1().getSession();
				sesionaux25.sendMessage(new TextMessage(msg.toString()));
			}
			break;
			
		case(7): 
			System.err.println("He recibido daño");
			int a7 = node.get("idPartida").asInt();
			int b7 = node.get("idJugador").asInt();
			Partida A7 = partidillas.get(a7);
			msg.put("idFuncion", 7);
			if (b7 == A7.getJ1().getId()) {
				WebSocketSession sesionaux7 = A7.getJ2().getSession();
				sesionaux7.sendMessage(new TextMessage(msg.toString()));
			}else {
				WebSocketSession sesionaux27 = A7.getJ1().getSession();
				sesionaux27.sendMessage(new TextMessage(msg.toString()));
			}
			break;
			
		case(8): 
			System.err.println("He generado obstáculo");
			int a8 = node.get("idPartida").asInt();
			int b8 = node.get("idJugador").asInt();
			Partida A8 = partidillas.get(a8);
			msg.put("idFuncion", 8);
			if (b8 == A8.getJ1().getId()) {
				WebSocketSession sesionaux8 = A8.getJ2().getSession();
				sesionaux8.sendMessage(new TextMessage(msg.toString()));
			}else {
				WebSocketSession sesionaux28 = A8.getJ1().getSession();
				sesionaux28.sendMessage(new TextMessage(msg.toString()));
			}
			break;
			
		}
		//HACER FOR EACH DONDE RECORRO CADA PARTIDA SACANDO A CADA JUGADOR PARA COMPROBAR SU TIEMPO Y VER SI ALGUNO TARDA MÁS DE 15 SEGUNDOS
		//For each jugador in partida
		
		//Si es true, llamaré a borrar partida
		if(JugadorDesconectado(LocalDateTime.now())) {
			
		}//Else no hago nada ya que sigue conectado correctamente
		
	}
		
	public void crearPartida(int ID, Jugador player){ //Creación de partidas
		Partida p = new Partida(ID, player); //Creo una partida por el constructor
		p.setHayJugador(true); 
		partidillas.set(ID,p);//añado esa partida a la posición correspondiente (QUE COINCIDE CON SU ID)
		//System.err.println("He creado una nueva partida con id: "+ ID);
	}
	
	public void llenarPartida(Partida p, Jugador J, ObjectNode msg){
		p.setJugador2(J); //Añado a la partida el jugador 2
		p.setVacio(false); 
		partidillas.set(p.getId(), p);
		//Actualizo en la posición correspondiente esa partida
		//System.err.println("He llenado la partida con id: "+ p.getId());
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

	

