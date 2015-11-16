var googMapAPI = "AIzaSyCkPGj9d4QyMtcRFYDII4xco_KBA428oQE";
var geoCodeAPI = "AIzaSyCkcvMu_0Ar7_Xv3R3MB6-Ffp_Gxq9Di9s";
var myLatLng = {lat: 21.469324, lng: -157.961810};
var defaultLocations = [{lat: 21.2759257, lng: -157.8145445}]

var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		scrollwheel:false,
		zoom: 11
	});
	var marker = new google.maps.Marker({
		map: map,
		position: defaultLocations[0]
	});
}

//https://maps.googleapis.com/maps/api/geocode/json?address=3308+Kanaina+Avenue+Honolulu,+HI+96815&key=AIzaSyCkcvMu_0Ar7_Xv3R3MB6-Ffp_Gxq9Di9s