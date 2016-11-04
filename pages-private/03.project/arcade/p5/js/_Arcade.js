"use strict";

var realDeviceOrientation;
var isMobile = ("ontouchstart" in window);
var debugEnabled = false;


var isNextClick = true;

function setup() {
    realDeviceOrientation = DeviceOrientation.get();
    // realDeviceOrientation = DeviceOrientation.PORTRAIT_PRIMARY;
    createCanvas();
    resize();

    ArcadeConstants.setup();
    Figures.setup();
    Screens.setup();
    GroundBlock.setup();
    // frameRate(5);
}

function draw() {
    camera.off();

    if (isMobile) {
        realDeviceOrientation = DeviceOrientation.get();
    }

    if (targetWidth || targetHeight) {
        var newWidth, newHeight;
        if (width > targetWidth) {
            newWidth = width - stepsToTarget;
            // newWidth = width + Math.ceil((targetWidth - width) / 10);
            if (newWidth <= targetWidth) {
                newWidth = targetWidth;
                targetWidth = false;
            }
        } else if (width < targetWidth) {
            // newWidth = width +  Math.ceil((targetWidth - width) / 10);
            newWidth = width + stepsToTarget;
            if (newWidth >= targetWidth) {
                newWidth = targetWidth;
                targetWidth = false;
            }
        } else {
            targetWidth = false;
        }
        if (height > targetHeight) {
            // newHeight = height + Math.ceil((targetHeight - height) / 10);
            newHeight = height - stepsToTarget;
            if (newHeight <= targetHeight) {
                newHeight = targetHeight;
                targetHeight = false;
            }
        } else if (height < targetHeight) {
            // newHeight = height + Math.ceil((targetHeight - height) / 10);
            newHeight = height + stepsToTarget;
            if (newHeight >= targetHeight) {
                newHeight = targetHeight;
                targetHeight = false;
            }
        } else {
            targetHeight = false;
        }
        newWidth = newWidth || width;
        newHeight = newHeight || height;
        resizeCanvas(newWidth, newHeight, true);
        canvas.style['margin-top'] = (windowHeight - newHeight) / 2 + "px";
    }

    drawBackground();
    // finishBackground();

    push();

    if (isMobile && realDeviceOrientation.rotationForMobile) {
        rotate(realDeviceOrientation.rotationForMobile());
    } else {
        translate(Screens.left(), Screens.top());
    }

    Screens.draw();
    drawSprites();
    pop();
    Screens.drawAfterSprites();

    finishBackground();

    drawHandheldBottom();
}
function drawBackground() {
    if (isMobile) {
        background(ArcadeConstants.Colors.BACKGROUND);
    } else {
        fill(ArcadeConstants.Colors.BACKGROUND);
        noStroke();
        rect(Screens.left(), Screens.top(), Screens.width(), Screens.height());
    }
}

function finishBackground() {
    if (!isMobile) {
        fill('#222');
        noStroke();
        if (realDeviceOrientation.isLandscape) {
            rect(0, 0, width, Screens.top());
            rect(0, Screens.bottom(), width, Screens.top());
        } else {
            rect(0, 0, Screens.left(), height);
            rect(Screens.right(), 0, Screens.left(), height);
        }
    }
}

function drawHandheldBottom() {
    if (!debugEnabled) {
        return;
    }
    var indicatorWeight = 5;
    noStroke();
    fill('red');
    switch (realDeviceOrientation) {
        case DeviceOrientation.PORTRAIT_PRIMARY:
            rect(Screens.left(), Screens.bottom() - indicatorWeight, Screens.width(), indicatorWeight);
            break;
        case DeviceOrientation.PORTRAIT_SECONDARY:
            rect(Screens.left(), Screens.top(), Screens.width(), indicatorWeight);
            break;
        case DeviceOrientation.LANDSCAPE_PRIMARY:
            rect(Screens.right() - indicatorWeight, Screens.top(), indicatorWeight, Screens.height());
            break;
        case DeviceOrientation.LANDSCAPE_SECONDARY:
            rect(Screens.left(), Screens.top(), indicatorWeight, Screens.height());
            break;
    }
}

function keyPressed() {
    switch (keyCode) {
        case 32: // SPACE
            Screens.jump();
            break;
        case ESCAPE:
            if (Screens.escape()) {
                // Don't pass ESC through
            }
            break;
        case LEFT_ARROW:
            realDeviceOrientation = realDeviceOrientation.counterClockwise;
            // setTargetDimensions();
            resize();
            break;
        case RIGHT_ARROW:
            realDeviceOrientation = realDeviceOrientation.clockwise;
            // setTargetDimensions();
            resize();
            break;
        default:
            switch (key) {
                case 'd':
                case 'D':
                    if (debugEnabled) {
                        frameRate(60);
                    } else {
                        frameRate(1);
                    }
                    debugEnabled = !debugEnabled;
                    getSprites().forEach(function (sprite) {
                        sprite.debug = debugEnabled;
                    });
            }
            break;
    }
}

var targetWidth = false;
var targetHeight = false;
var stepsToTarget = 10; // 11 frames ~ 0,18 sec = gewünschte Dauer

function setTargetDimensions() {
    targetWidth = Screens.width();
    targetHeight = Screens.height();
}

function mousePressed() {
    Screens.jump();
}

function mouseReleased() {
    isNextClick = true;
}

function windowResized() {
    resize();
}

function resize() {
    if (isMobile) {
        resizeCanvas(Screens.width(), Screens.height());
    } else {
        resizeCanvas(Screens.dimension(), Screens.dimension());
    }
    Button.resizeAll();
}

function percentageWidth(percentage) {
    return percentage / 100 * Screens.width();
}

function percentageHeight(percentage) {
    return percentage / 100 * Screens.height();
}

function relativeFontsize(size) {
    if (isMobile || realDeviceOrientation.isLandscape) {
        return round(size * Screens.height() / 1080);
    }
    // return size;
    return round(size / ArcadeConstants.ASPECT_RATIO * Screens.height() / 1080);
}

function currentWorld() {
    return Screens.getCurrentWorld();
}
