package juegosenred.practica4;

import org.springframework.web.socket.WebSocketSession;
import java.time.LocalDateTime;

public class Jugador {
	private int ID;
	private int SKIN;
	private WebSocketSession SESSION;
	private LocalDateTime Tiempo;
	private boolean inGame;
	
	//Crear variables si hiciera falta , NOMBRE??
	
	
	 Jugador(int id,  WebSocketSession session) { //Pasar como parámetros las variables que hagan falta y no puedan inicializarse a 0 o null o false
		this.ID = id;
		this.SKIN = 0;
		this.SESSION = session;
		this.Tiempo = LocalDateTime.now();
		this.inGame = false;
	}
	 Jugador() { //Pasar como parámetros las variables que hagan falta y no puedan inicializarse a 0 o null o false
			this.SKIN = 0;
			this.Tiempo = LocalDateTime.now();
			this.inGame = false;
		}
	 
	 //Getters y Setters
	 public int getId() {
		 return ID;
	 }
	 
	 public void setId(int id) {
		 this.ID = id;
	 }
	 
	 public boolean getInGame() {
		 return inGame;
	 }
	 
	 public void setinGame(boolean b) {
		 this.inGame = b;
	 }
	 public int getSkin() {
		 return SKIN;
	 }
	 
	 public void setSkin(int skin) {
		 this.SKIN = skin;
	 }
	 
	 
	 public LocalDateTime getTiempo() {
		 return Tiempo;
	 }
	 
	 public void setTiempo(LocalDateTime t) {
		 this.Tiempo = t;
	 }
	 
	 public WebSocketSession getSession() {
		 return SESSION;
	 }
	 
	 public void setSession(WebSocketSession session) {
		 this.SESSION = session;
	 }
	 
	 public void sendMessage(String message) {
		 
	 }
	 
	 
	 
}
