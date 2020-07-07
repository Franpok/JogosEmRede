<p align="center">
  <img width="300" src="https://github.com/Franpok/JogosEmRede/blob/master/RACE%2051%20v1.0/resources/LOGO.png">
</p>
<p align="center">
  <img width="460" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/Logo Grupo B.png">
</p>
Video de Youtube de Race 51 con WebSockets (Extraordinaria)
https://youtu.be/6iGJyzSa6Wg

# Índice
## 1. Introducción
####  1.1 Concepto del juego
####  1.2 Características principales
####  1.3 Género
####  1.4 Propósito y público objetivo
####  1.5 Jugabilidad
####  1.6 Estilo visual
####  1.7 Alcance
####  1.8 Juegos en los que nos inspiramos
## 2. Mecánicas del juego
#### 2.1 Jugabilidad
#### 2.2 Flujo de juego
#### 2.3 Condición de victoria
#### 2.4 Personajes
###### 2.4.1 Alienígena
###### 2.4.2 Blob
###### 2.4.3 Robosaurio
###### 2.4.4 Sirena
#### 2.5 Movimiento y físicas
###### 2.5.1 Interacción entre elementos
###### 2.5.2 Controles
## 3. Estilo visual
## 4. Interfaz
#### 4.1 Diagrama de flujo
#### 4.2 Pantalla de inicio
#### 4.3 Menú principal
#### 4.4 Selección de personajes
#### 4.5 Juego
#### 4.6 Puntuaciones
#### 4.7 Tutorial
## 5. Actualizaciones
#### 5.1 v1.0 (Fase 2)
###### 5.1.1 Arte
###### 5.1.2 Música
###### 5.1.3 Programación y gameplay
###### 5.1.4 Interfaz
###### 5.1.5 Capturas de pantalla
#### 5.2 v1.0 (Fase 3)
###### 5.2.1 Arte
###### 5.2.2 Música
###### 5.2.3 Programación y gameplay
###### 5.2.4 Interfaz
###### 5.2.5 Capturas de pantalla
#### 5.3 v1.0 (Fase 4)
###### 5.3.1 Arte
###### 5.3.2 Programación y gameplay
###### 5.3.3 Interfaz
###### 5.3.4 Capturas de pantalla
#### 5.4 v1.0 (Fase 5)
###### 5.4.1 Beta Testing
###### 5.4.2 Mejoras Finales
###### 5.4.3 Subida a plataformas online
## 6. Aspectos en el tintero
#### 6.1 Fase 2 (Race 51 v1.0)

# 1. Introducción
Este es el documento de diseño de Race 51. El videojuego para PC que cumple todos los requisitos pedidos en la asignatura Juegos en Red. Este documento tiene como objetivo principal detallar y explicar los elementos de Race 51.

##### 1.1 Concepto del juego
Race 51 es un videojuego donde nuestro personaje compite con otros jugadores por ser el que logre exitosamente huir del Área 51. Durante su escapada, se encontrarán con múltiples obstáculos en su camino y como solo puede ganar uno, todos se pelearan durante la carrera por la victoria.

##### 1.2 Características principales
El juego se basa en los siguientes conceptos:
- **Alta relevancia:** Aprovechamos la tracción y fama que tuvo el evento de asaltar el Área 51 y centramos la temática de nuestro juego en ese suceso, disminuyendo nuestro trabajo y obteniendo ventaja respecto otros juegos similares.
- **Carrera por vidas:** Para prevenir que un mal movimiento pueda acabar con el progreso del jugador, cada uno de ellos contará con 3 vidas, para que así los jugadores tengan oportunidades de solventar sus errores sin costarles la partida.
- **Circuitos generados:** A diferencia de otros juegos que tienen distintos circuitos que pueden llegar a ser predecibles y repetitivos, nosotros ofrecemos dinamismo a este concepto mediante la generación aleatoria del circuito, consiguiendo que cada carrera tenga ese frescor y novedad como si fuera la primera vez que se recorre el circuito. Esto y la aleatoriedad que conlleva jugar con otros jugadores proporcionará que por muchas carreras que se hagan, nunca serán una igual a la otra.


