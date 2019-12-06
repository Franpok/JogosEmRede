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

@RestController
@RequestMapping("/jugadores")
public class JugadoresController {

	Map<Long, Jugadores> items = new ConcurrentHashMap<>(); 
	AtomicLong nextId = new AtomicLong(0);
	int [] myNumero  = new int [10];
	int size = 0;
	
	@GetMapping
	public int items() {
		int miNumero = 0;
		for (int i = 0; i<size; i++ ) {
			return miNumero = myNumero[i];
		}
		return miNumero;
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public int nuevoJugador(@RequestBody int item) {

		myNumero[size] = item;
		size ++;
		
		

		return item;
	}

	@PutMapping("/{id}")
	public ResponseEntity<Jugadores> actulizaItem(@PathVariable long id, @RequestBody Jugadores itemActualizado) {

		Jugadores savedItem = items.get(itemActualizado.getId());

		if (savedItem != null) {

			items.put(id, itemActualizado);

			return new ResponseEntity<>(itemActualizado, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<Jugadores> getItem(@PathVariable long id) {

		Jugadores savedItem = items.get(id);

		if (savedItem != null) {
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Jugadores> borraItem(@PathVariable long id) {

		Jugadores savedItem = items.get(id);

		if (savedItem != null) {
			items.remove(savedItem.getId());
			return new ResponseEntity<>(savedItem, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
