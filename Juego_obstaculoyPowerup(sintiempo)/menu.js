class menu extends Phaser.Scene {
    constructor() {
        super("menuPrincipal");
    }

    create (){
        //const juego = this.add.text(20,20, "Cargando Juego...")
        //this.scene.start("menuMuerte");
        let clickCount = 0;
        this.clickCountText = this.add.text(100, 200, '');
    
        this.clickButton = this.add.text(100, 100, 'Click me!', { fill: '#0f0' })
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("PlayGame"))
         .on('pointerover', () => this.enterButtonHoverState() )
         .on('pointerout', () => this.enterButtonRestState() );
    
        this.updateClickCountText(clickCount);
      }
    //update(){
      updateClickCountText(clickCount) {
        this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
      }
    
      enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0'});
      }
    
      enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
      }
    
   // }












}