$(function () {
	$(".series.text").each(function() {
		var element = $(this);
		if (element.outerHeight() < this.scrollHeight) {
			element.css('max-height', (this.scrollHeight + 18) + 'px');
			var link = $('<a href="#" class="readMore">Read more</a>').
				click(function(event){
					event.preventDefault();

					var link = $(this);
					link.parent().removeClass('collapsed');
					link.remove();
				});
			element.append(link);
		}
	});
});