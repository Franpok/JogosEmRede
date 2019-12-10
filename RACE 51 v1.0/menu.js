class menu extends Phaser.Scene {
    constructor() {
        super("menuPrincipal");
    }

    preload(){
      this.load.audio("sound", ["resources/MusicaMenu.mp3"]);
      this.load.image("jugar", "resources/jugar.png");
      this.load.image("jugarP", "resources/jugarPulsado.png");
      this.load.image("controles", "resources/bcontroles.png");
      this.load.image("controlesP", "resources/bcontrolesPulsado.png");
      this.load.image("creditos", "resources/creditos.png");
      this.load.image("creditosP", "resources/creditosPulsado.png");
      this.load.image("desconectar", "resources/desconectar.png");
      this.load.image("desconectarP", "resources/desconectarPulsado.png");
      this.load.image("logo", " resources/LOGO.png")
      this.load.image("fondo", "resources/fondoMenu.png")
    }
    create (){
        //const juego = this.add.text(20,20, "Cargando Juego...")
        //this.scene.start("menuMuerte");
        var fondo = this.add.image(540,360,'fondo');
        let sonido = this.sound.add("sound");
        sonido.loop = true;
        sonido.play();
    
        this.clickButton = this.add.image(550, 475, 'jugar' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("PlayGame"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(550, 475, 'jugarP'  ).setScale(0.5))
         .on('pointerout', () => this.add.image(550, 475, 'jugar' ).setScale(0.5) );
         this.clickButton.setScale(0.5);

         this.clickButton2 = this.add.image(550, 550, 'creditos' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("Creditos"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(550, 550, 'creditosP' ).setScale(0.5) )
         .on('pointerout', () => this.add.image(550, 550, 'creditos' ).setScale(0.5) );
         this.clickButton2.setScale(0.5);
         this.clickButton3 = this.add.image(550, 625, 'controles' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("Controles"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(550, 625, 'controlesP' ).setScale(0.5) )
         .on('pointerout', () => this.add.image(550, 625, 'controles' ).setScale(0.5) );
         this.clickButton3.setScale(0.5);
         var logo  = this.add.image(550,225, 'logo');
         logo.setScale(.4);
         this.clickButtonD = this.add.image(900, 675, 'desconectar' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("conexion"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(900, 675, 'desconectarP'  ).setScale(0.3))
         .on('pointerout', () => this.add.image(900, 675, 'desconectar' ).setScale(0.3) );
         this.clickButtonD.setScale(0.3);
    
       // this.updateClickCountText(clickCount);
      }
    //update(){
      
    
      enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0'});
      }
    
      enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
      }

      enterButtonHoverState2() {
        this.clickButton2.setStyle({ fill: '#ff0'});
      }
    
      enterButtonRestState2() {
        this.clickButton2.setStyle({ fill: '#0f0' });
      }
    
    
   // }












}