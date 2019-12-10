class controles extends Phaser.Scene {
    constructor() {
        super("Controles");
    }
    
    preload(){
      this.load.image("controls", "resources/controlesALT.png")
      this.load.image("fondo", "resources/fondoMenu.png")
      this.load.image("back", "resources/back.png");
    }
    create(){
     
      var fondo = this.add.image(540,360,'fondo');
      var controls = this.add.image(540,260,'controls');
      var back = this.add.image(200, 600, 'back')
      controls.setScale(0.75);
    back.setScale(0.5);
    this.clickButton = back
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"));
  }

}