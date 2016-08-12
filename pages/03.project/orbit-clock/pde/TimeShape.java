abstract class TimeShape {

    public static class Minutes extends TimeShape {

        protected float getStartAngle() {
            return map(minute() + second() / 60, 0, 60, PI * -.5f, PI * 1.5);
        }
    }

    public static class Seconds extends TimeShape {

        protected float getStartAngle() {
            return map(second(), 0, 60, PI * -.5f, PI * 1.5);
        }
    }

    public static class Millis extends TimeShape {

        protected float getStartAngle() {
            return map(Date.now() % 1000, 0, 1000, PI * -.5f, PI * 1.5);
        }
    }

    float radius;

    int   steps;

    float width;

    int   mode;

    public void draw(float x, float y) {
        float startAngle = getStartAngle();
        float angleSteps = TWO_PI / steps;
        switch (mode) {
            case OrbMode.ORB:
                $.setFill(steps, steps);
                $.noStroke();
                $.ellipse(x + cos(startAngle) * radius, y + sin(startAngle) * radius, 10 * width, 10 * width);
                break;
            case OrbMode.ORBIT:
                $.noFill();
                $.strokeWeight(width);
                for (int i = 0; i < steps; i++) {
                    float angle = startAngle - angleSteps * i;
                    $.setStroke(i, steps);
                    $.arc(x, y, radius * 2, radius * 2, angle, angle + angleSteps);
                }
        }
    }

    protected abstract float getStartAngle();
}
