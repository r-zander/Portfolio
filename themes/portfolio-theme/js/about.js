hljs.initHighlightingOnLoad();

$("#source .frame a").click(function(e){
	e.preventDefault();
});

$(function() {
	$('.interactionTips').affix({
		offset: {
			top: $('#sources_less').offset().top
		}
	});

	/* Init sly */
	(function () {
		var $frame  = $('#source .frame');
		var $slidee = $frame.children('.slidee').eq(0);
		var $wrap   = $frame.parent();

		var options = newSlyOptions($wrap);

		// Call Sly on frame
		$frame.sly(
			options,
			// Callbacks
			{
				load: function (eventName) {
					checkScrollShadow($wrap, this.pos);
				},
				active: function(eventName, itemIndex){
					var tabs = $slidee.children();
					var link = tabs.eq(itemIndex);

					$(".sources.active").removeClass("active");
					$(".sources[data-source-id='" + link.attr("data-target") + "']").addClass("active");

					var $window = $(window);
					var sourceTop = $('#source').offset().top;
					if ($window.scrollTop() > sourceTop){
						// Scroll back to top of sources.
						$window.scrollTop(sourceTop);
					}
				},
				move: function (eventName) {
					checkScrollShadow($wrap, this.pos);
				}
			}
		);
	}());
});