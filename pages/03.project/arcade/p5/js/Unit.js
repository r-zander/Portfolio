"use strict";

function Unit() {
    var diameter = Game.percentageWidth(2.5);
    var sprite = createSprite(0, 0, diameter, diameter);
    sprite.setCollider('circle', 0, 0, diameter / 2);
    sprite.debug = debugEnabled;
    sprite.draw = function () {

        rotate(atan2(this.position.y - this.previousPosition.y, Figures.speed));

        stroke(ArcadeConstants.Colors.BLUE);
        strokeWeight(2);
        fill(ArcadeConstants.Colors.BACKGROUND);
        ellipse(0, 0, this.width, this.height);

        translate(this.width / -2, this.height / -2);
        noStroke();
        triangle(
            0.26 * this.width, 0.06 * this.height,
            -0.4 * this.width, 0.5 * this.height,
            0.26 * this.width, 0.94 * this.height);

        stroke(ArcadeConstants.Colors.BLUE);
        strokeWeight(2);
        line(0.26 * this.width, 0.06 * this.height,
            -0.4 * this.width, 0.5 * this.height);
        line(-0.4 * this.width, 0.5 * this.height,
            0.26 * this.width, 0.94 * this.height);
    };
    sprite.visible = false;

    // super(...)
    Block.call(this, sprite);

    this.state = null;

    /*
     * Number of frames the state is kept.
     */
    this.stateFrames = 0;

    this.isJumping = false;
    this.jumpDistance = 0;

    this.jumpStrength = 0;
}

Unit.State = {
    JUMPING: 'Jumping',
    FALLING: 'Falling',
    WALKING: 'Walking',
    DEAD: 'Dead'
};

