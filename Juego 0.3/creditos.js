class creditos extends Phaser.Scene {
    constructor() {
        super("Creditos");
    }
    
    preload(){
      this.load.image("back", "resources/back.png")
      this.load.image("fondo", "resources/creditosPantalla.png")
    }
    create(){
      var fondo = this.add.image(540,360,'fondo');
    var back = this.add.image(200, 600, 'back')
    back.setScale(0.5);
    this.clickButton = back
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"));
  }

}