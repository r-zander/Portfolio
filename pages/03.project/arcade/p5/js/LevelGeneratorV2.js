"use strict";

var LevelGeneratorV2 = {
	stages: {
		HORIZONTAL: "HORIZONTAL",
		VERTICAL: "VERTICAL"
	},

	firstBlockSpawned: false,

	onStart: function () {
		this.ticksToNextBlock = {};
		ALL_BLOCK_POSITIONS.forEach(function (blockPosition) {
			this.ticksToNextBlock[blockPosition] = 0;
		}, this);

		this.ticksToNextStage = 0;

		this.nextStage = null;
		this.currentStage = null;
		this.allStages = Object.keys(this.stages);

		/*
		 * { from: STAGE, to: STAGE }
		 */
		// this.currentTransition = null;
	},

	getRandomStage: function (level) {
		if (level <= 3){
			return this.stages.HORIZONTAL;
		}

		return this.allStages[randomInt(0, this.allStages.length)];
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
			this.nextStage = this.getRandomStage(Figures.getLevelMajor());

			// NextLevel is every 1000 frames right now
			this.ticksToNextStage = randomInt(300, 700);

			// TODO
			console.debug("Next Stage " + this.nextStage + " in " + this.ticksToNextStage + " frames (" + (this.ticksToNextStage / frameRate()).toFixed(1) + "s)");
		} else {
			this.ticksToNextStage--;
		}

		var block;
		if (this.firstBlockSpawned === false) {
			block = this.createFirstBlock(BlockPosition.FLOOR);
			var intendedGapSize = this.createGapSize(BlockPosition.FLOOR);
			intendedGapSize -= Screens.right() - block.right();
			// FIXME BlockPosition.FLOOR geht davon aus, dass das Game immer Horizontal startet
			this.ticksToNextBlock[BlockPosition.FLOOR] = Figures.getTicksFromLength(intendedGapSize);

			this.firstBlockSpawned = true;
		} else {
			ALL_BLOCK_POSITIONS.forEach(function (blockPosition) {
				if (this.ticksToNextBlock[blockPosition] <= 0) {
					var createBlockFunction = this.createBlockFunctions[this.currentStage][blockPosition];
					if (typeof createBlockFunction == 'function'){
						var levelElement = createBlockFunction(Figures.getLevelMajor());

						if (levelElement !== null) {
							this.ticksToNextBlock[blockPosition] = Figures.getTicksFromLength(levelElement.gapSize);
							this.ticksToNextBlock[blockPosition] += Figures.getTicksFromLength(levelElement.block.width());
						}
					}
				} else {
					this.ticksToNextBlock[blockPosition]--;
				}
			}, this);
		}
	},

	onDeath: function () {
		this.firstBlockSpawned = false;
	},

	createFirstBlock: function (position) {
		var newBlock;

		switch (position) {
			case BlockPosition.FLOOR:
				newBlock = new GroundBlock(
					position,
					Game.percentageWidth(95),
					Game.percentageHeight(12));
				newBlock.positionInside(Corner.BOTTOM_LEFT);
				break;
			case BlockPosition.CEILING:
			case BlockPosition.MIDDLE:
				newBlock = this.createNextBlock(position);
				this.positionBlock(newBlock);
				newBlock.x(Game.percentageWidth(random(100, 250)));
				break;
		}

		Game.blocks.push(newBlock);
		return newBlock;
	},

	createGapSize: function (position) {
		switch (position) {
			case BlockPosition.FLOOR:
			case BlockPosition.CEILING:
				return Game.percentageWidth(random(0.5, 3.8)) * Figures.speed;
			case BlockPosition.MIDDLE:
				return Game.percentageWidth(random(1, 40)) * Figures.speed;
		}
	},

	createNextBlock: function (position) {
		var blockWidth, blockHeight, gapSize;
		var speed = Figures.speed;
		switch (position) {
			case BlockPosition.FLOOR:
			case BlockPosition.CEILING:
				blockWidth = Game.percentageWidth(random(8 + 0.5 * speed, 75 + 0.05 * speed));
				blockHeight = Game.percentageHeight(random(2.5, 25));
				break;
			case BlockPosition.MIDDLE:
				blockWidth = Game.percentageWidth(3);
				//noinspection JSSuspiciousNameCombination
				blockHeight = blockWidth;
				break;
		}
		var block = this.createBlock(position, blockWidth, blockHeight);
		this.positionBlock(block);
		return block;
	},

	positionBlock: function (block) {
		block.positionOutside(Direction.RIGHT);
		switch (block.position) {
			case BlockPosition.FLOOR:
				block.positionInside(Direction.BOTTOM);
				break;
			case BlockPosition.CEILING:
				block.positionInside(Direction.TOP);
				break;
			case BlockPosition.MIDDLE:
				block.y(Game.percentageHeight(random(28, 100 - 28)));
				break;
		}
	},

	createBlock: function (position, blockWidth, blockHeight, stretchWidthToSpeed) {
		stretchWidthToSpeed = typeof stretchWidthToSpeed === 'undefined' ? false : stretchWidthToSpeed;

		if (stretchWidthToSpeed){
			blockWidth *= Figures.speed;
		}

		var block = new GroundBlock(position, blockWidth, blockHeight);
		Game.blocks.push(block);
		return block;
	}
};

