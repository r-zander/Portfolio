function createLabeledSlider(parameters) {
	var container = parameters.container;
	var id = parameters.id;
	var labelText = parameters.labelText;
	var min = parameters.min;
	var max = parameters.max;
	var value = parameters.value;
	var step = parameters.step;

	var label = createElement('label', labelText);
	label.parent(container);
	label.class('forSlider');
	label.attribute('for', id);

	var defaultMarker = createDiv('');
	defaultMarker.parent(container);
	defaultMarker.class('defaultMarker');
	var offset = (value - min) / (max - min);
	defaultMarker.style('left', (offset * 100) + "%");
	// The marker has to be offset by its own width, depending on the position,
	// because the slider will always stay inside its bounds, so 100% is not outside
	defaultMarker.style('margin-left', (offset * -12) + "px");

	var slider = createSlider(min, max, value, step);
	slider.parent(container);
	slider.id(id);

	return slider;
}