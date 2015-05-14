// Declare an array of the 3 horizontal stone paths
var HorizStone = [60, 145, 230];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -90; // left side of canvas
    this.y = HorizStone[Math.floor(Math.random() * 3)]; //randomly pick one of the 3 stone paths
    this.initSpeed = Math.floor((Math.random() * 75) + 35); //randomly pick a speed between 35 and 75
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // move the enemy to the right by adding to the x dimension
    this.x = this.x + (this.initSpeed * dt);

    // if the enemy reaches the right side of the canvas,
    // reset it to the left side
    if (this.x >= 500) {
        this.x = -90;
    }

    //update the left, right, top, and bottom position of the enemy
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;

    // detect a collision
    // if the player's x,y position coincides with the enemy, then
    //reset the player to the bottom of the screen
    if (player.left < this.right
     && player.right > this.left
     && player.top < this.bottom
     && player.bottom > this.top) {
        player.reset();
    } 
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 200; // horizontally in the middle of the canvas
    this.y = 400; // at bottom of canvas
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;    

// when player reaches top of screen, reset it to the bottom
    if (this.y < 60) {
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 10) {
        this.x = this.x - 85;
    } else if (key === 'right' && this.x < 400) {
        this.x = this.x + 85;
    } else if (key === 'up' && this.y > 25) {
        this.y = this.y - 85;
    } else if (key === 'down' && this.y < 430) {
        this.y = this.y + 85;
    }
};

Player.prototype.reset = function() {
    this.x = 200; // horizontally in the middle of the canvas
    this.y = 400; // at bottom of canvas
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var bug4 = new Enemy();
var bug5 = new Enemy();
var allEnemies = [bug1, bug2, bug3, bug4, bug5];
// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});