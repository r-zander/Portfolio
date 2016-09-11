function Corner(vertical, horizontal) {
    this.vertical = vertical;
    this.horizontal = horizontal;
}

Corner.prototype = {
    typeName: 'Corner'
};

Corner.TOP_LEFT = new Corner(Direction.TOP, Direction.LEFT);
Corner.TOP_RIGHT = new Corner(Direction.TOP, Direction.RIGHT);
Corner.BOTTOM_RIGHT = new Corner(Direction.BOTTOM, Direction.RIGHT);
Corner.BOTTOM_LEFT = new Corner(Direction.BOTTOM, Direction.LEFT);