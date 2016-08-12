function newSlyOptions ($wrap) {
	return {
		horizontal: true,
		itemNav: 'basic',
		smart: true,
		activateOn: 'click',
		mouseDragging: true,
		touchDragging: true,
		releaseSwing: true,
		startAt: 0,
		scrollBy: 1,
		scrollTrap: true,
		keyboardNavBy: 'items',
		speed: 300,
		elasticBounds: 1,
		easing: 'easeOutExpo',

		// Buttons
		prev: $wrap.find('.prev'),
		next: $wrap.find('.next'),
	};
}

function checkScrollShadow($wrap, pos){
	if (pos.cur <= pos.start){
		$wrap.removeClass("scrollShadowLeft");
	} else {
		$wrap.addClass("scrollShadowLeft");
	}
	if (pos.cur >= pos.end){
		$wrap.removeClass("scrollShadowRight");
	} else {
		$wrap.addClass("scrollShadowRight");
	}
}