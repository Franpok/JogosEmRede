class skins extends Phaser.Scene {
    constructor() {
        super("selectorSkins");
    }
    preload(){
        this.load.image("back", "resources/back.png")
        this.load.image("fondo", "resources/fondoMenu.png")
        this.load.image("skin1", "resources/alienSolo.png")
        this.load.image("skin2", "resources/alien2Solo.png")
        this.load.image("fondoSkins", "resources/fondoskins.png")
        this.load.spritesheet('skin1pulsada', "resources/alien.png", { frameWidth: 56, frameHeight: 100 });
        this.load.spritesheet('skin2pulsada', "resources/alien2.png", { frameWidth: 56, frameHeight: 100 });
        this.load.audio("sound", ["resources/MusicaMenu.mp3"]);
    }
    create(){
        var fondo = this.add.image(540,360,'fondo');
        let sonido = this.sound.add("sound");
        sonido.loop = true;
        sonido.play();

        this.aspecto = this.physics.add.sprite(400, 400, 'alien1', 0);
        
        this.anims.create({
            key: 'skin1corriendo',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('skin1pulsada', { start: 0, end: 7 }),
            repeat: -1
        });

        this.aspecto2 = this.physics.add.sprite(600, 400, 'alien2', 0);
        
        this.anims.create({
            key: 'skin2corriendo',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('skin2pulsada', { start: 0, end: 7 }),
            repeat: -1
        });

        var fondoskins = this.add.image(400,400, 'fondoSkins');
        fondoskins.alpha = 0.3;
        var fondoskins2 = this.add.image(600,400, 'fondoSkins');
        fondoskins2.alpha = 0.3;
        
        this.aspecto.anims.play('skin1corriendo')
        this.aspecto2.anims.play('skin2corriendo')
        this.aspecto.anims.stop('skin1corriendo');
        this.aspecto2.anims.stop('skin2corriendo');

        this.clickButtonSkin1 = fondoskins
         .setInteractive()
         .on('pointerover', () => this.aspecto.anims.play('skin1corriendo'))
         .on('pointerout', () => this.aspecto.anims.stop('skin1corriendo'))
         .on('pointerdown', () => skinChosen= 0);

         this.clickButtonSkin2 = fondoskins2
         .setInteractive()
         .on('pointerover', () => this.aspecto2.anims.play('skin2corriendo'))
         .on('pointerout', () => this.aspecto2.anims.stop('skin2corriendo'))
         .on('pointerdown', () => skinChosen= 1);

        this.clickButton = this.add.image(550, 650, 'jugar' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("PlayGame"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(550, 650, 'jugarP'  ).setScale(0.5))
         .on('pointerout', () => this.add.image(550, 650, 'jugar' ).setScale(0.5) );
         this.clickButton.setScale(0.5);
    }
    
}