var Game = {
	firstStart: true,
	levelMeterSpawned: false,

	onStart: function () {
		if (this.firstStart) {
			if (isMobile) {
				fullscreen(true);
			}
			this.unit = new Unit();
		} else {
			Figures.restart();
		}
		this.firstStart = false;

		this.unit.resetPosition();

		this.blocks = [];

		this.levelMeters = [];

		LevelGeneratorV2.onStart();
	},

	draw: function (isLandscape) {
		LevelGeneratorV2.tick(Figures.getLevelMajor());

		for (var i = this.blocks.length - 1; i >= 0; i--) {
			var block = this.blocks[i];

			if (block.move(Figures.speed, Direction.LEFT) === Position.OUTSIDE) {
				block._sprite.remove();
				this.blocks.splice(i, 1);
			}
		}

		for (i = this.levelMeters.length - 1; i >= 0; i--) {
			var levelMeter = this.levelMeters[i];
			if (levelMeter.move(Figures.speed, Direction.LEFT) === Position.OUTSIDE) {
				levelMeter._sprite.remove();
				this.levelMeters.splice(i, 1);
			}
		}

		if (mouseIsPressed) {
			this.unit.jump();
		}

		if (keyIsPressed) {
			switch (keyCode) {
				case KEY.SPACE:
					this.unit.jump();
					break;
			}
		}

		switch (this.unit.update(this.getGravityDirection(), this.blocks)) {
			case Unit.State.DEAD:
				Screens.setCurrentWorld(Screens.DEATH);
				break;
			default:
				break;
		}

		if (!isMobile) {
			translate(-Screens.left(), -Screens.top());
		}


		if (!this.levelMeterSpawned && Figures.distanceTraveled >= Figures.nextLevelMeter - width + this.unit.x()) {
			this.levelMeters.push(new LevelMeter());
			this.levelMeterSpawned = true;
		}

		translate(width / 2, height / 2);
		rotate(realDeviceOrientation.rotation);
		translate(-width / 2, -height / 2);
		translate(Game.left(), Game.top());
	},

	drawAfterSprites: function (isLandscape) {
		push();
		// translate(-Screens.left(), -Screens.top());

		//rotate(-realDeviceOrientation.rotation);

		translate(Screens.left(), Screens.top());
		Figures.draw(isLandscape);
		Figures.tick();
		pop();
	},

	dimension: function () {
		return Screens.dimension();
	},

	width: function () {
		return Screens.width(true);
	},

	height: function () {
		return Screens.height(true);
	},

	top: function () {
		return Screens.top(true);
	},

	bottom: function () {
		return Screens.bottom(true);
	},

	left: function () {
		return Screens.left(true);
	},

	right: function () {
		return Screens.right(true);
	},

	percentageWidth: function (percentage) {
		return percentage / 100 * this.width();
	},

	percentageHeight: function (percentage) {
		return percentage / 100 * this.height();
	},

	getGravityDirection: function () {
		if (isMobile) {
			switch (realDeviceOrientation) {
				case DeviceOrientation.PORTRAIT_PRIMARY:
					return Direction.BOTTOM;
				case DeviceOrientation.PORTRAIT_SECONDARY:
					if (DeviceOrientation.getNative().type === 'landscape-primary') {
						return Direction.LEFT;
					} else {
						return Direction.RIGHT;
					}
				case DeviceOrientation.LANDSCAPE_PRIMARY:
					return Direction.BOTTOM;
				case DeviceOrientation.LANDSCAPE_SECONDARY:
					return Direction.TOP;
			}
		} else {
			switch (realDeviceOrientation) {
				case DeviceOrientation.LANDSCAPE_PRIMARY:
					return Direction.BOTTOM;
				case DeviceOrientation.PORTRAIT_PRIMARY:
					return Direction.RIGHT;
				case DeviceOrientation.PORTRAIT_SECONDARY:
					return Direction.LEFT;
				case DeviceOrientation.LANDSCAPE_SECONDARY:
					return Direction.TOP;
			}
		}


	},

	onLevelUp: function (newLevel) {
		this.levelMeterSpawned = false;
	},

	onDeath: function () {
		if (mouseIsPressed) {
			isNextClick = false;
		}

		if (!this.firstStart) {
			this.unit._sprite.visible = false;
			this.blocks.forEach(function (block) {
				block._sprite.remove();
			});
			this.levelMeters.forEach(function (levelMeter) {
				levelMeter._sprite.remove();
			});
		}

		LevelGeneratorV2.onDeath();
	}

};
