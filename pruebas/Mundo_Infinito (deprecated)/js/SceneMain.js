class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: "SceneMain"});
    }

    preload() {
        this.load.spritesheet("sprWater", "assets/sprWater.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.image("sprSand", "assets/sprSand.png");
        this.load.image("sprGrass", "assets/sprGrass.png");
    }

    create() {
        this.anims.create({ // Creamos la animación de la tile de agua
            key: "sprWater",
            frames: this.anims.generateFrameNumbers("sprWater"),
            frameRate: 5,
            repeat: -1
        });

        this.chunkSize = 16; // Define el tamaño del chunk: 16 tiles de ancho y 16 de alto
        this.tileSize = 16;
        this.cameraSpeed = 10;

        this.cameras.main.setZoom(2); // Zoom de la cámara

        this.followPoint = new Phaser.Math.Vector2( // Vector para indicar dónde está centrada la cámara
            this.cameras.main.worldView.x + (this.cameras.main.worldView.width * 0.5),
            this.cameras.main.worldView.y + (this.cameras.main.worldView.height * 0.5)
        );

        this.chunks = [];
        
        // Propiedades para determinar qué tecla está siendo pulsada
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    getChunk(x, y) { // Devuelve el chunk en una determinada posición X, Y
        var chunk = null;
        for (var i = 0; i < this.chunks.length; i++){
            if (this.chunks[i].x == x && this.chunks[i].y == y){
                chunk = this.chunks[i]; 
            }
        }
        return chunk; 
    }

    update() {
        // OBTENER LA POSICIÓN DEL CHUNK EN LA QUE ESTÁ FOLLOW POINT
        var snappedChunkX = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.x / (this.chunkSize * this.tileSize));
        var snappedChunkY = (this.chunkSize * this.tileSize) * Math.round(this.followPoint.y / (this.chunkSize * this.tileSize));

        snappedChunkX = snappedChunkX / this.chunkSize / this.tileSize;
        snappedChunkY = snappedChunkY / this.chunkSize / this.tileSize;

        // CREA CHUNKS ALREDEDOR DEL FOLLOW POINT SI NO ESTÁN CREADOS
        for (var x = snappedChunkX - 2; x < snappedChunkX + 2; x++){
            for (var y = snappedChunkY - 2; y < snappedChunkY + 2; y++){
                var existingChunk = this.getChunk(x, y);

                if (existingChunk == null){
                    var newChunk = new Chunk(this, x, y);
                    this.chunks.push(newChunk);
                }
            }
        }

        // CARGA Y DESCARGA DE CHUNKS
        for (var i = 0; i < this.chunks.length; i++){
            var chunk = this.chunks[i];

            if (Phaser.Math.Distance.Between(
                snappedChunkX,
                snappedChunkY,
                chunk.x,
                chunk.y
            ) < 3){
                if (chunk !== null){
                    chunk.load();
                }
            }
            else{
                if (chunk !== null){
                    chunk.unload();
                }
            }
        }

        // MOVIMIENTO DE CÁMARA
        if (this.keyW.isDown){
            this.followPoint.y -= this.cameraSpeed;
        }
        if (this.keyS.isDown){
            this.followPoint.y += this.cameraSpeed;
        }
        if (this.keyA.isDown){
            this.followPoint.x -= this.cameraSpeed;
        }
        if (this.keyD.isDown){
            this.followPoint.x += this.cameraSpeed;
        }

        // CENTRAR CÁMARA
        this.cameras.main.centerOn(this.followPoint.x, this.followPoint.y);
    }
}