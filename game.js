var config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var platforms;
var cursors;
var score = 0;
var lives = 3;
var scoreText;
var livesText;
var bombs;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'resources/sky.png');
    this.load.image('ground', 'resources/platform.png');
    this.load.image('star', 'resources/star.png');
    this.load.image('bomb', 'resources/bomb.png');
    this.load.spritesheet('alien', 'resources/alien.png', { frameWidth: 200, frameHeight: 185 });
}

function create ()
{
    this.add.image(400, 300, 'sky').setScale(2); //

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(4).refreshBody();

    player = this.physics.add.sprite(50, 600, 'alien');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    /*this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });*/

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group({
        key: 'bomb',
        repeat: 3,
        setXY: { x: 500, y: 0, stepX: 70 }
    });

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    livesText = this.add.text(16, 50, 'Lives:' + lives, { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.overlap(player, bombs, ouch, null, this);
}

function update ()
{
    player.setVelocityX(160);
    player.anims.play('right', true);
        
    /*if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }*/

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

function ouch (player, bomb)
{
    bomb.disableBody(true, true);

    lives = lives - 1;
    livesText.setText('Lives: ' + lives);
}