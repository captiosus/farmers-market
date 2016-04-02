var distance = document.getElementById("distance");

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

var price = document.getElementById("price");

noUiSlider.create(price, {
	start: [0, 100],
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

var quantity = document.getElementById("quantity");

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
