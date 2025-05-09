'use strict';

$(function () {
	$(document.body).on('layoutchange.portfolio', function (event, newLayout) {
		var $main = $('main');
		switch (newLayout) {
			case 'medium':
			case 'small':
				$main.children('.content').prependTo($main);
				break;
			case 'large':
				$main.children('.description').prependTo($main);
				break;
		}

		// Reload content tabs after the layout had a chance to be applied
		setTimeout(function () {
			$('#contentTabs > .frame').eq(0).sly('reload');
		});
	})
});
