$(function(){
	/*
	 * Connect the hover of both 'About Me' links
	 */
	var link1 = $('#aboutMe');
	var link2 = $('.contactLink');

	link1.hover(function(){
		link2.addClass("hover");
	}, function(){
		link2.removeClass("hover");
	});

	link2.hover(function(){
		link1.addClass("hover");
	}, function(){
		link1.removeClass("hover");
	});

	initializeVideoAnimation(".subItems > a");
});