var Screens = {

    START: StartScreen,

    GAME: GameScreen,

    DEATH: DeathScreen,

    setup: function () {
        this.setCurrentWorld(this.START);
    },

    setCurrentWorld: function (newScreen) {
        if (this.currentWorld != newScreen) {
            if (this.currentWorld !== undefined && typeof this.currentWorld.onHide === 'function') {
                this.currentWorld.onHide();
            }
            this.currentWorld = newScreen;
            if (typeof newScreen.onDisplay === 'function') {
                newScreen.onDisplay();
            }
        }
    },

    getCurrentWorld: function () {
        return this.currentWorld;
    },

    draw: function () {
        if (this.currentWorld !== undefined) {
            this.currentWorld.draw(realDeviceOrientation.isLandscape);
        }
    },

    drawAfterSprites: function () {
        if (this.currentWorld !== undefined && typeof this.currentWorld.drawAfterSprites === 'function') {
            this.currentWorld.drawAfterSprites(realDeviceOrientation.isLandscape);
        }
    },

    dimension: function () {
        return min(windowWidth, windowHeight);
    },

    width: function (isLandscape) {
        if (isMobile) {
            return windowWidth;
        } else {
            var dimension = this.dimension();
            if (defaultFor(isLandscape, realDeviceOrientation.isLandscape)) {
                return dimension;
            } else {
                return dimension / ArcadeConstants.ASPECT_RATIO;
            }
        }
    },

    height: function (isLandscape) {
        if (isMobile) {
            return windowHeight;
        } else {
            var dimension = this.dimension();

            if (defaultFor(isLandscape, realDeviceOrientation.isLandscape)) {
                return dimension / ArcadeConstants.ASPECT_RATIO;
            } else {
                return dimension;
            }
        }
    },

    top: function (isLandscape) {
        isLandscape = defaultFor(isLandscape, realDeviceOrientation.isLandscape);
        if (isMobile) {
            return 0;
        } else if (isLandscape) {
            return (this.dimension() - this.height(isLandscape)) / 2;
        } else {
            return 0;
        }
    },

    bottom: function (isLandscape) {
        isLandscape = defaultFor(isLandscape, realDeviceOrientation.isLandscape);
        if (isMobile) {
            if (realDeviceOrientation === DeviceOrientation.PORTRAIT_SECONDARY) {
                //noinspection JSSuspiciousNameCombination
                return windowWidth;
            }
            return windowHeight;
        } else if (isLandscape) {
            return (this.dimension() + this.height(isLandscape)) / 2;
        } else {
            return this.dimension();
        }
    },

    left: function (isLandscape) {
        isLandscape = defaultFor(isLandscape, realDeviceOrientation.isLandscape);
        if (isMobile) {
            return 0;
        } else if (isLandscape) {
            return 0;
        } else {
            return (this.dimension() - this.width(isLandscape)) / 2;
        }
    },

    right: function (isLandscape) {
        isLandscape = defaultFor(isLandscape, realDeviceOrientation.isLandscape);
        if (isMobile) {
            if (realDeviceOrientation === DeviceOrientation.PORTRAIT_SECONDARY) {
                //noinspection JSSuspiciousNameCombination
                return windowHeight;
            }
            return windowWidth;
        } else if (isLandscape) {
            return this.dimension();
        } else {
            return (this.dimension() + this.width(isLandscape)) / 2;
        }
    },

    jump: function () {
        // if (this.currentWorld === this.DEATH) {
        //     this.setCurrentWorld(this.GAME);
        // }
    },

    /**
     * @return boolean or not ESC was handled.
     */
    escape: function () {
        if (this.currentWorld !== this.DEATH) {
            this.setCurrentWorld(this.DEATH);
            return true;

        }
        return false;
    }
};
