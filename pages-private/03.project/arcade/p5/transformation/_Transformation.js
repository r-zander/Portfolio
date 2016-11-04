"use strict";

function setup() {
    // var dimension = min(windowWidth, windowHeight);
    // createCanvas(dimension, dimension);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background('lightgray');

    push();

    translate(width / 2, height / 2);
    rotate(radians(90));
    translate(-width / 2, -height / 2);
    //translate(0,-height);

    noFill();

    stroke('blue');
    line(width * 0.35, height * 0.4, width * 0.65, height * 0.4);
    line(width * 0.35, height * 0.4, width * 0.35, height * 0.6);

    stroke('red');
    line(width * 0.35, height * 0.6, width * 0.65, height * 0.6);
    line(width * 0.65, height * 0.4, width * 0.65, height * 0.6);

    pop();

}