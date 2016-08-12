public class LemniscateOfBernoulli extends CurveFunction {

    public static final float SQRT_2 = (float) sqrt(2);

    public LemniscateOfBernoulli(float resizeFactor) {
        super(resizeFactor);
    }

    public Point calculate(float angle) {
        float sin1 = sin(angle);
        float divisor = sq(sin1) + 1;
        float dividend = resizeFactor * SQRT_2 * cos(angle);
        float x = dividend / divisor;
        float y = (dividend * sin1) / divisor;
        return new Point(x, y);
    }

}
