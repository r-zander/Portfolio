"use strict";

function Ball() {
}

/**
 * Enum
 */
var Mode = {
	BALLS: '0',
	LINES: '1',
	BALLS_AND_LINES: '2'
};

var NUMBER_OF_ELEMENTS = 36;

var MIN_HUE = 0;

var MAX_HUE = 340;

var MIN_SIZE = 7;

var MAX_SIZE = 30;

var BACKGROUND_COLOR;


/**
 * In seconds.
 */
var FULL_DURATION = 60;

var centerX;

var centerY;

var balls;

var counter = 0;
var rotation = 0;

var dimension;
var radius;

var elementTypeSelector;
var redrawBackgroundToggle;
var speedSlider;
var ballCountSlider;

function setup() {
	dimension = min(windowWidth, windowHeight);
	var canvas = createCanvas(dimension, dimension);
	smooth();

	BACKGROUND_COLOR = color('#222222');
	colorMode(HSB);
	background(BACKGROUND_COLOR);

	centerX = width / 2;
	centerY = height / 2;

	radius = dimension / 2 * .95;

	createBalls(NUMBER_OF_ELEMENTS);

	var wrapper = createDiv('');
	wrapper.id('wrapper');
	wrapper.style('width', dimension * 1.5 + "px");

	wrapper.child(createInputs());

	wrapper.child(canvas);
}

function createInputs() {
	var inputContainer = createDiv('');
	inputContainer.class('inputs');
	inputContainer.style('width', dimension / 2 + "px");

	inputContainer.child(createElement('h2', 'Manipulate Animation'));

	/*
	 * Mode Selector
	 */
	var label = createElement('label', 'Elements');
	label.parent(inputContainer);
	label.class('forRadio');
	label.attribute('for', 'elements');

	elementTypeSelector = createRadio();
	elementTypeSelector.parent(inputContainer);
	elementTypeSelector.id('elements');
	elementTypeSelector.option('Orbs', 0);
	elementTypeSelector.option('Rays', 1);
	elementTypeSelector.option('Orbs & Rays', 2);
	elementTypeSelector.value(Mode.BALLS);

	ballCountSlider = createLabeledSlider({
		container: inputContainer,
		id: 'count',
		labelText: 'Count',
		min: 3,
		max: 45,
		value: NUMBER_OF_ELEMENTS,
		step: 1
	});

	/*
	 * Re-render background toggle
	 */
	redrawBackgroundToggle = createCheckbox('Redraw Background?', true);
	redrawBackgroundToggle.class('checkbox');
	redrawBackgroundToggle.parent(inputContainer);

	var baseSpeed = 2 * PI / FULL_DURATION / 60;
	speedSlider = createLabeledSlider({
		container: inputContainer,
		id: 'speed',
		labelText: 'Speed',
		min: -baseSpeed * 2,
		max: baseSpeed * 2,
		value: baseSpeed,
		step: baseSpeed / 15
	});

	return inputContainer;
}

function createBalls(count) {
	balls = new Array(count);
	for (var ballIndex = 0; ballIndex < count; ballIndex++) {
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

function getBallValue(minValue, maxValue, ballIndex) {
	return minValue + (maxValue - minValue) / balls.length * ballIndex;
}

function draw() {
	if (redrawBackgroundToggle.checked()) {
		background(BACKGROUND_COLOR);
		noStroke();
		fill(BACKGROUND_COLOR, 20);
		rect(0, 0, width, height);
	}

	rotation += speedSlider.value();

	checkBallCountSlider();

	balls.forEach(function (ball) {
		var angle = rotation * ball.speed;

		switch (elementTypeSelector.value()) {
			case Mode.BALLS:
				drawBall(ball, angle);
				break;
			case Mode.LINES:
				drawLine(ball, angle);
				break;
			case Mode.BALLS_AND_LINES:
				drawBall(ball, angle);
				drawLine(ball, angle);
				break;
		}
	});
}

function checkBallCountSlider(){
	if (ballCountSlider.value() != balls.length){
		createBalls(ballCountSlider.value());
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