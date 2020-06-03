// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// center of us
//let map = L.map('mapid').setView([40.7, -94.5], 4);
// Los Angeles
let map = L.map('mapid').setView([34.0522, -118.243], 14);

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

//  Add a circle marker to the map for Los Angeles, California.
// L.circle([34.0522, -118.2437], {
	// radius: 1000,
	// color: 'black',
	// fillColor: 'yellow'	
//}).addTo(map);

// Add a circle marker using "circleMarker".  Supposedly it looks different but not to me
L.circleMarker([34.0522, -118.2437], {
	radius: 300,
	color: "black",
	fillColor: '#ffffa1'
}).addTo(map);


// We create the tile layer that will be the background of our map.
// dark map replace "streets-v11" with "dark-v10"
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);