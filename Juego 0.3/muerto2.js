class muerto2 extends Phaser.Scene {
    constructor() {
        super("menuMuerte2");
    }
    preload(){
        this.load.image("back", "resources/back.png")
    }
    create(){
    const juego = this.add.text(100,20, "Ha ganado el jugador 1", {font: "25px Arial", fill: "yellow"})
    var back = this.add.image(200, 200, 'back')
    back.setScale(0.5);
    this.clickButton = back
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
         
  }
    
}