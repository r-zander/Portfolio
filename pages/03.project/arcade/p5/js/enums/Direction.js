function Direction(name, _angle) {
    this.name = name;
    this._angle = _angle;
}

Direction.prototype = {
    typeName: 'Direction',
    invert: function () {
        return this.inverted;
    },
    angle: function () {
        return this._angle;
    },

    vector: function (mag) {
        var vector = createVector(mag, 0);
        vector.rotate(angle());
        return vector;
    }
};


Direction.TOP = new Direction('Top', Math.PI * 1.5);
Direction.BOTTOM = new Direction('Bottom', Math.PI * 0.5);
Direction.LEFT = new Direction('Left', Math.PI);
Direction.RIGHT = new Direction('Right', 0);

Direction.TOP.inverted = Direction.BOTTOM;
Direction.BOTTOM.inverted = Direction.TOP;
Direction.LEFT.inverted = Direction.RIGHT;
Direction.RIGHT.inverted = Direction.LEFT;
