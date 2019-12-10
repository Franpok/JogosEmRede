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

	Map<Long, Jugadores> players = new ConcurrentHashMap<>();
	AtomicLong nextId = new AtomicLong(0);

	@GetMapping
	public Collection<Jugadores> misJugadores() {
		return players.values();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Jugadores nuevoJugador(@RequestBody Jugadores jugador) {

		long id = nextId.incrementAndGet();
		LocalTime hora = LocalTime.now();
		jugador.setId(id);
		players.put(id, jugador);

		return jugador;
	}

	@PutMapping("/{id}")
	public ResponseEntity<Jugadores> actualizarJugador(@PathVariable long id,
			@RequestBody Jugadores jugadorActualizado) {
		Jugadores anteriorJugador = players.get(jugadorActualizado.getId());

		if (anteriorJugador != null) {
			players.put(id, jugadorActualizado);
			return new ResponseEntity<>(jugadorActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Jugadores> getJugador(@PathVariable long id) {

		Jugadores jugadorObtenido = players.get(id);

		if (jugadorObtenido != null) {
			return new ResponseEntity<>(jugadorObtenido, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Jugadores> borraJugador(@PathVariable long id) {
		Jugadores jugadorBorrado = players.get(id);

		if (jugadorBorrado != null) {
			players.remove(jugadorBorrado.getId());
			return new ResponseEntity<>(jugadorBorrado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
