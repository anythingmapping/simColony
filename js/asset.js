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


var mkrGreen;
var mrkFood;

var mkrGreen = L.marker([46.109864097197146, 0.06161570549011231]).addTo(map);
var mkrFood = L.marker([46.11274627144683, 0.06698548793792726]).addTo(map);
var mkrGreenLoc = mkrGreen.getLatLng();
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

function greenteam() {
  console.log(mkrGreenLoc["lng"]);
  // console.log(loc.distanceTo(ship.getLatLng())/1000 + " km to boat");
  // console.log(mkrGreen.getLatLng["lat"]);
  // console.log(getRandomArbitrary(mkrGreen.getLatLng["lat"], mkrGreen.getLatLng["lat"]));
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
