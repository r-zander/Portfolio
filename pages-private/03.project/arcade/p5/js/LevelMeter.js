"use strict";

function LevelMeter() {
    var sprite = createSprite(0, 0, 1, height);
    sprite.debug = debugEnabled;
    sprite.draw = function () {
        stroke(ArcadeConstants.Colors.GOLD);
        noFill();
        strokeWeight(2);
        line(0, 0, 0, this.height);
    };

    // super(...)
    Block.call(this, sprite);

    this.positionOutside(Direction.RIGHT);
}

// extends Block
LevelMeter.prototype = Object.create(Block.prototype);


LevelMeter.prototype.constructor = LevelMeter;