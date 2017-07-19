
var mkrGreen;
var mrkFood;
var mkrGreenLatX;
var mkrGreenLngY;



// todo
// extent the icon class

//dimensions of the rectangle
var assetX = 46.1129
var assetY = -11.29

var next_assetX = 46.117851998504946
var next_assetY = 0.05619227886199952

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

var icnGreen = new LeafIcon({iconUrl: 'img/mkrGreen.png'}),
    icnRed = new LeafIcon({iconUrl: 'img/mkrRed.png'}),
    icnBlack = new LeafIcon({iconUrl: 'img/mkrBlack.png'});

//  ************** EXTERNAL GAME WORKINGS? **************
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};




// *************** SIMULATION STARTING SETUP ************
var ctrlStartRed;
var ctrlGreenStart;
var ctrlFoodStart;

var ctrlStartRed_latlng = L.latLng(46.117851998504946, 0.05619227886199952);
var ctrlStartRed_num = 5
var redTeam;
redTeam = [];

for(i=0; i < 10; i++){
  var mkrRed = L.marker(ctrlStartRed_latlng, {icon: icnRed}).addTo(map);
  // console.log(mkrRed);
  var id = "Red";
  var unique = id + i;
  var unique = mkrRed;
  // console.log(mkrRed);
  redTeam.push(mkrRed);
};

var mkrRed = L.marker(ctrlStartRed_latlng, {icon: icnRed}).addTo(map);
var mkrGreen = L.marker([46.109864097197146, 0.06161570549011231], {icon: icnGreen}).addTo(map);
var mkrFood = L.marker([46.11274627144683, 0.06698548793792726], {icon: icnBlack}).addTo(map);
var mkrGreenLoc = mkrGreen.getLatLng();
console.log(mkrGreenLoc["lat"],mkrGreenLoc["lng"]);
console.log(mkrGreenLoc["lat"]+0.001,mkrGreenLoc["lng"]);
// *************** SIMULATION STARTING SETUP ************


function greenteam(marker) {
  // console.log(marker);
  var coordTarget = marker.getLatLng();
  var coord = L.latLng([46.11274627144683, 0.06698548793792726]);
  // do something to the coords and turn it back into a lnglat
  mkrGreen.setLatLng(coord);
  // mkrGreen.setLatLng(mkrGreenLoc["lng"], mkrGreenLoc["lng"]);
  // console.log(mkrGreen);
  // console.log(mkrGreenLoc["lng"]+.001);
  // console.log(loc.distanceTo(ship.getLatLng())/1000 + " km to boat");
  // console.log(mkrGreen.getLatLng["lat"]);

  // var mkrGreenLatX = getRandomArbitrary(mkrGreenLoc["lng"], mkrGreenLoc["lng"]);
  // var mkrGreenLatX = 46.109864097197146;
  // var mkrGreenLngY = 0.06161570549011231;
  // mkrGreen.setLatLng([mkrGreenLatX, mkrGreenLngY]);
  // console.log(mkrGreen.getLatLng);
  // console.log(mkrGreen.lat);
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
  next_assetY = next_assetY +0.0001;
  ship.setLatLng([next_assetX,next_assetY]);
  greenteam(mkrGreen);
  redteam();
  // console.log(next_assetY);
};
