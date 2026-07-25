$(window).scroll(function () {
	const pageOffset =
		$("#product-grid").outerHeight() +
		$("#product-grid").offset().top -
		$(window).innerHeight();

	const windowOffset = $(window).scrollTop();

	if (windowOffset > pageOffset && $(".reached__to__end:last").text() === "") {
		$(".reached__to__end:last").text("Loading more products...");
		$("[loader]").show();
		console.log("Loading more called!");

		let totalPages = parseInt($("[data-all-pages]").val()),
			currentPage = parseInt($("[data-this-page]").val()),
			nextUrl = $("[data-next-link]").val(),
			currentPageNew = currentPage + 1,
			nextColl = currentPage + 2;

		$.ajax({
			url: nextUrl,
			type: "GET",
			dataType: "html",
			success: function (responseHTML) {
				const nextUrlNew = nextUrl.replace(
					`page=${currentPageNew}`,
					`page=${nextColl}`
				);
				$("[data-next-link]").val(nextUrlNew);
				$("[data-this-page]").val(currentPageNew);
				$("#product-grid").append($(responseHTML).find("#product-grid").html());
			},
			complete: function () {
				$("[loader]").hide();

				if (currentPageNew >= totalPages)
					$(".reached__to__end:last").text("You've reached to end.");
				else $(".reached__to__end").text("");
			}
		});
	}
});
