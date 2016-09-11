"use strict";

function DeviceOrientation(parameters) {
    this.name = parameters.name;
    this.rotation = parameters.rotationForDesktop;
    this.rotationForMobile = parameters.rotationForMobile;
    this.isLandscape = parameters.isLandscape;
    this.isPortrait = !parameters.isLandscape;

    this.nativeType = function () {
        return this.name;
    }
}

DeviceOrientation.getNative = function () {
    return screen.orientation || screen.mozOrientation || screen.msOrientation;
};

DeviceOrientation.get = function () {

    /**
     * 90 ?? ??: p p
     * 0 90/-90 89/270: l p
     * -90 50 0/360: p s - angezeigt als l (s/p)
     * 0 90/-90 20/200: l s
     */
    switch (DeviceOrientation.getNative().type) {
        case 'portrait-primary':
            return DeviceOrientation.PORTRAIT_PRIMARY;
        case 'portrait-secondary':
            /* it's a mode not supported by Chrome on Android */
            return DeviceOrientation.PORTRAIT_SECONDARY;
        case 'landscape-primary':
            if (rotationX <= -45 && rotationX >= -135) {
                return DeviceOrientation.PORTRAIT_SECONDARY;
            } else {
                return DeviceOrientation.LANDSCAPE_PRIMARY;
            }
        case 'landscape-secondary':
            if (rotationX <= -45 && rotationX >= -135) {
                return DeviceOrientation.PORTRAIT_SECONDARY;
            } else {
                return DeviceOrientation.LANDSCAPE_SECONDARY;
            }
        case 'undefined':
        case undefined:
            return DeviceOrientation.LANDSCAPE_PRIMARY;
    }
};

DeviceOrientation.prototype = {
    typeName: 'DeviceOrientation'
};

/**
 * It represents the orientation of the screen when it is in its primary portrait mode. A screen is considered in its
 * primary portrait mode if the device is held in its normal position and that position is in portrait, or if the
 * normal position of the device is in landscape and the device held turned by 90° clockwise. The normal position is
 * device dependant.
 * @type {DeviceOrientation}
 */
DeviceOrientation.PORTRAIT_PRIMARY = new DeviceOrientation({
    name: 'portrait-primary',
    rotationForDesktop: Math.PI * 0.5,
    rotationForMobile: false,
    isLandscape: false
});

/**
 * It represents the orientation of the screen when it is in its secondary portrait mode. A screen is considered in its
 * secondary portrait mode if the device is held 180° from its normal position and that position is in portrait, or if
 * the normal position of the device is in landscape and the device held is turned by 90° anticlockwise. The normal
 * position is device dependant.
 * @type {DeviceOrientation}
 */
DeviceOrientation.PORTRAIT_SECONDARY = new DeviceOrientation({
    name: 'portrait-secondary',
    rotationForDesktop: Math.PI * 1.5,
    rotationForMobile: function () {
        if (DeviceOrientation.getNative().type === 'landscape-primary'){
            return Math.PI * 0.5;
        } else {
            return this.rotationForDesktop;
        }
    },
    isLandscape: false
});

/**
 * It represents the orientation of the screen when it is in its primary landscape mode. A screen is considered in its
 * primary landscape mode if the device is held in its normal position and that position is in landscape, or if the
 * normal position of the device is in portrait and the device held is turned by 90° clockwise. The normal position is
 * device dependant.
 * @type {DeviceOrientation}
 */
DeviceOrientation.LANDSCAPE_PRIMARY = new DeviceOrientation({
    name: 'landscape-primary',
    rotationForDesktop: 0,
    rotationForMobile: false,
    isLandscape: true
});

/**
 * It represents the orientation of the screen when it is in its secondary landscape mode. A screen is considered in
 * its secondary landscape mode if the device held is 180° from its normal position and that position is in landscape,
 * or if the normal position of the device is in portrait and the device held is turned by 90° anticlockwise. The
 * normal position is device dependant.
 * @type {DeviceOrientation}
 */
DeviceOrientation.LANDSCAPE_SECONDARY = new DeviceOrientation({
    name: 'landscape-secondary',
    rotationForDesktop: Math.PI,
    rotationForMobile: false,
    isLandscape: true
});

DeviceOrientation.PORTRAIT_PRIMARY.clockwise = DeviceOrientation.LANDSCAPE_SECONDARY;
DeviceOrientation.PORTRAIT_PRIMARY.counterClockwise = DeviceOrientation.LANDSCAPE_PRIMARY;

DeviceOrientation.PORTRAIT_SECONDARY.clockwise = DeviceOrientation.LANDSCAPE_PRIMARY;
DeviceOrientation.PORTRAIT_SECONDARY.counterClockwise = DeviceOrientation.LANDSCAPE_SECONDARY;

DeviceOrientation.LANDSCAPE_PRIMARY.clockwise = DeviceOrientation.PORTRAIT_PRIMARY;
DeviceOrientation.LANDSCAPE_PRIMARY.counterClockwise = DeviceOrientation.PORTRAIT_SECONDARY;

DeviceOrientation.LANDSCAPE_SECONDARY.clockwise = DeviceOrientation.PORTRAIT_SECONDARY;
DeviceOrientation.LANDSCAPE_SECONDARY.counterClockwise = DeviceOrientation.PORTRAIT_PRIMARY;
