let game;

// global game options
let gameOptions = {
    platformStartSpeed: 350,            //Velocidad de las plataformas
    spawnRange: [0, 0],                 //Controla la distancia entre una plataforma y la siguiente
    platformSizeRange: [150, 250],      //Tamaño de las plataformas (el ancho)
    playerGravity: 900,                 //Gravedad
    jumpForce: 400,                     //Velocidad en y del jugador cuando salta
    playerStartPosition: 200,           //Posición donde comienza el jugador
    powerupProbabilidad: 8,            //Probabilidad powerUp(Jugador 1)
    obstaculoProbabilidad: 30,          //Probabilidad de aparición de obstáculos del jugador 1
    powerupProbabilidad2: 8,           //Probabilidad powerUp(Jugador 2)
    obstaculoProbabilidad2: 30,         //Probabilidad de aparición de obstáculos del jugador 2
    jumps: 1,                           // He creado un power up de doble salto, así que me creo una variable que me permita controlar el número de saltos que puedo hacer
                  //Una variable duración que me permita controlar el tiempo 
    vidas1: 3,                          //Vidas jugador 1
    vidas2: 3                           //Vidas jugador 2
}

window.onload = function () {

    // OPCIONES DE CONFIGURACIÓN
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1080,
        height: 720,
        scene: [primera, menu, creditos, muerto, playGame, salir, muerto2, controles, skins],
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
let sonido;
let dano;
let salto;
let powerUP_sound;
let death_sound;
let pause_sound;
var vidaTextP1;
var vidaTextP2;
var tiempo;
var tiempoText;
var vidaAnt1 = 3;
var vidaAnt2 = 3;
var timedEvent;
var porfavorquelamusicasueneunavez;
var decidirPowerUp;
var saltos1;
var saltos2;
var duracion1;
var duracion2;
var layoutVidas1;
var layoutVidas2;
var indicadorD;
var indicadorD2;
var indicadorV;
var indicadorV2;
var imagenD;
var imagenD2;
var imagenDobleSalto;
var imagenDobleSalto2;
var imagenV;
var imagenV2;

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload() {
        //NUESTRA FUNCIÓN PRELOAD, CARGAMOS NUESTROS RECURSOS 
        this.load.image("sky", "resources/sky.png");
        this.load.image("platform", "resources/platform.png");
        this.load.image("player", "resources/player.png");
        this.load.image("layout", "resources/layout1.png");
        this.load.image("track", "resources/track.png");
        this.load.spritesheet('alien', "resources/alien.png", { frameWidth: 56, frameHeight: 100 });
        this.load.spritesheet('alien2', "resources/alien2.png", { frameWidth: 56, frameHeight: 100 });
        this.load.spritesheet('alienDamaged', "resources/alienDano.png", { frameWidth: 111, frameHeight: 100 });
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
       
    }
    
    create() {
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
        ////////////////////////////////////////////////////////// CREACIÓN, GESTIÓN Y REUSO DE NUESTROS RECURSOS ////////////////////////////////////////////////////////////////////////////////

        // CREAMOS UN RECOLECTOR DE TODOS NUESTROS OBJETOS TIPO PLATAFORMAS QUE ESTEN ACTIVOS
        this.platformGroup = this.add.group({

            // CUANDO LA PLATAFORMA SE HAYA DESTRUIDO ( ES DECIR, SE SALGA DEL CANVAS) LA ENVIAMOS A NUESTRO RECOLECTOR DE OBJETOS YA CREADOS INACTIVOS
            removeCallback: function (platform) {
                platform.scene.platformPool.add(platform)
            }
        });

        // CREAMOS NUESTRO RECOLECTOR DE OBJETOS TIPO PLATAFORMAS QUE ESTEN INACTIVOS
        this.platformPool = this.add.group({

            // SI NECESITAMOS UN OBJETO PLATAFORMA Y YA EXISTE UNO INACTIVO, LO COGEMOS Y LO MOVEMOS AL GRUPO ACTIVO
            removeCallback: function (platform) {
                platform.scene.platformGroup.add(platform)
            }
        });

        //PARA LOS POWERUP Y OBSTACULOS USAMOS LA MISMA MANERA DE GENERACIÓN (Por tanto no hace falta comentarlos)

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
    /*
        //Grupo activo drones
        this.dronGroup = this.add.group({

            removeCallback: function (dron) {
                dron.scene.dronPool.add(dron)
            }
        });

        //Grupo inactivo drones
        this.dronPool = this.add.group({

            removeCallback: function (dron) {
                dron.scene.dronGroup.add(dron)
            }
        });
*/

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Saltos que hace mi jugador consecutivos (Para controlar el doble salto)
        this.playerJumps = 0;


        //Añadimos una plataforma al juego (La plataforma inicial) , que tiene una dimensión x e y
        this.addPlatform(game.config.width, game.config.width / 2);

        // CREAMOS AL JUGADOR 1
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.71, 'alien', 0);
        this.player.setGravityY(gameOptions.playerGravity);

        // AÑADIMOS SU ANIMACIÓN
        this.anims.create({
            key: skinsArray[0],
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 7 }),
            repeat: -1
        });

        this.anims.create({
            key: skinsArray[1],
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('alien2', { start: 0, end: 7 }),
            repeat: -1
        });
        this.anims.create({
            key: 'alien1Dano',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('alienDamaged', { start: 0, end: 7 }),
            repeat: -1
        });

        switch (skinChosen){
            case 0:
                this.player.anims.play(skinsArray[0]);
                break;
            case 1:
                this.player.anims.play(skinsArray[1]);
                break;
        }
        
        // CREAMOS AL JUGADOR 2
        this.player2 = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.31, 'alien2', 0);
        this.player2.setGravityY(gameOptions.playerGravity);

        // AÑADIMOS SU ANIMACIÓN
        

        this.player2.anims.play(skinsArray[1]);

        //Creamos unas variables para saber si el jugador tiene powerup o esta muerto
        var dying = false;
        var dying2 = false;
        var tengoPowerup = false;
        var tengoPowerup2 = false;


        ////////////////////////////////////////////////////////////////////////////////// COLISIÓN DE JUGADOR CON PLATAFORMAS Y OTROS OBJETOS ////////////////////////////////////////////////////        


        // Añadimos colision entre los jugadores y el grupo activo de plataformas
        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function () { }, null, this);
        this.platformCollider2 = this.physics.add.collider(this.player2, this.platformGroup, function () { }, null, this);

        
        //COLISIÓN JUGADOR1 CON UN POWERUP
        this.physics.add.overlap(this.player, this.powerupGroup, function (player, powerup) {
            this.tengoPowerup == true; //Activamos nuestra variable
            
            switch(decidirPowerUp){
                case 0:
                    if (vidaAnt1 === gameOptions.vidas1) { // Si las vidas anteriores son iguales a las actuales, se añade una más a las actuales
                        gameOptions.vidas1++;
                        vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                        indicadorV=3;
                        imagenV = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.6, 'indicadorVida');   
                    }; 
                break;

                case 1:
                    if(duracion1<0){
                        duracion1 = 5;
                        saltos1 = 2;
                        imagenDobleSalto = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.55, 'indicadorDobleSalto');
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

        //COLISION JUGADOR2 POWERUP
        this.physics.add.overlap(this.player2, this.powerupGroup, function (player2, powerup) {
            this.tengoPowerup == true;
            switch(decidirPowerUp){
                case 0:
                    if (vidaAnt2 === gameOptions.vidas2) {
                        gameOptions.vidas2++;
                        vidaTextP2.setText("Vidas J2: " + gameOptions.vidas2);
                        indicadorV2=3;
                        imagenV2 = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.2, 'indicadorVida');   
                    };
                break;

                case 1:
                    if(duracion2<0){
                        duracion2 = 5;
                    saltos2 = 2;
                    imagenDobleSalto2 = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.15, 'indicadorDobleSalto');
                    };
                    
                break;   
            }

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
                    vidaAnt2 = gameOptions.vidas2;
                }
            });
            powerUP_sound.play();
        }, null, this);

        // COLISION JUGADOR1 OBSTACULO
        this.physics.add.overlap(this.player, this.obstaculoGroup, function (player, obstaculo) {
            if (gameOptions.vidas1 > 1) { //Mientras tenga vidas, eliminamos el obstaculo y le descontamos una vida al jugador
                gameOptions.vidas1--;
                vidaAnt1--;
                indicadorD=3;
                imagenD = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.6, 'indicadorDamage');               
                this.obstaculoGroup.killAndHide(obstaculo);
                this.obstaculoGroup.remove(obstaculo);
                vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                dano.play();
            } else { // Si ya no tiene vidas, cambia de estado a muerto
                gameOptions.vidas1=0;
                vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                    this.dying = true;
                    this.player.visible = false;
                    death_sound.play();
                    this.player.body.setVelocityX(-200);
                    this.physics.world.removeCollider(this.platformCollider);
                
            }
        }, null, this);
        // COLISION JUGADOR1 DRON
       /* this.physics.add.overlap(this.player, this.dronGroup, function (player, dron) {
            if (gameOptions.vidas1 > 1) { //Mientras tenga vidas, eliminamos el dron y le descontamos una vida al jugador
                gameOptions.vidas1--;
                vidaAnt1--;
                this.dronGroup.killAndHide(dron);
                this.dronGroup.remove(dron);
                vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                dano.play();
            } else { // Si ya no tiene vidas, cambia de estado a muerto
                gameOptions.vidas1=0;
                vidaTextP1.setText("Vidas J1: " + gameOptions.vidas1);
                    this.dying = true;
                    this.player.visible = false;
                    death_sound.play();
                    this.player.body.setVelocityX(-200);
                    this.physics.world.removeCollider(this.platformCollider);
                
            }
        }, null, this);*/

        
        // COLISION JUGADOR2 OBSTACULO
        this.physics.add.overlap(this.player2, this.obstaculoGroup, function (player2, obstaculo) {
            if (gameOptions.vidas2 > 1) {
                gameOptions.vidas2--;
                vidaAnt2--;
                indicadorD2=3;
                imagenD2 = this.add.image(gameOptions.playerStartPosition, game.config.height * 0.2, 'indicadorDamage');
                this.obstaculoGroup.killAndHide(obstaculo);
                this.obstaculoGroup.remove(obstaculo);
                vidaTextP2.setText("Vidas J2: " + gameOptions.vidas2);
                dano.play();
            } else {
                gameOptions.vidas2=0;
                vidaTextP2.setText("Vidas J2: " + gameOptions.vidas2);
                this.dying2 = true;
                this.player2.visible = false;
                death_sound.play();
                this.player2.body.setVelocityX(-200);
                    this.physics.world.removeCollider(this.platformCollider2);
               
            }
        }, null, this);

        // COLISION JUGADOR2 DRON
        /*
        this.physics.add.overlap(this.player2, this.dronGroup, function (player2, dron) {
            if (gameOptions.vidas2 > 1) {
                gameOptions.vidas2--;
                vidaAnt2--;
                this.obstaculoGroup.killAndHide(dron);
                this.obstaculoGroup.remove(dron);
                vidaTextP2.setText("Vidas J2: " + gameOptions.vidas2);
                dano.play();
            } else {
                gameOptions.vidas2=0;
                vidaTextP2.setText("Vidas J2: " + gameOptions.vidas2);
                this.dying2 = true;
                this.player2.visible = false;
                death_sound.play();
                this.player2.body.setVelocityX(-200);
                    this.physics.world.removeCollider(this.platformCollider2);
               
            }
        }, null, this);*/


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // NUESTROS INPUTS POR TECLADO (ACTUALMENTE AGACHAR NO TIENE FUNCIONALIDAD)
        this.input.keyboard.on('keydown_W', this.jump, this);
        this.input.keyboard.on('keydown_UP', this.jump2, this);
        this.input.keyboard.on('keydown_DOWN', this.agachar, this);
        this.input.keyboard.on('keydown_S', this.agachar, this);
        this.input.keyboard.on('keyup_DOWN', this.sinAgachar, this);
        this.input.keyboard.on('keyup_S', this.sinAgachar, this);
        this.input.keyboard.on('keydown_P', this.pause, this);


        //NUESTROS TEXTOS QUE SE VISUALIZAN DURANTE EL JUEGO
        this.add.image(105,350,'layout').setScale(0.27,0.5);
        this.add.image(105,40,'layout').setScale(0.27,0.5);
        this.add.image(920,40,'layout').setScale(0.3,0.5);
        vidaTextP1 = this.add.text(25, 330, "Vidas J1: " + gameOptions.vidas1, { fontFamily: 'Arial', fontSize: "32px", fill: "#fff" });
        vidaTextP2 = this.add.text(25, 20, "Vidas J2: " + gameOptions.vidas2, { fontFamily: 'Arial', fontSize: "32PX", fill: "#fff" });
        tiempoText = this.add.text(850, 20, "Tiempo: 0", { fontFamily: 'Arial', fontSize: "32px", fill: "#fff" });
        


        //TIEMPO
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });


    }

    updateTimer() {
        tiempo++;
        tiempoText.setText("Tiempo: " + tiempo);
        duracion1--;
        duracion2--;
        indicadorD--;
        indicadorD2--;
        indicadorV--;
        indicadorV2--;
        decidirPowerUp = Phaser.Math.Between(0,1);
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


            if (Phaser.Math.Between(1, 100) <= gameOptions.powerupProbabilidad) { //AQUI DECIDO SI APARECE UN POWERUP O NO (JUGADOR 1)
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
                    powerup.setDepth(2);
                    this.powerupGroup.add(powerup);
                }
            }

            // AQUI DECIDO SI VOY A SPAWNEAR UN OBSTACULO O NO EN UNA PLATAFORMA DEL JUGADOR 1
            if (Phaser.Math.Between(1, 100) <= gameOptions.obstaculoProbabilidad) {
                if (this.obstaculoPool.getLength()) {
                    let obstaculo = this.obstaculoPool.getFirst();
                    obstaculo.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    obstaculo.y = game.config.height * 0.75;
                    obstaculo.alpha = 1;
                    obstaculo.active = true;
                    obstaculo.visible = true;
                    this.obstaculoPool.remove(obstaculo);
                }
                else {
                    let obstaculo = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), game.config.height * 0.75, "obstaculo");
                    obstaculo.setImmovable(true);
                    obstaculo.setVelocityX(platform.body.velocity.x);
                    obstaculo.setSize(8, 2, true);
                    obstaculo.setDepth(2);
                    this.obstaculoGroup.add(obstaculo);
                }
            }/*
            if (Phaser.Math.Between(1, 100) <= gameOptions.obstaculoProbabilidad) {
                if (this.dronPool.getLength()) {
                    let dron = this.dronPool.getFirst();
                    dron.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    dron.y = game.config.height * 0.65;
                    dron.alpha = 1;
                    dron.active = true;
                    dron.visible = true;
                    this.obstaculoPool.remove(dron);
                }
                else {
                    let dron = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), game.config.height * 0.65, "obstaculo");
                    dron.setImmovable(true);
                    dron.setVelocityX(platform.body.velocity.x);
                    dron.setSize(8, 2, true);
                    dron.setDepth(2);
                    this.dronGroup.add(dron);
                }
            }*/
        }
        if (this.dying2) { //LO ANTERIOR PERO PARA NUESTRO JUGADOR 2

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
            if (Phaser.Math.Between(1, 100) <= gameOptions.powerupProbabilidad2) {
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
            }



            // AQUI DECIDO SI VOY A SPAWNEAR UN OBSTACULO O NO EN UNA PLATAFORMA DEL JUGADOR 2
            if (Phaser.Math.Between(1, 100) <= gameOptions.obstaculoProbabilidad2) {
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
            }/*
            if (Phaser.Math.Between(1, 100) <= gameOptions.obstaculoProbabilidad2) {
                if (this.dronPool.getLength()) {
                    let dron = this.dronPool.getFirst();
                    dron.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    dron.y = game.config.height * 0.25;
                    dron.alpha = 1;
                    dron.active = true;
                    dron.visible = true;
                    this.dronPool.remove(dron);
                }
                else {
                    let dron = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), game.config.height * 0.25, "obstaculo");
                    dron.setImmovable(true);
                    dron.setVelocityX(platform2.body.velocity.x);
                    dron.setSize(8, 2, true);
                    dron.setDepth(2);
                    this.dronGroup.add(dron);
                }
            }*/
        }

    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // NUESTRA FUNCION DE SALTO PARA EL JUGADOR UNO
    jump() {
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

    jump2() { // PARA EL JUGADOR 2
        if ((!this.dying2) && (this.player2.body.touching.down || (this.playerJumps > 0 && this.playerJumps < saltos2))) {
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

    agachar() { // POR IMPLEMENTAR
        if (!this.dying && this.player.body.touching.down) {
            /*
             this.anims.create({
                 key: 'down',
                 frames: this.anims.generateFrameNumbers('playerAgachado', { start: 0, end: 0 }),
                 frameRate: 10,
                 repeat: -1
             });
             this.player.anims.play("down");*/

        }
    }

    sinAgachar() { // POR IMPLEMENTAR
        //this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height*0.74, "player");
        //this.player.setGravityY(gameOptions.playerGravity);
        // this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function(){}, null, this);
        /*this.anims.create({
         key: 'up',
         frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
         frameRate: 10,
         repeat: -1
     });
     this.player.anims.play("up");*/
    }




    update() { //FUNCION UPDATE

        
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
            this.scene.start("menuMuerte2");
            
        }
        if (this.dying == true) {
            timedEvent = this.time.delayedCall(3000, reiniciarJ1, [], this);           
        }
        if (this.dying2 == true) {
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
        //this.addObstaculo(100);
        // CREACION DE NUEVAS PLATAFORMAS ALEATORIAS (EN TAMAÑO)
        if (minDistance > this.nextPlatformDistance) {
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }

        console.log(skinsArray[skinChosen]);
    }
    
};

function resize() { //FUNCION RESIZE
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
}