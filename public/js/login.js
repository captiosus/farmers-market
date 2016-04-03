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

$('#loginbutton').click(function(){
  var data = {};
  $('#login input').each(function(){
      data[$(this).attr('name')] = $(this).val();
  });
  $.ajax({
    url:'/login',
    method:'POST',
    data:data,
    success:function(result){
      if(!result.success){
        $('#login p.error').html(result.message);
      }else{
        window.location.href = '/profile';
      }
    }
  });
})

$('#registerbutton').click(function(){
  var data = {};
  console.log('hello');
  $('#register input').each(function(){
    data[$(this).attr('name')] = $(this).val()
  })
  if(data['confirm-password'] != data['password']){
    $('#login ')('Passwords do not match!');
    return;
  }
  $.ajax({
    url:'/register',
    method:'POST',
    data: data,
    success:function(result){
      console.log('hello');
      console.log(result);
      if(!result.success){
        $('#register p.error').html(result.message);
      }
      window.location.href="/profile";
    },
    error:function(err){
      console.log(err);
    }
  });
})
