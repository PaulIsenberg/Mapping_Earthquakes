// Add console.log to check to see if our code is working.
console.log("working");

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
	accessToken: API_KEY
});
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
	accessToken: API_KEY
});
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
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

// Create the earthquake layer for our map. Added in 13.6.4
let earthquakes = new L.layerGroup();
let plates = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": plates
  };

  // Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	// default layer in the map object
	layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.  This is from LEAFLET and replaces "streets.addTo(map)"
L.control.layers(baseMaps, overlays).addTo(map);

let tectonicPlates = "https://raw.githubusercontent.com/PaulIsenberg/Mapping_Earthquakes/master/PB2002_boundaries.json";

// Retrieve the earthquake GeoJSON data for 13.6.1.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
 
// Creating a GeoJSON layer with the retrieved data.  Added for 13.6.2
    L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
    style: styleInfo,
    //We create a popup for each circleMarker to display the magnitude and location of the earthquake after the marker has been created and styled.
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
    
    }).addTo(earthquakes);
        //Then  we add the earthquake layer to our map (13.6.4)
        earthquakes.addTo(map);

// 13.6.5 adding a Legend for earthquake magnitude from LEAFLET chloropleth examples website
var legend = L.control({
    position: "bottomright"
});

legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
];
    // loop through our intervals to generate a label with a colored square for each interval
    for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i])
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
    } 
    return div;
    };
    
legend.addTo(map);

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

let myStyle = {
	color: "#ffffa1",
    weight: 4
} 

// Grabbing our GeoJSON data.
d3.json(tectonicPlates).then(function(data) {
	console.log(data)
// Creating a GeoJSON layer with the retrieved data.  Added for 13.5.4 but removed for skill drill
//L.geoJson(data).addTo(map);
	//The below 6 lines are from the 13.5.3 skill drill
  //Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
    style: myStyle,
    pointToLayer: function(feature, coordinates) {
        console.log(feature)},
        style: myStyle,
        onEachFeature: function(feature, layer) {} 
    }) 
    .addTo(plates);
    plates.addTo(map)
});