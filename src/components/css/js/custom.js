// Navbar

// testimonial-slider

$(document).ready(function () {
  $("#testimonial-slider").owlCarousel({
    items: 1,
    itemsDesktop: [1199, 1],
    itemsDesktopSmall: [979, 1],
    itemsTablet: [768, 1],
    pagination: true,
    autoPlay: true,
    navigation: true,
    navigationText: ["", ""],
  });
});

// Custom Templates filter

$(document).ready(function () {
  $(".filter-button").click(function () {
    var value = $(this).attr("data-filter");

    if (value == "all") {
      //$('.filter').removeClass('hidden');
      $(".filter").show("1000");
    } else {
      //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
      //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
      $(".filter")
        .not("." + value)
        .hide("3000");
      $(".filter")
        .filter("." + value)
        .show("3000");
    }
    if ($(".filter-button").removeClass("active")) {
      $(this).removeClass("active");
    }
    $(this).addClass("active");
  });
});
