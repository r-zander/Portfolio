"use strict";

var dimensions;
var centerX, centerY;
var p1, p2, p3, pullFactor;
var GOLDEN_NUMBER = 0.6180339887;
var lineWeight, radius;

var rotation = 0;
var animationFrame = 0;
var animationFrame2 = 60;

function setup() {
	dimensions = min(windowWidth, windowHeight);
	createCanvas(dimensions, dimensions);
	// createCanvas(100, 100);


	centerX = width / 2;
	centerY = height / 2;

	lineWeight = dimensions / 100;
	// Linewidth gets substracted
	radius = dimensions * 0.99 * 0.5;


	// Spitze des Dreiecks
	p1 = createVector(
		centerX + cos(0) * radius,
		centerY + sin(0) * radius
	);
	// text("p1", p1.x, p1.y);

	p2 = createVector(
		centerX + cos(TWO_PI / 3) * radius,
		centerY + sin(TWO_PI / 3) * radius
	);
	// text("p2", p2.x, p2.y);

	p3 = createVector(
		centerX + cos(TWO_PI * 2 / 3) * radius,
		centerY + sin(TWO_PI * 2 / 3) * radius
	);
	// text("p3", p3.x, p3.y);

	pullFactor = 0.5;
	// pullFactor = 0;

	// frameRate(10);

}

function draw() {
	background('white');


	push();
	translate(centerX, centerY);
	rotate(PI / 2.0);
	rotate(rotation);
	translate(-centerX, -centerY);

	stroke('black');
	noFill();
	strokeWeight(lineWeight);

	ellipse(centerX, centerY, radius * 2 * map(animationFrame, 120-1, 0, 1, GOLDEN_NUMBER * (1 - GOLDEN_NUMBER)));
	ellipse(centerX, centerY, radius * 2 * map(animationFrame2, 120-1, 0, 1, GOLDEN_NUMBER * (1 - GOLDEN_NUMBER)));

	strokeWeight(lineWeight * 3 * 2);
	stroke('white');
	drawTriangle();

	stroke('black');
	noFill();
	strokeWeight(lineWeight);
	ellipse(centerX, centerY, radius * 2);

	// fill('white');
	drawTriangle();
	noFill();

	// ellipse(centerX, centerY, radius * 2 * GOLDEN_NUMBER * (1 - GOLDEN_NUMBER));

	fill('black');
	ellipse(centerX, centerY, radius * 2 * GOLDEN_NUMBER * (1 - GOLDEN_NUMBER) * (1 - GOLDEN_NUMBER));
	pop();

	push();
	translate(centerX, centerY);
	rotate(rotation);
	translate(-centerX, -centerY);

	fill('black');
	stroke('white');
	strokeWeight(lineWeight * 3);
	drawRay();


	push();
	translate(centerX, centerY);
	rotate(TWO_PI / 3.0);
	translate(-centerX, -centerY);
	drawRay();

	translate(centerX, centerY);
	rotate(TWO_PI / 3.0);
	translate(-centerX, -centerY);
	drawRay();

	pop();
	pop();

	rotation += 0.01;
	rotation %= TWO_PI;

	animationFrame += 1;
	animationFrame %= 120;
	animationFrame2 += 1;
	animationFrame2 %= 120;
}

function drawTriangle() {
	var c1 = createVector(
		p1.x * (1 - pullFactor) + centerX * pullFactor,
		p1.y * (1 - pullFactor) + centerY * pullFactor
	);
	var c2 = createVector(
		p2.x * (1 - pullFactor) + centerX * pullFactor,
		p2.y * (1 - pullFactor) + centerY * pullFactor
	);
	var c3 = createVector(
		p3.x * (1 - pullFactor) + centerX * pullFactor,
		p3.y * (1 - pullFactor) + centerY * pullFactor
	);

	beginShape();
	vertex(p1.x, p1.y);
	bezierVertex(c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
	bezierVertex(c2.x, c2.y, c3.x, c3.y, p3.x, p3.y);
	bezierVertex(c3.x, c3.y, c1.x, c1.y, p1.x, p1.y);
	endShape(CLOSE);
}

function drawRay() {
	rect(centerX - (lineWeight * 4) / 2, -radius, lineWeight * 4, radius * 1.65);
}