#### 1.3 Género
El género de nuestro juego es una mezcla entre un juego de plataformas y de carreras:
- **De carreras:** Los jugadores compiten entre sí por ser el último jugador en la carrera y para ello tienen a su disposición power-ups e habilidades que le ayudarán conseguir este objetivo.
- **De plataformas:** Durante la carrera los jugadores tendrán que sortear numerosos obstáculos, ya sea saltando, agachándose o esquivandolo mediante habilidades o power-ups. 

#### 1.4 Propósito y público objetivo
El principal propósito de Race 51 es crear un juego simple y entretenido cumpliendo los requisitos de la asignatura de Juegos en Red, aparte de que sea un proyecto que nos entusiasme a los miembros del grupo.

El público objetivo sería los jugadores casual, ya que es un juego para pasar el tiempo y divertirte en esos ratos muertos que hay durante el día. En concreto, va dirigido para aquellos que saben sobre el evento del área 51 que suelen ser, por lo general, jóvenes y adolescentes.

#### 1.5 Jugabilidad
Cada carrera de Race 51 ofrece un nivel autogenerado donde los jugadores con su amplio arsenal corren por la victoria. Durante la carrera nos encontraremos con los siguientes elementos:
- **Habilidades:** Cada jugador (o mejor dicho, cada personaje) contará con una habilidad única (que se recogen en los power-ups) que proporcionará una gran ventaja al jugador o desventaja al resto de jugadores, aumentando las posibilidades de ganar.
- **Power-ups:** Durante la carrera, aparecerán power-ups que contendrán distintos objetos para ayudar al jugador durante la carrera (serán descritos más adelantes en la parte de mecánicas).
- **Obstáculos:** A medida que vaya transcurriendo la carrera, los jugadores tendrán que sortear distintos obstáculos que se irán generando durante el trayecto. Cuanto más dure la carrera, más difícil será esquivar estos obstáculos.

#### 1.6 Estilo visual
El estilo visual cartoon simple, para que sea amigable al público casual. Los colores vivos y las texturas proporcionarán una experiencia divertida que encajaría muy bien con la temática del Área 51. 

#### 1.7 Alcance
El objetivo principal es desarrollar un juego en el que cualquiera pueda conectarse y divertirse que a su vez sea simple. En un futuro podría implementarse más contenido dependiendo del estado del proyecto.

#### 1.8 Juegos en los que nos inspiramos
Nuestra principal inspiración es el juego de Google Chrome cuando no tenemos conexión a Internet.


# 2. Mecánicas
En esta sección de nuestro GDD vamos a tratar uno de los temas fundamentales en la creación de este juego: las mecánicas. Explicaremos:

#### 2.1 Jugabilidad
Nuestro juego consiste de un solo nivel generado infinitamente. En él, nuestros jugadores tendrán que ir esquivando los obstáculos que irán apareciendo en su camino. Básicamente, lo que se llama un "Endless Runner". Ganará el jugador que quede en pie más tiempo.
Además de correr por la pista, los personajes podrán saltar para esquivar las trampas que surjan en el camino de forma aleatoria. Para ayudarles, aparecerán power-ups con vidas extra o un doble salto para agilizar la movilidad del jugador.
Elegimos una jugabilidad sencilla pero a su vez adictiva cuando juegas contra otra persona, ya que la mayoría de "minijuegos" en red se basan en este dogma: mecánicas sencillas pero atrayentes.

#### 2.2 Flujo de juego
Lo primero que se encuentra el jugador al iniciar el juego es la pantalla de inicio. Aquí, podemos elegir hacer un tutorial que nos explique las mecánicas básicas del juego. Este consiste en un pequeño track no infinito, al contrario que el resto del juego, con el personaje del alien. Al terminar este tutorial, podremos acceder a la selección de personajes del juego en sí, o volver al menú principal. En la pantalla de selección de personajes podremos elegir a uno de los cuatro personajes jugables de los que dispone nuestro juego: alien, blob, robosaurio y sirena.

Después de escoger a uno, empieza realmente el juego. El jugador se encontrará en la pista de salida, junto al resto de jugadores. La carrera da comienzo.

#### 2.3 Condición de victoria
La condición de victoria es bastante simple. El último participante que acabe en pie, gana.

#### 2.4 Personajes
Todos los personajes cuentan con los mismo stats base, para que empezar con uno u otro sea justo. Para variar la jugabilidad, cada uno contará con un “power-up” distintivo.

