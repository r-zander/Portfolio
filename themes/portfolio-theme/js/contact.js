$(function(){
	/*
	 * Don't say the word ;)
	 */
	$('.glas').click(function(){
		window.location.href='mailto:'+$(this).html()+'@rza.io';
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
});