let game;

// global game options
let gameOptions = {
    platformStartSpeed: 350,
    spawnRange: [0, 0],
    platformSizeRange: [50, 250],
    playerGravity: 900,
    jumpForce: 400,
    playerStartPosition: 200,
    powerupProbabilidad : 50,
    jumps: 1, // He creado un power up de doble salto, así que me creo una variable que me permita controlar el número de saltos que puedo hacer
    duracion : 0 //Una variable duración que me permita controlar el tiempo 
}

window.onload = function () {

    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1080,
        height: 720,
        scene: playGame,
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
var vache =0;
// playGame scene
class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    preload() {
        this.load.image("platform", "resources/platform.png");
        this.load.image("player", "resources/player.png");
        this.load.image("powerup", "resources/star.png",); //La imagen preliminar del powerup es la estrella del phaser
    }
    create() {

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
        // number of consecutive jumps made by the player
        this.playerJumps = 0;

        // adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(game.config.width, game.config.width / 2);

        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height / 2, "player");
        this.player.setGravityY(gameOptions.playerGravity);

        //Mi jugador tiene power-up, necesito un boolean basicamente
       var tengoPowerup = false;
        
        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);

        //COLISION JUGADOR POWERUP (No se si esto esta bien)
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




        // checking for input
        this.input.keyboard.on('keydown_W', this.jump, this);
        this.input.keyboard.on('keydown_UP', this.jump, this);
    }
    
    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(platformWidth, posX) {
        let platform;
        
        if (this.platformPool.getLength()) {
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
            
        }
        else {
            platform = this.physics.add.sprite(posX, game.config.height * 0.8, "platform");
            platform.setImmovable(true);
            platform.setVelocityX(gameOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        if(vache == 5){
            this.nextPlatformDistance = 100;
            vache = 0;
        }else{
            this.nextPlatformDistance = 0;
            vache++;
        }
        // AQUI DECIDO SI VOY A SPAWNEAR UN POWER UP O NO EN UNA PLATAFORMA
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
    }
    

    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    jump() {
        if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)) {
            if (this.player.body.touching.down) {
                this.playerJumps = 0;
            }
            if (this.tengoPowerup){
                gameOptions.jumps = 2,
                gameOptions.duracion = 10
            }
            if(gameOptions.duracion == 0){
                this.tengoPowerup == false
            }

            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps++;
        }
    }

    update() {

        // game over
        if (this.player.y > game.config.height) {
            this.scene.start("PlayGame");
        }
        this.player.x = gameOptions.playerStartPosition;

        // RECICLO MIS POWERUPS EN EL UPDATE
        this.powerupGroup.getChildren().forEach(function(powerup){
            if(powerup.x < - powerup.displayWidth / 2){
                this.powerupGroup.killAndHide(powerup);
                this.powerupGroup.remove(powerup);
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
