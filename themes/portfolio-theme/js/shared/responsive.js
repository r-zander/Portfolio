'use strict';

var layouts = ['small', 'medium', 'large'];
var cssClasses = ['layout-small', 'layout-medium', 'layout-large'];
var layoutClasses = {};
var currentLayout = undefined;

function adjustLayout(newLayout) {
	cssClasses.forEach(function (cssClass) {
		document.body.classList.remove(cssClass);
	});
	currentLayout = newLayout;
	document.body.classList.add(layoutClasses[currentLayout]);

	$(document.body).trigger('layoutchange.portfolio', newLayout);
}

function checkLayout(){
	var layoutWidth = window.innerWidth;
	var newLayout = 'large';

	if (layoutWidth <= 600){
		newLayout = 'small';
	} else if (layoutWidth <= 1280){
		newLayout = 'medium';
	}

	if (newLayout !== currentLayout){
		adjustLayout(newLayout);
	}
}

$(function () {

	for (var i = 0; i < layouts.length; i++) {
		layoutClasses[layouts[i]] = cssClasses[i];
	}

	$(window).on('resize',  _.throttle(checkLayout, 100, {leading: true}));

	checkLayout();
});
