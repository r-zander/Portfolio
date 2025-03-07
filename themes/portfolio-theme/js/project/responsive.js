'use strict';

var layouts = ['small', 'medium', 'large'];
var cssClasses = ['layout-small', 'layout-medium', 'layout-large'];
var layoutClasses = {};
var layout = undefined;

function adjustLayout(newLayout) {
	cssClasses.forEach(function (cssClass) {
		document.body.classList.remove(cssClass);
	});
	layout = newLayout;

	var $main = $('main');
	switch (layout) {
		case 'medium':
			$main.children('.content').prependTo($main);
			break;
		case 'large':
			$main.children('.description').prependTo($main);
			break;
	}

	document.body.classList.add(layoutClasses[layout]);

	// Reload content tabs after the layout had a chance to be applied
	setTimeout(function () {
		$('#contentTabs > .frame').eq(0).sly('reload');
	});
}

function checkLayout(){
	var layoutWidth = window.innerWidth;
	var newLayout = 'large';

	if (layoutWidth <= 600){
		newLayout = 'small';
	} else if (layoutWidth <= 1280){
		newLayout = 'medium';
	}

	if (newLayout !== layout){
		adjustLayout(newLayout);
	}
}

$(function () {

	for (var i = 0; i < layouts.length; i++) {
		layoutClasses[layouts[i]] = cssClasses[i];
	}

	var resizeTimer;

	$(window).on('resize', function () {
		// This should be throttled, not debounced
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkLayout, 100);

	});

	checkLayout();
});
