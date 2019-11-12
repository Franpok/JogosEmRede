class muerto extends Phaser.Scene {
    constructor() {
        super("menuMuerte");
    }
    preload(){
        this.load.image("back", "resources/back.png")
        this.load.image("fondo", "resources/fondoMenu.png")
    }
    create(){
        var fondo = this.add.image(540,360,'fondo');
    const juego = this.add.text(100,20, "Ha ganado el jugador 2", {font: "25px Arial", fill: "yellow"})
    
    var back = this.add.image(200, 200, 'back')
    back.setScale(0.5);

    this.clickButton = back
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
         
  }
    
}