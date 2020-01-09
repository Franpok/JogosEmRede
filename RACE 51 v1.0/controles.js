class controles extends Phaser.Scene {
    constructor() {
        super("Controles");
    }
    
    preload(){
      this.load.image("controls", "resources/controlesALT.png")
      this.load.image("fondo", "resources/fondoMenu.png")
      this.load.image("back", "resources/back.png");
      this.load.image("objetivo", "resources/objetivo.png");
    }
    create(){
      
      var fondo = this.add.image(540,360,'fondo');
      var controls = this.add.image(540,200,'controls');
      var obj = this.add.image(540, 550, 'objetivo').setScale(0.8);
      var back = this.add.image(150, 600, 'back')
      controls.setScale(0.6);
    back.setScale(0.5);
    this.clickButton = back
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"));
  }

}