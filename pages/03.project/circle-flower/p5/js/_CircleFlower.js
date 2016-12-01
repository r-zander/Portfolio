"use strict";

var dimension;

var rotationPerFrame = 0.005;

/**
 * Wie oft rotieren die Halbkreise um ihr Zentrum, bevor die ganze Zeichnung um ihr Zentrum rotiert ist
 */
var ARCS_ROTATION_MULTIPLIER = 3;

var numberOfCircles = 8;

var relativeCircleWidth = 0.9;

var smallerCircleAngleOffset = 0.5;

var smallerCircleRelativeRadius = 0.9;

var centerX, centerY;

var circleRadius;

var circleWidth;

var circleStrokeWeight;

var rotation = 0;

var smallerCircleWidth;

var angles = new Array(numberOfCircles);

var xs = new Array(numberOfCircles);

var ys = new Array(numberOfCircles);

var numberOfCirclesSlider;
var rotationPerFrameSlider;
var relativeCircleWidthSlider;
var smallerCircleRelativeRadiusSlider;
var smallerCircleAngleOffsetSlider;

function setup() {
	dimension = min(windowWidth, windowHeight);
	var canvas = createCanvas(dimension, dimension);

	centerX = dimension / 2;
	centerY = dimension / 2;
	circleRadius = dimension * relativeCircleWidth / 4;
	circleWidth = circleRadius * 2;
	smallerCircleWidth = circleWidth * smallerCircleRelativeRadius;

	circleStrokeWeight = dimension / 180;

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

	numberOfCirclesSlider = createLabeledSlider({
		container: inputContainer,
		id: 'circles',
		labelText: 'Circles',
		min: 2,
		max: 10,
		value: numberOfCircles,
		step: 1
	});

	rotationPerFrameSlider = createLabeledSlider({
		container: inputContainer,
		id: 'speed',
		labelText: 'Speed',
		min: 0,
		max: rotationPerFrame * 3,
		value: rotationPerFrame,
		step: 0.001
	});

	relativeCircleWidthSlider = createLabeledSlider({
		container: inputContainer,
		id: 'size',
		labelText: 'Size',
		min: 0.1,
		max: 1.5,
		value: relativeCircleWidth,
		step: 0.1
	});

	smallerCircleRelativeRadiusSlider = createLabeledSlider({
		container: inputContainer,
		id: 'ratio',
		labelText: 'Ratio',
		min: 0.1,
		max: 2,
		value: smallerCircleRelativeRadius,
		step: 0.1
	});

	smallerCircleAngleOffsetSlider = createLabeledSlider({
		container: inputContainer,
		id: 'translation',
		labelText: 'Translation',
		min: 0,
		max: 1,
		value: smallerCircleAngleOffset,
		step: 0.1
	});

	return inputContainer;
}

function draw() {
	checkNumberOfCircles();
	checkRotationsPerFrame();
	checkRelativeCircleWidth();
	checkSmallerCircleRelativeRadius();
	checkSmallerCircleAngleOffset();

	background('#222');

	noFill();

	for (var i = 0; i < numberOfCircles; i++) {
		angles[i] = rotation + TWO_PI / numberOfCircles * i;
		xs[i] = centerX + cos(angles[i]) * circleRadius;
		ys[i] = centerY + sin(angles[i]) * circleRadius;
	}

	stroke(255);
	strokeWeight(circleStrokeWeight);
	for (i = 0; i < numberOfCircles; i++) {
		arc(
			xs[i],
			ys[i],
			circleWidth,
			circleWidth,
			angles[i] + rotation * 9,
			angles[i] + PI + rotation * 9);
	}

	var angleOffset = smallerCircleAngleOffset * (Math.PI * 2 / numberOfCircles);
	for (i = 0; i < numberOfCircles; i++) {
		angles[i] =
			rotation + TWO_PI / numberOfCircles * i
			+ angleOffset;
		xs[i] = centerX + cos(angles[i]) * circleRadius;
		ys[i] = centerY + sin(angles[i]) * circleRadius;

	}

	stroke('#222');
	for (i = 0; i < numberOfCircles; i++) {
		arc(
			xs[i],
			ys[i],
			smallerCircleWidth,
			smallerCircleWidth,
			angles[i] + rotation * ARCS_ROTATION_MULTIPLIER,
			angles[i] + PI + rotation * ARCS_ROTATION_MULTIPLIER);
	}

	stroke(255);
	strokeWeight(circleStrokeWeight / 2);
	for (i = 0; i < numberOfCircles; i++) {
		arc(
			xs[i],
			ys[i],
			smallerCircleWidth,
			smallerCircleWidth,
			angles[i] + rotation * ARCS_ROTATION_MULTIPLIER,
			angles[i] + PI + rotation * ARCS_ROTATION_MULTIPLIER);
	}

	rotation += rotationPerFrame;
	rotation %= TWO_PI;

	// drawFPS();
}

function checkNumberOfCircles() {
	if (numberOfCirclesSlider.value() != numberOfCircles) {
		numberOfCircles = numberOfCirclesSlider.value();

		angles = new Array(numberOfCircles);
		xs = new Array(numberOfCircles);
		ys = new Array(numberOfCircles);
	}
}

function checkRotationsPerFrame() {
	if (rotationPerFrameSlider.value() != rotationPerFrame) {
		rotationPerFrame = rotationPerFrameSlider.value();
	}
}

function checkRelativeCircleWidth() {
	if (relativeCircleWidthSlider.value() != relativeCircleWidth) {
		relativeCircleWidth = relativeCircleWidthSlider.value();

		circleRadius = dimension * relativeCircleWidth / 4;
		circleWidth = circleRadius * 2;
		smallerCircleWidth = circleWidth * smallerCircleRelativeRadius;
	}
}

function checkSmallerCircleRelativeRadius() {
	if (smallerCircleRelativeRadiusSlider.value() != smallerCircleRelativeRadius) {
		smallerCircleRelativeRadius = smallerCircleRelativeRadiusSlider.value();

		smallerCircleWidth = circleWidth * smallerCircleRelativeRadius;
	}
}
function checkSmallerCircleAngleOffset() {
	if (smallerCircleAngleOffsetSlider.value() != smallerCircleAngleOffset) {
		smallerCircleAngleOffset = smallerCircleAngleOffsetSlider.value();
	}
}


// function drawFPS() {
//     fill(255, 255, 255);
//     noStroke();
//     textSize(12);
//     textAlign(CENTER, BOTTOM);
//     text(getFrameRate().toFixed(1), 50, 50);
// }