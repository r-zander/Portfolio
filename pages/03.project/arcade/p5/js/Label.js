"use strict";

function Label(x, y, label) {
    this.label = label;
    this.x = x;
    this.y = y;


    var isLandscape = realDeviceOrientation.isLandscape;
    this._sprite = createSprite(
        this.x(isLandscape),
        this.y(isLandscape),
        this.width(isLandscape),
        this.height(isLandscape));
    this._sprite.debug = debugEnabled;
    this._sprite.mouseActive = true;

    var button = this;
    this._sprite.draw = function () {
        noFill();
        if (this.mouseIsOver) {
            stroke(ArcadeConstants.Colors.FONT);
        } else {
            stroke(ArcadeConstants.Colors.BLUE);
        }
        strokeWeight(3);
        var cornerRadius = button.cornerRadius(realDeviceOrientation.isLandscape);
        //noinspection JSPotentiallyInvalidUsageOfThis
        rect(0, 0, this.width, this.height,
            0, cornerRadius, cornerRadius, cornerRadius);

        noStroke();
        if (this.mouseIsOver) {
            fill(ArcadeConstants.Colors.FONT);
        } else {
            fill(ArcadeConstants.Colors.BLUE);
        }
        textAlign(CENTER, CENTER);
        textSize(ArcadeConstants.FontSize.H2());
        text(button.label, 0, 0);
    };

    Button.all.push(this);
}

Button.setup = function () {
    Button.all = [];
};

Button.resizeAll = function () {
    Button.all.forEach(function (button) {
        button.rescale();
    });
};

Button.prototype = {
    cornerRadius: function (isLandscape) {
        if (isLandscape) {
            return percentageHeight(4);
        } else {
            return percentageWidth(4);
        }
    },

    width: function (isLandscape) {
        if (isLandscape) {
            return percentageWidth(100 / 3);
        } else {
            return percentageWidth(80);
        }
    },

    height: function (isLandscape) {
        if (isLandscape) {
            return percentageHeight(20);
        } else {
            return percentageHeight(6);
        }
    },

    rescale: function () {
        var isLandscape = realDeviceOrientation.isLandscape;

        this._sprite.position.x = this.x(isLandscape);
        this._sprite.position.y = this.y(isLandscape);

        this._sprite.width = this.width(isLandscape);
        this._sprite.height = this.height(isLandscape);
    }
};