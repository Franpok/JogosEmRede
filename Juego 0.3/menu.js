class menu extends Phaser.Scene {
    constructor() {
        super("menuPrincipal");
    }

    preload(){
      this.load.audio("sound", ["resources/MusicaMenu.mp3"]);
      this.load.image("jugar", "resources/jugar.png");
      this.load.image("jugarP", "resources/jugarPulsado.png");
      this.load.image("creditos", "resources/creditos.png");
      this.load.image("creditosP", "resources/creditosPulsado.png");
      this.load.image("controles", "resources/controles.png")
      this.load.image("logo", " resources/LOGO.png")
    }
    create (){
        //const juego = this.add.text(20,20, "Cargando Juego...")
        //this.scene.start("menuMuerte");
        let sonido = this.sound.add("sound");
        sonido.loop = true;
        sonido.play();
    
        this.clickButton = this.add.image(300, 350, 'jugar' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("PlayGame"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(300, 350, 'jugarP'  ))
         .on('pointerout', () => this.add.image(300, 350, 'jugar' ) );
         

         this.clickButton2 = this.add.image(300, 550, 'creditos' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("Creditos"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(300, 550, 'creditosP' ) )
         .on('pointerout', () => this.add.image(300, 550, 'creditos' ) );
         var controles =this.add.image(750,450, 'controles');
         controles.setScale(.6);
         var logo  = this.add.image(550,125, 'logo');
         logo.setScale(.25);
    
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