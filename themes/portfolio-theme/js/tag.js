$(function () {
	initializeVideoAnimation(".grid-item > a");

	/*
	 * Initialize Isotope Grid
	 */
	var iso = new Isotope( '.grid', {
		layoutMode: 'masonry',
		itemSelector: '.grid-item',
		percentPosition: true,
		masonry: {
			columnWidth: '.grid-sizer'
		},
		packery: {
		  columnWidth: '.grid-sizer'
		},
		transitionDuration: 0
	});

	$(".grid video").one('loadeddata', function(){
		iso.layout();
	});

	$(".grid img").one('load', function(){
		iso.layout();
	});

	iso.on( 'layoutComplete', function(){
		$(".grid .projectTitle").each(function(){
			var ele = $(this);
			ele.css("margin-top", ele.outerHeight() / -2);
		});
	});

	/*
	 * Related tags highlighting
	 */
	 $('#relatedTags > a').hover(function(){
	 	var tag = $(this).attr('data-tag');
	 	$('.grid-item[data-tags~="' + tag + '"]').addClass('active');
	 }, function() {
	 	$('.grid-item.active').removeClass('active');
	 });
});