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
	initializeVideoAnimation('.subItems > a');

	if (window.DetectIt.primaryInput !== 'touch') {
		return;
	}
	preventClicksToFoldedCategories();
});
