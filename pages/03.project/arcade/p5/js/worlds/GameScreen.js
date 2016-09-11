"use strict";

var GameScreen = {
    name: 'Game',

    onDisplay: function () {
        Game.onStart();
    },

    draw: function (isLandscape) {
        Game.draw(isLandscape);
    },

    drawAfterSprites: function (isLandscape) {
        Game.drawAfterSprites(isLandscape);
    }

};
