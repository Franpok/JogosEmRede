class creditos extends Phaser.Scene {
    constructor() {
        super("Creditos");
    }
    
    preload(){
      this.load.image("back", "resources/back.png")
      this.load.image("credits", "resources/creditosPantalla.png")
      this.load.image("fondo", "resources/fondoMenu.png")
      this.load.audio("sonido", ["resources/Never.mp3"]);
      this.load.audio("Fancy", ["resources/EasterEggFran.mp3"]);
    }
    create(){
      let sonidoepico = this.sound.add("sonido");
      sonidoepico.loop = false;
      let fancyyou = this.sound.add("Fancy");
      fancyyou.loop = false;
      this.clickButton = this.add.text(600, 300, 'EASTER EGG XD',{fontSize: "50px"})
      .setInteractive()
      .on('pointerdown', () =>  sonidoepico.play());
      

      this.clickButton = this.add.text(300, 175, 'Fancy youuuu',{fontSize: "50px"})
      .setInteractive()
      .on('pointerdown', () =>  fancyyou.play());
      
      
      var fondo = this.add.image(540,360,'fondo');
      var credits = this.add.image(540,360,'credits');
    var back = this.add.image(200, 600, 'back')
    back.setScale(0.5);
    this.clickButton = back
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
         .on('pointerdown', () =>  fancyyou.stop())
         .on('pointerdown', () =>  sonidoepico.stop());
  }

}