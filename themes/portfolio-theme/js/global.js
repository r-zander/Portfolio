console.log('Do I sense someone nosing around the console? Welcome!');

function initializeVideoAnimation(videoContainerSelector){
	/*
	 * Animate the playstate of the item videos
	 */
	$(videoContainerSelector).hover(function () {
		var ele = $(this);
		clearTimeout(ele.data('timeout'));
		var t = setTimeout(function(li) {
			var video = li.getElementsByTagName('video')[0];
			if (video && video.paused){
				video.play();
			}
		}, 180, this);
		ele.data('timeout', t);
	},function () {
		var ele = $(this);
		clearTimeout(ele.data('timeout'));
		var t = setTimeout(function(li) {
			var video = li.getElementsByTagName('video')[0];
			if (video && !video.paused){
				video.pause();
			}
		}, 300, this);
		ele.data('timeout', t);	
	});
}