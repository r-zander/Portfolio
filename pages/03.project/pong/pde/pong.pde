/* @pjs pauseOnBlur="true"; */
private static final int BACKGROUND_COLOR     = 0xFF000000;

private static final int FOREGROUND_COLOR     = 0xFF00FF00;

private static final int INFO_COLOR           = 0xff18CAE6;

private static final int SCORE_COLOR          = 0xFFC90101;

private static final int NORMAL_CANVAS_HEIGHT = 1080;

private static final int BASE_SPEED           = 20;

private int              centerX;

private int              centerY;

private Board            mouseBoard;

private KeyBoard         keyBoard;

private Ball             ball;

private Player           mousePlayer;

private Player           keyboardPlayer;

private boolean          gamePaused           = true;

private int              aiLevel              = 2;

private String[]         aiLevelSymbols       = new String[] {
        "1̲",
        "2̲",
        "3̲",
        "4̲",
        "5̲",
        "6̲",
        "7̲",
        "8̲",
        "9̲"                                 };

public void setup() {
    if (typeof preSetup == 'function') { preSetup(); }
    size(displayWidth, displayHeight);
    smooth();

    centerX = width / 2;
    centerY = height / 2;

    mouseBoard = new Board(width - BOARD_MARGIN, centerY);
    keyBoard = new KeyBoard(BOARD_MARGIN - BOARD_WIDTH, centerY);

    ball = new Ball();

    resetPlayers();

    background(BACKGROUND_COLOR);
}

private void resetPlayers() {
    mousePlayer = new Player();
    keyboardPlayer = new Player();
}

private boolean isGameProgressed() {
    return mousePlayer.score > 0 || keyboardPlayer.score > 0;
}

public void keyPressed() {
    switch (key) {
        case ' ':
            gamePaused = !gamePaused;
            break;
        case 'r':
            if (gamePaused) {
                resetPlayers();
            }
            break;
        case 'a':
            if (isAiEnabled()) {
                aiLevel = 0;
            } else {
                aiLevel = 5;
            }
            break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            aiLevel = parseInt(str(key));
            console.info("AI Level", aiLevel);
            break;
        default:
            console.info("KeyPressed: " + key + " | " + keyCode);
            break;
    }
}

public void draw() {
    noStroke();
    fill(BACKGROUND_COLOR, 80);
    rect(0, 0, width, height);

    fill(FOREGROUND_COLOR);
    drawBoardPlayerMouse();
    drawBoardPlayerKeyboard();

    drawBall();
    fill(INFO_COLOR);
    drawBallSpeed();

    fill(SCORE_COLOR);

    if (isGameProgressed() || gamePaused == false) {
        textAlign(CENTER);
        textSize(FontUtil.relativeSize(this, NORMAL_CANVAS_HEIGHT, 60));
        text(keyboardPlayer.score + " : " + mousePlayer.score, centerX, 200);
    }


    if (keyPressed) {
            console.info("KeyPressed: " + key + " | " + keyCode);
    }

    if (gamePaused) {
        drawPauseInfo();
    }

    fill(INFO_COLOR);
    drawAiInfo();
}

private void drawBallSpeed() {
    textSize(FontUtil.relativeSize(this, NORMAL_CANVAS_HEIGHT, 30));
    textAlign(CENTER);
    text("Speed " + nfs(ball.getAbsoluteSpeed(), 0, 2), centerX, height - 100);
}

private void drawPauseInfo() {
    textSize(FontUtil.relativeSize(this, NORMAL_CANVAS_HEIGHT, 30));
    textAlign(CENTER);
    text("S̲p̲a̲c̲e̲ to start!", centerX, centerY + 100);
    if (isGameProgressed()) {
        textSize(FontUtil.relativeSize(this, NORMAL_CANVAS_HEIGHT, 20));
        text("R̲ to reset scores", centerX, centerY + 200);
    }
}

private void drawAiInfo() {
    String aiStatus;
    if (aiLevel > 0) {
        aiStatus = "A̲I at " + aiLevelSymbols[aiLevel - 1] + "0%";
    } else {
        aiStatus = "A̲I deactivated";
    }
    textSize(FontUtil.relativeSize(this, NORMAL_CANVAS_HEIGHT, 30));
    textAlign(LEFT);
    text(aiStatus, keyBoard.getXPos(), height - 100);
}

private void drawBoardPlayerMouse() {
    mouseBoard.setYPos(mouseY - BOARD_HEIGHT / 2);
    mouseBoard.draw();
}

private void drawBoardPlayerKeyboard() {
    /*
     * AI can control the keyboard, if enabled.
     */
    if (isAiEnabled() && gamePaused == false) {
        /*
         * Only follow the ball if its on our site of the board.
         */
        if (ball.xPos < width / 10 * (aiLevel + 1)) {
            if (ball.yPos > keyBoard.centerY()) {
                keyBoard.down();
            } else if (ball.yPos < keyBoard.centerY()) {
                keyBoard.up();
            }
        }
    } else {
        if (keyPressed) {
            if (key == CODED) {
                if (keyCode == UP) {
                    keyBoard.up();
                } else if (keyCode == DOWN) {
                    keyBoard.down();
                }
            } else if (key == 'w') {
                keyBoard.up();
            } else if (key == 's') {
                keyBoard.down();
            }
        }
    }
    keyBoard.draw();
}

