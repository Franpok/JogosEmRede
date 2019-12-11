class primera extends Phaser.Scene {
    constructor() {
        super("conexion");
    }

    preload(){
      this.load.audio("sound", ["resources/MusicaMenu.mp3"]);
      this.load.image("conectar", "resources/conectar.png");
      this.load.image("conectarP", "resources/conectarPulsado.png");
      this.load.image("conectando", "resources/conectando.png");
      this.load.spritesheet('animacion', "resources/cargandoAnim.png", { frameWidth: 32, frameHeight: 32 });
    }
    create (){
        this.add.image(550, 475,'conectando')
        this.clickButton = this.add.image(550, 400, 'conectar' )
         .setInteractive()
         .on('pointerdown', () =>  this.scene.start("menuPrincipal"))
         .on('pointerdown', () => jugador.nombre = $('#value-input').val())
         .on('pointerdown', () => console.log(jugador.nick))
         .on('pointerdown', () => Pet_añadirJugador(jugador))
         .on('pointerover', () => this.add.image(550, 400, 'conectarP'  ).setScale(0.5))
         .on('pointerover', () => jugador.id = Pet_jugadoresConectados())
         .on('pointerout', () => this.add.image(550, 400, 'conectar' ).setScale(0.5) );
         this.clickButton.setScale(0.5);

         this.player = this.physics.add.sprite(550,525, 'animacion', 0);
         this.player.setGravityY(0);
 
         this.anims.create({
          key: 'uwu',
          frameRate: 8,
          frames: this.anims.generateFrameNumbers('animacion', { start: 0, end: 7 }),
          repeat: -1
      });
      this.player.anims.play('uwu');
     

       // this.updateClickCountText(clickCount);
      }
    //update(){
      
    
      enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0'});
      }
    
      enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
      }

      enterButtonHoverState2() {
        this.clickButton2.setStyle({ fill: '#ff0'});
      }
    
      enterButtonRestState2() {
        this.clickButton2.setStyle({ fill: '#0f0' });
      }
    
    
   // }











}