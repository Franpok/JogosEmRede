package juegosenred.practica4;

import org.springframework.web.socket.WebSocketSession;

public class Partida { //Tiene que tener un ID, los 2 jugadores, boolean para saber si esta llena y quizas muerte?
	private int ID;
	private Jugador J1;
	private Jugador J2;
	private Boolean vacio;
	private Boolean hayJ1;
	
	 Partida() {
		this.ID = 0;
		this.J1 = null;
		this.J2 = null;
		this.vacio = true;
		this.hayJ1 = false;//Partida esta vacia o llena
	}
	 
	 Partida(int id) {
		 this.ID = id;
		 this.J1 = null;
		 this.J2 = null;
		 this.vacio = true;
		 this.hayJ1 = false;
	 }
	 
	 Partida(int id, Jugador j1) {
			this.ID = id;
			this.J1 = j1;
			this.vacio = true;
			this.hayJ1 = true;
		}
	 
	 
	 //Getters y setters de cada parámetro
	 public int getId() {
		 return this.ID;
	 }
	 
	 public void setId(int id) {
		 ID = id;
	 }
	 
	 public Jugador getJ1() {
		 return this.J1;
	 }
	 
	 public Jugador getJ2() {
		 return this.J2;
	 }
	 
	 
	 public void setJugador1(Jugador j) {
		 this.J1 = j;
	 }
	 
	 public void setJugador2(Jugador j) {
		 this.J2 = j;
	 }
	 
	 public Boolean getVacio() {
		 return this.vacio;
	 }
	 
	 public void setVacio(Boolean b) {
		 this.vacio = b;
	 }
	 
	 public boolean getHayJugador() {
		 return this.hayJ1;
	 }
	 
	 public void setHayJugador(Boolean b) {
		 this.vacio = b;
	 }
	 
}
