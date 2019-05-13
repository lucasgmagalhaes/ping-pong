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
    if (parseInt(player.style.left) > 0 && playerDirection === 'left') {
        player.style.left = parseInt(player.style.left) - 1 + 'px';
    } else if (parseInt(player.style.left) < getContainerWidth() - getPlayerWidth() && 
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

        if (parseInt(ball.style.top) > getContainerHeight() - getPlayerHeight() - getBallHeight()) {
            ballDirecton = 'top';
        }
        else if (parseInt(ball.style.top) < getPlayerHeight()) {
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



		// <![CDATA[
		var balls = [];
		var canvasX = 0;
		var canvasY = 0;
		var timer = null;
		var m_lastX = 0;
		var m_lastY = 0;
		var M_SPACE = 24;
		var B_VMIN = 5;
		var B_VMAX = 5;
		var B_WIDTH = 13;
		var B_HEIGHT = 13;
		function rnd(n) {
			return Math.random() * n;
		}
		function rndI(n) {
			return parseInt(rnd(n));
		}
		function createBall(oParent) {
			oParent.appendChild(balls[0].cloneNode(false));
			initBall(balls[balls.length - 1]);
		}
		function createBallAtMouse(e) {
			e = e ? e : event;
			createBall(document.getElementById('ball-container'));
			with (balls[balls.length - 1]) {
				_x = e.clientX;
				_y = e.clientY;
			}
		}
		function initBall(oBall) {
			oBall._x = rnd(canvasX);
			oBall._y = rnd(canvasY);
			oBall._vX = B_VMIN + rnd(B_VMAX) * (Math.random() > 0.5 ? 1 : -1);
			oBall._vY = B_VMIN + rnd(B_VMAX);
		}
		function moveBall(oBall) {
			oBall._x += oBall._vX;
			oBall._y += oBall._vY;
			oBall.style.left = oBall._x + 'px';
			oBall.style.top = oBall._y + 'px';
			if ((oBall._vX > 0 && oBall._x + oBall._vX + B_WIDTH > canvasX) || (oBall._vX < 0 && oBall._x + oBall._vX < 0)) {
				// horizontal bounce
				oBall._vX *= -1;
			}
			if ((oBall._vY > 0 && oBall._y + oBall._vY + B_HEIGHT > canvasY) || (oBall._vY < 0 && oBall._y + oBall._vY < 0)) {
				// vertical bounce
				oBall._vY *= -1;
			}
		}
		function animateStuff() {
			for (var i = balls.length; i--;) {
				moveBall(balls[i]);
			}
			collisionCheck();
		}
		function isColliding(ball1, ball2) {
			if (Math.abs(ball1._x - ball2._x) < B_WIDTH && Math.abs(ball1._y - ball2._y) < B_HEIGHT) {
				/*
				 * we have a collision!
				 * edge case to consider: balls may get stuck colliding back and forth
				 * between each other for a few frames if they don't fully "separate"
				 * from each other in one frame of motion.
				*/
				return true;
			} else {
				return false;
			}
		}
		function collisionCheck() {
			// simple loop through all the ball objects, comparing coordinates
			var i, j;
			for (i = balls.length; i--;) {
				for (j = balls.length; j--;) {
					if (j !== i) { // don't compare each ball to itself
						if (isColliding(balls[j], balls[i])) {
							// bounce the ball based on its dominant direction (horizontal or vertical movement)
							if (Math.abs(balls[j]._vX) > Math.abs(balls[j]._vY)) {
								// moving more horizontally
								balls[j]._vX *= -1;
							} else if (Math.abs(balls[j]._vY) > Math.abs(balls[j]._vX)) {
								// moving more vertically
								balls[j]._vY *= -1;
							} else {
								// edge case: if identical speed on x/y, bounce both
								balls[j]._vX *= -1;
								balls[j]._vY *= -1;
							}
						}
					}
				}
			}
		}
		function startAnimation() {
			if (!timer) {
				timer = setInterval(animateStuff, 20);
			}
		}
		function stopAnimation() {
			if (!timer) {
				return false;
			}
			clearInterval(timer);
			timer = null;
		}
		function mouseDown(e) {
			e = e ? e : event;
			m_lastX = e.clientX;
			m_lastY = e.clientY;
			document.onmousemove = mouseMove;
			document.onmouseup = mouseUp;
		}
		function mouseMove(e) {
			e = e ? e : event;
			if (Math.abs(e.clientX - m_lastX) > M_SPACE || Math.abs(e.clientY - m_lastY) > M_SPACE) {
				m_lastX = e.clientX;
				m_lastY = e.clientY;
				createBallAtMouse(e);
			}
			return false;
		}
		function mouseUp() {
			document.onmousemove = null;
			document.onmouseup = null;
		}
		function init() {
			balls = document.getElementById('ball-container').getElementsByTagName('img');
			for (var i = balls.length; i--;) {
				initBall(balls[i]);
			}
			getWindowCoords();
			startAnimation();
			document.onmousedown = mouseDown;
		}
		getWindowCoords = (navigator.userAgent.match(/opera/i) || navigator.userAgent.match(/safari/i)) ? function () {
			canvasX = window.innerWidth;
			canvasY = window.innerHeight;
		} : function () {
			canvasX = document.documentElement.clientWidth || document.body.clientWidth || document.body.scrollWidth;
			canvasY = document.documentElement.clientHeight || document.body.clientHeight || document.body.scrollHeight;
		}
		window.onresize = getWindowCoords;
		window.onload = init;
