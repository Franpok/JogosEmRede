class muerto2 extends Phaser.Scene {
    constructor() {
        super("menuMuerte2");
    }
    preload(){
        this.load.image("back", "resources/back.png")
        this.load.image("fondo", "resources/fondoMenu.png")
        this.load.image("estasmuertachacha", "resources/j1ganaALT.png")
    }
    create(){
        var fondo = this.add.image(540,360,'fondo');
    var resultado = this.add.image(540,260, "estasmuertachacha")
    var back = this.add.image(182, 600, 'back')
    back.setScale(0.5);
    this.clickButton = back
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
         .on('pointerdown', () =>  borrarPartida())
  }
    
}