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
    }
    create (){
        //const juego = this.add.text(20,20, "Cargando Juego...")
        //this.scene.start("menuMuerte");
        let sonido = this.sound.add("sound");
        sonido.loop = true;
        sonido.play();
    
        this.clickButton = this.add.image(300, 150, 'jugar' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("PlayGame"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(300, 150, 'jugarP'  ))
         .on('pointerout', () => this.add.image(300, 150, 'jugar' ) );
         

         this.clickButton2 = this.add.image(750, 150, 'creditos' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("Creditos"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.add.image(750, 150, 'creditosP' ) )
         .on('pointerout', () => this.add.image(750, 150, 'creditos' ) );
         var controles =this.add.image(500, 400, 'controles');
         controles.setScale(.5);
    
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