/* Init sly */
$( window ).on( "load", function() {
	var $wrap   = $('#contentTabs');
	var $frame  = $wrap.children('.frame').eq(0);
	var $slidee = $frame.children('.slidee').eq(0);
	
	var $tabs = $slidee.children();
	$tabs.click(function(e){
		if ($(this).attr('href').startsWith('#')){
			e.preventDefault();
		}
	});

	var options = newSlyOptions($wrap);
		options.keyboardNavBy = null;
	// options.interactive = function (index, element){
	// 	return element.attr('href').startsWith('#');
	// };

	// Select the correct start tab according to the location hash 
	// var hash = window.location.hash;
	// if (hash) {
	// 	options.startAt = $slidee.children('[href="' + hash + '"]').index();
	// }

	var lastItemIndex = options.startAt;
	// Call Sly on frame
	$frame.sly(
		options,
		// Callbacks
		{
			load: function (eventName) {
				checkScrollShadow($wrap, this.pos);
			},
			active: function(eventName, itemIndex){
				// window.location = $slidee.children().eq(itemIndex).attr('href');
				var link = $tabs.eq(itemIndex);
				if (!link.attr('href').startsWith('#')){
					this.activate(lastItemIndex);
					return;
				}
				lastItemIndex = itemIndex;

				var media = $('.content > .media');

				var medium = media.filter('.active');
				if (medium.length){
					medium.removeClass("active");
					medium.trigger('deactivation');
				}

				medium = media.filter(link.attr('href'));

				if (!medium.hasClass('initialized')){
					medium.addClass('initialized');
					medium.addClass('active');
					medium.trigger('initialActivation');
				} else {
					medium.addClass('active');
					medium.trigger('activation');
				}
				
			},
			move: function (eventName) {
				checkScrollShadow($wrap, this.pos);
			}
		});

	$('#webm').bind('activation initialActivation', function(){
		var video = this.getElementsByTagName('video')[0];
		if (video.paused){
			video.play();
		}
	});

	$('#webm').bind('deactivation', function(){
		var video = this.getElementsByTagName('video')[0];
		if (!video.paused){
			video.pause();
		}
	});
});
