function jugadoresConectados(/*callback*/) {
    $.ajax({
        url: 'http://localhost:8080/jugadores'
    }).done(function (jugadores) {
        console.log('Numero: ' + JSON.stringify(jugadores));
        //callback(jugadores);
    })
}

//Create item in server
function añadirJugador(item /*callback*/) {
    $.ajax({
        method: "POST",
        url: 'http://localhost:8080/jugadores',
        data: JSON.stringify(item),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (jugadores) {
        console.log("Número creado: " + JSON.stringify(jugadores));
        //callback(item);
    })
}

$(document).ready(function () {

    jugadoresConectados(function (items) {
        //When items are loaded from server
        console.log("HE entrado XD")
    });
    
    var item = 69;
        
    var hola = true;

    añadirJugador(item, function (itemWithId) {
        //When item with id is returned from server
       // showItem(itemWithId);
    });
})