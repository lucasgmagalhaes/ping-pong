let player = null;
let ball = null;
let container = null;

let ballDirecton = 'bottom';
let playerDirection = 'right';

const ballMoveIncrease = 1;

function init() {
    player = document.getElementById("two");
    player.style.bottom = "0px";
    player.style.left = "0px";
    player.style.position = "absolute";
    player.style.height = "30px";
    player.style.width = "200px";

    ball = document.getElementById("ball");
    ball.style.top = "0px";
    ball.style.bottom = "0px";
    ball.style.left = "0px";
    ball.style.position = "absolute";
    ball.style.height = "50px";
    ball.style.width = "50px";
    ball.style.borderRadius = "50%";

    container = document.getElementById("container");
    container.style.height = "600px";
    container.style.width = "800px";

    ballMove();
    playerMove();
}

function getKeyAndMove(e) {
    var key_code = e.which || e.keyCode;
    switch (key_code) {
        case 37: //left arrow key
            moveLeft();
            break;
        case 39: //right arrow key
            moveRight();
            break;
    }
}

function moveLeft() {
    playerDirection = 'left';
}

function moveRight() {
    playerDirection = 'right';
}

function getContainerHeight() {
    return parseInt(container.style.height);
}

function getContainerWidth() {
    return parseInt(container.style.width);
}

function getPlayerHeight() {
    return parseInt(player.style.height);
}

function getPlayerWidth() {
    return parseInt(player.style.width);
}

function getBallHeight() {
    return parseInt(ball.style.height);
}

function moveBall() {
    if (ballDirecton === 'top') {
        ball.style.top = parseInt(ball.style.top) - 1 + 'px';
    } else {
        ball.style.top = parseInt(ball.style.top) + 1 + 'px';
    }
}

function movePlayer() {
    if (parseInt(player.style.left) >= 0 && playerDirection === 'left') {
        player.style.left = parseInt(player.style.left) - 1 + 'px';
    } else if (parseInt(player.style.left) <= getContainerWidth() - getPlayerWidth() && 
        playerDirection === 'right') {
        player.style.left = parseInt(player.style.left) + 1 + 'px';
    }
}

function calcColision() {
    if (ball.x + firstBall.radius + secondBall.radius > secondBall.x
        && firstBall.x < secondBall.x + firstBall.radius + secondBall.radius
        && firstBall.y + firstBall.radius + secondBall.radius > secondBall.y
        && firstBall.y < seconBall.y + firstBall.radius + secondBall.radius) {
        //AABBs are overlapping
    }
}

function ballMove() {
    setInterval(function () {

        if (parseInt(ball.style.top) >= getContainerHeight() - getPlayerHeight() - getBallHeight()) {
            ballDirecton = 'top';
        }
        else if (parseInt(ball.style.top) <= getPlayerHeight()) {
            ballDirecton = 'bottom';
        }

        moveBall();
    }, 4)
}

function playerMove() {
    setInterval(function () {
        movePlayer();
    }, 4)
}

function adjustContainerHeight() {
    container = document.getElementById("container");
}

window.onload = init;