"use strict";


/**
 * http://stackoverflow.com/a/7913617
 *
 * <pre>
 * input : Float[] a = {1.0f, null, null, 2.0f, null, null, null, 15.0f};
 *
 * call : Interpolator.interpolate(a, "Linear");
 *
 * output : 1.0|1.3333333|1.6666667|2.0|5.25|8.5|11.75|15.0</pre>
 */
var Interpolator = {

    cosineInterpolate: function (y1, y2, mu) {
        var mu2;

        mu2 = (1.0 - Math.cos(mu * Math.PI)) / 2.0;
        var f_mu2 = mu2;
        return (y1 * (1.0 - f_mu2) + y2 * f_mu2);
    },

    linearInterpolate: function (y1, y2, mu) {
        return (y1 * (1 - mu) + y2 * mu);
    },

    interpolate: function (a, mode) {

        // Check that have at least the very first and very last values non-null
        if (!(a[0] != null && a[a.length - 1] != null))
            return null;

        var non_null_idx = [];
        var steps = [];

        var step_cnt = 0;
        for (var i = 0; i < a.length; i++) {
            if (a[i] != null) {
                non_null_idx.push(i);
                if (step_cnt != 0) {
                    steps.push(step_cnt);
                }
                step_cnt = 0;
            } else {
                step_cnt++;
            }
        }

        var f_start = null;
        var f_end = null;
        var f_step = null;
        var f_mu = null;

        i = 0;
        while (i < a.length - 1) // Don't do anything for the very last element (which should never be null)
        {
            if (a[i] != null && non_null_idx.length > 1 && steps.length > 0) {
                f_start = a[non_null_idx[0]];
                f_end = a[non_null_idx[1]];
                f_step = 1 / (steps[0] + 1);
                f_mu = f_step;
                non_null_idx.shift();
                steps.shift();
            } else if (a[i] == null) {
                if (mode === "cosine")
                    a[i] = this.cosineInterpolate(f_start, f_end, f_mu);
                else
                    a[i] = this.linearInterpolate(f_start, f_end, f_mu);
                f_mu += f_step;
            }
            i++;
        }

        return a;
    }
};