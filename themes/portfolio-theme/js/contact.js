$(function(){
	/*
	 * Don't say the word ;)
	 */
	$('.glas').click(function(){
		window.location.href='mailto:'+$(this).html()+'@rza.io';
	});

	// Enable contact card flip button
	$('#contact .folded-corner').click(function(event) {
		$(this).parents("#contact").toggleClass('flipped');
		$('.featherlight-close').hide(0).delay(600).show(0);
	});
});