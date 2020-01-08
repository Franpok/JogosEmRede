package juegosenred.practica4;

import org.springframework.web.socket.WebSocketSession;

public class Jugador {
	private int ID;
	private int SKIN;
	private WebSocketSession SESSION;
	private boolean SALTO;
	private boolean DAÑO;
	private boolean GENERARTRAMPA;
	private int POWERUP;
	private boolean MUERTE;
	private boolean GENERARPOWERUP;
	private int VIDAS;
	//Crear variables si hiciera falta , NOMBRE??
	
	 Jugador(int id,  WebSocketSession session) { //Pasar como parámetros las variables que hagan falta y no puedan inicializarse a 0 o null o false
		this.ID = id;
		this.SKIN = 0;
		this.SESSION = session;
		this.SALTO = false;
		this.DAÑO = false;
		this.GENERARPOWERUP = false;
		this.GENERARTRAMPA = false;
		this.POWERUP = 0;
		this.MUERTE = false;
		this.VIDAS = 3;
	}
	 
	 
	 //Getters y Setters
	 public int getId() {
		 return ID;
	 }
	 
	 public void setId(int id) {
		 this.ID = id;
	 }
	 
	 public int getSkin() {
		 return SKIN;
	 }
	 
	 public void setSkin(int skin) {
		 this.SKIN = skin;
	 }
	 
	 public int getPowerup() {
		 return POWERUP;
	 }
	 
	 public void setPowerup(int powerup) {
		 this.POWERUP = powerup;
	 }
	 public int getVidas() {
		 return VIDAS;
	 }
	 
	 public void setVidas(int vidas) {
		 this.VIDAS = vidas;
	 }
	 
	 public Boolean getSalto() {
		 return SALTO;
	 }
	 
	 public void setSalto(Boolean b){
		 this.SALTO = b;
	 }
	 
	 public Boolean getDaño() {
		 return DAÑO;
	 }
	 
	 public void setDaño(Boolean b){
		 this.DAÑO= b;
	 }
	 
	 public Boolean getGenerarTrampa() {
		 return GENERARTRAMPA;
	 }
	 
	 public void setGenerarTrampa(Boolean b){
		 this.GENERARTRAMPA = b;
	 }
	 
	 public Boolean getMuerte() {
		 return MUERTE;
	 }
	 
	 public void setMuerte(Boolean b){
		 this.MUERTE = b;
	 }
	 public Boolean getGenerarPowerup() {
		 return GENERARPOWERUP;
	 }
	 
	 public void setGenerarPowerup(Boolean b){
		 this.GENERARPOWERUP = b;
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
