"use strict";

function Block(sprite) { // extends MassedBeing

    this._sprite = sprite;
}

Block.prototype = {
    x: function (x) {
        if (typeof x === 'number') {
            this._sprite.position.x = x;
            return this;
        } else {
            return this._sprite.position.x;
        }
    },

    y: function (y) {
        if (typeof y === 'number') {
            this._sprite.position.y = y;
            return this;
        } else {
            return this._sprite.position.y;
        }
    },

    width: function () {
        return this._sprite.width;
    },

    height: function () {
        return this._sprite.height;
    },

    positionOutside: function (param) {
        if (param.typeName === 'Corner') {
            this.positionOutside(param.horizontal);
            this.positionOutside(param.vertical);
        } else if (param.typeName === 'Direction') {
            switch (param) {
                case Direction.TOP:
                    this.bottom(0);
                    break;
                case Direction.BOTTOM:
                    this.top(Game.height());
                    break;
                case Direction.RIGHT:
                    this.left(Game.width());
                    break;
                case Direction.LEFT:
                    this.right(0);
                    break;
            }
        } else {
            throw "Illegal Argument '" + JSON.stringify(param) + "'";
        }
        return this;
    },

    positionInside: function (param) {
        if (param.typeName === 'Corner') {
            this.positionInside(param.horizontal);
            this.positionInside(param.vertical);
        } else if (param.typeName === 'Direction') {
            switch (param) {
                case Direction.TOP:
                    this.top(0);
                    break;
                case Direction.BOTTOM:
                    this.bottom(Game.height());
                    break;
                case Direction.RIGHT:
                    this.right(Game.width());
                    break;
                case Direction.LEFT:
                    this.left(0);
                    break;
            }
        } else {
            throw "Illegal Argument '" + JSON.stringify(param) + "'";
        }
        return this;
    },

    offset: function (direction, value) {
        switch (direction) {
            case Direction.TOP:
                return this.offsetY(-value);
            case Direction.RIGHT:
                return this.offsetX(value);
            case Direction.BOTTOM:
                return this.offsetY(value);
            case Direction.LEFT:
                return this.offsetX(-value);
        }
        return this;
    },

    offsetX: function (value) {
        return this.x(this.x() + value);
    },

    offsetY: function (value) {
        return this.y(this.y() + value);
    },

    move: function (speed, orientation) {
        this.offset(orientation, speed);

        if ((
            this.right() < 0
            || (this.left() > this.width)
            && ((this.top() < 0)
            || this.bottom() > width))) {
            return Position.OUTSIDE;
        } else {
            // draw();
            return Position.INSIDE;
        }
    },

    top: function (top) {
        if (typeof top === 'number') {
            return this.y(top + this.height() / 2);
        }
        return this.y() - this.height() / 2;
    },

    right: function (right) {
        if (typeof right === 'number') {
            return this.x(right - this.width() / 2);
        }
        return this.x() + this.width() / 2;
    },

    bottom: function (bottom) {
        if (typeof bottom === 'number') {
            return this.y(bottom - this.height() / 2);
        }
        return this.y() + this.height() / 2;
    },

    left: function (left) {
        if (typeof left === 'number') {
            return this.x(left + this.width() / 2);
        }
        return this.x() - this.width() / 2;
    },

    centerX: function () {
        return this.x();
    },

    centerY: function () {
        return this.y();
    }
};
