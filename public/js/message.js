$(".expand-click").on("click", function() {
  var num = $(this).attr("id").split("-")[1];
  if($("#list-" + num).css('display') == "none") {
    $("#list-" + num).show();
    $("#form-" + num).show();
    $(this).html("Click To Collapse<i class=\"fa fa-chevron-up\"></i>");
  } else {
    $("#list-" + num).hide();
    $("#form-" + num).hide();
    $(this).html("Click To Expand<i class=\"fa fa-chevron-down\"></i>");
  }
});
