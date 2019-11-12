class muerto extends Phaser.Scene {
    constructor() {
        super("menuMuerte");
    }
    preload(){
        this.load.image("back", "resources/back.png")
        this.load.image("fondo", "resources/fondoMenu.png")
        this.load.image("estasmuertachacha", "resources/j2gana.png")
    }
    create(){
        var fondo = this.add.image(540,360,'fondo');
   var resultado = this.add.image(540,360, "estasmuertachacha")
    
    var back = this.add.image(180, 600, 'back')
    back.setScale(0.5);

    this.clickButton = back
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
         
  }
    
}