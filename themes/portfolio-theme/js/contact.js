$(function(){
	/*
	 * Don't say the word ;)
	 */
	$('.glas').click(function(){
		window.location.href='mailto:'+$(this).html()+'@gmx.net';
	});

	// Enable contact card flip button
	$('#contact > .icon-flip').click(function(event) {
		$(this).parent().toggleClass('flipped');
	});
});