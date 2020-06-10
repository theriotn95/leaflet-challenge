## Leaflet-challenge
### Level 1: Visualization
   
   In this challenge I was able to use Leaflet and earthquake data to show earthquakes with a magnitude of 2.5 or greater from the past month across the world on a nice visualization html map page. 

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. I visited the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and picked a data set of 2.5 magnitude earthquakes or greater in the past month to visualize. When clicking on a data set, for example 'All Earthquakes from the Past Month', you will be given a JSON representation of that data. I used the URL of this JSON to pull in the data for the visualization.


2. **Import & Visualize the Data**

   Created a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude.

   * The data markers reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes appear larger and darker in color.

   * Popups appear that provide additional information about the earthquake when a marker is clicked.

   * Created a legend that provides context for the map data.

 