public class FontUtil {

    public static void monospace(PApplet applet, String text, float letterWidth, float x,
            float y) {
        for (final char c : text.toCharArray()) {
            applet.text(c, x, y);
            x += letterWidth;
        }
    }

    public static float relativeSize(PApplet applet, int normalHeight, float fontSize) {
        return fontSize * applet.height / normalHeight;
    }
}
