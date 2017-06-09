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
var marker = L.marker([assetX, assetY]).addTo(map);


  // //grab the canvas and context
  // var mapArea = document.getElementById("map");
  //


var canvas = document.getElementById('map');
window.onload = init;

function init() {
  console.log("init")
  animFrame();
};

function animFrame(){
  requestAnimationFrame(animFrame, canvas);
  onEachStep();
};

function onEachStep(){
  next_assetY = next_assetY +0.01;
  ship.setLatLng([next_assetX,next_assetY]);
  console.log(next_assetY);
};



  //
  // //show it on the screen
  // var draw = function() {
  //   ctx.clearRect(0,0,500,300);
  //   ctx.fillStyle = "rgb(200, 0, 100)";
  //   ctx.fillRect(x, y, w, h);
  // };
  //
  // //gets executed multiple times per second
  // var step = function() {
  //
  //   update();
  //   draw();
  //
  //   window.requestAnimationFrame(step);
  // };
  //
  // //initial kick
  // step();