private boolean isAiEnabled() {
    return aiLevel > 0;
}

private void drawBall() {
    if (!gamePaused) {
        ball.xPos += ball.xSpeed;
        ball.yPos += ball.ySpeed;

        if (ball.xPos - BALL_RADIUS < 0) {
            /*
             * Collision with left wall.
             */
            mouseScored();
        } else if (ball.xPos + BALL_RADIUS > width) {
            /*
             * Collision with right wall.
             */
            keyboardScored();
        } else if (ball.yPos - BALL_RADIUS < 0 || ball.yPos + BALL_RADIUS > height) {
            /*
             * Collision with top/bottom wall.
             */
            ball.ySpeed = -ball.ySpeed;
        } else if (ball.xPos + BALL_RADIUS >= mouseBoard.getXPos()) {
            checkBoardCollision(mouseBoard);
        } else if (ball.xPos - BALL_RADIUS <= keyBoard.getXPos()) {
            checkBoardCollision(keyBoard);
        }
    }
    ball.draw();
}

private void checkBoardCollision(Board board) {
    float distance = ball.yPos - board.getYPos();

    if (distance >= -BALL_RADIUS && distance <= BOARD_HEIGHT + BALL_RADIUS) {
        deflectBall(abs(distance - BOARD_HALF_HEIGHT) / BOARD_HALF_HEIGHT);
    }
}

/**
 * @param percentage
 *            of x/y speed gain distribution. 0 means 100% x speed gain.
 */
private void deflectBall(float percentage) {
    ball.xSpeed = -ball.xSpeed;

    boolean xPositive = ball.xSpeed > 0;
    boolean yPositive = ball.ySpeed > 0;
    float totalSpeed = ball.getAbsoluteSpeed() + random(BALL_SPEED_ADDITION_LIMIT);

    ball.xSpeed =
            xPositive ? totalSpeed * (1 - percentage) : -totalSpeed
                    * (1 - percentage);
    ball.ySpeed = yPositive ? totalSpeed * percentage : -totalSpeed * percentage;

}

private void mouseScored() {
    mousePlayer.increaseScore();
    afterScored();
}

private void keyboardScored() {
    keyboardPlayer.increaseScore();
    afterScored();
}

private void afterScored() {
    ball.reset();
    background(BACKGROUND_COLOR);
    gamePaused = true;
}

private void info(String msg) {
    fill(color(255, 192, 0));
    msg(msg);
}

private void warn(String msg) {
    fill(color(0, 255, 0));
    msg(msg);
}

private void msg(String msg) {
    text(msg, centerX, 200);
    fill(FOREGROUND_COLOR);
}

private static final int BOARD_MARGIN      = 100;

/**
 * Interessanter Parameter zu ändern während des Spiels
 */
private static final int BOARD_HEIGHT      = 200;

private static final int BOARD_HALF_HEIGHT = BOARD_HEIGHT / 2;

private static final int BOARD_WIDTH       = 50;

private class Board {

    private float           xPos;

    private float           yPos;

    public Board(float xPos, float yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    public float getXPos() {
        return xPos;
    }

    public float getYPos() {
        return yPos;
    }

    public float centerY() {
        return yPos + BOARD_HALF_HEIGHT;
    }

    public void setYPos(float yPos) {
        this.yPos = constrain(yPos, 0, height - BOARD_HEIGHT);
    }

    public void draw() {
        rect(xPos, yPos, BOARD_WIDTH, BOARD_HEIGHT);
    }

}

private static final float KEYBOARD_SPEED = BASE_SPEED * 1.5;

/**
 * The Board controlled by keyboard.
 */
private class KeyBoard extends Board {


    public KeyBoard(float xPos, float yPos) {
        super(xPos, yPos);
    }

    public void up() {
        setYPos(getYPos() - KEYBOARD_SPEED);
    }

    public void down() {
        setYPos(getYPos() + KEYBOARD_SPEED);
    }

    /**
     * Considers the special position of being left.
     */
    public float getXPos() {
        return super.getXPos() + BOARD_WIDTH;
    }
}

private static final int    BALL_RADIUS               = 25;

private static final int    BALL_DIAMETER             = BALL_RADIUS * 2;

private static final float BALL_SPEED_LIMIT          = BASE_SPEED;

private static final float BALL_SPEED_ADDITION_LIMIT = BASE_SPEED * .25;

private class Ball {



    private float              xPos;

    private float              yPos;

    private float              xSpeed;

    private float              ySpeed;

    public Ball() {
        reset();
    }

    public void reset() {
        xPos = centerX;
        yPos = centerY;

        ySpeed = random(BALL_SPEED_LIMIT / 6, BALL_SPEED_LIMIT / 3);
        if (random(1) >= .5) {
            ySpeed = -ySpeed;
        }
        xSpeed = BALL_SPEED_LIMIT - ySpeed;
        if (random(1) >= .5) {
            xSpeed = -xSpeed;
        }
        if (random(1) >= .5) {
            ySpeed = -ySpeed;
        }
    }

    public void draw() {
        ellipse(xPos, yPos, BALL_DIAMETER, BALL_DIAMETER);
    }

    public float getAbsoluteSpeed() {
        return abs(xSpeed) + abs(ySpeed);
    }
}

private class Player {

    private int score = 0;

    public void increaseScore() {
        score++;
    }

}

