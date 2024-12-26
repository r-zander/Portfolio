function syncHoverOfAboutMeLinks() {
	/*
     * Connect the hover of both 'About Me' links
     */
	var link1 = $('#aboutMe');
	var link2 = $('.contactLink');

	link1.hover(function () {
		link2.addClass('hover');
	}, function () {
		link2.removeClass('hover');
	});

	link2.hover(function () {
		link1.addClass('hover');
	}, function () {
		link1.removeClass('hover');
	});

	initializeVideoAnimation('.subItems > a');
}

function preventClicksToFoldedCategories() {
	document.querySelectorAll('#indexNavigation .itemWrapper > a.categoryLink').forEach((link) => {
		link.addEventListener('click', (event) => {
			const listItem = link.closest('li');
			if (!listItem.classList.contains('active')) {
				document.querySelectorAll('#indexNavigation > li.active').forEach((activeListItem) => {
					activeListItem.classList.remove('active');
				});
				listItem.classList.add('active');
				event.preventDefault();
			}
			// else normally execute the click
		});
	});
}

$(function () {

	syncHoverOfAboutMeLinks();

	if (window.DetectIt.primaryInput !== 'touch') {
		return;
	}
	preventClicksToFoldedCategories();
});
