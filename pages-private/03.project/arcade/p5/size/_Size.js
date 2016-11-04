"use strict";

var isMobile = false;
var gameWidth, gameHeight;
var sizeModifier = 10;

function setup() {
    createCanvas();
    gameWidth = windowWidth / 2;
    gameHeight = windowHeight / 2;
    resize();
}

function draw() {
    if (targetWidth || targetHeight){
        var newWidth, newHeight;
        if (width > targetWidth){
            newWidth = width - stepsToTarget;
            // newWidth = width + Math.ceil((targetWidth - width) / 10);
            if (newWidth <= targetWidth){
                newWidth = targetWidth;
                targetWidth = false;
            }
        } else if (width < targetWidth) {
            // newWidth = width +  Math.ceil((targetWidth - width) / 10);
            newWidth = width + stepsToTarget;
            if (newWidth >= targetWidth){
                newWidth = targetWidth;
                targetWidth = false;
            }
        } else {
            targetWidth = false;
        }
        if (height > targetHeight){
            // newHeight = height + Math.ceil((targetHeight - height) / 10);
            newHeight = height - stepsToTarget;
            if (newHeight <= targetHeight){
                newHeight = targetHeight;
                targetHeight = false;
            }
        } else if (height < targetHeight){
            // newHeight = height + Math.ceil((targetHeight - height) / 10);
            newHeight = height + stepsToTarget;
            if (newHeight >= targetHeight){
                newHeight = targetHeight;
                targetHeight = false;
            }
        } else {
            targetHeight = false;
        }
        newWidth = newWidth || width;
        newHeight = newHeight || height;
        console.log("Resize from (" + width + " / " + height + ") to (" + newWidth + " / " + newHeight + ")");
        resizeCanvas(newWidth, newHeight, true);
        canvas.style['margin-top'] = (windowHeight - newHeight) / 2 + "px";
    }


    background(0);

    textSize(100);
    textAlign(CENTER, BOTTOM);
    fill('#eee');
    text("Some Text", width / 2, height / 2);
}

function keyPressed() {
    switch (keyCode){
        case UP_ARROW:
            setTargetDimensions();
            // gameHeight+=sizeModifier;
            // resize();
            break;
        case LEFT_ARROW:
            setTargetDimensions();
            // gameWidth-=sizeModifier;
            // resize();
            break;
        case DOWN_ARROW:
            setTargetDimensions();
            // gameHeight-=sizeModifier;
            // resize();
            break;
        case RIGHT_ARROW:
            setTargetDimensions();
            // gameWidth+=sizeModifier;
            // resize();
            break;
    }
}

var targetWidth = false;
var targetHeight = false;
var stepsToTarget = 10;

function setTargetDimensions() {
    if (width === gameWidth){
        //noinspection JSSuspiciousNameCombination
        targetWidth = gameHeight;
        //noinspection JSSuspiciousNameCombination
        targetHeight = gameWidth;
    } else {
        targetWidth = gameWidth;
        targetHeight = gameHeight;
    }
}

function resize() {
    var gHeight = gameHeight;
    resizeCanvas(gameWidth, gHeight);
    if (!isMobile) {
        canvas.style['margin-top'] = (windowHeight - gHeight) / 2 + "px";
        // canvas.style['margin'] = 0;
    }
}