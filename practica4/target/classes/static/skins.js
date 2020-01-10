class skins extends Phaser.Scene {
    constructor() {
        super("selectorSkins");
    }
    preload(){
        this.load.image("back", "resources/back.png")
        this.load.image("selec", "resources/seleccionpj.png")
        this.load.image("fondo", "resources/fondoMenu.png")
        this.load.image("fondoSkins", "resources/fondoskins.png")
        this.load.spritesheet('skin1pulsada', "resources/alien.png", { frameWidth: 56, frameHeight: 100 });
        this.load.spritesheet('skin2pulsada', "resources/alien2.png", { frameWidth: 56, frameHeight: 100 });
        this.load.spritesheet('skin3pulsada', "resources/alien3.png", { frameWidth: 56, frameHeight: 100 });
        this.load.spritesheet('skin4pulsada', "resources/alien4.png", { frameWidth: 56, frameHeight: 100 });
        this.load.image("nombre1", "resources/alien1nombre.png")
        this.load.image("nombre1P", "resources/alien1nombrePulsado.png")
        this.load.image("nombre2", "resources/alien2nombre.png")
        this.load.image("nombre2P", "resources/alien2nombrePulsado.png")
        this.load.image("nombre3", "resources/alien3nombre.png")
        this.load.image("nombre3P", "resources/alien3nombrePulsado.png")
        this.load.image("nombre4", "resources/alien4nombre.png")
        this.load.image("nombre4P", "resources/alien4nombrePulsado.png")
        this.load.audio("sound", ["resources/MusicaMenu.mp3"]);
    }
    create(){
        var fondo = this.add.image(540,360,'fondo');
        var seleccionPJ = this.add.image(520,360,'selec').setScale(1.3);
        var nombreA= this.add.image(200, 500, 'nombre1').setScale(.5)
        var nombreB= this.add.image(400, 500, 'nombre2').setScale(.5)
        var nombreC= this.add.image(600, 500, 'nombre3').setScale(.5)
        var nombreD= this.add.image(800, 500, 'nombre4').setScale(.5)
        let sonido = this.sound.add("sound");
        sonido.loop = true;
        sonido.play();
        //Skin 1
        this.aspecto = this.physics.add.sprite(200, 400, 'alien1', 0);
        
        this.anims.create({
            key: 'skin1corriendo',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('skin1pulsada', { start: 0, end: 7 }),
            repeat: -1
        });
        //Skin 2
        this.aspecto2 = this.physics.add.sprite(400, 400, 'alien2', 0);
        
        this.anims.create({
            key: 'skin2corriendo',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('skin2pulsada', { start: 0, end: 7 }),
            repeat: -1
        });

        //Skin 3
        this.aspecto3 = this.physics.add.sprite(600, 400, 'alien3', 0);
        
        this.anims.create({
            key: 'skin3corriendo',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('skin3pulsada', { start: 0, end: 7 }),
            repeat: -1
        });

        //Skin 4
        this.aspecto4 = this.physics.add.sprite(800, 400, 'alien4', 0);
        
        this.anims.create({
            key: 'skin4corriendo',
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('skin4pulsada', { start: 0, end: 7 }),
            repeat: -1
        });
        //Se añade un fondo para pasar el cursor por encima
        var fondoskins = this.add.image(200,400, 'fondoSkins');
        fondoskins.alpha = 0.00000001;
        var fondoskins2 = this.add.image(400,400, 'fondoSkins');
        fondoskins2.alpha = 0.00000001;
        var fondoskins3 = this.add.image(600,400, 'fondoSkins');
        fondoskins3.alpha = 0.00000001;
        var fondoskins4 = this.add.image(800,400, 'fondoSkins');
        fondoskins4.alpha = 0.00000001;
        //Para que aparezca parado la animación al principio
        this.aspecto.anims.play('skin1corriendo')
        this.aspecto2.anims.play('skin2corriendo')
        this.aspecto.anims.stop('skin1corriendo');
        this.aspecto2.anims.stop('skin2corriendo');
        this.aspecto3.anims.play('skin3corriendo')
        this.aspecto3.anims.stop('skin3corriendo');
        this.aspecto4.anims.play('skin4corriendo')
        this.aspecto4.anims.stop('skin4corriendo');

        this.clickButtonSkin1 = fondoskins
         .setInteractive()
         .on('pointerover', () =>this.add.image(200,500,'nombre1P').setScale(.5))
         .on('pointerout', () =>this.add.image(200,500,'nombre1').setScale(.5))
         .on('pointerover', () => this.aspecto.anims.play('skin1corriendo')) //Al pasar por encima el ratón, la animación empieza
         .on('pointerout', () => this.aspecto.anims.stop('skin1corriendo')) //Al sacar el cursor, para
         .on('pointerdown', () =>  this.scene.start("conexion"))
         .on('pointerdown', () => skinChosen= 0) //Si haces click, se elige
         .on('pointerdown', () => J1_skin= 0) //Si haces click, se elige
         .on('pointerdown', () => crearJugador()) //Si haces click, se elige
         .on('pointerdown', () =>  sonido.stop())

         this.clickButtonSkin2 = fondoskins2
         .setInteractive()
         .on('pointerover', () => this.aspecto2.anims.play('skin2corriendo'))
         .on('pointerover', () =>this.add.image(400,500,'nombre2P').setScale(.5))
         .on('pointerout', () =>this.add.image(400,500,'nombre2').setScale(.5))
         .on('pointerout', () => this.aspecto2.anims.stop('skin2corriendo'))
         .on('pointerdown', () =>  this.scene.start("conexion"))
         .on('pointerdown', () => skinChosen= 1)
         .on('pointerdown', () => J1_skin= 1) //Si haces click, se elige
         .on('pointerdown', () => crearJugador()) //Si haces click, se elige
         .on('pointerdown', () =>  sonido.stop());
         
         this.clickButtonSkin3 = fondoskins3
         .setInteractive()
         .on('pointerover', () => this.aspecto3.anims.play('skin3corriendo'))
         .on('pointerover', () =>this.add.image(600,500,'nombre3P').setScale(.5))
         .on('pointerout', () =>this.add.image(600,500,'nombre3').setScale(.5))
         .on('pointerout', () => this.aspecto3.anims.stop('skin3corriendo'))
         .on('pointerdown', () =>  this.scene.start("conexion"))
         .on('pointerdown', () => skinChosen= 2)
         .on('pointerdown', () => J1_skin= 2) //Si haces click, se elige
         .on('pointerdown', () => crearJugador()) //Si haces click, se elige
         .on('pointerdown', () =>  sonido.stop());
         
         this.clickButtonSkin4 = fondoskins4
         .setInteractive()
         .on('pointerover', () => this.aspecto4.anims.play('skin4corriendo'))
         .on('pointerover', () =>this.add.image(800,500,'nombre4P').setScale(.5))
         .on('pointerout', () =>this.add.image(800,500,'nombre4').setScale(.5))
         .on('pointerout', () => this.aspecto4.anims.stop('skin4corriendo'))
         .on('pointerdown', () =>  this.scene.start("conexion"))
         .on('pointerdown', () => skinChosen= 3)
         .on('pointerdown', () => J1_skin= 3) //Si haces click, se elige
         .on('pointerdown', () => crearJugador()) //Si haces click, se elige
         .on('pointerdown', () =>  sonido.stop());

        /*this.clickButton = this.add.image(550, 650, 'jugar' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("conexion"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(550, 650, 'jugarP'  ).setScale(0.5))
         .on('pointerout', () => this.add.image(550, 650, 'jugar' ).setScale(0.5) );
         this.clickButton.setScale(0.5);*/
    }
    
}