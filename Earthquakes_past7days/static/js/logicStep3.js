// Add console.log to check to see if our code is working.
console.log("working");

// New center for SFO in 13.5.2
// Create the map object with center at the San Francisco airport.
//  Removed in 13.5.4      let map = L.map('mapid').setView([30, 30], 3);

// We create the tile layer that will be the background of our map.  Moved here from the bottom in 13.5.3
// dark map replace "streets-v11" with "dark-v10"
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	//id: 'mapbox.streets', removed in 13.5.3
	accessToken: API_KEY
});
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	//id: 'mapbox.streets', removed in 13.5.3
	accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.  Added in 13.5.4
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	//id: 'mapbox.streets', removed in 13.5.3
	accessToken: API_KEY
});

let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	//id: 'mapbox.streets', removed in 13.5.3
	accessToken: API_KEY
});

let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	//id: 'mapbox.streets', removed in 13.5.3
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	Street: streets,
	Dark: dark,
	Light: light,
	Night: night,
	Day: day,
	Sat: satelliteStreets
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	// default layer in the map object
	layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.  This is from LEAFLET and replaces "streets.addTo(map)"
L.control.layers(baseMaps, 
	//color: "#ffff00",
	//weight: 2
	)
.addTo(map);


// Then we add our 'graymap' tile layer to the map.
// removed in 13.5.4      streets.addTo(map);

// Accessing the airport GeoJSON URL in 13.5.3
//let airportData = "https://raw.githubusercontent.com/PaulIsenberg/Mapping_Earthquakes/master/majorAirports.json";
// Accessing the Toronto Data GeoJSON url in 13.5.5
//let torontoData = "https://raw.githubusercontent.com/PaulIsenberg/Mapping_Earthquakes/master/torontoRoutes.json";
// Accessing the Toronto neighborhoods GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/PaulIsenberg/Mapping_Earthquakes/master/torontoNeighborhoods.json";

// Create a style for the lines. Removing on 13.6.1
//let myStyle = {
	//color: "blue", //#ffffa1
	//fillColor: "yellow",
	//weight: 1
//}


// Retrieve the earthquake GeoJSON data for 13.6.1.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  // removed for 13.6.2 as we do POIN TO LAYER method below.   L.geoJson(data).addTo(map);
//});

// for 13.5.6 there are no popups, and then there are.  removed for 13.6.1
//d3.json(torontoHoods).then(function(data) {
	//console.log(data);
	//L.geoJSON(data, {
		//style: myStyle,
		//onEachFeature: function(feature, layer) {
			//layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME + "</h2>");
		//}
	//})
	//.addTo(map);
//});

// Grabbing our GeoJSON data.
//d3.json(torontoData).then(function(data) {
	//console.log(data);
// Creating a GeoJSON layer with the retrieved data.  Added for 13.5.4 but removed for skill drill
// Turning this line back on for 13.5.5
//L.geoJson(data).addTo(map);
	//The below 6 lines are from the 13.5.3 skill drill
  //Creating a GeoJSON layer with the retrieved data.
  //L.geoJson(data, {
	//style: myStyle,
	//onEachFeature: function(feature, layer) {
		//console.log(layer);
		//layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2>" + "<hr>" + "<h3> Destination: " + feature.properties.dst + "</h3>");
	   //}
	   
  //})
    //.addTo(map);
//});

// Add GeoJSON data from 13.5.2
//let sanFranAirport =
//{"type":"FeatureCollection","features":[{
   // "type":"Feature",
    //"properties":{
        //"id":"3469",
        //"name":"San Francisco International Airport",
        //"city":"San Francisco",
        //"country":"United States",
        //"faa":"SFO",
        //"icao":"KSFO",
        //"alt":"13",
        //"tz-offset":"-8",
        //"dst":"A",
        //"tz":"America/Los_Angeles"},
        //"geometry":{
            //"type":"Point",
           // "coordinates":[-122.375,37.61899948120117]}}
//]};

// Creating a GeoJSON layer with the retrieved data.  Added for 13.6.2
    L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
    style: styleInfo,
    //We create a popup for each circleMarker to display the magnitude and location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    }).addTo(map);

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
        };
    }
// This function determines the color of the circle based on the magnitude of the earthquake. Added in 13.6.3
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
    }
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
});


// Grabbing our GeoJSON data. 13.5.2 first part
// L.geoJSON(sanFranAirport).addTo(map);
// Grabbing our GeoJSON data.  13.5.2 second part, adding POINTTOLAYER
//L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    //pointToLayer: function(feature, latlng) {
      //console.log(feature);
	  //return L.marker(latlng)
	  //.bindPopup("<h2>" + feature.properties.name + "</h2>" + "<hr>" + "<h3>" + feature.properties.city + "," + " " + feature.properties.country + "</h3>");
	//}

// Grabbing our GeoJSON data.  13.5.2 third part, adding ONEACHFEATURE
//L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    //onEachFeature: function(feature, layer) {
     // console.log(layer);
	 // layer.bindPopup("<h2> Airport Code:" + feature.properties.faa + "</h2>" + "<hr>" + "<h3> Airport Name: " + feature.properties.name + "</h3>");
	  //.bindPopup("<h2>" + feature.properties.name + "</h2>" + "<hr>" + "<h3>" + feature.properties.city + "," + " " + feature.properties.country + "</h3>");
	//}


  //}).addTo(map);}

// Create the map object with a center and zoom level.
// center of us
// let map = L.map('mapid').setView([37.6, -122.4], 5);

// Coordinates for each point to be used in the line.
// Removing this snippet for 13.5.2
//let line = [
	//[33.9416, -118.4085],
	//[37.6213, -122.3790],
	//[40.7899, -111.9791],
  	//[47.4502, -122.3088]
  //];

// Create a polyline using the line coordinates and make the line red.
// removing this snippet for 13.5.2
// L.polyline(line, {
	// color: "blue",
	// opacity: 0.5,
	// dashArray: "blue",
	// dashArray: "4"

  //}).addTo(map);

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
// Removing this snippet for 13.5.2
// let cityData = cities;

// Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
 	// console.log(city)
	// L.marker(city.location)
	// .addTo(map);
// });

// Now add bindPopup() method using HTML code
// Removing this snippet for 13.5.2
// cityData.forEach(function(city) {
	// console.log(city)
    // L.circleMarker(city.location, {
		//color: "orange",
		//radius: city.population/100000,
		//weight: 4
	//})
   	//.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
 	//.addTo(map);
//});




// We create the tile layer that will be the background of our map.
// dark map replace "streets-v11" with "dark-v10"
//let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	//maxZoom: 18,
	//id: 'mapbox.streets',
	//accessToken: API_KEY
//});
