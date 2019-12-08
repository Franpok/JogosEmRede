package es.urjc.code.juegosenred;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.time.*;
@RestController
@RequestMapping("/jugadores")
public class JugadoresController {

	/*@Autowired
	private Jugadores player;*/
	Map<Long, Jugadores> jugadores = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	
	@GetMapping
	public Collection<Jugadores> misJugadores() {
		System.out.println (jugadores.values());
		return jugadores.values();
		//("{id: "+ jugadores.getNombre()+ " nombre: "+ jugadores.getId()+ " hora: "+ jugadores.values()getHora());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	/*public Jugador crearJugador(@RequestBody String nombre) {		
		Jugador jugador = new Jugador(ids.incrementAndGet(), nombre);
		jugadores.put( jugador.getId() , jugador );
		System.err.println("postmapping");
		
		return jugador;
	}*/
	
	
	
	public Jugadores nuevoJugador(@RequestBody Jugadores jugador) {

		long id = nextId.incrementAndGet();
		LocalTime hora= LocalTime.now();
		jugador.setId(id);
		//jugador.setHora(hora);
		
		jugadores.put(id, jugador);
		

		return jugador;
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Jugadores> actulizaItem(@PathVariable long id, @RequestBody Jugadores itemActualizado) {

		Jugadores savedItem = jugadores.get(itemActualizado.getId());

		if (savedItem != null) {

			jugadores.put(id, itemActualizado);

			return new ResponseEntity<>(itemActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Jugadores> getItem(@PathVariable long id) {

		Jugadores savedItem = jugadores.get(id);

		if (savedItem != null) {
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Jugadores> borraItem(@PathVariable long id) {

		Jugadores savedItem = jugadores.get(id);

		if (savedItem != null) {
			jugadores.remove(savedItem.getId());
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
