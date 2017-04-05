"use strict";

var LevelGeneratorV2 = {
	stages: {
		HORIZONTAL: "HORIZONTAL",
		VERTICAL: "VERTICAL"
	},

	firstBlockSpawned: false,

	onStart: function () {
		this.ticksToNextBlock = 0;
		this.ticksToNextStage = 0;

		this.nextStage = null;
		this.currentStage = null;
		this.allStages = Object.keys(this.stages);

		/*
		 * { from: STAGE, to: STAGE }
		 */
		// this.currentTransition = null;
	},

	tick: function () {
		if (this.ticksToNextStage <= 0) {
			// Next stage
			if (this.nextStage === null) {
				// On start the level generation mode is in favor of
				// the device orientation to prevent instant deaths
				if (realDeviceOrientation.isLandscape) {
					this.currentStage = this.stages.HORIZONTAL;
				} else {
					this.currentStage = this.stages.VERTICAL;
				}
			} else {
				this.currentStage = this.nextStage;
			}
			this.nextStage = this.allStages[randomInt(0, this.allStages.length)];

			// NextLevel is every 1000 frames right now
			this.ticksToNextStage = randomInt(500, 800);

			// TODO
			console.debug("Next Stage " + this.nextStage + " in " + this.ticksToNextStage + " frames (" + (this.ticksToNextStage / frameRate()).toFixed(1) + "s)");
		} else {
			this.ticksToNextStage--;
		}

		if (this.ticksToNextBlock <= 0) {
			var block;
			if (this.firstBlockSpawned === false) {
				block = this.createFirstBlock(GroundBlock.Position.FLOOR);
				Game.blocks.push(block);
				var intendedGapSize = this.createGapSize(GroundBlock.Position.FLOOR);
				intendedGapSize -= Screens.right() - block.right();
				this.ticksToNextBlock = Figures.getTicksFromLength(intendedGapSize);

				this.firstBlockSpawned = true;
			} else {
				switch (this.currentStage) {
					case this.stages.HORIZONTAL:
						// TODO zu großer Abstand zwischen FLOOR und CEILING macht es unmöglich, vertikal voranzukommen
						block = this.createNextBlock(GroundBlock.Position.FLOOR);
						Game.blocks.push(block);
						this.ticksToNextBlock = Figures.getTicksFromLength(block.width());
						this.ticksToNextBlock += Figures.getTicksFromLength(this.createGapSize(GroundBlock.Position.FLOOR));
						break;
					case this.stages.VERTICAL:
						// TODO große Abstände zwischen den Blocks machen ein horizontales vorankommen unmöglich
						block = this.createNextBlock(GroundBlock.Position.CEILING);
						Game.blocks.push(block);
						this.ticksToNextBlock = Figures.getTicksFromLength(block.width());
						this.ticksToNextBlock += Figures.getTicksFromLength(this.createGapSize(GroundBlock.Position.CEILING));
						break;
				}
			}
		} else {
			this.ticksToNextBlock--;
		}
	},

	onDeath: function () {
		this.firstBlockSpawned = false;
	},

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