###### 2.4.1 Alienígena
Ser de otro planeta con el que experimentaban dentro del Área 51 y su único entretenimiento era ver anime. Físicamente es un ser humanoide bípedo y verde con una bandana de Naruto en la frente. Su modo de correr se asemeja a la que se usa en dicha serie (que es su favorita).

**Habilidad:** el alienigena se clona a sí mismo, lo que le otorga una vida extra que durará veinte segundos.

###### 2.4.2 Blob
Criatura nacida de los experimentos con fluidos por parte del ejército estadounidense. Físicamente se puede describir como una especie de pulpo pequeño adorable. Su cuerpo está formado de líquido medio cuajado (esencial para que no se derrame mientras ande) al estilo de una gelatina. Avanzará arrastrando sus patas por el camino, y dejando a su paso un rastro de babas.

**Habilidad:** lanza su pringue al resto de las pistas, lo que complicará el avance del resto de los jugadores durante unos segundos.

###### 2.4.3 Robosaurio
Robot fabricado por los mejores ingenieros del país como arma de destrucción masiva. Este está inspirado en un T-Rex y físicamente se asemeja a  los “AT-ST” de “Star Wars”. Avanza a pasos agigantados, tal y como lo haría un dinosaurio de dicha envergadura.

**Habilidad:** lanza aceite al resto de los jugadores, haciendo que el resto de jugadores no puedan ver bien su pantalla durante cierto tiempo.

###### 2.4.4 Sirena
Criatura mitológica capturada de los mares nórdicos con el fin de investigación antropológica. Físicamente es una sirena sanguinaria con garras afiladas y un aspecto amenazador. Avanza arrastrando la cola y deslizándose. 

**Habilidad:** se envuelve en una burbuja, volviéndose invencible durante unos segundos.

#### 2.5 Movimiento y físicas

###### 2.5.1 Interacción entre elementos
Race 51 se desarrolla en un plano por el que los personajes se mueven solos horizontalmente de izquierda a derecha. Por el terreno aparecerán obstáculos que el jugador deberá sortear y, además, puntos que el jugador usará para realizar sus power-ups.
Los jugadores interaccionarán entre sí, a través de ciertos power-ups de algunos personajes que serán de ayuda para el usuario, pero muy molestos para sus contrincantes.

###### 2.5.2 Controles
- **Movimiento:** el personaje se moverá sólo
- **Salto:** se saltará usando la barra espaciadora
- **Uso de power-up:** se podrán usar las habilidades especiales con Shift.

# 3. Estilo visual
La inspiración para la estética del juego es el área 51, de manera que utilizaremos diseños de personajes alienígenas, fondos desérticos con rejas y multitud de señales, suelos de hormigón y un aspecto general de base militar.

*Race 51* tendrá un estilo visual muy sencillo y estilizado. Todos los gráficos se implementarán mediante sprites 2D de estilo cartoon, con un delineado básico y sin sombras.

Para el estilo artístico, nos inspiramos en juegos como Untitled Goose Game y Super Paper Mario, que comparten aspectos similares a los que queremos incorporar.
<p align="left">
  <img width="300" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/Ejemplo%20Untitled%20Goose%20Game.jpg">
  <img width="300" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/Ejemplo%20Paper%20Mario.jpg">
</p>
La interfaz se compondrá exclusivamente por iconos con aspecto de señales, intentando emular las señales de peligro y de prohibición de entrada del área 51.

# 4. Interfaz
En esta sección se detallarán las pantallas que componen Race 51, las transiciones entre ellas, y la utilidad de todos los elementos de la interfaz de usuario.

#### 4.1 Diagrama de flujo
El siguiente diagrama de estados muestra las pantallas presentes a lo largo de Race 51 así como las transiciones entre ellas. Más adelante nos centraremos en cada una individualmente.
<p align="left">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/diagramaflujo.png">
</p>

#### 4.2 Pantalla de inicio
<p align="left">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/inicio.png">
</p>
La pantalla de inicio es sencilla y se compone únicamente del logo del juego y un botón *Empezar*, sobre un fondo que será el mismo para todos los menús. Hacer click en el botón *Empezar* enviará al usuario directamente al menú principal.

#### 4.3 Menú principal
<p align="left">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/menu%20principal.png">
</p>
Lista y descripción de los componentes:
- **Botón *Jugar*:** envía al usuario a la pantalla de selección de personajes.
- **Botón *Tutorial*:** envía al usuario a un nivel específico de tutorial.
- **Botón *Salir*:** al pulsarlo salimos del juego.
Esta pantalla tendrá el  mismo fondo que la pantalla de inicio y será como una continuación de esta.

