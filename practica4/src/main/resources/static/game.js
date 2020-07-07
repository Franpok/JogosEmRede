let game;

// global game options
let gameOptions = {
    platformStartSpeed: 350,            //Velocidad de las plataformas
    spawnRange: [0, 0],                 //Controla la distancia entre una plataforma y la siguiente
    platformSizeRange: [150, 250],      //Tamaño de las plataformas (el ancho)
    playerGravity: 900,                 //Gravedad
    jumpForce: 400,                     //Velocidad en y del jugador cuando salta
    playerStartPosition: 200,           //Posición donde comienza el jugador
    powerupProbabilidad: 20,            //Probabilidad powerUp(Jugador 1)
    obstaculoProbabilidad: 90,          //Probabilidad de aparición de obstáculos del jugador 1
    powerupProbabilidad2: 20,           //Probabilidad powerUp(Jugador 2)
    obstaculoProbabilidad2: 0,         //Probabilidad de aparición de obstáculos del jugador 2
    jumps: 1,                           // He creado un power up de doble salto, así que me creo una variable que me permita controlar el número de saltos que puedo hacer
    vidas1: 3,                          //Vidas jugador 1
    vidas2: 20                           //Vidas jugador 2
}

window.onload = function () {

    // OPCIONES DE CONFIGURACIÓN
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1080,
        height: 720,
        scene: [menu, creditos, muerto, playGame, salir, muerto2, controles, skins, primera],
        backgroundColor: 0x444444,

        // physics settings
        physics: {
            default: "arcade"
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

/////////// OTRAS VARIABLES DEL JUEGO ////////////////
var jumping1 = false;
var jumping2 = false;

// VAR WEB
var WEB_Salto = false;
var WEB_generarPowerup = false;
var WEB_generarObstaculo = false;
var WEB_Daño = false;
var WEB_cogerPowerup = false;


let sonido;
let dano;
let salto;
let powerUP_sound;
let death_sound;
let pause_sound;
var vidaTextP1;
var myNewPos;
var myNewWidth;
var myNewSpeed;
var vidaTextP2;
var tiempo;
var tiempoText;
var vidaAnt1 = 3;
var vidaAnt2 = 3;
var timedEvent;
var porfavorquelamusicasueneunavez; //variable auxiliar para verificar que la musica acabe cuando el juego acabe
var decidirPowerUp; //variable para decidir qué poewr-up se va a recibir
var saltos1; //numero de saltos maximos que puede hacer el jugador 1
var saltos2;//numero de saltos maximos que puede hacer el jugador 2
var duracion1; //duración del doble salto del jugador 1
var duracion2;//duración del doble salto del jugador 2
var indicadorD; //variable que detecta si se ha colisionado con obstaculo del jugador 1
var indicadorD2;//variable que detecta si se ha colisionado con obstaculo del jugador 2
var indicadorV; //variable que detecta si se acaba de sumar una vida al jugador 1
var indicadorV2;//variable que detecta si se acaba de sumar una vida al jugador 2
var imagenD; //imagen que se le va a asignar al jugador 1 al colisionar con un obstaculo
var imagenD2;//imagen que se le va a asignar al jugador 2 al colisionar con un obstaculo
var imagenDobleSalto;//imagen que se le va a asignar al jugador 1 al tener doble salto
var imagenDobleSalto2;//imagen que se le va a asignar al jugador 2 al tener doble salto
var imagenV;//imagen que se le va a asignar al jugador 1 al recibir una vida extra
var imagenV2;//imagen que se le va a asignar al jugador 2 al recibir una vida extra
var randomF;
var auxP; //auxiliar que se manda para el random del powerup al server
var auxPP;
class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload() {
        //****************************NUESTRA FUNCIÓN PRELOAD, CARGAMOS NUESTROS RECURSOS********************************************* 
        this.load.image("sky", "resources/sky.png");
        this.load.image("platform", "resources/platform.png");
        this.load.image("player", "resources/player.png");
        this.load.image("layout", "resources/layout1.png");
        this.load.image("track", "resources/track.png");
        this.load.spritesheet('alien', "resources/alien.png", { frameWidth: 56, frameHeight: 100 });
        this.load.spritesheet('alien2', "resources/alien2.png", { frameWidth: 56, frameHeight: 100 });
        this.load.spritesheet('alien3', "resources/alien3.png", { frameWidth: 56, frameHeight: 100 });
        this.load.spritesheet('alien4', "resources/alien4.png", { frameWidth: 56, frameHeight: 100 });
        this.load.image("powerup", "resources/powerUp.png");
        this.load.image("obstaculo", "resources/pinchos.png");
        this.load.audio("fondo", ["resources/MusicaJuego.mp3"]);
        this.load.audio("daño", ["resources/Alien.mp3"]);
        this.load.audio("jump", ["resources/Jump.mp3"]);
        this.load.audio("powerUp", ["resources/Sonido_PowerUp.wav"]);
        this.load.audio("deathSound", ["resources/Death.wav"]);
        this.load.audio("sonidoPausa", ["resources/SonidoPausa.wav"]);
        this.load.image("back", "resources/back.png")
        this.load.image("estasmuertachacha", "resources/j1ganaALT.png")
        this.load.image("indicadorDamage", "resources/indicadorDamage.png")
        this.load.image("indicadorDobleSalto", "resources/indicadorDobleSalto.png")
        this.load.image("indicadorVida", "resources/indicadorVida.png")  
        
        //************************************************* FIN FUNCTION PRELOAD ********************************************************
    }
    
    create() {
    
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++ Comienza la función Create +++++++++++++++++++++++++++++++++++++++++++++++++++
        duracion1=0;
        duracion2=0;
        saltos1 = 1;
        saltos2 = 1;
        indicadorD =0;
        porfavorquelamusicasueneunavez=0;
        tiempo = 0;
        sonido = this.sound.add("fondo");
        dano = this.sound.add("daño");
        salto = this.sound.add("jump");
        powerUP_sound = this.sound.add("powerUp");
        death_sound = this.sound.add("deathSound");
        pause_sound = this.sound.add("sonidoPausa");
        imagenD = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.6, 'indicadorDamage');
        imagenD2 = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.2, 'indicadorDamage');
        imagenDobleSalto = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.55, 'indicadorDobleSalto');
        imagenDobleSalto2 = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.15, 'indicadorDobleSalto');
        imagenV = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.6, 'indicadorVida');
        imagenV2 = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.2, 'indicadorVida');
        sonido.loop = true;
        dano.loop = false;
        salto.loop = false;
        sonido.mute = true;
        sonido.play();
        
        
        
        // Imagen de fondo
        this.add.image(540, 360, 'sky');
        this.add.image(540, game.config.height * 0.8, 'track');
        this.add.image(540, game.config.height * 0.4, 'track')
        
        
        //************************************************ CREACIÓN, GESTIÓN Y REUSO DE NUESTROS RECURSOS ********************************************
        
        
        
        // Creamos un recolector de todos nuestros objetos del tipo plataforma que se encuentren activos en la escena
        this.platformGroup = this.add.group({

            // Cuando la plataforma se haya destruido (es decir, se sale del canvas), la enviamos a nuestro recolector de objetos inactivos del tipo plataformas
            removeCallback: function (platform) {
                platform.scene.platformPool.add(platform)
            }
        });

        // Creamos un recolector para las plataformas inactivas
        this.platformPool = this.add.group({

            // Para evitar crear y destruir infinitas plataformas, si se necesita pintar o crear una nueva plataforma en escena, y tenemos libre alguna plataforma que ya haya salido en escena, podemos reutilizarla.
            removeCallback: function (platform) {
                platform.scene.platformGroup.add(platform)
            }
        });

        //La generación de powerups y obstáculos tienen el mismo concepto, por lo tanto su generación es similar y no hace falta comentarlo.

        //Grupo activo powerUps
        this.powerupGroup = this.add.group({

            removeCallback: function (powerup) {
                powerup.scene.powerupPool.add(powerup)
            }
        });

        //Grupo inactivo powerUps
        this.powerupPool = this.add.group({

            removeCallback: function (powerup) {
                powerup.scene.powerupGroup.add(powerup)
            }
        });

        //Grupo activo pinchos
        this.obstaculoGroup = this.add.group({

            removeCallback: function (obstaculo) {
                obstaculo.scene.obstaculoPool.add(obstaculo)
            }
        });

        //Grupo inactivo pinchos
        this.obstaculoPool = this.add.group({

            removeCallback: function (obstaculo) {
                obstaculo.scene.obstaculoGroup.add(obstaculo)
            }
        });


        // **************************************** FIN DE LA ZONA DE GESTIÓN Y CREACIÓN DE RECURSOS ********************************************


        // Saltos que hace mi jugador consecutivos (Para controlar el doble salto)
        this.playerJumps = 0;


        //Añadimos una plataforma al juego (La plataforma inicial) , que tiene una dimensión x e y
        this.addPlatform(game.config.width, game.config.width / 2);
        myNewPos = game.config.width / 2
		myNewWidth = game.config.width
		// ************************************************* CREACIÓN DE JUGADORES ********************************************************
		
        // Creamos al jugador 1
       if(Soy_J1){
        	this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.71, 'alien', 0);
            this.player.setGravityY(gameOptions.playerGravity);
            LocalJ1 = true;
        }else{
        	this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.31, 'alien', 0);
            this.player.setGravityY(gameOptions.playerGravity);
            LocalJ1 = false;
        }
       
        
        // Añadimos su animación
        this.anims.create({ //Skin 1
            key: skinsArray[0],
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 7 }),
            repeat: -1
        });

        this.anims.create({ //Skin 2
            key: skinsArray[1],
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('alien2', { start: 0, end: 7 }),
            repeat: -1
        });
        this.anims.create({ //Skin 3
            key: skinsArray[2],
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('alien3', { start: 0, end: 7 }),
            repeat: -1
        });
        this.anims.create({ //Skin 4
            key: skinsArray[3],
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('alien4', { start: 0, end: 7 }),
            repeat: -1
        });
       
        switch (skinChosen){
            case 0:
                this.player.anims.play(skinsArray[0]);
                break;
            case 1:
                this.player.anims.play(skinsArray[1]);
                break;
            case 2:
                this.player.anims.play(skinsArray[2]);
                break;
            case 3:
                this.player.anims.play(skinsArray[3]);
                break;
        }
        
        // Creamos al jugador 2
       if(Soy_J1){
    	   this.player2 = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.31, 'alien2', 0);
           this.player2.setGravityY(gameOptions.playerGravity);

       }else{
    	   this.player2 = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.71, 'alien2', 0);
           this.player2.setGravityY(gameOptions.playerGravity);

       }
        
        // Añadimos su animación
        
        switch (J2_skin) {
        case 0:
            this.player2.anims.play(skinsArray[0]);
            break;
        case 1:
            this.player2.anims.play(skinsArray[1]);
            break;
        case 2:
            this.player2.anims.play(skinsArray[2]);
            break;
        case 3:
            this.player2.anims.play(skinsArray[3]);
            break;
        }
        
        //Creamos unas variables para saber si el jugador tiene powerup o esta muerto
        var dying = false;
        var dying2 = false;
        var tengoPowerup = false;
        var tengoPowerup2 = false;
        
        
        // ********************************************************** FIN DE LA CREACIÓN DE JUGADORES ***************************************



        // *************************************** COLISIÓN DE JUGADOR CON PLATAFORMAS Y OTROS OBJETOS  ****************************************        


        // Añadimos colisión entre los jugadores y el grupo activo de plataformas
        
        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function () { }, null, this);
        this.platformCollider2 = this.physics.add.collider(this.player2, this.platformGroup, function () { }, null, this);

        
        //La colisión del Jugador 1 con un powerup
        if (LocalJ1){
        this.physics.add.overlap(this.player, this.powerupGroup, function (player, powerup) {
        	
        	
            this.tengoPowerup == true; //Activamos nuestra variable
            decisionPowerup = Phaser.Math.Between(0,1);

            switch(decisionPowerup){
               case 0:
                	J1_CogerPowerup = true;
                	J1_Powerup = 0;
                    if (vidaAnt1 === gameOptions.vidas1) { // Si las vidas anteriores son iguales a las actuales, se añade una más a las actuales
                        gameOptions.vidas1++;
                        jugadorPowerup();
                        J1_Vida++;
                        vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                        indicadorV=3; //duración del aviso
                        imagenV = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.6, 'indicadorVida');// se añade el aviso
                    }; 
                    
                break;

                case 1:
                jugadorPowerup();
                	J1_CogerPowerup = true;
                	J1_Powerup = 1;
                    if(duracion1<0){
                        duracion1 = 5; //duracion del doble salto
                        saltos1 = 2; //ahora tenemos como maximo 2 saltos
                        imagenDobleSalto = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.55, 'indicadorDobleSalto');//se añade el aviso
                    }; 
                break; 
            }
            
            

            //Esta función modifica las propiedades de un objeto ya creado, en este caso es la animación que hace que el powerup desaparezca
            this.tweens.add({
                targets: powerup,
                y: powerup.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function () {
                    this.powerupGroup.killAndHide(powerup);
                    this.powerupGroup.remove(powerup);
                    vidaAnt1 = gameOptions.vidas1;
                }
            });
            powerUP_sound.play();
        }, null, this);
        
        }
       
       
       if(LocalJ1){
       
       this.physics.add.overlap(this.player, this.obstaculoGroup, function (player, obstaculo) {
        	jugadorDaño();
            if (gameOptions.vidas1 > 1) { //Mientras tenga vidas, eliminamos el obstaculo y le descontamos una vida al jugador
                J1_DañoRecibido = true;
            	J1_Vida--;
            	gameOptions.vidas1--;
                vidaAnt1--;
                indicadorD=3; //duracion del aviso
                imagenD = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.6, 'indicadorDamage');//aviso            
                this.obstaculoGroup.killAndHide(obstaculo);
                this.obstaculoGroup.remove(obstaculo);
                vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                dano.play(); //sonido de daño
            } else { // Si ya no tiene vidas, cambia de estado a muerto
                gameOptions.vidas1=0;
                vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                    this.dying = true;
                    J1_Muerto = true;
                    this.player.visible = false;
                    death_sound.play();
                    this.player.body.setVelocityX(-200);
                    this.physics.world.removeCollider(this.platformCollider);
                
            }
        }, null, this);
        
        
    
      }else{
      
      this.physics.add.overlap(this.player, this.obstaculoGroup, function (player, obstaculo) {
        	//jugadorDaño();
            if (gameOptions.vidas2 > 1) { //Mientras tenga vidas, eliminamos el obstaculo y le descontamos una vida al jugador
                J2_DañoRecibido = true;
            	J2_Vida--;
            	gameOptions.vidas2--;
                vidaAnt2--;
                indicadorD=3; //duracion del aviso
                imagenD = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.2, 'indicadorDamage');//aviso            
                this.obstaculoGroup.killAndHide(obstaculo);
                this.obstaculoGroup.remove(obstaculo);
                vidaTextP2.setText("Vidas J2: " + gameOptions.vidas2);
                dano.play(); //sonido de daño
            } else { // Si ya no tiene vidas, cambia de estado a muerto
                gameOptions.vidas2=0;
                vidaTextP2.setText("Vidas J2: " + gameOptions.vidas2);
                    this.dying2 = true;
                    J2_Muerto = true;
                    this.player.visible = false;
                    death_sound.play();
                    this.player.body.setVelocityX(-200);
                    this.physics.world.removeCollider(this.platformCollider);
                    }
        }, null, this);
                    
      }
       
       
     
       
       
        
    


        // ****************************************** FIN COLISION JUGADOR CON PLATAFORMAS Y OTROS OBJETOS ******************************************


		// ************************************************** GESTIÓN DE INPUTS ******************************************************


        // INputs por teclado
        this.input.keyboard.on('keydown_W', this.jump, this);
        //this.input.keyboard.on('keydown_UP', this.jump2, this);
        //this.input.keyboard.on('keydown_P', this.pause, this);


        //Visualización de textos en el juego (UI)
        this.add.image(105,350,'layout').setScale(0.27,0.5); //fondo para las vidas del jugador 1
        this.add.image(105,40,'layout').setScale(0.27,0.5);//fondo para las vidas del jugador 2
        this.add.image(920,40,'layout').setScale(0.3,0.5);//fondo para el tiempo
        vidaTextP1 = this.add.text(25, 330, "Vidas J1: " + gameOptions.vidas1, { fontFamily: 'Arial', fontSize: "32px", fill: "#fff" });
        vidaTextP2 = this.add.text(25, 20, "Vidas J2: " + J2_Vida, { fontFamily: 'Arial', fontSize: "32PX", fill: "#fff" });
        tiempoText = this.add.text(850, 20, "Tiempo: 0", { fontFamily: 'Arial', fontSize: "32px", fill: "#fff" });
        


        //TIEMPO
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

	function saltoJugador2(){
		this.jump2;
	}
	
    }// ++++++++++++++++++++++++++++++++++++++++++++ FIN DE LA FUNCIÓN CREATE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    
    
   
    updateTimer() { //Si con este update no refresca la información lo suficientemente rápido, hay que usar el de phaser
        tiempo++;
        tiempoText.setText("Tiempo: " + tiempo);
        duracion1--;
        duracion2--;
        indicadorD--;
        indicadorD2--;
        indicadorV--;
        indicadorV2--;
       
      
         J1_saltando = false;
         J1_CogerPowerup = false;
         J1_DañoRecibido = false;
         J1_PinchoGenerado = false;
         J1_PowerupGenerado = false;
         
         J2_PowerupGenerado = false;
         J2_saltando = false;
         J2_CogerPowerup = false;
         J2_DañoRecibido = false;
         J2_PinchoGenerado = false;
         
    }

    //MENU DE PAUSA
    pause() {
        pause_sound.play();
        isPaused=true;
        this.scene.launch("salir");
        sonido.mute=true;
        this.scene.pause();
    }

    ///////////////////////////////////////////////////////////////////// CREACIÓN DE PLATAFORMAS, OBSTACULOS... ///////////////////////////////////////////////   


    addPlatform(platformWidth, posX) {
        let platform;
        let platform2;
        if (this.dying) { //Si esta muerto no generamos más

        } else {
            if (this.platformPool.getLength()) { // SI HAY ALGUNA PLATAFORMA INACTIVA, LA COGEMOS
                platform = this.platformPool.getFirst();
                platform.x = posX;
                platform.active = true;
                platform.visible = false;
                this.platformPool.remove(platform);
            } else { //SI NO HAY PLATAFORMAS INACTIVAS, CREAMOS UNA NUEVA
                platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
                platform.visible = false;
                platform.setImmovable(true);
                platform.setVelocityX(gameOptions.platformStartSpeed * -1);
                this.platformGroup.add(platform);
            }

            platform.displayWidth = platformWidth;
            this.nextPlatformDistance = 0;


            if (Phaser.Math.Between(1, 100) <= gameOptions.powerupProbabilidad && Soy_J1) { //AQUI DECIDO SI APARECE UN POWERUP O NO (JUGADOR 1)
            	J1_PowerupGenerado =true;
            	if (this.powerupPool.getLength()) {
                    let powerup = this.powerupPool.getFirst();
                    powerup.x = posX;
                    powerup.y = game.config.height * 0.7;
                    powerup.alpha = 1;
                    powerup.active = true;
                    powerup.visible = true;
                    this.powerupPool.remove(powerup);
                }
                else {
                    let powerup = this.physics.add.sprite(posX, game.config.height * 0.7, "powerup");
                    powerup.setImmovable(true);
                    powerup.setVelocityX(platform.body.velocity.x);
                    console.log(platform.body.velocity.x);
                    powerup.setDepth(2);
                    this.powerupGroup.add(powerup);
                }
                jugadorGenerarPowerup();
            }

            // AQUI DECIDO SI VOY A SPAWNEAR UN OBSTACULO O NO EN UNA PLATAFORMA DEL JUGADOR 1
            if (Phaser.Math.Between(1, 100) <= gameOptions.obstaculoProbabilidad && Soy_J1) {
            	J1_PinchoGenerado = true;
                if (this.obstaculoPool.getLength()) {
                    let obstaculo = this.obstaculoPool.getFirst();
                    J1_randObstaculo = platformWidth / 2 + Phaser.Math.Between(1, platformWidth)
                    obstaculo.x = posX - J1_randObstaculo;
                    obstaculo.y = game.config.height * 0.75;
                    obstaculo.alpha = 1;
                    obstaculo.active = true;
                    obstaculo.visible = true;
                    this.obstaculoPool.remove(obstaculo);
                }
                else {
                J1_randObstaculo = platformWidth / 2 + Phaser.Math.Between(1, platformWidth)
                    let obstaculo = this.physics.add.sprite(posX - J1_randObstaculo, game.config.height * 0.75, "obstaculo");
                    obstaculo.setImmovable(true);
                    obstaculo.setVelocityX(platform.body.velocity.x);
                    obstaculo.setSize(8, 2, true);
                    obstaculo.setDepth(2);
                    this.obstaculoGroup.add(obstaculo);
                }
                jugadorGenerarObstaculo();
            }
        }
        if (J2_Muerto) { //LO ANTERIOR PERO PARA NUESTRO JUGADOR 2

        } else {

            if (this.platformPool.getLength()) {
                platform2 = this.platformPool.getFirst();
                platform2.x = posX;
                platform2.active = true;
                platform2.visible = false;
                this.platformPool.remove(platform2);

            } else {

                platform2 = this.physics.add.sprite(posX, game.config.height * 0.4, "platform");
                platform2.visible = false;
                platform2.setImmovable(true);
                platform2.setVelocityX(gameOptions.platformStartSpeed * -1);
                this.platformGroup.add(platform2);
            }

            platform2.displayWidth = platformWidth;
            this.nextPlatformDistance = 0;

            // AQUI DECIDO SI VOY A SPAWNEAR UN POWER UP O NO EN UNA PLATAFORMA DEL JUGADOR 2
            if (Phaser.Math.Between(1, 100) <= gameOptions.powerupProbabilidad2 && !Soy_J1) {
                if (this.powerupPool.getLength()) {
                    let powerup = this.powerupPool.getFirst();
                    powerup.x = posX;
                    powerup.y = game.config.height * 0.3;
                    powerup.alpha = 1;
                    powerup.active = true;
                    powerup.visible = true;
                    this.powerupPool.remove(powerup);
                }
                else {
                    let powerup = this.physics.add.sprite(posX, game.config.height * 0.3, "powerup");
                    powerup.setImmovable(true);
                    powerup.setVelocityX(platform.body.velocity.x);
                    powerup.setDepth(2);
                    this.powerupGroup.add(powerup);
                }
                jugadorGenerarPowerup();
            }



            // AQUI DECIDO SI VOY A SPAWNEAR UN OBSTACULO O NO EN UNA PLATAFORMA DEL JUGADOR 2
            if (Phaser.Math.Between(1, 100) <= gameOptions.powerupProbabilidad2 && !Soy_J1) {
                if (this.obstaculoPool.getLength()) {
                    let obstaculo = this.obstaculoPool.getFirst();
                    obstaculo.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    obstaculo.y = game.config.height * 0.35;
                    obstaculo.alpha = 1;
                    obstaculo.active = true;
                    obstaculo.visible = true;
                    this.obstaculoPool.remove(obstaculo);
                }
                else {
                    let obstaculo = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), game.config.height * 0.35, "obstaculo");
                    obstaculo.setImmovable(true);
                    obstaculo.setVelocityX(platform2.body.velocity.x);
                    obstaculo.setSize(8, 2, true);
                    obstaculo.setDepth(2);
                    this.obstaculoGroup.add(obstaculo);
                }
 				jugadorGenerarObstaculo();           
            }
        }

    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // NUESTRA FUNCION DE SALTO PARA EL JUGADOR UNO
    jump() {
    	jugadorSalto();
        if ((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < saltos1))) { // SI NO ESTOY MUERTO Y ESTOY TOCANDO EL SUELO o TENGO MAS SALTOS CONSECUTIVOS PUEDO SALTAR
            if (this.player.body.touching.down) {
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps++;
            jumping1 = true;
            this.player.anims.stop();
            salto.play();
            
            
        }
    }
    
   
	
	
    update() { //FUNCION UPDATE
    	 
        //++++++++++++++++++++++++++++++++++++++ PARTE DE LA WEB (CLIENTE HOST) VA AQUI ++++++++++++++++++++++++++++++++++++++++++++++++++++
        if (WEB_Salto){
        	console.log("Buenas tardes");
         // AQUI VA CODIGO
        	console.log("De verdad que quiero saltar");
            if ((!J2_Muerto) && (this.player2.body.touching.down || (this.playerJumps > 0 && this.playerJumps < saltos2))) {
                if (this.player2.body.touching.down) {
                    this.playerJumps = 0;
                }
                this.player2.setVelocityY(gameOptions.jumpForce * -1);
                this.playerJumps++;
                jumping2 = true;
                this.player2.anims.stop();
                salto.play();
            }  
        WEB_Salto = false;
        }
        
        
        
        
        
        if (WEB_Daño){
        console.log("Me he hecho pupita");
     // Colision de el jugador1 con un obstaculo
     	//if (Soy_J1){
        	if (gameOptions.vidas1 > 1) { //Mientras tenga vidas, eliminamos el obstaculo y le descontamos una vida al jugador
            	J1_DañoRecibido = true;
        		J1_Vida--;
        		gameOptions.vidas1--;
            	vidaAnt1--;
            	indicadorD=3; //duracion del aviso
            	imagenD = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.6, 'indicadorDamage');//aviso            
            	vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
            	dano.play(); //sonido de daño
        	} else { // Si ya no tiene vidas, cambia de estado a muerto
            	gameOptions.vidas1=0;
            	vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                this.dying = true;
                J1_Muerto = true;
                this.player2.visible = false;
                death_sound.play();
                this.player2.body.setVelocityX(-200);
                //this.physics.world.removeCollider(this.platformCollider);
         	}
       //  }else{
         	/*if (gameOptions.vidas2 > 1) { //Mientras tenga vidas, eliminamos el obstaculo y le descontamos una vida al jugador
                J2_DañoRecibido = true;
            	J2_Vida--;
            	gameOptions.vidas2--;
                vidaAnt2--;
                indicadorD=3; //duracion del aviso
                imagenD = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.2, 'indicadorDamage');//aviso            
                this.obstaculoGroup.killAndHide(obstaculo);
                this.obstaculoGroup.remove(obstaculo);
                vidaTextP2.setText("Vidas J2: " + gameOptions.vidas2);
                dano.play(); //sonido de daño
            } else { // Si ya no tiene vidas, cambia de estado a muerto
                gameOptions.vidas2=0;
                vidaTextP2.setText("Vidas J2: " + gameOptions.vidas2);
                    this.dying2 = true;
                    J2_Muerto = true;
                    this.player.visible = false;
                    death_sound.play();
                    this.player.body.setVelocityX(-200);
                    this.physics.world.removeCollider(this.platformCollider);
            }*/
         
         	
       // }
       WEB_Daño = false;
      }
        
        
        
        
        
        if (WEB_cogerPowerup){
        console.log("He recibido un powerUP")
        
        switch(WEB_TipoPowerup){
               case 0:
                	J1_CogerPowerup = true;
                	J1_Powerup = 0;
                	var bruh = true;
                	if (bruh){
                		bruh = false;
                   	 // Si las vidas anteriores son iguales a las actuales, se añade una más a las actuales
                        gameOptions.vidas1 = gameOptions.vidas1 + 1;
                        J1_Vida++;
                        vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                        indicadorV=3; //duración del aviso
                        imagenV = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.6, 'indicadorVida');// se añade el aviso
                      }  
            		powerUP_sound.play();
                break;

                case 1:
                	J2_CogerPowerup = true;
                	J2_Powerup = 1;
                    if(duracion2<0){
                        duracion2 = 5; //duracion del doble salto
                        saltos2 = 2; //ahora tenemos como maximo 2 saltos
                        imagenDobleSalto = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.55, 'indicadorDobleSalto');//se añade el aviso
                    }; 
                    
                 
            powerUP_sound.play();
                break; 
                
           }    
         
        WEB_cogerPowerup = false;
        }
        
        
        
        
        
        if (WEB_generarPowerup){
        	console.log("Buenas generaciones de dia");
        
        	if (Soy_J1){
        		if (this.powerupPool.getLength()) {
                    let powerup = this.powerupPool.getFirst();
                    powerup.x = myNewPos;
                    powerup.y = game.config.height * 0.3;
                    powerup.alpha = 1;
                    powerup.active = false;
                    powerup.visible = true;
                    this.powerupPool.remove(powerup);
                }else{
                    let powerup = this.physics.add.sprite(myNewPos, game.config.height * 0.3, "powerup");
                    powerup.setImmovable(true);
                    powerup.setVelocityX(gameOptions.platformStartSpeed * -1);
                    powerup.setDepth(2);
                    powerup.active = false;
                    this.powerupGroup.add(powerup);
				}
			}else{
				if (this.powerupPool.getLength()) {
                    let powerup = this.powerupPool.getFirst();
                    powerup.x = myNewPos;
                    powerup.y = game.config.height * 0.7;
                    powerup.alpha = 1;
                    powerup.active = false;
                    powerup.visible = true;
                    this.powerupPool.remove(powerup);
                }else{
                    let powerup = this.physics.add.sprite(myNewPos, game.config.height * 0.7, "powerup");
                    powerup.setImmovable(true);
                    powerup.setVelocityX(gameOptions.platformStartSpeed * -1);
                    powerup.setDepth(2);
                    powerup.active = false;
                    this.powerupGroup.add(powerup);
        		}
        	}
        	WEB_generarPowerup=false;
        }
        
        
        if (WEB_generarObstaculo){
        console.log("Buenas generaciones de noche");
        if (Soy_J1){
        if (this.obstaculoPool.getLength()) {
            	let obstaculo = this.obstaculoPool.getFirst();
                obstaculo.x = myNewPos - WEB_J1randObstaculo;
                obstaculo.y = game.config.height * 0.35;
                obstaculo.alpha = 1;
                obstaculo.active = false;
                obstaculo.visible = true;
                this.obstaculoPool.remove(obstaculo);
        	}else 
        		{
            	let obstaculo = this.physics.add.sprite(myNewPos - WEB_J1randObstaculo, game.config.height * 0.35, "obstaculo");
                obstaculo.setImmovable(true);
                obstaculo.setVelocityX(gameOptions.platformStartSpeed * -1);
                obstaculo.setSize(8, 2, true);
                obstaculo.setDepth(2);
                obstaculo.active = false;
                this.obstaculoGroup.add(obstaculo);
        	}	
		} 
		else
		{
        	if (this.obstaculoPool.getLength()) {
                    let obstaculo = this.obstaculoPool.getFirst();
                    obstaculo.x = myNewPos - WEB_J2randObstaculo;
                    obstaculo.y = game.config.height * 0.75;
                    obstaculo.alpha = 1;
                    obstaculo.active = false;
                    obstaculo.visible = true;
                    this.obstaculoPool.remove(obstaculo);
                }
                else {
                    let obstaculo = this.physics.add.sprite(myNewPos - WEB_J2randObstaculo, game.config.height * 0.75, "obstaculo");
                    obstaculo.setImmovable(true);
                    obstaculo.setVelocityX(gameOptions.platformStartSpeed * -1);
                    obstaculo.setSize(8, 2, true);
                    obstaculo.setDepth(2);
                    obstaculo.active = false;
                    this.obstaculoGroup.add(obstaculo);
                }
        	}
        WEB_generarObstaculo = false;
        }
        
        
        
        
        if(indicadorD<=0){
            imagenD.visible=false;
        } 
        if(indicadorD2<=0){
            imagenD2.visible=false;
        } 
        if(indicadorV<=0){
            imagenV.visible=false;
        } 
        if(indicadorV2<=0){
            imagenV2.visible=false;
        } 
        if(duracion1<=0){
            imagenDobleSalto.visible=false;
            saltos1=1;
        }
        if(duracion2<=0){
            imagenDobleSalto2.visible=false;
            saltos2=1;
        }
        if((porfavorquelamusicasueneunavez<=0)&&(isPaused==false)){
            sonido.mute = false;
        }
        
        // SI SALTA, PARAMOS LA ANIMACIÓN ( SOLO SIRVE PARA REALISMO VISUAL)
        if (this.player.body.touching.down && jumping1 == true) {
            this.player.anims.play('r1');
            jumping1 = false;
        }

        if (this.player2.body.touching.down && jumping2 == true) {
            this.player2.anims.play('r2');
            jumping2 = false;
        }
		
        // FUNCION GAME OVER (CUANDO MUERE ALGUNO DE LOS JUGADORES)
        function reiniciarJ1(){
            porfavorquelamusicasueneunavez++;
            gameOptions.vidas1 = 3;
            gameOptions.vidas2 = 3;
            vidaAnt1 = 3;
            vidaAnt2 = 3;
            this.dying = false;
            this.dying2 = false;
            sonido.mute = true;
            var J1_saltando = false;
            var J1_CogerPowerup = false;
            var J1_Vida = 3;
            var J1_DañoRecibido = false;
            var J1_Muerto = false;
            var J1_Powerup = 0;
            var J1_PowerupGenerado = false;
            var J1_PinchoGenerado = false;
            var J2_saltando = false;
            var J2_CogerPowerup = false;
            var J2_PowerupGenerado = false;
            var J2_Vida = 3;
            var J2_DañoRecibido = false;
            var J2_Muerto = false;
            var J2_Powerup = 0;
            var J2_PinchoGenerado = false;
            this.scene.start("menuMuerte");
            
        }
        function reiniciarJ2(){
            porfavorquelamusicasueneunavez++;
            gameOptions.vidas1 = 3;
            gameOptions.vidas2 = 3;
            vidaAnt1 = 3;
            vidaAnt2 = 3;
            this.dying = false;
            this.dying2 = false;
            sonido.mute = true;
            var J1_saltando = false;
            var J1_CogerPowerup = false;
            var J1_Vida = 3;
            var J1_DañoRecibido = false;
            var J1_Muerto = false;
            var J1_Powerup = 0;
            var J1_PowerupGenerado = false;
            var J1_PinchoGenerado = false;
            var J2_saltando = false;
            var J2_CogerPowerup = false;
            var J2_PowerupGenerado = false;
            var J2_Vida = 3;
            var J2_DañoRecibido = false;
            var J2_Muerto = false;
            var J2_Powerup = 0;
            var J2_PinchoGenerado = false;
            this.scene.start("menuMuerte2");
            
        }
         
        if (this.dying == true) {
        	J1_Muerto = true;
        	//actualizaJugador();
            timedEvent = this.time.delayedCall(3000, reiniciarJ1, [], this);           
        }
        if (J2_Muerto == true) {
            timedEvent = this.time.delayedCall(3000, reiniciarJ2, [], this);
        }
        this.player.x = gameOptions.playerStartPosition;
        this.player2.x = gameOptions.playerStartPosition;

        // RECICLO MIS POWERUPS EN EL UPDATE
        this.powerupGroup.getChildren().forEach(function (powerup) {
            if (powerup.x < - powerup.displayWidth / 2) {
                this.powerupGroup.killAndHide(powerup);
                this.powerupGroup.remove(powerup);
            }
        }, this);

        // Reciclo mis obstaculos
        this.obstaculoGroup.getChildren().forEach(function (obstaculo) {
            if (obstaculo.x < - obstaculo.displayWidth / 2) {
                this.obstaculoGroup.killAndHide(obstaculo);
                this.obstaculoGroup.remove(obstaculo);
            }
        }, this);

        // RECICLO MIS PLATAFORMAS
        let minDistance = game.config.width;
        this.platformGroup.getChildren().forEach(function (platform) {
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if (platform.x < - platform.displayWidth / 2) {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
      
        // CREACION DE NUEVAS PLATAFORMAS ALEATORIAS (EN TAMAÑO)
        if (minDistance > this.nextPlatformDistance) {
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            myNewWidth = nextPlatformWidth
            myNewPos = game.config.width + nextPlatformWidth / 2
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }

        function jump2() { // PARA EL JUGADOR 2
        	console.log("De verdad que quiero saltar");
            if ((!J2_Muerto) && (this.player2.body.touching.down || (this.playerJumps > 0 && this.playerJumps < saltos2))) {
                if (this.player2.body.touching.down) {
                    this.playerJumps = 0;
                }
                this.player2.setVelocityY(gameOptions.jumpForce * -1);
                this.playerJumps++;
                jumping2 = true;
                this.player2.anims.stop();
                salto.play();
            }
        }
    }
    
}; // WHAT IS THIS? Probablemente phaser

	function saltoJugador(){
			console.log("Voy a saltar");
			
			WEB_Salto = true;
}

function cogerPowerup(){
			console.log("Voy a coger el powerup");
			WEB_cogerPowerup = true;
}

function generarPowerup(){
			console.log("Voy a generar un powerup");
			WEB_generarPowerup = true;
}

function recibirDaño(){
			console.log("Voy a recibir daño");
			WEB_Daño = true;
}

function generarObstaculo(){
			console.log("Voy a generar un obstaculo");
			WEB_generarObstaculo = true;
}

function resize() { //FUNCION RESIZE
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
}
