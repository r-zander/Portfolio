public class TwoDimensional {

    private TwoDimensional() {}

    public static float angleBetween(float x1, float y1, float x2, float y2) {
        double atan2 = Math.atan2(y1 - y2, x1 - x2);
        return (float) (atan2 < 0 ? Math.PI * 2 + atan2 : atan2);
    }

}
