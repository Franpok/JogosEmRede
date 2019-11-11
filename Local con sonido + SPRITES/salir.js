class salir extends Phaser.Scene {//Menú de pausa/salir del juego
    constructor() {
        super("salir");
    }

create (){
    this.clickButton = this.add.text(100, 100, 'Sí', { fill: '#0f0' })
     .setInteractive()
     .on('pointerdown', () => this.scene.stop())
     .on('pointerdown', () => this.scene.stop("PlayGame"))
     .on('pointerdown', () =>  this.scene.start("menuPrincipal"))


     this.clickButton2 = this.add.text(300, 100, 'No', { fill: '#0f0' })
     .setInteractive()
     .on('pointerdown', () => this.scene.stop())
     .on('pointerdown', () =>  this.scene.resume("PlayGame"))
     
  }
};