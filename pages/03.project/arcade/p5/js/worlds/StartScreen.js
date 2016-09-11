"use strict";

var StartScreen = {
    name: 'Start',

    onDisplay: function () {
        if (this.startButton === undefined) {
            this.startButton = new Button(
                function (isLandscape) {
                    if (isLandscape) {
                        return percentageWidth(100 / 9 + 100 / 6);
                    } else {
                        return percentageWidth(50);
                    }
                }, function (isLandscape) {
                    if (isLandscape) {
                        return percentageHeight(45);
                    } else {
                        return percentageHeight(50);
                    }
                },
                "Start",
                this.startGame.bind(this));
        } else {
            this.startButton._sprite.visible = true;
            this.startButton.label = "Continue";
        }
        if (Figures.level > 1) {
            if (this.restartButton === undefined) {
                this.restartButton = new Button(
                    function (isLandscape) {
                        if (isLandscape) {
                            return percentageWidth(100 / 9 + 100 / 6);
                        } else {
                            return percentageWidth(50);
                        }
                    }, function (isLandscape) {
                        if (isLandscape) {
                            return percentageHeight(75);
                        } else {
                            return percentageHeight(61);
                        }
                    },
                    "Level 1",
                    this.restartGame.bind(this));
            } else {
                this.restartButton._sprite.visible = true;
            }
        }
    },

    onHide: function () {
        this.startButton._sprite.visible = false;
        if (this.restartButton !== undefined) {
            this.restartButton._sprite.visible = false;
        }
    },

    startGame: function () {
        Screens.setCurrentWorld(Screens.GAME);
    },

    restartGame: function () {
        this.startButton._sprite.visible = false;
        this.restartButton._sprite.visible = false;
        Screens.setCurrentWorld(Screens.GAME);
        Figures.reset();
    },

    draw: function (isLandscape) {
        textSize(ArcadeConstants.FontSize.H1());
        textAlign(CENTER, TOP);

        // White "Shadow"
        var offset = ArcadeConstants.FontSize.H1() * 0.03;
        fill(ArcadeConstants.Colors.FONT);
        text("Arcade",
            percentageWidth(50) + offset,
            percentageHeight(5) + offset);

        fill(ArcadeConstants.Colors.BLUE);
        text("Arcade", percentageWidth(50), percentageHeight(5));

        // Highscore
        if (Figures.highscore !== undefined) {
            var fontSize = ArcadeConstants.FontSize.H3();
            textSize(fontSize);
            textAlign(LEFT, BOTTOM);
            fill(ArcadeConstants.Colors.FONT);
            text("Highscore", percentageWidth(60), percentageHeight(45));
            text(Figures.highscore.level + " x " + Figures.highscore.distance, percentageWidth(60), percentageHeight(45) + fontSize * 1.3);
        }

    }

};
