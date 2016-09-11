"use strict";

var centerX;

var centerY;

var MIN_YEAR = 1970;

var MAX_YEAR = 2011;

var YEAR_STEPS = 5;

var selectedYear = MIN_YEAR;

var slider;

var indicators;

var ICONS_PER_LINE = 10;

var table;

function preload() {
    indicators = [];

    var assets = "p5/assets/";

    var numberOfValues = MAX_YEAR - MIN_YEAR + 1;

    indicators.push(new Indicator(
        "were living in poverty.",
        "poverty",
        new Array(numberOfValues),
        loadImage(assets + "poverty.svg")));
    indicators.push(new Indicator(
        "starved every day.",
        "hunger",
        new Array(numberOfValues),
        loadImage(assets + "hunger.svg")));
    var mortalityIndicator =
        new Indicator(
            "died before their\n5th birthday.",
            "mortality",
            new Array(numberOfValues),
            loadImage(assets + "death.svg"));
    mortalityIndicator.multiplier = 0.1;
    indicators.push(mortalityIndicator);

    table = loadTable(assets + "WorldDevelopment.csv", "header");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    centerX = width / 2;
    centerY = height / 2;

    slider = createSlider(MIN_YEAR, MAX_YEAR, selectedYear, 1);
    slider.position(30, 180);
    slider.style('width', (width - 2 * 30) + "px");

    /*
     * Read table
     */
    var index = 0;

    table.getRows().forEach(function (row) {
        if (row.getNum("year") < MIN_YEAR) {
            return;
        }
        if (row.getNum("year") > MAX_YEAR) {
            return;
        }
        indicators.forEach(function (indicator) {
            var value = parseFloat(row.get(indicator.tableHeader));
            if (!isNaN(value)) {
                indicator.setValue(index, value);
            }
        });

        index++;
    });


    index = 0;
    var widthPerIndicator = width / indicators.length;
    indicators.forEach(function (indicator) {
        indicator.interpolateMissingValues();
        indicator.x = widthPerIndicator / 2 + widthPerIndicator * index;
        indicator.y = height - 310;
        indicator.width = widthPerIndicator;
        index++;
    });
}


function draw() {
    selectedYear = slider.value();

    background(255);
    fill(0);
    noStroke();

    textSize(50);
    textAlign(CENTER, TOP);
    text("Is the world getting better?", centerX, 30);

    textSize(30);
    text("In the year " + selectedYear + ",", centerX, 130);
    text("out of 100 people worldwide ...", centerX, 230);

    drawIndicators();
}

function getYearAsIndex() {
    return selectedYear - MIN_YEAR;
}

function drawIndicators() {
    var yearAsIndex = getYearAsIndex();
    textAlign(CENTER, TOP);
    indicators.forEach(function (indicator) {
        textSize(30);
        text(indicator.title, indicator.x, height - 200);

        var value = indicator.getValue(yearAsIndex);
        if (value == null) {
            text("null", indicator.x, height - 250);
        } else {
            for (var i = 0; i < value; i++) {
                var iconWidth = indicator.width / ICONS_PER_LINE / 2;
                var iconHeight = 30; // TODO mit Aspect Ratio ausrechnen
                var x = indicator.x - (indicator.width * 0.25) + (iconWidth * (i % (ICONS_PER_LINE)));
                var y = indicator.y - floor(i / ICONS_PER_LINE) * iconHeight;
                image(indicator.icon, x, y, iconWidth, iconHeight);
            }
            text(value, indicator.x, height - 250);
        }
    });
}

function mouseWheel(event) {
    if (event.delta > 0) {
        selectedYear--;
    } else {
        selectedYear++;
    }
    if (selectedYear > MAX_YEAR) {
        selectedYear = MAX_YEAR;
    } else if (selectedYear < MIN_YEAR) {
        selectedYear = MIN_YEAR;
    }
    slider.value(selectedYear);
}
