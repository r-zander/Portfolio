"use strict";

var DeathScreen = {
    name: 'Death',

    /**
     * On death
     */
    onDisplay: function () {
        Game.onDeath();
        Figures.onDeath();
        if (this.backButton === undefined){
            this.backButton = new Button(
                function (isLandscape) {
                    if (isLandscape) {
                        return percentageWidth(100 / 6 + 5);
                    } else {
                        return percentageWidth(50);
                    }
                }, function (isLandscape) {
                    if (isLandscape) {
                        return percentageHeight(75);
                    } else {
                        return percentageHeight(92);
                    }
                },
                "Menu");
        } else {
            this.backButton._sprite.visible = true;
        }
    },

    onHide: function () {
        this.backButton._sprite.visible = false;
    },

    toMenu: function () {
        Screens.setCurrentWorld(Screens.START);
    },

    toGame: function () {
        Screens.setCurrentWorld(Screens.GAME);
    },

    draw: function () {
        if (mouseIsPressed && isNextClick){
            this.backButton._sprite.mouseUpdate();
            isNextClick = false;

            if (this.backButton._sprite.mouseIsPressed){
                this.toMenu();
            } else {
                this.toGame();
            }
        }
        if (keyIsPressed && key === ' '){
            this.toGame();
        }

        textSize(ArcadeConstants.FontSize.H1());
        textAlign(CENTER, TOP);
        fill(ArcadeConstants.Colors.FONT);
        text("Dead", width / 2, percentageHeight(5));

        textSize(ArcadeConstants.FontSize.H2());

        fill(ArcadeConstants.Colors.GOLD);
        textAlign(RIGHT, TOP);
        var distance = Figures.getFormattedDistanceTraveled();
        var x = width / 2 - percentageWidth(1.6 + 0.9 * this.countDigits(distance));
        text(Figures.getLevelMajor(), x, percentageHeight(5 + 5) + ArcadeConstants.FontSize.H1());

        textAlign(LEFT, TOP);
        fill(ArcadeConstants.Colors.FONT);
        text(" x " + distance,
            x, percentageHeight(5 + 5) + ArcadeConstants.FontSize.H1());

        if (Figures.newHighscore){
            textSize(ArcadeConstants.FontSize.H2());
            textAlign(CENTER, TOP);
            fill(ArcadeConstants.Colors.BLUE);
            text("New\nHighscore!", percentageWidth(75), percentageHeight(5) + ArcadeConstants.FontSize.H1() / 2);
        }

        textSize(ArcadeConstants.FontSize.H2());
        textAlign(RIGHT, CENTER);
        fill(ArcadeConstants.Colors.FONT);
        text("Jump to continue", percentageWidth(90), percentageHeight(75));
    },

    countDigits: function (number) {
        return (number + "").length;
    }

};
