var googMapAPI = "AIzaSyCkPGj9d4QyMtcRFYDII4xco_KBA428oQE";
var geoCodeAPI = "AIzaSyCkcvMu_0Ar7_Xv3R3MB6-Ffp_Gxq9Di9s";
var myLatLng = {lat: 21.469324, lng: -157.961810};
var defaultCoords = [];
var defaultNames = [];
var defaultDescription = ["rainbow","big wave","fresh","jawaiian","germaine","uahi","sweet","boots"];
var defaultLocations = [];
var defaultAmount = 0;
var defaultAddresses = {
	"Rainbow Drive-In" : "3308 Kanaina Avenue Honolulu, HI 96815",
	"Big Wave Shrimp Truck" : "66-521 Kamehameha Hwy. Haleiwa, HI 96712",
	"Fresh Catch" : "3109 Waialae Ave Honolulu, HI 96816",
	"Jawaiian Irie Jerk" : "1137 11th Ave. Honolulu, HI 96816",
	"Germaine's Luau" : "91-119 Olai St. Kapolei, HI 96707",
	"Uahi Island Grill" : "131 Hekili St #102 Kailua, HI 96734",
	"Sweet Home Waimanalo" : "41-1025 Kalanianaole Hwy Waimanalo, HI 96795",
	"Boots and Kimo's Homestyle Kitchen" : "151 Hekili St Kailua, HI 96734"
};

function handleDefaultLoc(obj) {
	var uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
	var key = '&key=' + geoCodeAPI;
	var gpsCoords = [];
	for(var item in defaultAddresses) {
		defaultNames.push(item);
		defaultAmount++;
		var addr = defaultAddresses[item];
		var url = uri + addr + key;
		console.log(url);
		$.getJSON(url, function(data) {
			var obj = {};
			if(data.status == "OK") {
				var d = data.results[0].geometry.location;
				obj.lat = d.lat;
				obj.lng = d.lng;
				gpsCoords.push(obj);
			} else {
				console.log("error");
			}
		});
	}
	return gpsCoords;
	//https://maps.googleapis.com/maps/api/geocode/json?address=66-521 Kamehameha Hwy. Haleiwa, HI 96712&key=AIzaSyCkcvMu_0Ar7_Xv3R3MB6-Ffp_Gxq9Di9s
}

function buildDefaultLoc() {
	for(i = 0; i < defaultAmount; i++) {
		var object = {};
		object.name = defaultNames[i];
		object.type = "restaurant";
		object.coordinates = defaultCoords[i];
		object.description = defaultDescription[i];
		object.clicked = ko.observable(false);
		object.match = ko.observable(true);
		defaultLocations.push(object);
	}
}

function placesViewModel() {
	var self = this;

	self.places = ko.observableArray(defaultLocations);

	self.infoWindows = function(index) {
		infoWindows[index].open(map, mapMarkers[index]);
	}

	// Offers a toggle for clicking
	self.click = function(place) {
		var index = self.places().indexOf(place);
		self.places()[index].clicked(!place.clicked());
		self.infoWindows(index);
	}
};

function searchViewModel() {
	var self = this;

	self.search = ko.observable('');

	self.log = function() {
		console.log(self.search());
	}
};

var viewModel = {
	placesView : new placesViewModel(),
	searchView : new searchViewModel(),
	init : function() {
		//ko.applyBindings(viewModel.places, document.getElementById('placesField'));
		//ko.applyBindings(viewModel.search, document.getElementById('searchField'));
		defaultCoords = handleDefaultLoc(defaultAddresses);
		buildDefaultLoc();
		ko.applyBindings(viewModel);
	},
	print : function(self) {
		console.log(self.search());
	},
	compareSearch : function(index) {
		var searchString = viewModel.searchView.search();

		var nlowercase = viewModel.placesView.places()[index].name.toLowerCase();
		var slowercase = searchString.toLowerCase();

		if(nlowercase.indexOf(slowercase) > -1) {
			viewModel.placesView.places()[index].match(true);
		} else if(searchString.length == 0) {
			viewModel.placesView.places()[index].match(true);
		} else {
			viewModel.placesView.places()[index].match(false);			
		}

		return viewModel.placesView.places()[index].match();
	}
};

viewModel.init();

var map;
var mapMarkers = [];
var infoWindows = [];
function initMap() {
	var mapOptions = {
		center: myLatLng,
		scrollwheel:false,
		zoom: 11
	};
	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	google.maps.event.addDomListener(window, 'resize', function() {
		var c = map.getCenter();
		google.maps.event.trigger(map, 'resize');
		map.setCenter(c);
	});
	createMapMarker(defaultCoords);
	placeMapMarker();
}

function createMapMarker(locArray) {
	var len = defaultCoords.length;
	for(i = 0; i < len; i++) {
		var marker = new google.maps.Marker({
			map: map,
			position: locArray[i]
		});
		var infowindow = new google.maps.InfoWindow({
			content: defaultDescription[i],
			minWidth: 300
		});
		infoWindows.push(infowindow);
		mapMarkers.push(marker);
	}
}

function placeMapMarker() {
	var len = mapMarkers.length;
	console.log('map marker length: ' + len);
	for(i = 0; i < len; i++) {
		mapMarkers[i].setMap(map);
		mapMarkers[i].addListener('click', (function(marker, infowindow){
			return function() {
				infowindow.open(map, marker);
			};
		})(mapMarkers[i], infoWindows[i]));
	}
}

//ko.applyBindings(new placesViewModel(), document.getElementById('placesField'));
//ko.applyBindings(new searchViewModel(), document.getElementById('searchField'));



//https://maps.googleapis.com/maps/api/geocode/json?address=3308+Kanaina+Avenue+Honolulu,+HI+96815&key=AIzaSyCkcvMu_0Ar7_Xv3R3MB6-Ffp_Gxq9Di9s