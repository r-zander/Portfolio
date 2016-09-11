function GroundBlock(position, _width, _height, gapSize) {
    this.position = position;
    this.gapSize = gapSize;

    var sprite = createSprite(0, 0, _width, _height);
    sprite.gamePosition = position;
    sprite.debug = debugEnabled;
    // sprite.setCollider('rectangle', 0, 0, width, height);
    sprite.collisionSides = {};
    sprite.draw = function () {
        noFill();
        stroke(ArcadeConstants.Colors.BLUE);
        strokeWeight(2);
        rect(0, 0, this.width, this.height);

        stroke(0xffffffff);
        translate(this.width / -2, this.height / -2);

        Object.keys(this.collisionSides).forEach(function (side) {
            switch (side) {
                case Direction.TOP.name:
                    line(0, 0, this.width, 0);
                    break;
                case Direction.RIGHT.name:
                    line(this.width, 0, this.width, this.height);
                    break;
                case Direction.BOTTOM.name:
                    line(0, this.height, this.width, this.height);
                    break;
                case Direction.LEFT.name:
                    line(0, 0, 0, this.height);
                    break;
            }
        }, this);


        this.collisionSides = {};
    };
    GroundBlock.group.add(sprite);

    // super(...)
    Block.call(this, sprite);

    this.positionOutside(Direction.RIGHT);
    switch (position) {
        case GroundBlock.Position.FLOOR:
            // sprite.setCollider('rectangle', _width / 2, _height / 2, height / 2, _width, _height + height);
            sprite.setCollider('rectangle', 0, height / 2, _width, _height + height);
            // sprite.setCollider('rectangle', 0, 0, _width, _height);
            this.positionInside(Direction.BOTTOM);
            break;
        case GroundBlock.Position.CEILING:
            // sprite.setCollider('rectangle', _width / 2, _height / 2 - height / 2, _width, _height + height);
            sprite.setCollider('rectangle', 0, -height / 2, _width, _height + height);
            // sprite.setCollider('rectangle', 0, 0, _width, _height);
            this.positionInside(Direction.TOP);
            break;
        case GroundBlock.Position.FLOATING:
            // sprite.setCollider('rectangle', _width / 2, _height / 2, _width, _height);
            sprite.setCollider('rectangle', 0, 0, _width, _height);
            this.y(Game.percentageHeight(random(28, 100 - 28)));
            break;
    }

    this.hasNextSpawned = false;
}

GroundBlock.setup = function () {
    GroundBlock.group = new Group();
};

GroundBlock.Position = {
    FLOOR: 'Floor',
    CEILING: 'Ceiling',
    FLOATING: 'Floating'
};

// extends Block
GroundBlock.prototype = Object.create(Block.prototype, {
    positionInside: {
        value: function (screenSide) {
            Block.prototype.positionInside.call(this, screenSide);

            if (screenSide.typeName === 'Direction') {
                switch (screenSide) {
                    case Direction.BOTTOM:
                        this.offsetY(2);
                        break;
                    case Direction.TOP:
                        this.offsetY(-2);
                        break;
                    default:
                        break;
                }
            }
            return this;
        }
    },


    highlightCollisionSide: {
        value: function (collisionSide) {
            this.collisionSide = collisionSide;
        }
    }
});
GroundBlock.prototype.constructor = GroundBlock;