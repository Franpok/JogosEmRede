class menu extends Phaser.Scene {
    constructor() {
        super("menuPrincipal");
    }

    preload(){
      this.load.audio("sound", ["resources/MusicaMenu.mp3"]);
    }
    create (){
        //const juego = this.add.text(20,20, "Cargando Juego...")
        //this.scene.start("menuMuerte");
        let sonido = this.sound.add("sound");
        sonido.loop = true;
        sonido.play();
    
        this.clickButton = this.add.text(100, 100, 'Jugar', { fill: '#0f0' })
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("PlayGame"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.enterButtonHoverState() )
         .on('pointerout', () => this.enterButtonRestState() );
         

         this.clickButton2 = this.add.text(300, 100, 'Créditos', { fill: '#0f0' })
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("Creditos"))
         .on('pointerdown', () =>  sonido.stop())
         .on('pointerover', () => this.enterButtonHoverState2() )
         .on('pointerout', () => this.enterButtonRestState2() );
    
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