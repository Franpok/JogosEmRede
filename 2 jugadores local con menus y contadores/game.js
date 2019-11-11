let game;

// global game options
let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [0, 0],
    platformSizeRange: [150, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    powerupProbabilidad: 10,
    obstaculoProbabilidad: 30,
    powerupProbabilidad2: 10,
    obstaculoProbabilidad2: 30,
    jumps: 1, // He creado un power up de doble salto, así que me creo una variable que me permita controlar el número de saltos que puedo hacer
    duracion : 150, //Una variable duración que me permita controlar el tiempo 
    vidas1: 3,
    vidas2: 3
}

window.onload = function () {

    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1080,
        height: 720,
        scene: [menu,creditos,muerto,playGame,salir,muerto2],
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

var vidaP1;
var vidaP2;
var vidaTextP1;
var vidaTextP2;
var tiempo;
var tiempoText;
//var vache =0;
//playGame scene
class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload() {
        this.load.image("platform", "resources/platform.png");
        this.load.image("player", "resources/player.png");
        this.load.image("powerup", "resources/star.png",); //La imagen preliminar del powerup es la estrella del phaser
        this.load.image("obstaculo", "resources/bomb.png",); //La imagen preliminar del obstaculo es la bomba del phaser
        this.load.image("playerAgachado", "resources/player_agachado.png",); //La imagen preliminar del obstaculo es la bomba del phaser
        this.load.audio("fondo", ["resources/MusicaJuego.mp3"]);
    }
    

    create() {
        vidaP1 = 3;
        vidaP2 = 3;
        tiempo = 0;
        var sonido = this.sound.add("fondo");
        sonido.loop = true;
        sonido.play();
        // group with all active platforms.
        this.platformGroup = this.add.group({

            // once a platform is removed, it's added to the pool
            removeCallback: function (platform) {
                platform.scene.platformPool.add(platform)
            }
        });

        // pool
        this.platformPool = this.add.group({

            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function (platform) {
                platform.scene.platformGroup.add(platform)
            }
        });
        
        //Similar a como se crea una plataforma, creo mi grupo y su correspondiente piscina 
       this.powerupGroup = this.add.group({
 
            // Cuando coja un power-up, lo añado a la piscina
            removeCallback: function(powerup){
                powerup.scene.powerupPool.add(powerup)
            }
        });
 
        // Powerup pool
        this.powerupPool = this.add.group({
 
            // Cuando se elimina de la piscina, lo activo en mi grupo
            removeCallback: function(powerup){
                powerup.scene.powerupGroup.add(powerup)
            }
        });

         // Creo un grupo de obstaculos activos
         this.obstaculoGroup = this.add.group({
 
            // Cuando se elimina un obstaculo, se envia a mi recolector de obstaculos
            removeCallback: function(obstaculo){
                obstaculo.scene.obstaculoPool.add(obstaculo)
            }
        });
 
        // Creo un recolector de obstaculos
        this.obstaculoPool = this.add.group({
 
            // Cuando se llama a la piscina de obstaculos, se elimina y se mete en el grupo activo
            removeCallback: function(obstaculo){
                obstaculo.scene.obstaculoGroup.add(obstaculo)
            }
        });

        // number of consecutive jumps made by the player
        this.playerJumps = 0;
       
        
        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(game.config.width, game.config.width / 2);

        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.74, "player");
        this.player.setGravityY(gameOptions.playerGravity);

        // adding the player2;
        this.player2 = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.34, "player");
        this.player2.setGravityY(gameOptions.playerGravity);

        //Mi jugador ha muerto?
        var dying = false;
        var dying2 = false;
       
        //Mi jugador tiene power-up, necesito un boolean basicamente
       var tengoPowerup = false;
       var tengoPowerup2 = false;
        
        // setting collisions between the player and the platform group
        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function(){}, null, this);
        
        this.platformCollider2 = this.physics.add.collider(this.player2, this.platformGroup, function(){}, null, this);

        //COLISION JUGADOR POWERUP 
        this.physics.add.overlap(this.player, this.powerupGroup, function(player, powerup){
            this.tengoPowerup == true,//Activo mi boolean para más adelante activar doble salto (En teoria debería ser this.tengoPowerup pero me da error no se porque)
               
            this.tweens.add({
                targets: powerup,
                y: powerup.y - 100, 
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut", //Esto por ahora esta comentado
                callbackScope: this,
                onComplete: function(){
                    this.powerupGroup.killAndHide(powerup);
                    this.powerupGroup.remove(powerup);
                }
            });
 
        }, null, this);

        //COLISION JUGADOR2 POWERUP
        this.physics.add.overlap(this.player2, this.powerupGroup, function(player2, powerup){
            this.tengoPowerup == true,//Activo mi boolean para más adelante activar doble salto (En teoria debería ser this.tengoPowerup pero me da error no se porque)
               
            this.tweens.add({
                targets: powerup,
                y: powerup.y - 100, 
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut", //Esto por ahora esta comentado
                callbackScope: this,
                onComplete: function(){
                    this.powerupGroup.killAndHide(powerup);
                    this.powerupGroup.remove(powerup);
                }
            });
 
        }, null, this);

        // COLISION JUGADOR OBSTACULO
        this.physics.add.overlap(this.player, this.obstaculoGroup, function(player, obstaculo){
            if (gameOptions.vidas1>1){
                gameOptions.vidas1--;
                vidaP1--;
                this.obstaculoGroup.killAndHide(obstaculo);
                this.obstaculoGroup.remove(obstaculo);
                vidaTextP1.setText("Vidas J1: " + vidaP1);
                //console.log("He perdido una vida");
                //this.obstaculoPool.add(obstaculo);
            }else{
            //console.log("He muerto");
            //fondo.stop();
            this.dying = true;
            //this.player.anims.stop();
            //this.player.setFrame(2);
            this.player.visible=false;
            
            this.player.body.setVelocityY(-200);
            this.physics.world.removeCollider(this.platformCollider);
            }
        }, null, this);

        
        // COLISION JUGADOR2 OBSTACULO
        this.physics.add.overlap(this.player2, this.obstaculoGroup, function(player2, obstaculo){
            if (gameOptions.vidas2>1){
                gameOptions.vidas2--;
                vidaP2--;
                this.obstaculoGroup.killAndHide(obstaculo);
                this.obstaculoGroup.remove(obstaculo);
              
                vidaTextP2.setText("Vidas J2: " + vidaP2);
                //console.log("He perdido una vida");
                //this.obstaculoPool.add(obstaculo);
            } else {
            //console.log("He muerto");
            //fondo.stop();
            this.dying2 = true;
            //this.player.anims.stop();
            //this.player.setFrame(2);
            this.player.visible=false;
            
            this.player2.body.setVelocityY(-200);
            this.physics.world.removeCollider(this.platformCollider2);
            }
        }, null, this);


        // checking for input
        this.input.keyboard.on('keydown_W', this.jump, this);
        this.input.keyboard.on('keydown_UP', this.jump2, this);
        this.input.keyboard.on('keydown_DOWN', this.agachar, this);
        this.input.keyboard.on('keydown_S', this.agachar, this);
        this.input.keyboard.on('keyup_DOWN', this.sinAgachar, this);
        this.input.keyboard.on('keyup_S', this.sinAgachar, this);
        this.input.keyboard.on('keydown_P', this.pause, this);
        
        vidaTextP1 = this.add.text(25, 330, "Vidas J1: 3", {fontFamily: 'Arial', fontSize: "32px", fill: "#fff"});
        vidaTextP2 = this.add.text(25, 20, "Vidas J2: 3", {fontFamily: 'Arial', fontSize: "32PX", fill: "#fff"});

        tiempoText = this.add.text(850, 20, "Tiempo: 0",{fontFamily: 'Arial', fontSize: "32px", fill: "#fff"});

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
    }

    pause(){
            this.scene.launch("salir");
            this.scene.pause();  
    }
    
 ///////////////////////////////////////////////////////////////////// CREACIÓN DE PLATAFORMAS, OBSTACULOS... ///////////////////////////////////////////////   
    addPlatform(platformWidth, posX) {
        let platform;
        let platform2;
        if(this.dying){

        }else{
        if (this.platformPool.getLength()) {
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);   
        }else {
            platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }

        platform.displayWidth = platformWidth;
        //platform2.displayWidth = platformWidth;
        
            this.nextPlatformDistance = 0;
            
        if(Phaser.Math.Between(1, 100) <= gameOptions.powerupProbabilidad){
            if(this.powerupPool.getLength()){
                let powerup = this.powerupPool.getFirst();
                powerup.x = posX;
                powerup.y = game.config.height * 0.7;
                powerup.alpha = 1;
                powerup.active = true;
                powerup.visible = true;
                this.powerupPool.remove(powerup);
            }
            else{
                let powerup = this.physics.add.sprite(posX, game.config.height * 0.7, "powerup");
                powerup.setImmovable(true);
                powerup.setVelocityX(platform.body.velocity.x);
                powerup.setDepth(2);
                this.powerupGroup.add(powerup);
            }
        }
    
            // AQUI DECIDO SI VOY A SPAWNEAR UN OBSTACULO O NO EN UNA PLATAFORMA DEL JUGADOR 1
            if(Phaser.Math.Between(1, 100) <= gameOptions.obstaculoProbabilidad){
                if(this.obstaculoPool.getLength()){
                    let obstaculo = this.obstaculoPool.getFirst();
                    obstaculo.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    obstaculo.y = game.config.height * 0.75;
                    obstaculo.alpha = 1;
                    obstaculo.active = true;
                    obstaculo.visible = true;
                    this.obstaculoPool.remove(obstaculo);
                }
                else{
                    let obstaculo = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), game.config.height * 0.75, "obstaculo");
                    obstaculo.setImmovable(true);
                    obstaculo.setVelocityX(platform.body.velocity.x);
                    obstaculo.setSize(8, 2, true);
                    //fire.anims.play("burn");
                    obstaculo.setDepth(2);
                    this.obstaculoGroup.add(obstaculo);
                }
            }
        }   
            if(this.dying2){

            }else{
            
                if (this.platformPool.getLength()) {
                    platform2 = this.platformPool.getFirst();
                    platform2.x = posX;
                    platform2.active = true;
                    platform2.visible = true;
                    this.platformPool.remove(platform2);
            
                }else{
                    
                    platform2 = this.physics.add.sprite(posX, game.config.height * 0.4, "platform");
                    platform2.setImmovable(true);
                    platform2.setVelocityX(gameOptions.platformStartSpeed * -1);
                    this.platformGroup.add(platform2);
                }
                //platform.displayWidth = platformWidth;
                platform2.displayWidth = platformWidth;
                this.nextPlatformDistance = 0;

                // AQUI DECIDO SI VOY A SPAWNEAR UN POWER UP O NO EN UNA PLATAFORMA DEL JUGADOR 2
                if(Phaser.Math.Between(1, 100) <= gameOptions.powerupProbabilidad2){
                if(this.powerupPool.getLength()){
                let powerup = this.powerupPool.getFirst();
                powerup.x = posX;
                powerup.y = game.config.height * 0.3;
                powerup.alpha = 1;
                powerup.active = true;
                powerup.visible = true;
                this.powerupPool.remove(powerup);
                }
                else{
                let powerup = this.physics.add.sprite(posX, game.config.height * 0.3, "powerup");
                powerup.setImmovable(true);
                powerup.setVelocityX(platform.body.velocity.x);
                powerup.setDepth(2);
                this.powerupGroup.add(powerup);
            }
        }
            


         // AQUI DECIDO SI VOY A SPAWNEAR UN OBSTACULO O NO EN UNA PLATAFORMA DEL JUGADOR 2
         if(Phaser.Math.Between(1, 100) <= gameOptions.obstaculoProbabilidad2){
            if(this.obstaculoPool.getLength()){
                let obstaculo = this.obstaculoPool.getFirst();
                obstaculo.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                obstaculo.y = game.config.height * 0.35;
                obstaculo.alpha = 1;
                obstaculo.active = true;
                obstaculo.visible = true;
                this.obstaculoPool.remove(obstaculo);
            }
            else{
                let obstaculo = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), game.config.height * 0.35, "obstaculo");
                obstaculo.setImmovable(true);
                obstaculo.setVelocityX(platform2.body.velocity.x);
                obstaculo.setSize(8, 2, true)
                //fire.anims.play("burn");
                obstaculo.setDepth(2);
                this.obstaculoGroup.add(obstaculo);
            }
        }
    }
        
}   

    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    jump() {
        if ((!this.dying)&&(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))) {
            if (this.player.body.touching.down) {
                this.playerJumps = 0;
            }
            if (this.tengoPowerup){
                gameOptions.jumps = 2,
                gameOptions.duracion = 150
            }
            if(gameOptions.duracion == 0){
                this.tengoPowerup == false
            }

            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps++;
        }
    }

    jump2() {
        if ((!this.dying2)&&(this.player2.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))) {
            if (this.player2.body.touching.down) {
                this.playerJumps = 0;
            }
            if (this.tengoPowerup){
                gameOptions.jumps = 2,
                gameOptions.duracion = 10
            }
            if(gameOptions.duracion == 0){
                this.tengoPowerup == false
            }

            this.player2.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps++;
        }
    }

    agachar(){
        if(!this.dying && this.player.body.touching.down){
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

    sinAgachar(){
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
    update() {

        // game over
        if (this.dying == true ) {
            this.scene.start("PlayGame");
            gameOptions.vidas1 = 3;
            gameOptions.vidas2 = 3;
            this.dying= false;
            this.dying2= false;
            
            //console.log (gameOptions.vidas);
            this.scene.start("menuMuerte");
            
        }
        if(this.dying2==true) {
            this.scene.start("PlayGame");
            gameOptions.vidas1 = 3;
            gameOptions.vidas2 = 3;
            this.dying= false;
            this.dying2= false;
            
            console.log (gameOptions.vidas);
            this.scene.start("menuMuerte2");
        }
        this.player.x = gameOptions.playerStartPosition;
        this.player2.x = gameOptions.playerStartPosition;

        // RECICLO MIS POWERUPS EN EL UPDATE
        this.powerupGroup.getChildren().forEach(function(powerup){
            if(powerup.x < - powerup.displayWidth / 2){
                this.powerupGroup.killAndHide(powerup);
                this.powerupGroup.remove(powerup);
            }
        }, this);

         // Reciclo mis obstaculos
         this.obstaculoGroup.getChildren().forEach(function(obstaculo){
            if(obstaculo.x < - obstaculo.displayWidth / 2){
                this.obstaculoGroup.killAndHide(obstaculo);
                this.obstaculoGroup.remove(obstaculo);
            }
        }, this);

        // recycling platforms
        let minDistance = game.config.width;
        this.platformGroup.getChildren().forEach(function (platform) {
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            minDistance = Math.min(minDistance, platformDistance);
            if (platform.x < - platform.displayWidth / 2) {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        // adding new platforms
        if (minDistance > this.nextPlatformDistance) {
            var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2);
        }

        
    }
};

function resize() {
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    /*if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowHeight / gameRatio) + "px";
    }
    else {*/
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    /*}*/
}
