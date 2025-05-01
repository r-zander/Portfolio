$(function(){
	/*
	 * Don't say the word ;)
	 */
	$('.glas').click(function(){
		window.location.href='\u006d\u0061\u0069\u006c\u0074\u006f\u003a'+$(this).html()+'@rza.io';
	});

	// Enable contact card flip button
	$('#contact .folded-corner').click(function(event) {
		event.preventDefault();

		$(this).parents("#contact").toggleClass('flipped');
		$('.featherlight-close').hide(0).delay(600).show(0);
	});

	if (window.location.hash === '#contact'){
		$.featherlight('#contact');
	}

	// Set up featherlight settings (for the "About me" overlay)
	$.featherlight.defaults.openSpeed = 500;
	$.featherlight.defaults.beforeOpen = function () {
		window.location.hash = '#contact';
	};
	$.featherlight.defaults.afterClose = function () {
		var scrollTop = $(document).scrollTop();
		var scrollLeft = $(document).scrollLeft();

		window.location.hash = '';

		// Restore the scroll offset, should be flicker free
		$(document).scrollTop(scrollTop);
		$(document).scrollLeft(scrollLeft);
	};

	syncHoverOfAboutMeLinks();
});

function syncHoverOfAboutMeLinks() {
	/*
     * Connect the hover of both 'About Me' links
     */
	var links = $('a[href="#contact"]');

	links.hover(function () {
		links.addClass('hover');
		links.each(function (index, element) {
			var hoverTarget = $(element).data('hover');
			if (typeof(hoverTarget) === 'string') {
				$(hoverTarget).addClass('hover');
			}
		});
	}, function () {
		links.removeClass('hover');
		links.each(function (index, element) {
			var hoverTarget = $(element).data('hover');
			if (typeof(hoverTarget) === 'string') {
				$(hoverTarget).removeClass('hover');
			}
		});
	});
}
