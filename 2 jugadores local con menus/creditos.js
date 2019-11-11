class creditos extends Phaser.Scene {
    constructor() {
        super("Creditos");
    }
    
    create(){
    //const juego = this.add.text(500,100, "Juan Manuel Carretero Ávila", {font: "50px Arial", fill: "green"})
    this.clickButton = this.add.text(100, 100, 'Vuelve al menu, anda', { fill: '#0f0' })
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
         .on('pointerover', () => this.enterButtonHoverState() )
         .on('pointerout', () => this.enterButtonRestState() );

    this.clickButton2 = this.add.text(500, 100, 'Juan Manuel Carretero Ávila', { font: "30px Arial",fill: "green" })
    .setInteractive()
    .on('pointerdown', () =>  "location.href = ' https://www.youtube.com/watch?v=dQw4w9WgXcQ ';")
    .on('pointerover', () => this.enterButtonHoverState2() )
    .on('pointerout', () => this.enterButtonRestState2() );
    
    const juego1 = this.add.text(500,200, "Francisco Manuel González Gómez", {font: "30px Arial", fill: "yellow"})
    const juego2 = this.add.text(500,300, "David Martínez Martín", {font: "30px Arial", fill: "blue"})
    const juego3 = this.add.text(500,400, "Daniel Ayllón Peinado", {font: "30px Arial", fill: "red"})
  }
    
  /*updateClickCountText(clickCount) {
    this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
  }*/

  enterButtonHoverState() {
    this.clickButton.setStyle({ fill: '#ff0'});
    
  }

  enterButtonRestState() {
    this.clickButton.setStyle({ fill: '#0f0' });
  }
  enterButtonHoverState2() {
    this.clickButton2.setStyle({ font: "30px Arial",fill: '#ff0'});
    
  }

  enterButtonRestState2() {
    this.clickButton2.setStyle({ font: "30px Arial",fill: '#0f0' });
  }
}