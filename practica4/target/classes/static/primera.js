class primera extends Phaser.Scene {
    constructor() {
        super("conexion");
    }
    
    preload(){
      this.load.audio("sound", ["resources/MusicaMenu.mp3"]);
      this.load.image("conectar", "resources/conectar.png");
      this.load.image("conectarP", "resources/conectarPulsado.png");
      this.load.image("conectando", "resources/conectando.png");
      this.load.spritesheet('animacion', "resources/cargandoAnim.png", { frameWidth: 32, frameHeight: 32 });
    }
    create (){
        this.add.image(550, 475,'conectando')
        
        
        
         this.player = this.physics.add.sprite(550,525, 'animacion', 0);
         this.player.setGravityY(0);
 
         this.anims.create({
          key: 'carga',
          frameRate: 8,
          frames: this.anims.generateFrameNumbers('animacion', { start: 0, end: 7 }),
          repeat: -1
      });
      this.player.anims.play('carga');
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
      
      update () {
    	  if (crearPartidaBool == false){
    		  crearPartida();
    		  console.log("He enviado petición para crear partida");
    		  crearPartidaBool = true;
    	  }
    	  if (StartGame == true){
    	  	this.scene.start("PlayGame");
    	  }
    	  
    	  
} 
}