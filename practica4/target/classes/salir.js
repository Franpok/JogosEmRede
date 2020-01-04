class salir extends Phaser.Scene {//Menú de pausa/salir del juego
    constructor() {
        super("salir");
       
    }
    
preload(){
    this.load.image("si", "resources/si.png");
    this.load.image("no", "resources/no.png");
    this.load.image("siP", "resources/siPulsadoALT.png");
    this.load.image("noP", "resources/noPulsadoALT.png");
    this.load.image("menu", "resources/SALIRALT.png")
    this.load.image("pausa","resources/pausaALT.png")
    
}

create (){
    var pausa = this.add.image(100, 100, 'pausa')
    var paused;
    pausa.setScale(.5);
    this.add.image(540,360,'menu');
    this.clickButton = this.add.image(415, 435, 'si')
     .setInteractive()
     .on('pointerdown', () => this.scene.stop())
     .on('pointerdown', () => this.scene.stop("PlayGame"))
     .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
     .on('pointerover', () => this.add.image(415, 435, 'siP'  ))
     .on('pointerout', () => this.add.image(415, 435, 'si' ));


     this.clickButton2 = this.add.image(665, 435, 'no')
     .setInteractive()
     .on('pointerdown', () => this.scene.stop())
     .on('pointerdown', () =>  this.scene.resume("PlayGame"))
     .on('pointerover', () => this.add.image(665, 435, 'noP'))
        .on('pointerout', () => this.add.image(665, 435, 'no' ));
      isPaused=false;
        
  }
};