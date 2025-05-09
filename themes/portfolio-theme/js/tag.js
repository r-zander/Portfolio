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
		// packery: {
		// 	columnWidth: '.grid-sizer'
		// },
		// masonryHorizontal: {
		// 	rowHeight: 50//'.grid-sizer'
		// },
		transitionDuration: 0
	});

	$(".grid video").one('loadeddata', function(){
		iso.layout();
	});

	$(".grid img").one('load', function(){
		iso.layout();
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

	var $infoBox = $('.description > .infoBox');
	var $preContentDescription = $('main > .description.pre-content');
	var $postContentDescription = $('main > .description.post-content');

	$(document.body).on('layoutchange.portfolio', function (event, newLayout) {
		switch (newLayout) {
			case 'small':
				$infoBox.appendTo($postContentDescription);
				$postContentDescription.show();
				iso.layout();
				break;
			case 'medium':
			case 'large':
				$infoBox.appendTo($preContentDescription);
				$postContentDescription.hide();
				iso.layout();
				break;
		}
	});
});
