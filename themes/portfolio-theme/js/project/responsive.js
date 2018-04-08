'use strict';

var layout = 'large';

function adjustLayout(newLayout) {
	document.body.classList.remove('layout-' + layout);
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

	document.body.classList.add('layout-' + layout);

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

	var resizeTimer;

	$(window).on('resize', function () {

		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkLayout, 100);

	});

	checkLayout();
});