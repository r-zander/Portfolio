"use strict";

var ArcadeConstants = {

    ASPECT_RATIO: 16 / 5,

    GRAVITY: 3,

    Colors: {

        BACKGROUND: 5,

        BLUE: '#18CAE6',

        GOLD: '#FFB000',

        FONT: 225
    },

    FontSize: {

        H1: function () {
            return relativeFontsize(225);
        },

        H2: function () {
            return relativeFontsize(150);
        },

        H3: function () {
            return relativeFontsize(100);
        },

        NUMBERS: function (){
            return relativeFontsize(60);
        }
    },


    JUMP_FRAMES: 30,

    MAX_JUMP_STRENGTH: 20,

    setup: function () {
        this.MIN_JUMP_HEIGHT = percentageHeight(15);
        this.MAX_JUMP_HEIGHT = percentageHeight(50);
        this.START_SPEED = percentageWidth(0.25);
    },

    calculateJumpY: function (frame) {
        var c = this.MIN_JUMP_HEIGHT;
        var d = this.JUMP_FRAMES;
        return -2 * c / sq(d) * frame + 2 * c / d;
    },

    testJump: function () {
        for (var i = 0; i <= 2 * this.JUMP_FRAMES; i++) {
            console.log(i + "\t" + this.calculateJumpY(i));
        }
    }

};
