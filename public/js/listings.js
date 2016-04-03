// This is to retrieve listings and such

var windowparams = {};
var getparams = function(){
	var pageurlqueryparams = window.location.search.substring(1).split('&');
	for (var param in pageurlqueryparams){
		param = pageurlqueryparams[param].split('=');
		windowparams[param[0]] = param[1];
	}
};
$(document).ready(function(){
	setupFilter(function(){
		getparams();
		generateListings();
		$("#filter").click(updateListingTable);
	});
});

var listings;
var generateListings = function(){
	$.ajax({
		url:'/listings',
		method:"POST",
		data:{ zipcode:windowparams['zipcode'] },
		success:function(data){
			if (data.success){
				listings = data.listings;
			}else{
				console.log("failure");
			}
		},
		complete:function(){
			updateListingTable(listings);
		}
	});
};
var updateListingTable= function (){
};
var filter = function(unfiltered){
	var filtered = [];
	var distancelimit = parseInt(distance.noUiSlider.get());
	var pricerange = price.noUiSlider.get();
	var quantitylimit = quantity.noUiSlider.get();
	for (var listingkey in unfiltered){
		var condition = true;
		var listing = unfiltered[listingkey];
		if(listing.price && condition){condition = parseInt(pricerange[0]) <= listing.price && listing.price <= parseInt(pricerange[1]);}
		if((listing.distance || listing.distance == 0) && condition){condition = listing.distance <= distancelimit;}
		if(listing.quantity && condition){ condition = parseInt(quantity[0]) <= listing.quantity && listing.quantity <= parseInt(quantity[1])};
		if (condition){
			filtered.push(listing);
		}
	}
	return filtered;
};


// NOUISLIDER STUFF GOES BELOW THIS
var distance, price, quantity;
var setupFilter = function(callback){
	distance = document.getElementById("distance");
	noUiSlider.create(distance, {
		start: 10,
	  step: 1,
	  connect: 'lower',
		range: {
			'min': 1,
			'max': 50
		}
	});
	var distanceRead = document.getElementById("distance-read");
		distance.noUiSlider.on('update', function( values, handle ) {
			distanceRead.innerHTML = parseInt(values[handle]);
	});
	price = document.getElementById("price");
	noUiSlider.create(price, {
		start: [1, 100],
	  step: 1,
	  connect: true,
		range: {
			'min': 1,
			'max': 100
		}
	});

	var prices = [
	  document.getElementById("price-from"),
	  document.getElementById("price-to")
	];
	price.noUiSlider.on('update', function( values, handle ) {
		prices[handle].innerHTML = "$" + parseInt(values[handle]);
	});

	quantity = document.getElementById("quantity");
	noUiSlider.create(quantity, {
		start: [0, 50],
	  step: 1,
	  connect: true,
		range: {
			'min': 1,
			'max': 50
		}
	});

	var quantities = [
	  document.getElementById("quantity-from"),
	  document.getElementById("quantity-to")
	];
	quantity.noUiSlider.on('update', function( values, handle ) {
		quantities[handle].innerHTML = parseInt(values[handle]);
	});
	callback();
};

$(".filter").on("click", function(){
  if ($(".fa-chevron-left").css("display") == "none") {
    $("#listings-container").animate({
      opacity: 0
    }, 400, function(){
      $("#listings-container").hide();
      $("#filter").show();
      $("#filter").animate({
        opacity: 1
      }, 400);
    });
    $(".fa-filter").animate({
      opacity: 0
    }, 400, function(){
      $(".fa-filter").hide();
      $(".fa-chevron-left").show();
      $(".fa-chevron-left").animate({
        opacity: 1
      }, 400);
    });
    $("#filtertext").animate({
      opacity: 0
    }, 400, function(){
      $("#filtertext").text("Back");
      $("#filtertext").animate({
        opacity: 1
      }, 400);
    });
  } else {
    $("#filter").animate({
      opacity: 0
    }, 400, function(){
      $("#filter").hide();
      $("#listings-container").show();
      $("#listings-container").animate({
        opacity: 1
      }, 400);
    });
    $(".fa-chevron-left").animate({
      opacity: 0
    }, 400, function(){
      $(".fa-chevron-left").hide();
      $(".fa-filter").show();
      $(".fa-filter").animate({
        opacity: 1
      }, 400);
    });
    $("#filtertext").animate({
      opacity: 0
    }, 400, function(){
      $("#filtertext").text("Filter");
      $("#filtertext").animate({
        opacity: 1
      }, 400);
    });
  }
});
