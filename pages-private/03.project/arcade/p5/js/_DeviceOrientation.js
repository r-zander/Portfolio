"use strict";

var centerX;

function setup() {
    createCanvas(windowWidth, windowHeight);

    centerX = width / 2;
    lastResizeX = windowWidth;
    lastResizeY = windowHeight;
}

function draw() {
    applyDeviceOrientation();

    background('black');
    fill('#eee');

    textAlign(CENTER);
    var y = 50;
    text("Orientation: " + deviceOrientation, centerX, y);
    y += 20;
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    text("Screen Orientation: " + orientation.type, centerX, y);
    y += 20;
    text("Real Orientation: " + realDeviceOrientation.name, centerX, y);
    y += 20;
    text("Acceleration: " + triplet(accelerationX, accelerationY, accelerationZ), centerX, y);
    y += 20;
    text("Rotation: " + triplet(rotationX, rotationY, rotationZ), centerX, y);
    y += 20;
    text("Turned X: " + turnedX, centerX, y);
    y += 20;
    text("Turned Y: " + turnedY, centerX, y);
    y += 20;
    text("Turned Z: " + turnedZ, centerX, y);
    y += 20;
    text("Movement: " + movement, centerX, y);
    y += 20;
    text("Resizes: " + resizes, centerX, y);
    y += 20;
    text("Last Resize: " + triplet(lastResizeX, lastResizeY), centerX, y);
}

var realDeviceOrientation;

function applyDeviceOrientation() {
    var orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;

    switch (orientation.type){
        case 'portrait-primary':
            realDeviceOrientation = DeviceOrientation.PORTRAIT_PRIMARY;
            break;
        case 'portrait-secondary':
            /* it's a mode not supported by Chrome on Android */
            realDeviceOrientation = DeviceOrientation.PORTRAIT_SECONDARY;
            break;
        case 'landscape-primary':
            if (rotationX <= -45 && rotationX >= -135){
            realDeviceOrientation = DeviceOrientation.PORTRAIT_SECONDARY;
            } else {
                realDeviceOrientation = DeviceOrientation.LANDSCAPE_PRIMARY;
            }
            break;
        case 'landscape-secondary':
            if (rotationX <= -45 && rotationX >= -135){
                realDeviceOrientation = DeviceOrientation.PORTRAIT_SECONDARY;
            } else {
                realDeviceOrientation = DeviceOrientation.LANDSCAPE_SECONDARY;
            }
            break;
        case 'undefined':
        case undefined:
            realDeviceOrientation = DeviceOrientation.LANDSCAPE_PRIMARY;
            break;
    }
}

function triplet(a, b, c) {
    var out = "(";
    if (typeof a === 'number') {
        out += a.toFixed(0);
    } else {
        out += a;
    }
    out += " / ";
    if (typeof b === 'number') {
        out += b.toFixed(0);
    } else {
        out += b;
    }
    out += " / ";
    if (typeof c === 'number') {
        out += c.toFixed(0);
    } else {
        out += c;
    }
    out += ")";
    return out;
}

var turnedX = 0;
var turnedY = 0;
var turnedZ = 0;

function deviceTurned() {
    switch (turnAxis) {
        case 'X':
            turnedX++;
            break;
        case 'Y':
            turnedY++;
            break;
        case 'Z':
            turnedZ++;
            break;
    }
}

var movement = 0;
function deviceMoved() {
    movement++;
}
var resizes = 0;
var lastResizeX;
var lastResizeY;
function windowResized() {
    resizes += 0.5;
    resizeCanvas(windowWidth, windowHeight);
    lastResizeX = windowWidth;
    lastResizeY = windowHeight;
    resizes += 0.5;
}

// function mousePressed() {
//     // ellipse(mouseX, mouseY, 5, 5);
//     var fs = fullscreen();
//     fullscreen(!fs);
//     // prevent default
//     return false;
// }