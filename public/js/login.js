$("#open-login").on("click", function() {
  $("#cover").show();
  $("#cover").animate({
    opacity: 1
  }, 500);
  $("#login").show();
  $("#login").animate({
    opacity: 1
  }, 500);
});
$("#exit-login").on("click", function() {
  $("#login").animate({
    opacity: 0
  }, 500, function() {
    $("#login").hide();
  });
  $("#cover").animate({
    opacity: 0
  }, 500, function() {
    $("#cover").hide();
  });
});
$("#open-register").on("click", function() {
  $("#cover").show();
  $("#cover").animate({
    opacity: 1
  }, 500);
  $("#register").show();
  $("#register").animate({
    opacity: 1
  }, 500);
});
$("#exit-register").on("click", function() {
  $("#register").animate({
    opacity: 0
  }, 500, function() {
    $("#register").hide();
  });
  $("#cover").animate({
    opacity: 0
  }, 500, function() {
    $("#cover").hide();
  });
});