#### 4.4 Selección de personajes
<p align="left">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/seleccion%20pj%201.png">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/seleccion%20pj%202.png">
</p>
En esta pantalla se presentarán 4 botones para que cada uno de los jugadores conectados seleccione uno de los cuatro personajes jugables. Una vez el usuario haya seleccionado su personaje, aparecerá en pantalla un botón “Listo” para confirmar la selección. Se enviará a todos los personajes a la pantalla de juego  una vez todos hayan pulsado dicho botón.

#### 4.5 Juego
<p align="left">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/juego.png">
</p>
Lista y descripción de los componentes:
- 4 tracks sobre los cuales los personajes se moverán.
- Trampas repartidas aleatoriamente sobre los 4 tracks que los jugadores deberán ir esquivando.
- Sprites de corazones en la esquina superior derecha para representar cuántas vidas le quedan al jugador.
- Contador en la esquina superior derecha para representar el tiempo que lleva la partida.

#### 4.6 Puntuaciones
<p align="left">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/puntuaciones.png">
</p>
En esta pantalla se mostrarán cuatro rectángulos en los que se mostrará la puntuación de cada uno de los personajes y, según ésta, cómo han quedado respecto al resto de jugadores. También se incluirá un botón *Salir* o *Volver*, que al pulsarse devolverá al jugador al menú principal, así como un botón *Jugar de nuevo* que devolverá a la pantalla de selección de personajes.

#### 4.7 Tutorial
<p align="left">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/tutorial.png">
</p>
Se tratará de un nivel local de un jugador, en el que se controla a un personaje por defecto, y se muestran por pantalla 3 señales que indican los controles (*Saltar* con *w* o la flecha hacia arriba; *Agacharse* con *s* o la flecha hacia abajo; y *Power-Up* con la tecla Shift).

# 5. Actualizaciones

#### 5.1 v1.0 (Fase 2)
En esta fase hemos asentado las bases de nuestro juego, "Race 51". Hemos utilizado Phaser3, además, SourceTree para el manejo de versiones. Hemos testeado el juego para comprobar un bug que se nos remarcó en la presentación y hemos comprobado que no existe. El bug era que si pisabamos 2 trampas que se generaban consecutivas se perdía una vida, no 2. Hemos demostrado que no es así, ya que se pierden las 2 vidas.

###### 5.1.1 Arte
Hemos partido de 0 para crear nuestros assets, ya que todos han sido creados por nuestro artista principal. Incluimos personajes, trampas, escenarios, botones, etc.

###### 5.1.2 Música
La música y los efectos sonoros son "royalty-free", los cuales han sido obtenidos de la página we: https://freesound.org

###### 5.1.3 Programación y gameplay
El principal esqueleto de nuestro juego lo hemos obtenido de: https://www.emanueleferonato.com.
El juego crea una serie de plataformas que se van reciclando una vez salen de escena y se mueven hacia el personaje, creando la ilusión de movimiento del personaje cuando, en realidad, quienes se mueven son las plataformas.
Encima de las plataformas hemos creado trampas, que se generan de forma totalmente aleatoria. Esta característica debe ser retocada ya que la aleatoriedad a veces hace que no haya plataformas en un gran espacio de tiempo o haya 2 seguidas imposibles de saltar.
También, disponemos de un power-up que nos aumentará la vida en 1 al tocarlo.

###### 5.1.4 Interfaz
La pantalla de inicio contará con un botón para jugar e ir directamente al juego, un botón para ver los créditos del proyecto y una imagen que nos explicará los controles del juego.
El juego tiene un menú de pausa el cual nos invita a volver a la pantalla principal del juego o seguir jugando, la elección está en el jugador. 
También, dependiendo de quien gane, nos llevará a una pantalla donde te indica el ganador del juego, con un botón para volver al menú principal.

###### 5.1.5 Capturas de pantalla
A continuación, hemos incluido capturas de pantalla del juego, para poder apreciar el progreso entre fases:

**Menú principal**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/pantallaInicio.png">
</p>

**Juego**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/pantallaJuego.png">
</p>

**Menú de pausa**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/pantallaPausa.png">
</p>

