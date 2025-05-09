$(function() {
	var $wrap  = $('#screenshots');

	$wrap.bind('initialActivation', function(){
		// -------------------------------------------------------------
		//   One Item Per Frame
		// -------------------------------------------------------------
		$wrap.addClass('noScroll');
		$wrap.find(".frame li").css("width", $wrap.width());
		$wrap.removeClass('noScroll');

		(function () {
			var $frame = $wrap.find('.frame');

			// Call Sly on frame
			$frame.sly({
				horizontal: true,
				itemNav: 'forceCentered',
				smart: true,
				activateMiddle: true,
				mouseDragging: true,
				touchDragging: true,
				releaseSwing: true,
				startAt: 0,
				scrollBar: $wrap.find('.scrollbar'),
				
				scrollSource: null,

				keyboardNavBy: 'items',
				speed: 300,
				elasticBounds: true,
				easing: 'easeOutExpo',
				dragHandle: true,
				dynamicHandle: true,
				clickBar: true,

				// Buttons
				prev: $wrap.find('.prev'),
				next: $wrap.find('.next')
			},
			// Callbacks
			{
			});
		}());
	});
});
