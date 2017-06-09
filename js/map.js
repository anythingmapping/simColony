// loading screen not currently working
var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("map").style.display = "block";
}


// leaflet stuff
var map = L.map('map', {
          center: [46.11022, 0.06181],
          zoom: 5
        });

mapLink = '<a href="http://www.esri.com/">Esri</a>';
wholink = 'i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; '+mapLink+', '+wholink,
    maxZoom: 18,
    }).addTo(map);

// var esriStreets = L.esri.basemapLayer('Imagery').addTo(map);

// random circle
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);


// var marker = L.marker([46.1129, 0.06862]).addTo(map);
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");


var popup = L.popup()
    .setLatLng([46.1129, 0.06862])
    .setContent("I am a standalone popup.")
    .openOn(map);


var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);


//






//Watermark
L.Control.Watermark = L.Control.extend({
    onAdd: function(map) {
        var img = L.DomUtil.create('img');

        img.src = 'img/logo.png';
        img.style.width = '200px';

        return img;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});

L.control.watermark = function(opts) {
    return new L.Control.Watermark(opts);
}

L.control.watermark({ position: 'bottomleft' }).addTo(map);
