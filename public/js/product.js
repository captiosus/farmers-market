$(document).ready(function(){
  console.log('hi');
})

var listing;
var getlisting = function(){
  $.ajax({
    url:window.location.href,
    success: function(data){
      listing = JSON.parse(data);
    },
    complete: function(){
      updatePage();
    }
  })
};

var updatePage = function(){
  if(!listing){ return; }
  

};
