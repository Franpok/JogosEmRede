class primera extends Phaser.Scene {
    constructor() {
        super("conexion");
    }

    preload(){
      this.load.audio("sound", ["resources/MusicaMenu.mp3"]);
      this.load.image("jugar", "resources/jugar.png");
      
    }
    create (){
        
        this.clickButton = this.add.image(550, 475, 'jugar' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
         .on('pointerdown', () => jugador.nombre = $('#value-input').val())
         .on('pointerdown', () => console.log(jugador.nick))
         .on('pointerdown', () => Pet_añadirJugador(jugador))
         .on('pointerover', () => this.add.image(550, 475, 'jugarP'  ).setScale(0.5))
         .on('pointerover', () => jugador.id = Pet_jugadoresConectados())
         .on('pointerout', () => this.add.image(550, 475, 'jugar' ).setScale(0.5) );
         this.clickButton.setScale(0.5);

         
         
     

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