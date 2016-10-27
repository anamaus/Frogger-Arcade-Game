var colLength = 101;
var rowLength =78;

// Enemies our player must avoid
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 2 + 0.5;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x = this.x + dt * this.speed;
    if (this.x > 5) {
        this.x = 0;
        this.speed = Math.random() * 2 + 0.5;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * colLength, this.y * rowLength);

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-pink-girl.png';
};

// set another player based on clicked picture url
Player.prototype.setSprite = function(imgUrl){
    this.sprite = imgUrl;
};
// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function () {

};


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * colLength, this.y * rowLength);
};
Player.prototype.handleInput = function (key) {

    switch (key) {
        case "left":
            if (this.x !== 0) {
                this.x = this.x - 1;

            }
            collectGem();
            break;
        case "up":
            if (this.y !== 1) {
                this.y = this.y - 1;

            }
            else{
                alert('You Won!');
                player.reset();
                updateScore(10);
            }
            collectGem();
            break;
        case "right":
            if (this.x !== 4) {
                this.x = this.x + 1;

            }
            collectGem();
            break;
        case "down":
            if (this.y !== 5) {
                this.y = this.y + 1;
            }
            collectGem();
            break;
        default:
            console.log('use up,down,left,right keys to move');
    }

};

Player.prototype.reset= function () {
    this.y = 5;
    this.x = 2;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy1 = new Enemy(0, 1);
var enemy2 = new Enemy(0, 2);
var enemy3 = new Enemy(0, 3);

allEnemies.push(enemy1, enemy2, enemy3);
// console.log(allEnemies);

var player = new Player(2, 5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function checkCollision() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (
            (allEnemies[i].y === player.y)
            &&
            ((allEnemies[i].x + 1) * colLength > player.x*colLength + 30) && (allEnemies[i].x * colLength < (player.x + 1) * colLength -30)
        ) {
            alert('game over');
            player.reset();
            updateScore(-5);
        }
    }
}

//updates score board
function updateScore(value){
    var score = document.getElementById('scoreText').innerHTML;
    score = parseInt(score);
    score += parseInt(value);
    document.getElementById('scoreText').innerHTML = score;

}

// select player on click
document.getElementById('players').addEventListener('click',function(e){
    var imageUrl =e.target.getAttribute('src');

    player.setSprite(imageUrl);
});


var Gem  = function () {
    this.x = Math.floor( Math.random() * 5);
    this.y = Math.floor( Math.random() * 3 + 1);
    this.sprite = 'images/Star.png';
};

Gem.prototype.render =function(){
    ctx.drawImage(Resources.get(this.sprite), this.x * colLength, this.y * rowLength);
};
var gem1 = new Gem();
var gem2 = new Gem();
var gem3 = new Gem();

var allGems = [];
allGems.push(gem1, gem2, gem3);

function collectGem() {
    for (var i = 0; i < allGems.length; i++) {
        if ((allGems[i].y === player.y) && (allGems[i].x === player.x)) {
            allGems[i].y = Math.floor(Math.random() * 3 + 1);
            allGems[i].x = Math.floor(Math.random() * 5);
            updateScore(5);

        }

    }
}