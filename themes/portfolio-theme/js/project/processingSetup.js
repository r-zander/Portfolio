/* Custom functions / globals for processing */
var displayWidth, displayHeight;
function preSetup () {
	var mediaContainer = document.querySelector("#render");
	displayWidth = mediaContainer.clientWidth;
	// displayHeight = window.innerHeight - 185;
	displayHeight = displayWidth / 16 * 9;
}

/* Custom loading of processing */
Processing.disableInit();
var processingInstances; // Processing.reload needs this variable ... but doesn't defines it.

$(function () {
	$('#render').bind('initialActivation', function(){
		processingInstances = Processing.instances;
		Processing.reload();
		$("#render > canvas").focus();
	});
	$('#render').bind('activation', function(){
		var p = Processing.getInstanceById('renderCanvas');
		p.loop();
		$("#render > canvas").focus();
	});
	$('#render').bind('deactivation', function(){
		var p = Processing.getInstanceById('renderCanvas');
		p.noLoop();
	});
});