**Gana J1 o J2**
<p align="center">
  <img width="400" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/pantallaJ1Gana.png">
  <img width="400" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/pantallaJ2Gana.png">
</p>

**Créditos**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/pantallaCreditos.png">
</p>


#### 5.2 v1.0 (Fase 3)
En esta fase hemos implementado una ApiRest básica que permite no solo crear una conexión en local cliente servidor sino que aparte tenemos 4 peticiones (Get,Post,Put y Delete) que usamos principalmente para manejar los jugadores conectados simultáneamente en el servidor. Así podemos ver cuantos jugadores hay conectados en todo momento. Aparte hemos corregido ciertos fallos mencionados en nuestra anterior fase.

###### 5.2.1 Arte
Hemos unificado todo el texto a español, cambiamos aquellas palabras y botones que estaban en mayúsculas por minúsculas, corregidas las faltas de ortografía, cambiar el color de algunos textos(que se encontraban en rojo y era muy agresivo para el jugador) y añadido nuevos assets como nuevos botones, texto e imágenes.

###### 5.2.2 Música
Hemos corregido el fallo de música que se producía al activar el menu pausa y elegir la opción de regresar al menú.

###### 5.2.3 Programación y gameplay
En cuanto a cosas del juego no hemos tocado nada ya que en esta fase no se requería modificar el juego y tampoco hemos tenido tiempo para añadir funcionalidades nuevas o contenido extra. Sin embargo, hemos añadido nuevas escenas para la gestión de conexión de jugadores y obviamente un nuevo js que gestiona por parte del cliente todas las peticiones ajax al servidor. En spring tool suite, hemos desarrollado la clase y su correspondiente controlador para gestionar las peticiones del cliente y devolverle información relacionada con la conexión de los jugadores.

###### 5.2.4 Interfaz
Para la interfaz hemos hecho una nueva escena que mientras se conecta el jugador insertando su nombre le da una ambientación de hacker infiltrándose en un sitio confidencial. Aparte hemos añadido en el menú un botón pequeñito para desconectarse.

###### 5.2.5 Capturas de pantalla

**Pantalla de conexión**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/conexionPrac3.jpeg">
</p>

**Menú actualizado con desconexión**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/menuPrac3.jpeg">
</p>

**Controles actualizados**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/controlesPrac3.jpeg">
</p>

**Menú de pausa actualizado**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/pausaPrac3.jpeg">
</p>

#### 5.3 v1.0 (Fase 4)
En esta fase hemos modificado e implementado nuestro juego para que pudiese ser jugado por dos jugadores mediante WebSockets en distintos ordenadores. De esta forma, al ejecutar el servidor con Spring y usando la dirección IP localhost (o una IP donde los ordenadores esten conectados por red LAN) varios jugadores se pueden conectar entre sí para poder jugar.

###### 5.3.1 Programación
La parte fundamental de esta fase ha sido la programación. La base del servidor se puede encontrar en el Handler, que según los mensajes que envian los clientes, va calculando y realizando operaciones como notificar a otros jugadores, modificar datos y gestionar la creación y eliminación de partidas. Para facilitar todo este cálculo, disponemos de dos ficheros auxiliares que representan dos clases, una clase jugador (que almacena su id, la skin, su sesion Websocket...) y una clase Partida (almacena su estado actual, los jugadores que la componen...). Gracias a estas clases, la programación se ve severamente reducida al tratarlos como objetos con propiedades y atributos. Obviamente, para que el Handler funcione, necesitamos un sitio en el cliente para que procese el envio y la llegada de mensajes. Es por ello que existe un fichero llamado "conexion", que maneja cualquier mensaje que recibe del servidor y envia mensajes a este cuando desea comunicar algo al otro jugador de la partida o si decide borrar la partida o su personaje.


