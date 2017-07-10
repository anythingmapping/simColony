
var mkrGreen;
var mrkFood;
var mkrGreenLatX;
var mkrGreenLngY;



// todo
// extent the icon class

//dimensions of the rectangle
var assetX = 46.1129
var assetY = -11.29

var next_assetX = 0
var next_assetY = 0

// var lat = (e.latlng.lat);
// var lng = (e.latlng.lng);
var newLatLng = new L.LatLng(0, 0);
// marker.setLatLng(newLatLng);

//speed at which it moves
var speed = 2;


var shipIcon = L.icon({
    iconUrl: 'img/ship.png',
    iconSize:     [179, 62], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var ship = L.marker([assetX, assetY], {icon: shipIcon}).addTo(map);

// ********************* MARKER SETUP *******************
var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [25, 41], // size of the icon
        // shadowSize:   [41, 41], // size of the shadow
        iconAnchor:   [25, 41], // point of the icon which will correspond to marker's location
        // shadowAnchor: [20, 0],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    }
});

var icnGreen = new LeafIcon({iconUrl: 'img/mkrRed.png'}),
    icnRed = new LeafIcon({iconUrl: 'img/mkrGreen.png'}),
    icnBlack = new LeafIcon({iconUrl: 'img/mkrBlack.png'});


// var icnGreen = L.icon({
//     iconUrl: 'img/mkrGreen.png',
//     // shadowUrl: 'img/mkrShadow.png',
//
//     iconSize:     [50, 82], // size of the icon
//     // shadowSize:   [41, 41], // size of the shadow
//     iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
//     // shadowAnchor: [20, 0],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });
//
// var icnRed = L.icon({
//     iconUrl: 'img/mkrRed.png',
//     shadowUrl: 'img/mkrShadow.png',
//
//     iconSize:     [25, 41], // size of the icon
//     // shadowSize:   [41, 41], // size of the shadow
//     iconAnchor:   [25, 41], // point of the icon which will correspond to marker's location
//     // shadowAnchor: [20, 0],  // the same for the shadow
//     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
// });



var mkrRed = L.marker([46.109864097197146, 0.06161570549011289], {icon: icnRed}).addTo(map);

var mkrGreen = L.marker([46.109864097197146, 0.06161570549011231], {icon: icnGreen}).addTo(map);

var mkrFood = L.marker([46.11274627144683, 0.06698548793792726], {icon: icnBlack}).addTo(map);
var mkrGreenLoc = mkrGreen.getLatLng();

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

function greenteam() {
  // console.log(mkrGreenLoc["lng"]);
  // console.log(mkrGreenLoc["lng"]+.001);
  // console.log(loc.distanceTo(ship.getLatLng())/1000 + " km to boat");
  // console.log(mkrGreen.getLatLng["lat"]);

  var mkrGreenLatX = getRandomArbitrary(mkrGreenLoc["lng"], mkrGreenLoc["lng"]);
  // var mkrGreenLatX = 46.109864097197146;
  var mkrGreenLngY = 0.06161570549011231;
  mkrGreen.setLatLng([mkrGreenLatX, mkrGreenLngY]);
};

function redteam() {
  // var loc = marker.getLatLng();
  // console.log(loc.distanceTo(ship.getLatLng())/1000 + " km to boat");
};



map.on('click', function(e) {
  console.log(e.latlng)
});









// game loop
var canvas = document.getElementById('map');
window.onload = initPhysicsLoop;

function initPhysicsLoop() {
  console.log("init the physicals game loop")
  animFrame();
};

function animFrame(){
  requestAnimationFrame(animFrame, canvas);
  onEachStep();
};

function onEachStep(){
  next_assetY = next_assetY +0.01;
  ship.setLatLng([next_assetX,next_assetY]);
  greenteam();
  redteam();
  // console.log(next_assetY);
};
