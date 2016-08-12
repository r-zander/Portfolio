/* @pjs pauseOnBlur="true"; */
/**
 * Currently running instance
 */
public static OrbitClock $;

private static final int STEPS      = 240;

private CurveFunction    curveFunction;

private float            centerX;

private float            centerY;

private TimeShape        minutesShape;

private TimeShape        secondsShape;

private TimeShape        millisShape;

public void setup() {
    if (typeof preSetup == 'function') { preSetup(); }
    size(displayWidth, displayHeight);
    smooth();
    noSmooth();

    $ = this;

    centerX = width / 2;
    centerY = height / 2;

    curveFunction = new LemniscateOfBernoulli(width * .30);

    strokeCap(SQUARE);

    minutesShape = new TimeShape.Minutes();
    minutesShape.radius = width * .05;
    minutesShape.steps = 60;
    minutesShape.width = 10;
    minutesShape.mode = OrbMode.ORBIT;

    secondsShape = new TimeShape.Seconds();
    secondsShape.radius = minutesShape.radius * .5;
    secondsShape.steps = 60;
    secondsShape.width = minutesShape.width * .2;
    secondsShape.mode = OrbMode.ORBIT;

    millisShape = new TimeShape.Millis();
    millisShape.radius = secondsShape.radius * .4;
    millisShape.steps = 100;
    millisShape.width = secondsShape.width * .5;
    millisShape.mode = OrbMode.ORBIT;
}

public void draw() {
    drawBackground();
    drawLemniscate();
    drawFPS();
}

private void drawBackground() {
            background(0, 0);
}

private void drawLemniscate() {
    float angle;
            angle = hour2angle(hour(), minute());

    Point startPoint = curveFunction.calculate(angle);
    float startX = centerX + startPoint.x;
    float startY = centerY + startPoint.y;
    float lastX = startX;
    float lastY = startY;
    float lastX1 = -1;
    float lastY1 = -1;
    float lastX2 = -1;
    float lastY2 = -1;
    for (int currentStep = 0; currentStep <= STEPS; currentStep++) {
        angle += TWO_PI / STEPS;
        Point point = curveFunction.calculate(angle);
        float x = centerX + point.x;
        float y = centerY + point.y;

        float angleBetween =
                TwoDimensional.angleBetween(lastX, lastY, x, y) + HALF_PI;
        noStroke();

        setFill(currentStep, STEPS);

        int lineWidth = 30;
        float distX = cos(angleBetween) * lineWidth;
        float distY = sin(angleBetween) * lineWidth;
        float x1 = x - distX;
        float y1 = y - distY;
        float x2 = x + distX;
        float y2 = y + distY;
        if (lastX1 > -1) {
            quad(lastX1, lastY1, x1, y1, x2, y2, lastX2, lastY2);
        }
        lastX1 = x1;
        lastY1 = y1;
        lastX2 = x2;
        lastY2 = y2;

        lastX = x;
        lastY = y;
    }
    drawMinutes(startX, startY);
}

private void drawFPS() {
    if (mousePressed) {
        fill(0);
        text(sprintf("%.1f", frameRate), width - 100, height - 100);
    }
}

void setStroke(float currentStep, float steps) {
            stroke(0, 255 * (1 - currentStep / steps));
}

void setFill(float currentStep, float steps) {
            fill(0, 255 * (1 - currentStep / steps));
}

private void drawMinutes(float x, float y) {
    minutesShape.draw(x, y);
    drawSeconds(x + cos(minutesShape.getStartAngle()) * minutesShape.radius, y
            + sin(minutesShape.getStartAngle()) * minutesShape.radius);
}

private void drawSeconds(float x, float y) {
    secondsShape.draw(x, y);
    drawMillis(x + cos(secondsShape.getStartAngle()) * secondsShape.radius, y
            + sin(secondsShape.getStartAngle()) * secondsShape.radius);
}

private void drawMillis(float x, float y) {
    millisShape.draw(x, y);
}

/**
 * 12:00 = PI
 * 24:00 = 0 = TWO_PI
 * 6:00 = -PI/2 = 1.5 * PI
 * 18:00 = PI/2
 * 
 * @param hours
 * @param minutes
 * @return
 */
private static float hour2angle(int hours, int minutes) {
    return map(hours + minutes / 60, 0, 24, TWO_PI, 0);
}

