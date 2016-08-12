/* @pjs pauseOnBlur="true";
        preload="animated-abstract-pepe/pepes/sad.png"; */
private PImage               img;

private int                  column;

private boolean              forward         = true;

private boolean              manualMode      = false;

private static final boolean RENDER_ORIGINAL = true;

public void setup() {
    if (typeof preSetup == 'function') { preSetup(); }
    img = loadImage("animated-abstract-pepe/pepes/sad.png");

    size(RENDER_ORIGINAL ? img.width * 2 : img.width, img.height);
    smooth();
    // scale to screen
    strokeWeight(1);
}

public void draw() {
    if (manualMode) {
        column = max(0, min(mouseX, img.width - 1));
    }

    if (RENDER_ORIGINAL) {
        /*
         * Draw Debug image
         */
        image(img, img.width, 0);
        stroke(255, 0, 0);
        line(img.width + column, 0, img.width + column, img.height);
    }

    for (int y = 0; y < img.height; y++) {
        stroke(img.get(column, y));
        line(0, y, RENDER_ORIGINAL ? img.width : width, y);
    }

    if (!manualMode) {
        if (forward) {
            if (column >= img.width - 1) {
                forward = false;
            } else {
                column++;
            }
        } else {
            if (column < 1) {
                forward = true;
            } else {
                column--;
            }
        }
    }
}

