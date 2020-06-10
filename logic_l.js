// earthquake data link
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

function markerSize(mag) {
  return mag * 14000;
}

function markerColor(mag) {
  if (mag <= 2.5) {
      return "#ADFF2F";
  } else if (mag <= 3.5) {
      return "#9ACD32";
  } else if (mag <= 4.5) {
      return "#FFFF00";
  } else if (mag <= 5.5) {
      return "#ffd700";
  } else if (mag <= 6.5) {
      return "#FFA500";
  } else {
      return "#FF0000";
  };
}

d3.json(link, function(data) {
  
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  var Eq = L.geoJSON(earthquakeData, {
  
  onEachFeature : function (feature, layer) {

    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " +  feature.properties.mag + "</p>")
    },     pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.properties.mag),
        fillOpacity: 1,
        stroke: false,
    })
  }
  });
  
  createMap(Eq);
}

function createMap(Eq) {

  var gray = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }); 
  
  var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY 
  }); 




  // Define baseMaps object to hold our base layers
  var baseMaps = {
    "Gray Map": gray,
    "Satellite Map": satellite,
    "Dark Map": dark
    
  };

  
  var overlayMaps = {
    Earthquakes: Eq
  };

  
  var myMap = L.map("map", {
    center: [31.58,-99.58],
    zoom: 2.5,
    layers: [satellite, Eq]
  });

 
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {
  
      var div = L.DomUtil.create('div', 'info legend'),
          magnitudes = [0, 2.5, 3.5, 4.5, 5.5, 6.5];
  
      for (var i = 0; i < magnitudes.length; i++) {
          div.innerHTML +=
              '<i style="background:' + markerColor(magnitudes[i] + 1) + '"></i> ' + 
      + magnitudes[i] + (magnitudes[i + 1] ? ' - ' + magnitudes[i + 1] + '<br>' : ' + ');
      }
  
      return div;
  };
  
  legend.addTo(myMap);

}