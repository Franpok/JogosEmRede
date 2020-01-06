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
      this.load.html('nameform', 'resources/nameform.html');
    }
    create (){
         this.player = this.physics.add.sprite(550,525, 'animacion', 0);
         this.player.setGravityY(0);
 
         this.anims.create({
          key: 'carga',
          frameRate: 8,
          frames: this.anims.generateFrameNumbers('animacion', { start: 0, end: 7 }),
          repeat: -1
      });
      this.player.anims.play('carga');
      
      var text = this.add.text(300, 10, 'Please enter your name', {color: 'white', fontSize: '20px'});
      
      var element = this.add.dom(400, 0).createFromCache('nameform');
      
      element.addListener('click');
      
      element.on('click', function(event){
    	if (event.target.name === "playButton") {
    		var inputText = this.getChildByName('nameField');
    		
    		// Have they entered anything?
    		if (inputText.value !== '') {
    			// Turn off the click events
    			this.removeListener('click');
    			
    			// Hide the login element
    			this.setVisible(false);
    			
    			// Populate the text with whatever they typed in
    			text.setText('Welcome ' + inputText.value);
    		} else {
    			// Flash the prompt
    			this.scene.tweens.add ({
    				targets: text,
    				alpha: 0.2,
    				duration: 250,
    				ease: 'Power3',
    				yoyo: true
    			});
    		}
    	}  
      });
      
      this.tweens.add ({
    	  targets: element,
    	  y: 300,
    	  duration: 3000,
    	  ease: 'Power3'
      });
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