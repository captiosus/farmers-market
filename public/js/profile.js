$('.listings').bind('mousewheel', function (e) {
    $(this).scrollTop($(this).scrollTop() - e.originalEvent.wheelDeltaY);
    return false;
});
$('.review-list').bind('mousewheel', function (e) {
    $(this).scrollTop($(this).scrollTop() - e.originalEvent.wheelDeltaY);
    return false;
});
