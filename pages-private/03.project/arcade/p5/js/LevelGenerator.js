"use strict";

var LevelGenerator = {
    createFirstBlock: function (position) {
        var newBlock;

        switch (position) {
            case GroundBlock.Position.FLOOR:
                newBlock = new GroundBlock(
                    position,
                    Game.percentageWidth(95),
                    Game.percentageHeight(12),
                    this.createGapSize(position));
                newBlock.positionInside(Corner.BOTTOM_LEFT);
                break;
            case GroundBlock.Position.CEILING:
            case GroundBlock.Position.FLOATING:
                newBlock = this.createNextBlock(position);
                newBlock.x(Game.percentageWidth(random(100, 250)));
                break;
        }

        return newBlock;
    },

    createGapSize: function (position) {
        switch (position) {
            case GroundBlock.Position.FLOOR:
            case GroundBlock.Position.CEILING:
                return Game.percentageWidth(random(0.5, 3.8)) * Figures.speed;
            case GroundBlock.Position.FLOATING:
                return Game.percentageWidth(random(1, 40)) * Figures.speed;
        }
    },

    createNextBlock: function (position) {
        var blockWidth, blockHeight, gapSize;
        var speed = Figures.speed;
        switch (position) {
            case GroundBlock.Position.FLOOR:
            case GroundBlock.Position.CEILING:
                blockWidth = Game.percentageWidth(random(8 + 0.5 * speed, 75 + 0.05 * speed));
                blockHeight = Game.percentageHeight(random(2.5, 25));
                break;
            case GroundBlock.Position.FLOATING:
                blockWidth = Game.percentageWidth(3);
                //noinspection JSSuspiciousNameCombination
                blockHeight = blockWidth;
                break;
        }
        return new GroundBlock(position, blockWidth, blockHeight, this.createGapSize(position));
    }
};