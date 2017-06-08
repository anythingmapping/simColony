var map = L.map('map', {
          center: [37.75, -122.23],
          zoom: 10
        });
var esriStreets = L.esri.basemapLayer('Streets').addTo(map);
