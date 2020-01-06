package juegosenred.practica4;

import org.springframework.web.socket.WebSocketSession;

public class Jugador {
	public int ID;
	public String SKIN;
	public WebSocketSession SESSION;
	
	 Jugador(int id, String skin, WebSocketSession session) {
		this.ID = id;
		this.SKIN = skin;
		this.SESSION = session;
	}
	 
	 public int getId() {
		 return ID;
	 }
	 
	 public String getSkin() {
		 return SKIN;
	 }
	 
	 public WebSocketSession getSession() {
		 return SESSION;
	 }
	 
	 public void sendMessage(String message) {
		 
	 }
}
