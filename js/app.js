var googMapAPI = "AIzaSyCkPGj9d4QyMtcRFYDII4xco_KBA428oQE";
var geoCodeAPI = "AIzaSyCkcvMu_0Ar7_Xv3R3MB6-Ffp_Gxq9Di9s";
var myLatLng = {lat: 21.469324, lng: -157.961810};
var defaultLocations = [{lat: 21.2759257, lng: -157.8145445}]

var map;
function initMap() {
	var mapOptions = {
		center: myLatLng,
		scrollwheel:false,
		zoom: 11
	};
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	var marker = new google.maps.Marker({
		map: map,
		position: defaultLocations[0]
	});
	google.maps.event.addDomListener(window, 'load', initMap);
	google.maps.event.addDomListener(window, 'resize', function() {
		var c = map.getCenter();
		google.maps.event.trigger(map, 'resize');
		map.setCenter(c);
	});
}

function placesViewModel() {
	var self = this;

	self.places = ko.observableArray([
		{name: "Rainbow Drive-In", type: "restaruant", coordinates: {lat: 21.2759257, lng: -157.8145445}, description: "Description here", clicked: ko.observable(false)},
		{name: "Big Wave Shrimp Truck", type: "restaraunt", coordinates: {lat: 21.579469, lng: -158.105532}, description: "Description here", clicked: ko.observable(false)}
	]);

	// Offers a toggle for clicking
	self.click = function(place) {
		var index = self.places().indexOf(place);
		console.log(index);
		self.places()[index].clicked(!place.clicked());
/*		if (self.places()[index].clicked()) {
			self.places()[index].clicked(false);
		} else {
			self.places()[index].clicked(true);
		}
*/
		console.log("clicked: " + self.places()[index].clicked());
		//self.places()[index].clicked(true);
		//console.log("clicked: " + self.places()[index].clicked());
	}
}

function searchViewModel() {
	var self = this;

	self.search = ko.observable('');

	self.log = function() {
		console.log(self.search());
	}
};

var viewModel = {
	test: ko.observable("Test: "),
	phrase: ko.observable(123)
};

ko.applyBindings(new placesViewModel(), document.getElementById('placesField'));
ko.applyBindings(new searchViewModel(), document.getElementById('searchField'));



//https://maps.googleapis.com/maps/api/geocode/json?address=3308+Kanaina+Avenue+Honolulu,+HI+96815&key=AIzaSyCkcvMu_0Ar7_Xv3R3MB6-Ffp_Gxq9Di9s