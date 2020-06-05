// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// center of us
let map = L.map('mapid').setView([37.6, -122.4], 5);

// Coordinates for each point to be used in the line.
let line = [
	[33.9416, -118.4085],
	[37.6213, -122.3790],
	[40.7899, -111.9791],
  	[47.4502, -122.3088]
  ];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
	color: "blue",
	opacity: 0.5,
	dashArray: "blue",
	dashArray: "4"

  }).addTo(map);

// Los Angeles
// let map = L.map('mapid').setView([34.0522, -118.243], 14);

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);

//  Add a circle marker to the map for Los Angeles, California.
// L.circle([34.0522, -118.2437], {
	// radius: 1000,
	// color: 'black',
	// fillColor: 'yellow'	
//}).addTo(map);

// Add a circle marker using "circleMarker".  Supposedly it looks different but not to me
// L.circleMarker([34.0522, -118.2437], {
	// radius: 300,
	// color: "black",
	// fillColor: '#ffffa1'
// }).addTo(map);

// An array containing each city's location, state, and population.
let cityData = cities;

// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
 	// console.log(city)
	// L.marker(city.location)
	// .addTo(map);
// });

// Now add bindPopup() method using HTML code
cityData.forEach(function(city) {
	console.log(city)
    L.circleMarker(city.location, {
		color: "orange",
		radius: city.population/100000,
		weight: 4
	})
   	.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
 	.addTo(map);
});




// We create the tile layer that will be the background of our map.
// dark map replace "streets-v11" with "dark-v10"
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);