Entrando en detalle, primero hablaremos sobre el cliente. El html guarda unas variables globales con valores por defecto, que luego serán utiles para modificarlas para reflejar cambios del servidor. El proceso comienza cuando el jugador elige una skin, donde se envia una petición al servidor para crear un jugador. Tras ello, el jugador entra directamente a buscar partida, enviandole al servidor otro mensaje. Cuando el servidor procese y de la señal de que la partida esta completa, el jugador entra en la escena del juego. Durante el juego, el jugador 1 siempre estará abajo de la pantalla y el jugador 2 siempre estará arriba. El jugador , gracias a que ha reconocido su skin, sabrá en que carril esta en todo momento. Tras ello, cada vez que el jugador de un cliente haga una acción significativa (saltar, coger un powerup, spawnear una trampa...), le enviara un mensaje al servidor para que avise a el otro jugador y este actualice en su cliente los parámetros necesarios para reflejar el cambio del cliente original. Una vez transcurrida la partida, el primer jugador en morir será el perdedor, por lo que si el jugador 1 pierde, se mostrará en la victoria final la victoria del jugador 2. Cuando se finaliza el juego, automaticamente se borra la partida y el jugador en cuestión, para permitir que otros jugadores puedan comenzar a jugar sin problema ninguno.

En cuanto al servidor, el handler almacena en una lista concurrente las partidas y los jugadores. En primer lugar, se inicializan estas listas a jugadores vacios y partidas vacias, que se iran rellenando a medida que jugadores envian petición para jugar. Todo esto se maneja gracias a que tenemos un parámetro llamado "idFuncion", gracias a el y un switch case, podemos recibir los mensajes del cliente y determinar que es lo que pide hacer. Los métodos como generarPowerup, saltar o recibir daño, son simplemente metodos donde comprobamos el jugador que lo envia y le enviamos la señal al otro jugador de la partida. Al borrar una partida o jugador, rellenamos la posición de ese jugador/partida por una partida/jugador vacio, volviendo al estado original al inicializarse. Antes usabamos un hashmap para asociar el id a la partida, pero si hacemos coincidir el id de las partidas o jugadores con el indice de la lista, podemos ahorrarnos el HashMap.

Una vez que el server procesa el mensaje y se lo envia al cliente, para reflejar el cambio del otro cliente en el update tenemos variables booleanas que al cumplir que son true, ejecutan el código necesario para reflejar la petición del otro cliente. Dentro de ese mismo codigo, volvemos a poner la variable en false para que solo se ejecute una vez y no en varias llamadas del update. Así, conseguimos que el codigo solo se haga cada vez que lo pida el otro cliente.

###### 5.3.2 Capturas de pantalla 

Al ser el juego el mismo, no se pueden ver cambios sustanciales, aun así subire una captura de dos navegadores jugando a la vez para reflejar el juego online. También hemos actualizado el video en youtube y pondremos el enlace al principio del readme y aquí para mejor contexto.

<p align="center">
  <img width="460" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/capturaFase4.jpeg">
</p>

Video de youtube demostrando los cambios : https://youtu.be/6iGJyzSa6Wg

#### 5.4 v1.0 (Fase 5)
El desarrollo de la última fase se ha realizado a la vez que la fase 4, habiéndonos dividido el trabajo para aminorar la carga de trabajo de cada integrante. Esta fase se divide en tres principales funciones: beta testing, implementación de mejoras y subida del juego a plataformas de juegos.
 
###### 5.4.1 Beta Testing
Para hacer beta testing, hemos probado a jugar el juego bastantes veces para así detectar errores que se puedan generar durante el juego, además de tener en cuenta todos los errores señalados al entregar otras fases. 
Hemos detectado varios tipos de errores: visuales, de gameplay y respecto a la música. 
- Errores de música: Teníamos errores en la continuidad/descontinuidad de la música de fondo en los menús y el juego, creándose, a veces, bucles infinitos donde la música no paraba. Además había una falta de efectos sonoros en el juego, no habiendo ninguna alerta sonora cuando el jugador interactuaba con los elementos del juego.
- Errores visuales: Mezclabamos idiomas, usabamos colores asociados a la agresividad como el "rojo", pequeños fallos ortográficos, uso excesivo de mayúsculas, falta de efectos visuales cuando el personaje interactúa con los objetos a su alrededor, UI ilegible y falta de información sobre la finalidad del juego. Además, se puede hacer aburrido jugar con el mismo personaje una y otra vez.
- Errores de gameplay: El final del juego es demasiado brusco, por lo que no se ve bien lo que pasa al acabar, la jugabilidad llega a hacerse monótona, ya que solo tenemos un obstáculo y un power-up, errores con colisiones.

