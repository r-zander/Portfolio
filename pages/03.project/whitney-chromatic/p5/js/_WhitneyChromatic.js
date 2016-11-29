"use strict";

function Ball() {
}

/**
 * Enum
 */
var Mode = {
	BALLS: 0,
	LINES: 1,
	BALLS_AND_LINES: 2
};

var MODE = Mode.BALLS;

var NUMBER_OF_ELEMENTS = 36;

var MIN_HUE = 0;

var MAX_HUE = 340;

var MIN_SIZE = 7;

var MAX_SIZE = 30;

var BACKGROUND_COLOR = 0;

var RERENDER_BACKGROUND = true;

/**
 * In seconds.
 */
var FULL_DURATION = 60;

var centerX;

var centerY;

var balls = new Array(NUMBER_OF_ELEMENTS);

var counter = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);
	smooth();

	colorMode(HSB);
	background(BACKGROUND_COLOR);

	centerX = width / 2;
	centerY = height / 2;

	var radius = min(height, width) / 2 * .95;
	for (var ballIndex = 0; ballIndex < NUMBER_OF_ELEMENTS; ballIndex++) {
		balls[ballIndex] = createBall(ballIndex, radius);
	}
}

function createBall(ballIndex, radius) {
	var ball = new Ball();

	ball.hue = getBallValue(MIN_HUE, MAX_HUE, ballIndex);
	ball.centerDistance = getBallValue(0, radius, ballIndex);
	ball.size = getBallValue(MIN_SIZE, MAX_SIZE, ballIndex);
	ball.speed = NUMBER_OF_ELEMENTS - ballIndex;
	return ball;
}

function draw() {
	if (mouseIsPressed) {
		counter--;
	} else {
		counter++;
	}

	if (RERENDER_BACKGROUND) {
		background(BACKGROUND_COLOR);
		noStroke();
		fill(BACKGROUND_COLOR, 20);
		rect(0, 0, width, height);
	}

	for (var ballIndex = 0; ballIndex < NUMBER_OF_ELEMENTS; ballIndex++) {

		var angle =
			2 * PI / FULL_DURATION * (counter / 60 /* should be frameRate */)
			* balls[ballIndex].speed;

		switch (MODE) {
			case Mode.BALLS:
				drawBall(balls[ballIndex], angle);
				break;
			case Mode.LINES:
				drawLine(balls[ballIndex], angle);
				break;
			case Mode.BALLS_AND_LINES:
				drawBall(balls[ballIndex], angle);
				drawLine(balls[ballIndex], angle);
				break;

		}

	}
}

function drawBall(ball, angle) {
	noStroke();
	fill(ball.hue, 255, 255);
	ellipse(centerX + cos(angle) * ball.centerDistance, centerY + sin(angle)
		* ball.centerDistance, ball.size, ball.size);
}

function drawLine(ball, angle) {
	stroke(ball.hue, 255, 255);
	strokeWeight(10);
	line(centerX, centerY, centerX + cos(angle) * ball.centerDistance, centerY
		+ sin(angle) * ball.centerDistance);
}

function getBallValue(minValue, maxValue, ballIndex) {
	return minValue + (maxValue - minValue) / NUMBER_OF_ELEMENTS * ballIndex;
}