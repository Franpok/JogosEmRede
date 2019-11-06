/*
Para crear terreno infinito no guardaremos todas las tiles en un array.
Usaremos chunks (trozos de terreno cargados alrededor del jugador que estarán descargados cuando el jugador se aleje)
 */
class Chunk {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.tiles = this.scene.add.group(); // Guarda todas las tiles de un chunk
        this.isLoaded = false; // Determina si un chunk está cargado o no.
    }

    unload() {
        if (this.isLoaded) { // El chunk comprobará si está cargado
            this.tiles.clear(true, true); // Quita todas las tiles

            this.isLoaded = false; // Cambia a falso
        }
    }

    load() {
        if (!this.isLoaded) { // Comprueba si el chunk no está cargado
            this.isLoaded = true;
            // Iteraremos por todas las tiles del chunk.
            for (var x = 0; x < this.scene.chunkSize; x++){
                for (var y = 0; y < this.scene.chunkSize; y++){
                    // Creamos las tiles
                    var tileX = (this.x * (this.scene.chunkSize * this.scene.tileSize)) + (x * this.scene.tileSize);
                    var tileY = (this.y * (this.scene.chunkSize * this.scene.tileSize)) + (y * this.scene.tileSize);

                    var perlinValue = noise.perlin2(tileX / 100, tileY / 100); // Determina el zoom-in del ruido de Perlin

                    var key = "";
                    var animationKey = "";

                    // Utilizamos los valores obtenidos en perlinValue para decidir qué baldosa escoger
                    if (perlinValue < 0.2) {
                        key = "sprWater";
                        animationKey = "sprWater";
                    }
                    else if (perlinValue >= 0.2 && perlinValue < 0.3) {
                        key = "sprSand";
                    }
                    else if (perlinValue >= 0.3) {
                        key = "sprGrass";
                    }

                    // Crea la instancia del tile y la añade al grupo de tiles
                    var tile = new Tile(this.scene, tileX, tileY, key);

                    if (animationKey !== "") {
                        tile.play(animationKey);
                    }

                    this.tiles.add(tile);
                }
            }
        }
    }
}

class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y ,key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0); // Ponemos el origen en la esquina superior izquierda
    }
}