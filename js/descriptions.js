var myLatLng = {lat: 21.469324, lng: -157.961810};
var defaultAddresses = {
	"Jawaiian Irie Jerk" : "1137 11th Ave, Honolulu, HI 96816, USA",
	"Uahi Island Grill" : "131 Hekili St, Kailua, HI 96734, USA",
	"Boots and Kimo's Homestyle Kitchen" : "151 Hekili St, Kailua, HI 96734, USA",
	"Fresh Catch" : "3109 Waialae Ave, Honolulu, HI 96816, USA",
	"Rainbow Drive-In" : "3308 Kanaina Ave, Honolulu, HI 96815, USA",
	"Big Wave Shrimp Truck" : "66-521 Kamehameha Hwy, Haleiwa, HI 96712, USA",
	"Germaine's Luau" : "91-119 Olai St, Kapolei, HI 96707, USA"
};
var fourSquareDescription = {};

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
		(function(namae) {
			$.getJSON(fs_url, function(data) {
				var site = data.response.venues[0].url;
				var phone = data.response.venues[0].contact.formattedPhone;
				var name = data.response.venues[0].name;
				fourSquareDescription[namae] = name + phone + site;
			}).done(function() {
			//console.log(fourSquareDescription);
		});
		})(name);
	}
};	

function buildDescriptions() {
	for(place in defaultAddresses) {
		fourSquareAPI.query(myLatLng, place, defaultAddresses[place]);
	}
}

buildDescriptions();