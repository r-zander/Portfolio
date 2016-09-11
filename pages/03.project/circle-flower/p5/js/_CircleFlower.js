"use strict";

var dimension;

var ROTATION_PER_FRAME = 0.005;

/**
 * Wie oft rotieren die Halbkreise um ihr Zentrum, bevor die ganze Zeichnung um ihr Zentrum rotiert ist
 */
var ARCS_ROTATION_MULTIPLIER = 3;

var NUMBER_OF_CIRCLES = 8;

var RELATIVE_CIRCLE_WIDTH = 0.9;

var SMALLER_CIRCLE_ANGLE_OFFSET = 0.5;

var SMALLER_CIRCLE_RELATIVE_RADIUS = 0.9;

var centerX, centerY;

var circleRadius;

var circleWidth;

var circleStrokeWeight;

var rotation = 0;

var smallerCircleWidth;

var angles = new Array(NUMBER_OF_CIRCLES);

var xs = new Array(NUMBER_OF_CIRCLES);

var ys = new Array(NUMBER_OF_CIRCLES);

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
    circleRadius = dimension * RELATIVE_CIRCLE_WIDTH / 4;
    circleWidth = circleRadius * 2;
    smallerCircleWidth = circleWidth * SMALLER_CIRCLE_RELATIVE_RADIUS;

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
        value: NUMBER_OF_CIRCLES,
        step: 1
    });

    rotationPerFrameSlider = createLabeledSlider({
        container: inputContainer,
        id: 'speed',
        labelText: 'Speed',
        min: 0,
        max: ROTATION_PER_FRAME * 3,
        value: ROTATION_PER_FRAME,
        step: 0.001
    });

    relativeCircleWidthSlider = createLabeledSlider({
        container: inputContainer,
        id: 'size',
        labelText: 'Size',
        min: 0.1,
        max: 1.5,
        value: RELATIVE_CIRCLE_WIDTH,
        step: 0.1
    });

    smallerCircleRelativeRadiusSlider = createLabeledSlider({
        container: inputContainer,
        id: 'ratio',
        labelText: 'Ratio',
        min: 0.1,
        max: 2,
        value: SMALLER_CIRCLE_RELATIVE_RADIUS,
        step: 0.1
    });

    smallerCircleAngleOffsetSlider = createLabeledSlider({
        container: inputContainer,
        id: 'translation',
        labelText: 'Translation',
        min: 0,
        max: 1,
        value: SMALLER_CIRCLE_ANGLE_OFFSET,
        step: 0.1
    });

    return inputContainer;
}

function createLabeledSlider(parameters) {
    var container = parameters.container;
    var id = parameters.id;
    var labelText = parameters.labelText;
    var min = parameters.min;
    var max = parameters.max;
    var value = parameters.value;
    var step = parameters.step;

    var label = createElement('label', labelText);
    label.parent(container);
    label.attribute('for', id);

    var defaultMarker = createDiv('');
    defaultMarker.parent(container);
    defaultMarker.class('defaultMarker');
    var offset = (value - min) / (max - min);
    defaultMarker.style('left', (offset * 100) + "%");
    // The marker has to be offset by its own width, depending on the position,
    // because the slider will always stay inside its bounds, so 100% is not outside
    defaultMarker.style('margin-left', (offset * -12) + "px");

    var slider = createSlider(min, max, value, step);
    slider.parent(container);
    slider.id(id);

    return slider;
}

function draw() {
    checkNumberOfCircles();
    checkRotationsPerFrame();
    checkRelativeCircleWidth();
    checkSmallerCircleRelativeRadius();
    checkSmallerCircleAngleOffset();

    background('#222');

    noFill();

    for (var i = 0; i < NUMBER_OF_CIRCLES; i++) {
        angles[i] = rotation + TWO_PI / NUMBER_OF_CIRCLES * i;
        xs[i] = centerX + cos(angles[i]) * circleRadius;
        ys[i] = centerY + sin(angles[i]) * circleRadius;
    }

    stroke(255);
    strokeWeight(circleStrokeWeight);
    for (i = 0; i < NUMBER_OF_CIRCLES; i++) {
        arc(
            xs[i],
            ys[i],
            circleWidth,
            circleWidth,
            angles[i] + rotation * 9,
            angles[i] + PI + rotation * 9);
    }

    var smallerCircleAngleOffset = SMALLER_CIRCLE_ANGLE_OFFSET * (Math.PI * 2 / NUMBER_OF_CIRCLES);
    for (i = 0; i < NUMBER_OF_CIRCLES; i++) {
        angles[i] =
            rotation + TWO_PI / NUMBER_OF_CIRCLES * i
            + smallerCircleAngleOffset;
        xs[i] = centerX + cos(angles[i]) * circleRadius;
        ys[i] = centerY + sin(angles[i]) * circleRadius;

    }

    stroke('#222');
    for (i = 0; i < NUMBER_OF_CIRCLES; i++) {
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
    for (i = 0; i < NUMBER_OF_CIRCLES; i++) {
        arc(
            xs[i],
            ys[i],
            smallerCircleWidth,
            smallerCircleWidth,
            angles[i] + rotation * ARCS_ROTATION_MULTIPLIER,
            angles[i] + PI + rotation * ARCS_ROTATION_MULTIPLIER);
    }

    rotation += ROTATION_PER_FRAME;
    rotation %= TWO_PI;

    // drawFPS();
}

function checkNumberOfCircles() {
    if (numberOfCirclesSlider.value() != NUMBER_OF_CIRCLES) {
        NUMBER_OF_CIRCLES = numberOfCirclesSlider.value();

        angles = new Array(NUMBER_OF_CIRCLES);
        xs = new Array(NUMBER_OF_CIRCLES);
        ys = new Array(NUMBER_OF_CIRCLES);
    }
}

function checkRotationsPerFrame() {
    if (rotationPerFrameSlider.value() != ROTATION_PER_FRAME) {
        ROTATION_PER_FRAME = rotationPerFrameSlider.value();
    }
}

function checkRelativeCircleWidth() {
    if (relativeCircleWidthSlider.value() != RELATIVE_CIRCLE_WIDTH) {
        RELATIVE_CIRCLE_WIDTH = relativeCircleWidthSlider.value();

        circleRadius = dimension * RELATIVE_CIRCLE_WIDTH / 4;
        circleWidth = circleRadius * 2;
        smallerCircleWidth = circleWidth * SMALLER_CIRCLE_RELATIVE_RADIUS;
    }
}

function checkSmallerCircleRelativeRadius() {
    if (smallerCircleRelativeRadiusSlider.value() != SMALLER_CIRCLE_RELATIVE_RADIUS) {
        SMALLER_CIRCLE_RELATIVE_RADIUS = smallerCircleRelativeRadiusSlider.value();

        smallerCircleWidth = circleWidth * SMALLER_CIRCLE_RELATIVE_RADIUS;
    }
}
function checkSmallerCircleAngleOffset() {
    if (smallerCircleAngleOffsetSlider.value() != SMALLER_CIRCLE_ANGLE_OFFSET) {
        SMALLER_CIRCLE_ANGLE_OFFSET = smallerCircleAngleOffsetSlider.value();
    }
}


// function drawFPS() {
//     fill(255, 255, 255);
//     noStroke();
//     textSize(12);
//     textAlign(CENTER, BOTTOM);
//     text(getFrameRate().toFixed(1), 50, 50);
// }