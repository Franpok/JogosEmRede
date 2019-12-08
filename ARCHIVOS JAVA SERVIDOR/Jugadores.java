package es.urjc.code.juegosenred;

import java.time.*;


public class Jugadores {

	private long id;
	private String nombre;
	private LocalDateTime hora;
	private LocalDateTime ultConexion;

	public Jugadores() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public LocalDateTime getHora() {
		return hora;
	}

	public void setHora(LocalDateTime hora) {
		this.hora = LocalDateTime.now();
		this.hora.toString();
	}
	
	public LocalDateTime getultConexion() {
		return ultConexion;
	}

	public void setultConexion(LocalDateTime ultConexion) {
		this.ultConexion = LocalDateTime.now();
		this.ultConexion.toString();
	}

	@Override
	public String toString() {
		return "Jugador [id=" + id + ", nombre=" + nombre + ", hora=" + hora+ ", ultimaConexion=" + ultConexion+ "]";
	}

}
