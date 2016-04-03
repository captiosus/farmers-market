$('.listings').bind('mousewheel', function (e) {
    if ($(window).width > 600) {
      $(this).scrollTop($(this).scrollTop() - e.originalEvent.wheelDeltaY);
      return false;
    }
});
$('.review-list').bind('mousewheel', function (e) {
    if ($(window).width > 600) {
      $(this).scrollTop($(this).scrollTop() - e.originalEvent.wheelDeltaY);
      return false;
    }
});
