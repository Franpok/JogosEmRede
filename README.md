<p align="center">
  <img width="300" src="https://github.com/Franpok/JogosEmRede/blob/master/RACE%2051%20v1.0/resources/LOGO.png">
</p>
<p align="center">
  <img width="460" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/Logo Grupo B.png">
</p>

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
###### 5.2.1 Arte
###### 5.2.2 Música
###### 5.2.3 Programación y gameplay
###### 5.2.4 Interfaz
###### 5.2.5 Capturas de pantalla
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
- **Niveles:** el juego consistirá de un solo nivel que los jugadores irán avanzando de izquierda a derecha hasta el infinito. El terreno será un páramo desierto para dar el ambiente de que nos encontramos a las afueras del Área 51.
- **Intensidad:** la dificultad del juego será exponencial, empezando con pocos obstáculos que serán fácil de esquivar, los cuales irán aumentando con el tiempo.

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
  <img width="500" src="https://github.com/Franpok/JogosEmRede/blob/master/PRESENTACIONES%202.0/diagrama%20flujo%20op2.png">
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
