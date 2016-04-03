$(".hamburger").on("click", function(){
  if ($(".fa-times").css("display") == "none") {
    $(".menu-list").show();
    $(".header").css("padding-bottom", "0px");
    $(".menu-list").animate({
      height: "82px"
    }, 800);
    $(".fa-bars").animate({
      opacity: 0
    }, 400, function() {
      $(".fa-times").show();
      $(".fa-bars").hide();
      $(".fa-times").animate({
        opacity: 1
      }, 400);
    });
    $("#hamtext").animate({
      opacity: 0
    }, 400, function() {
      $("#hamtext").text("Exit");
      $("#hamtext").animate({
        opacity: 1
      }, 400);
    });
  } else {
    $(".menu-list").animate({
      height: "0px"
    }, 800, function() {
      $(".header").css("padding-bottom", "15px");
      $(".menu-list").hide();
    });
    $(".fa-times").animate({
      opacity: 0
    }, 400, function() {
      $(".fa-times").hide();
      $(".fa-bars").show();
      $(".fa-bars").animate({
        opacity: 1
      }, 400);
    });
    $("#hamtext").animate({
      opacity: 0
    }, 400, function() {
      $("#hamtext").text("Menu");
      $("#hamtext").animate({
        opacity: 1
      }, 400);
    });
  }
});