LevelGeneratorV2.createBlockFunctions = {};

// TODO zu großer Abstand zwischen FLOOR und CEILING macht es unmöglich, vertikal voranzukommen
LevelGeneratorV2.createBlockFunctions[LevelGeneratorV2.stages.HORIZONTAL] = {};
LevelGeneratorV2.createBlockFunctions[LevelGeneratorV2.stages.HORIZONTAL][BlockPosition.FLOOR] = function () {
	return {
		block: this.createNextBlock(BlockPosition.FLOOR),
		gapSize: this.createGapSize(BlockPosition.FLOOR)
	}
}.bind(LevelGeneratorV2);
LevelGeneratorV2.createBlockFunctions[LevelGeneratorV2.stages.HORIZONTAL][BlockPosition.CEILING] = function (level) {
	if (level < 2){
		return null;
	}
	return {
		block: this.createNextBlock(BlockPosition.CEILING),
		gapSize: this.createGapSize(BlockPosition.CEILING)
	}
}.bind(LevelGeneratorV2);

// TODO große Abstände zwischen den Blocks machen ein horizontales vorankommen unmöglich
LevelGeneratorV2.createBlockFunctions[LevelGeneratorV2.stages.VERTICAL] = {};
LevelGeneratorV2.createBlockFunctions[LevelGeneratorV2.stages.VERTICAL][BlockPosition.LOW] = function () {
	var blockWidth = Game.percentageWidth(random(8 + 0.5, 75 + 0.05));
	var blockHeight = Game.percentageHeight(3);

	var block = this.createBlock(BlockPosition.LOW, blockWidth, blockHeight, true);
	block.positionOutside(Direction.RIGHT);
	block.y(Game.percentageHeight(25));

	return {
		block: block,
		gapSize:Game.percentageWidth(random(0.5, 3.8)) * Figures.speed
	}
}.bind(LevelGeneratorV2);
LevelGeneratorV2.createBlockFunctions[LevelGeneratorV2.stages.VERTICAL][BlockPosition.HIGH] = function () {
	var blockWidth = Game.percentageWidth(random(8 + 0.5, 75 + 0.05));
	var blockHeight = Game.percentageHeight(3);

	var block2 = this.createBlock(BlockPosition.HIGH, blockWidth, blockHeight, true);
	block.positionOutside(Direction.RIGHT);
	block.y(Game.percentageHeight(25));
	k4Qa9M_4BUc9
	return {
		block: block2,
		gapSize: Game.percentageWidth(random(0.5, 3.8)) * Figures.speed
	}
}.bind(LevelGeneratorV2);