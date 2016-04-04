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
var rate = document.querySelector('#rating');
var rate1 = document.querySelector('#rating1');
var rate2 = document.querySelector('#rating2');
var rate3 = document.querySelector('#rating3');
var currentRating = 0;
var maxRating= 5;
var callback = function(rating) {  };
var myRating = rating(rate, currentRating, maxRating, callback);
var myRating1 = rating(rate1, currentRating, maxRating, callback);
var myRating2 = rating(rate2, currentRating, maxRating, callback);
var myRating3 = rating(rate3, currentRating, maxRating, callback);
