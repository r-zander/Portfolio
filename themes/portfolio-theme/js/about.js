// Use onload to make sure content has been layouted
$(window).load(function () {
		/* Adjust table headings */
		$('.contentHeading > table').each(function () {

			var $this = $(this);
			var $headingCells = $this.find('tr:first-child > td, tr:first-child > th');
			var $contentCells = $this
				.closest('.contentHeading')
				.next('.content')
				.children('table')
				.find('tr:first-child > td');

			$headingCells.each(function (index) {
				$(this).css('width', $contentCells.eq(index).css('width'));
			});
		});
});