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
  