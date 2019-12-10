class creditos extends Phaser.Scene {
    constructor() {
        super("Creditos");
    }
    
    preload(){
      this.load.image("back", "resources/back.png")
      this.load.image("credits", "resources/creditosPantalla.png")
      this.load.image("fondo", "resources/fondoMenu.png")
      this.load.audio("sonido", ["resources/Never.mp3"]);
    }
    create(){
      this.clickButton = this.add.text(600, 300, 'EASTER EGG XD',{fontSize: "50px"})
      .setInteractive()
      .on('pointerdown', () =>  sonidoepico.play());
      
      let sonidoepico = this.sound.add("sonido");
      sonidoepico.loop = false;
     
      var fondo = this.add.image(540,360,'fondo');
      var credits = this.add.image(540,360,'credits');
    var back = this.add.image(200, 600, 'back')
    back.setScale(0.5);
    this.clickButton = back
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"));
  }

}