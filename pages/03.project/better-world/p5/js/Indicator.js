"use strict";

function Indicator(title, tableHeader, values, icon) {
    this.title = title;
    this.tableHeader = tableHeader;
    this.values = values;
    this.icon = icon;

    this.x = 0;
    this.y = 0;
    this.width = 0;

    this.multiplier = 1;
}

Indicator.prototype.setValue = function (index, value) {
    this.values[index] = value;
};

Indicator.prototype.getValue = function (index) {
    return this.intValues[index];
};

Indicator.prototype.interpolateMissingValues = function () {
    Interpolator.interpolate(this.values, "linear");

    this.intValues = new Array(this.values.length);
    for (var i = 0; i < this.values.length; i++) {
        if (this.values[i] != null) {
            this.intValues[i] = Math.round(this.values[i] * this.multiplier);
        }
    }
};