class muerto extends Phaser.Scene {
    constructor() {
        super("menuMuerte");
    }
    
    create(){
    const juego = this.add.text(100,20, "Has muerto", {font: "25px Arial", fill: "yellow"})

    this.clickButton = this.add.text(100, 100, 'Volver al menu', { fill: '#0f0' })
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
         
  }
    
}