
// Encapsulate code in function that is called upon load of the google api
// before invoking methods that utilize google code
	var map;
	var mapMarkers = {};
	var infoWindows = {};
		var defaultLocations = [];
			var fourSquareDescription = {};
function app() {
	var googMapAPI = "AIzaSyCkPGj9d4QyMtcRFYDII4xco_KBA428oQE";
	var geoCodeAPI = "AIzaSyCkcvMu_0Ar7_Xv3R3MB6-Ffp_Gxq9Di9s";
	var myLatLng = {lat: 21.469324, lng: -157.961810};
	var defaultCoordsAddr = [];
	var defaultNames = [];
	var defaultDescription = ["rainbow","big wave","fresh","jawaiian","germaine","uahi","sweet","boots"];

	var defaultAmount = 0;
	var defaultAddresses = {
		"Jawaiian Irie Jerk" : "1137 11th Ave, Honolulu, HI 96816, USA",
		"Uahi Island Grill" : "131 Hekili St, Kailua, HI 96734, USA",
		"Boots and Kimo's Homestyle Kitchen" : "151 Hekili St, Kailua, HI 96734, USA",
		"Fresh Catch" : "3109 Waialae Ave, Honolulu, HI 96816, USA",
		"Rainbow Drive-In" : "3308 Kanaina Ave, Honolulu, HI 96815, USA",
		"Big Wave Shrimp Truck" : "66-521 Kamehameha Hwy, Haleiwa, HI 96712, USA",
		"Germaine's Luau" : "91-119 Olai St, Kapolei, HI 96707, USA"
	};


	// Initalizes the map
	function initMap() {
		// Map is center determined by global variable
		var mapOptions = {
			center: myLatLng,
			scrollwheel:false,
			zoom: 11
		};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		// As the window resizes the center of the map follows the center of the screen
		google.maps.event.addDomListener(window, 'resize', function() {
			var c = map.getCenter();
			google.maps.event.trigger(map, 'resize');
			map.setCenter(c);
		});
	}

	// Contains functions that interact with and also create items for the google map
/*	var mapHandler = {
		// Generates map marker and corresponding infowindow
		// Passes these two as a package to the placeMapMarker function
		createMapMarker : function(loc, index) {
			var marker = new google.maps.Marker({
				map: map,
				position: loc
			});
			var infowindow = new google.maps.InfoWindow({
				content: this.createContent(index),
				minWidth: 300
			});
			this.isVisible = ko.observable(false);
			var obj = {};
			obj[index] = infowindow;
			infoWindows[index] = infowindow;
			mapMarkers[index] = marker;
			return [marker, obj];
		},
		// Places the marker and its corresponding infoWindow onto the map
		placeMapMarker : function(markerWindow, index) {
			var marker = markerWindow[0];
			var infowindow = markerWindow[1][index];
			marker.setMap(map);
			marker.addListener('click', (function(marker, infowindow){
				return function() {
					infowindow.open(map, marker);
				};
			})(marker, infowindow));
		},
		// Generates and returns the html for the content that is specific to a marker's infoWindow
		createContent : function(index) {
			var name = '<div id="content"><h1 class="placeName">' + index + '</h1>';
			var addr = '<div class="body"><p>' + index + ' is located at ' + '</p></div></div>';
			var description = "";
			var content = name + addr + description;
			return content;
		}
	};
*/
	// Initialize the map
	initMap();

	function bounceMarker(marker) {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		// 700 ms per bounce of the marker
		setTimeout(function() {
			marker.setAnimation(null);
		}, 2100);
	}
//mapMarkers[name].setIcon({path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW, scale: 6});
	var Marker = function(ll, name) {
		this.name = name;
		this.lat = ll.lat;
		this.lng = ll.lng;
		this.visible = ko.observable(true);
		this.marker = new google.maps.Marker({
			map : map,
			position: ll
		});
//		mapMarkers[name] = marker;
		this.visible.subscribe(function(value) {
			if(value) {
				this.marker.setMap(map);
			} else {
				this.marker.setMap(null);
			}
		});
		var info = new google.maps.InfoWindow({
			content: fourSquareDescription[name](),
			minWidth: 300
		});
		infoWindows[name] = info;
		this.marker.addListener('click', (function(marker, infowindow){
			return function() {
				infowindow.open(map, marker);
				bounceMarker(marker);
			};
		})(this.marker, info));		
	}

	var fourSquareAPI = {
		setup : {
			url : 'https://api.foursquare.com/v2/venues/search',
			id : '?client_id=SBXOTOYRD4VY5FTYGPFR13YJNHA3BFDQTEA2C5XQDJQMEO31',
			secret : '&client_secret=OA1T4POMTXRWJAJ01E4NLRLZ0RQIXF2G0RIGRQCS3UVCGTVU',
			version : '&v=20151122'
		},
		query : function(latlng, name, addr) {
			var ll = '&ll=' + latlng.lat + ',' + latlng.lng;
			var query = '&query=' + name;
			var fs_url = this.setup.url + this.setup.id + this.setup.secret + this.setup.version + ll + query;
			(function(namae, addr) {
					$.getJSON(fs_url, function(data) {
						var site = data.response.venues[0].url;
						var phone = data.response.venues[0].contact.formattedPhone;
						var name = data.response.venues[0].name;
						infoWindows[namae].setContent(buildContent(name, addr, phone, site));
					}).done(function() {
					//console.log(fourSquareDescription);
					});
				})(name, addr);
			}
	};	

	function buildContent(name, addr, phone, site) {
		if(name != null) {
			var address = '<p>Address: ' + addr + '</p>';
			var link = '<a href="' + site + '">' + site + '</a>';
			if(site == null) {
				site = 'No website listed';
				link = 'No website listed';
			}
			if(phone == null) {
				phone = 'No phone number listed'
			}
			var pnum = '<p>Phone: ' + phone + '</p>';
			var wsite = '<p>Website: ' + link + '</p>';
			var content = '<div><h1>' + name + '</h1>' + address + pnum + wsite + '</div>';
			return content;
		} else {
			var error = '<div><h1>Foursquare has encountered an error displaying information for this location.</h1></div>';
			return error;
		}
	}

	function buildDescriptions() {
		for(place in defaultAddresses) {
			fourSquareAPI.query(myLatLng, place, defaultAddresses[place]);
		}
	}

	// Contains functions that deal with API results
	var apiHandler = {
		//Get the Lat/Lng for each default address using the geocode API
		handleDefaultLoc : function(obj) {
			var uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
			var key = '&key=' + geoCodeAPI;
			var gpsCoords = [];
			for(var item in defaultAddresses) {
				defaultNames.push(item);
				fourSquareDescription[item] = ko.observable('<div>Test2</div>');
				defaultAmount++;
				var addr = defaultAddresses[item];
				var url = uri + addr + key;
				// Wrap AJAX request inside IIFE that passes in the name of the place as the argument.
				// This properly handles the asynchronous nature of the geocode api, and can properly
				// attribute the API call with its proper identifier so that it can be correctly referenced
				// in other code.
				(function(index) {
					$.getJSON(url, function(data) {
						var obj = {};
						if(data.status == "OK") {
							var d = data.results[0].geometry.location;
							obj.name = index;
							obj.lat = d.lat;
							obj.lng = d.lng;
							obj.addr = data.results[0].formatted_address;
							var marker = new Marker({lat:obj.lat,lng:obj.lng}, index);
							mapMarkers[index] = marker;
							//var markerInfo = mapHandler.createMapMarker({lat:obj.lat,lng:obj.lng}, index);
							//mapHandler.placeMapMarker(markerInfo, index);
							gpsCoords.push(obj);
						} else {
							console.log("error");
						}
					});
				})(item);
			}
			return gpsCoords;
		},
		//Build the default locations observable array to be placed into the placesViewModel
		buildDefaultLoc : function() {
			for(i = 0; i < defaultAmount; i++) {
				var object = {};
				object.name = defaultNames[i];
				object.type = "restaurant";
				object.description = defaultDescription[i];
				// Keeps track of when the item is clicked.
				// Item is initally unclicked.
				object.clicked = ko.observable(false);
				// Works with search algorithm to determine if the item is a match.
				// The item is intially matched so that it will display on screen upon load.
				object.match = ko.observable(true);
				defaultLocations.push(object);
			}
		},
		// Initalize the API for geocode
		init : function() {
			defaultCoordsAddr = this.handleDefaultLoc(defaultAddresses);
			this.buildDefaultLoc();
		}
	};

	apiHandler.init();

	// View model for the key locations listed on the left hand side of the screen
	function placesViewModel() {
		var self = this;
		// Observable array of the preset locations
		self.places = ko.observableArray(defaultLocations);
		// If an item is clicked, then toggle its corresponding infoWindow on the map
		self.infoWindows = function(index, namae) {
			var click = self.places()[index].clicked();
			if(click) {
				infoWindows[namae].open(map, mapMarkers[namae].marker);
				bounceMarker(mapMarkers[namae].marker);
			} else {
				infoWindows[namae].close();
			}
		}

		// Click notifier that modifies a boolean within the places observable array.
		// Also applies a toggle on CSS when an item is clicked that highlights the selection.
		self.click = function(place) {
			var index = self.places().indexOf(place);
			var namae = place.name;
			self.places()[index].clicked(!place.clicked());
			self.infoWindows(index, namae);
		}
	};



	// View model for the search bar
	function searchViewModel() {
		var self = this;
		// The search input field is actively updated per user input
		self.search = ko.observable('');
	};

	// Parent View model for the searchView and the placesView models.
	// Allows for communication between the two view models and allows the 
	// search function to sort the key locations in real time.
	var viewModel = {
		placesView : new placesViewModel(),
		searchView : new searchViewModel(),
		// Apply the bindings for the view models
		init : function() {
			ko.applyBindings(viewModel);
		},
		// Compares the user input search string to that of the names of the places
		// that are listed in the key locations pane.
		compareSearch : function(index) {
			var searchString = viewModel.searchView.search();
			var name = viewModel.placesView.places()[index].name;
			var nlowercase = name.toLowerCase();
			var slowercase = searchString.toLowerCase();
			if(nlowercase.indexOf(slowercase) > -1) {
				viewModel.placesView.places()[index].match(true);
				if(mapMarkers[name] != null) {
					mapMarkers[name].marker.setMap(map);
				}
			} else if(searchString.length == 0) {
				viewModel.placesView.places()[index].match(true);
				if(mapMarkers[name] != null) {
					mapMarkers[name].marker.setMap(map);
				}
			} else {
				viewModel.placesView.places()[index].match(false);
				if(mapMarkers[name] != null) {
					mapMarkers[name].marker.setMap(null);
				}
			}

			return viewModel.placesView.places()[index].match();
		}
	};

	viewModel.init();
	buildDescriptions();
}