// extends Block
Unit.prototype = Object.create(Block.prototype, {

    resetPosition: {
        value: function () {
            this._sprite.visible = true;
            this.updateState(Unit.State.FALLING);
            this.bottom(percentageHeight(60));
            this.left(percentageWidth(7));
        }
    },

    jump: {
        value: function () {
            if (this.state == Unit.State.JUMPING) {
                if (this.jumpStrength < ArcadeConstants.MAX_JUMP_STRENGTH) {
                    this.jumpStrength++;
                }
            } else if (this.state == Unit.State.WALKING) {
                this.updateState(Unit.State.JUMPING);
                this.jumpStrength = 1;
            }
        }
    },

    update: {
        value: function (gravityDirection) {
            this.stateFrames++;

            if (this.isJumping){
                this.jumpDistance += Figures.speed;
            }

            switch (this.state) {
                case Unit.State.JUMPING:
                    if (this.stateFrames > ArcadeConstants.JUMP_FRAMES) {
                        return this.updateState(Unit.State.FALLING);
                    }
                    var mappedStrength = map(this.jumpStrength, 4, ArcadeConstants.MAX_JUMP_STRENGTH, 2, 6);
                    this.offset(gravityDirection.invert(), mappedStrength * ArcadeConstants.calculateJumpY(this.stateFrames));
                    return this.state;
                case Unit.State.FALLING:
                    /*
                     * Update to new state as falling speed is determined accordingly.
                     */
                    this.offset(gravityDirection, ArcadeConstants.GRAVITY * this.stateFrames /* * stateFrames * stateFrames */);
                    break;
            }

            /*
             * Calculate collisions.
             */
            this.preCollisionX = this.x();
            if (this._sprite.collide(GroundBlock.group, this.onCollision.bind(this, gravityDirection))) {


                // if (blocks.some(function (block) {
                //         var testCircleAABB = this.getCollisionVector(this, block);
                //         if (testCircleAABB != null) {
                //             var collisionSide = this.vectorToDirection(testCircleAABB);
                //             block.highlightCollisionSide(collisionSide);
                //
                //             this.offset(collisionSide, abs(testCircleAABB.mag() - this.width() / 2));
                //             // this.draw();
                //             this.updateState(Unit.State.WALKING);
                //             return true;
                //         }
                //     }, this)) {
                if (this.state === Unit.State.WALKING){
                    return this.state;
                }
            }

            /*
             * Check if the unit is still inside game boundaries
             */
            if (
                (this.right() < Game.left() && gravityDirection !== Direction.RIGHT)
                || (this.left() > Game.right() && gravityDirection !== Direction.LEFT)
                || (this.bottom() < 0 && gravityDirection !== Direction.BOTTOM)
                || (this.top() > Game.height() && gravityDirection !== Direction.TOP)
            ) {
                // return this.updateState(Unit.State.DEAD);
                return this.updateState(Unit.State.WALKING);
            }

            /*
             * No collisions - falling
             */
            return this.updateState(Unit.State.FALLING);
        }
    },

    onCollision: {
        value: function (gravityDirection, unitSprite, blockSprite) {
            /*
             * Override weird displacements with desired results
             */
            var newPosition = false;
            switch (blockSprite.gamePosition) {
                case BlockPosition.FLOOR:
                    newPosition = createVector(
                        this.preCollisionX,
                        blockSprite.collider.top() - unitSprite.collider.radius
                    );
                    if (gravityDirection === Direction.BOTTOM){
                        this.updateState(Unit.State.WALKING);
                    }
                    break;
                case BlockPosition.CEILING:
                    newPosition = createVector(
                        this.preCollisionX,
                        blockSprite.collider.bottom() + unitSprite.collider.radius
                    );
                    if (gravityDirection === Direction.TOP){
                        this.updateState(Unit.State.WALKING);
                    }
                    break;
            }

            if (newPosition) {
                unitSprite.position.set(newPosition);
                unitSprite.previousPosition = newPosition.copy();
                unitSprite.newPosition = newPosition.copy();
            }

            if (debugEnabled) {
                if (unitSprite.touching.top) {
                    blockSprite.collisionSides[Direction.BOTTOM.name] = true;
                }
                if (unitSprite.touching.bottom) {
                    blockSprite.collisionSides[Direction.TOP.name] = true;
                }
                if (unitSprite.touching.left) {
                    blockSprite.collisionSides[Direction.RIGHT.name] = true;
                }
                if (unitSprite.touching.right) {
                    blockSprite.collisionSides[Direction.LEFT.name] = true;
                }
            }
        }
    },

    vectorToDirection: {
        value: function (vector) {
            if (abs(vector.x) > abs(vector.y)) {
                if (vector.x > 0) {
                    return Direction.RIGHT;
                } else {
                    return Direction.LEFT;
                }
            } else {
                if (vector.y > 0) {
                    return Direction.BOTTOM;
                } else {
                    return Direction.TOP;
                }
            }
        }
    },

    angleToDirection: {
        value: function (radians) {
            radians %= TWO_PI;
            if (radians >= QUARTER_PI) {
                if (radians < HALF_PI + QUARTER_PI) {
                    return Direction.BOTTOM;
                } else if (radians < PI + QUARTER_PI) {
                    return Direction.LEFT;
                } else if (radians < PI + HALF_PI + QUARTER_PI) {
                    return Direction.TOP;
                } else {
                    return Direction.RIGHT;
                }
            } else {
                return Direction.RIGHT;
            }
        }
    },

    vectorDistPointAABB: {
        value: function (p, aabb) {
            var vector = createVector();
            var v;
            var minX, minY, maxX, maxY;

            // get the minX, maxX, minY and maxY points of the AABB
            minX = aabb.centerX() - aabb.width() / 2;
            maxX = aabb.centerX() + aabb.width() / 2;

            minY = aabb.centerY() - aabb.height() / 2;
            maxY = aabb.centerY() + aabb.height() / 2;

            // test the bounds against the points X axis
            v = p.x;

            if (v < minX)
                vector.x = v - minX;
            if (v > maxX)
                vector.x = v - maxX;

            // test the bounds against the points Y axis
            v = p.y;

            if (v < minY)
                vector.y = v - minY;
            if (v > maxY)
                vector.y = v - maxY;

            return vector;
        }
    },

    getCollisionVector: {
        value: function (circle, box) {
            // get the squared distance between circle center and the AABB
            var v = this.vectorDistPointAABB(createVector(circle.centerX(), circle.centerY()), box);
            var r = circle.width() / 2;

            if (v.magSq() <= r * r) {
                return v;
            }
            return null;
        }
    },

    updateState: {
        value: function (state) {
            if (this.state != state) {
                this.state = state;
                if (state === Unit.State.JUMPING){
                    this.isJumping = true;
                } else if (this.isJumping && state === Unit.State.WALKING){
                    this.isJumping = false;
                    this.jumpDistance = 0;
                }
                this.stateFrames = 0;
            }
            return state;
        }
    }

});


Unit.prototype.constructor = Unit;