###### 5.4.2 Mejoras Finales
En esta parte recae la mayor parte de la carga de trabajo de esta fase, en arreglar (o intentarlo al menos) todos los fallos encontrados durante el Beta Testing.
- Errores de música: Gracias a una variable booleana auxiliar hemos conseguido hacer que la música funcione a la perfección, parando cuando debe parar y continuando cuando le toca únicamente. También hemos añadido efectos de sonido a la muerte del alienígena, cuando se hace daño chocándose con los obstáculos y cuando obtiene un power-up.
- Errores visuales: Todos los errores de idioma, mayúsculas y colores han sido arreglados. Ahora usamos colores como el azul o el amarillo, menos agresivos, combinamos mayúsculas y minúsculas y todo nuestro texto está en español. También disponemos de una UI mejorada del juego (sigue siendo simple) haciendo que se puedan distinguir y leer las vidas de los jugadores y el tiempo. Además hemos añadido unos indicadores encima del alien que se activan cuando: obtiene una vida, pierde una vida y cuando tiene la capacidad de hacer doble salto. Ahora, si te diriges al menú de controles también se dará información sobre la finalidad del juego y las nuevas mejoras visuales. Para terminar, ahora disponemos de 3 aspectos de personaje más y una sala donde podrás escoger el aspecto que quieras.
- Errores de gameplay: Hemos cambiado el final del juego, haciendo que ahora espere unos 3 segundos después de que muera el primer jugador, pudiendo así ver perfectamente quién ha perdido y quién ha ganado. Hemos arreglado los errores con colisiones con algunos obstáculos en los que parecía que se perdía 1 vida en vez de 2 al colisionar con 2 obstáculos juntos. Con respecto a la jugabilidad, hemos implementado un nuevo power-up que no llegamos a implementar con anterioridad, el doble salto. Ahora tendrás un 50% de posibilidad de conseguir doble salto y otro 50% de obtener una vida extra.
- Mejoras extra: hemos mejorado también aspectos señalados de la fase 1. Así, hemos actualizado la descripción de la jugabilidad y el diagrama de flujo (4.1)
- Mejoras no implementadas / a futuro: Ha habido algunos cambios que queríamos implementar que hemos tenido que dejar en el tintero por falta de tiempo o conocimiento. Dentro de estos se encuentra la función de agacharse, que trae consigo un nuevo obstáculo, el dron. Tampoco hemos podido implementar todos los personajes del primer concept del juego (aunque para compensar hemos creado varios aspectos del alienígena) 
- Capturas de las mejoras:

**Explicación de la finalidad del juego**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/Fase5_01.png">
</p>

**Selector de aspecto**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/Fase5_02.png">
</p>

**Nueva UI y efectos**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/Fase5_03.png">
</p>

**Ahora espera después de morir un jugador**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/Fase5_05.png">
</p>


###### 5.4.3 Subida a plataformas online
Hemos subido el juego a 4 plataformas de videojuegos online diferentes (una por cada integrante del grupo), siendo estas:

- Itch.io : https://franpok.itch.io/race51
- Newgrounds: https://www.newgrounds.com/projects/games/1410902/preview
- Kongregate: https://www.kongregate.com/games/Franpok/race-51
- Gamejolt: https://gamejolt.com/games/Race51/461626

**Juego en Itch.io**
<p align="center">
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/Fase5_04.png">
</p>

# 6. Aspectos en el tintero

#### 6.1 Fase 2 (Race51 v1.0)
Durante la presentación de clase, surgieron una serie de detalles a mejorar proporcionados por los profesores y que intentaremos solucionar para antes de la entrega de la siguiente fase. Además, nosotros también queremos introducir nuevos elementos a nuestro juego. En los siguientes apartados enumeraremos estos:

###### 6.1.2 A mejorar de las críticas
- Cambiar las mayúsculas de los botones por mayúsculas y minúsculas.
- Cambiar el idioma de todos los textos a español para que el idioma sea consistente.
- Cambiar cómo se muestran las vidas, de texto a sprites.
- SFX para las muertes y los powerups.
- Faltas de ortografía corregidas (sí del pause).
- Escena propia para los controles.
- Cambiar el color rojo de los textos a uno menos agresivo.
- Hacer el juego más complejo en mecánicas.
- Solucionar bug de música y dobles pinchos.

###### 6.1.3 A mejorar propio
- SFX propio.
- Añadir más sprites.
- Selección de personaje.
- Tutorial Room.
- Mejorar spawn trampas.
- Más powerups.
- Mejorar el sonido de la pausa.
- Error menú de pausa y vidas
