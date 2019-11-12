class salir extends Phaser.Scene {//Menú de pausa/salir del juego
    constructor() {
        super("salir");
    }
preload(){
    this.load.image("si", "resources/si.png");
    this.load.image("no", "resources/no.png");
    this.load.image("menu", "resources/SALIR.png")
    this.load.image("pausa","resources/pausa.png")
}
create (){
    var pausa = this.add.image(100, 100, 'pausa')
    pausa.setScale(.5);
    this.add.image(500,300,'menu');
    this.clickButton = this.add.image(375, 375, 'si')
     .setInteractive()
     .on('pointerdown', () => this.scene.stop())
     .on('pointerdown', () => this.scene.stop("PlayGame"))
     .on('pointerdown', () =>  this.scene.start("menuPrincipal"))


     this.clickButton2 = this.add.image(625, 375, 'no')
     .setInteractive()
     .on('pointerdown', () => this.scene.stop())
     .on('pointerdown', () =>  this.scene.resume("PlayGame"))
     
  }
};