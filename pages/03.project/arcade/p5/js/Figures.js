var Figures = {

	// TODO for debugging
	START_LEVEL: 3,

    SPEED_NORMATOR: 1,

    distanceTraveled: 0,
    tickedFrames: 0,

    nextLevelMeter: false,

    previousLevel: 0,
    level: 0,

    newHighscore: false,

    setup: function () {
	    this.speed = ArcadeConstants.START_SPEED * this.START_LEVEL;
        this.levelSpeed = this.speed;

        this.SPEED_INCREASEMENT = ArcadeConstants.START_SPEED / 1000;
    },

    tick: function () {
        this.tickedFrames++;
        this.distanceTraveled += this.speed;
        // FIXME
        this.speed += this.SPEED_INCREASEMENT;
        this.calculateLevel();
    },

    calculateLevel: function () {
        this.level = (this.speed - ArcadeConstants.START_SPEED) / ArcadeConstants.START_SPEED * this.SPEED_NORMATOR + 1;
        var majorLevel = this.getLevelMajor();
        if (majorLevel > this.previousLevel) {
            this.onLevelUp(majorLevel);
        }
    },

    onLevelUp: function (newLevel) {
        this.previousLevel = newLevel;
        this.levelSpeed = this.speed;
        this.calculateNextLevelMeter();

        Game.onLevelUp(newLevel);
    },

    calculateNextLevelMeter: function () {
        var framesToNextLevel = ArcadeConstants.START_SPEED / this.SPEED_INCREASEMENT / this.SPEED_NORMATOR;

        var n = this.tickedFrames + framesToNextLevel;

        this.nextLevelMeter = (n + 1) * (ArcadeConstants.START_SPEED + this.SPEED_INCREASEMENT * n / 2);
    },

    getTicksFromLength: function (length) {
	    return length / this.speed;
    },

    getLevelMajor: function () {
        return floor(this.level);
    },

    getLevelMinor: function () {
        return floor(this.level % 1 * 10);
    },

    getFormattedDistanceTraveled: function () {
        return floor(this.distanceTraveled);
    },

    draw: function (isLandscape) {
        fill(ArcadeConstants.Colors.FONT);
        stroke(ArcadeConstants.Colors.BACKGROUND);

        var fontSize = ArcadeConstants.FontSize.NUMBERS();
        var outline = 0.8;

        textSize(fontSize);
        strokeWeight(fontSize * outline);
        if (debugEnabled) {
            textAlign(CENTER, BOTTOM);
            text(getFrameRate().toFixed(), Game.percentageHeight(6.5), Game.percentageHeight(6.5));
        }

        fill(ArcadeConstants.Colors.GOLD);
        textAlign(RIGHT, BOTTOM);
        var x = isLandscape ? percentageWidth(89) : percentageWidth(70);
        text(this.getLevelMajor(), x, percentageHeight(6.5));
        textAlign(LEFT, BOTTOM);
        textSize(fontSize * 0.75);
        strokeWeight(fontSize * 0.25 * outline);
        text(this.getLevelMinor(), x, percentageHeight(6.5));

        fill(ArcadeConstants.Colors.FONT);
        textSize(fontSize);
        strokeWeight(fontSize * outline);
        textAlign(RIGHT, BOTTOM);
        text(this.getFormattedDistanceTraveled(),
            percentageWidth(97.5),
            percentageHeight(6.5));
    },

    onDeath: function () {
        this.newHighscore = false;
        if (this.highscore !== undefined) {
            if (this.distanceTraveled * this.level > this.highscore.distance * this.highscore.level) {
                this.setHighscore();
            }
        } else {
            this.setHighscore();
        }
    },

    setHighscore: function () {
        this.newHighscore = true;
        this.highscore = {
            level: floor(this.level),
            distance: floor(this.distanceTraveled)
        };
    },

    restart: function () {
        this.distanceTraveled = 0;
        this.tickedFrames = 0;
        this.speed = this.levelSpeed;
    },

    reset: function () {
	    this.speed = ArcadeConstants.START_SPEED * this.START_LEVEL;
        this.levelSpeed = this.speed;
    }

};
