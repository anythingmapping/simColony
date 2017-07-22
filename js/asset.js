
var mkrGreen;
var mrkFood;
var mkrGreenLatX;
var mkrGreenLngY;




// **************** old working ship ******************//

//dimensions of the rectangle
var assetX = 46.1129
var assetY = -11.29

var next_assetX = 46.117851998504946
var next_assetY = 0.05619227886199952

// var lat = (e.latlng.lat);
// var lng = (e.latlng.lng);
// var newLatLng = new L.LatLng(0, 0);
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
// making the ship
var ship = L.marker([assetX, assetY], {icon: shipIcon}).addTo(map);






//  ************** HARD CODED VALUES **************
startlocations = [
  [46.109864097197146, 0.06161570549011231],
  [46.1132445933891, 0.05469560623168945],
  [46.109864097197146, 0.06161570549011231]]





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





// *************** SIMULATION STARTING SETUP ************
// var ctrlStartRed;
// var ctrlGreenStart;

//
// var ctrlStartRed_latlng = L.latLng(46.117851998504946, 0.05619227886199952);
// var ctrlStartRed_num = 5
// var redTeam;
// redTeam = [];

// for(i=0; i < 10; i++){
//   var mkrRed = L.marker(ctrlStartRed_latlng, {icon: icnRed}).addTo(map);
//   // console.log(mkrRed);
//   var id = "Red";
//   var unique = id + i;
//   var unique = mkrRed;
//   // console.log(mkrRed);
//   redTeam.push(mkrRed);
// };

// var mkrRed = L.marker(ctrlStartRed_latlng, {icon: icnRed, draggable:true}).addTo(map);

//


// ************* SIMULATION FOOD OBJECT *************** //
var Food = function(){
  this.name = 'food',
  this.version = 3,
  this.food = 100,
  this.startlocation = [46.11274627144683, 0.06698548793792726];
  this.mkr = L.circle(this.startlocation,
     {draggable:true,
     radius: this.food,
     opacity: 1,
     color: '#FF0000',
   }).addTo(map)
     .bindPopup(this.name)

  this.foodStatus = function(){
    if (this.food <= 0){
      this.version--;
      this.food = 100;
      if (this.version >= 0){
        this.mkr.setLatLng(startlocations[this.version]);
        this.mkr.setRadius(this.food);
      } else{
        //SIM OVER
        this.mkr.remove();
      }

    }
  };


};



// ************* SIMULATION AGENT OBJECTS ***************
var Ant = function(type) {
    this.name = "ant",
    this.hasVectorTarget = 0,
    this.VectorTarget = null;

    this.food = 0,
    this.mkr = L.marker([46.109864097197146, 0.06161570549011231],
       {icon: icnGreen, draggable: true})
       .addTo(map)
       .bindPopup(this.name);

    this.marchOnVector = function(){
      //GET CURRENT LOCATION
      var currentLat = antGreen.mkr._latlng.lat;
      var currentLng = antGreen.mkr._latlng.lng;
      //CALL FOR A TARGET USING FOOD FOR NOW
      var targetNodeLat = ctrlFood.mkr._latlng.lat;
      var targetNodeLng = ctrlFood.mkr._latlng.lng;



      //GENERATE A VECTOR TO TARGET

      console.log("gothere");
      targetNodeLat, targetNodeLng = getRndLatLngTarget(currentLat, currentLng);
      console.log(targetNodeLat,targetNodeLng);
      test = L.marker([targetNodeLat,targetNodeLng]).addTo(map);
      this.hasVectorTarget = 1;

      //MARCH
      if (currentLat-targetNodeLat <= 0.0001){
        // console.log('below');
        currentLat = currentLat + 0.00001;
      }else if (currentLat - targetNodeLat >= 0.0001) {
        currentLat = currentLat - 0.00001;
        // console.log('above');
      };

      if (currentLng-targetNodeLng <= 0.0001){
        currentLng = currentLng + 0.00001;
      }else if (currentLng - targetNodeLng >= 0.0001) {
        currentLng = currentLng - 0.00001;
      };






      // DISTANCE TO VECTOR TARGET
      // console.log(currentLat-targetNodeLat);



      antGreen.mkr.setLatLng([currentLat,currentLng]);
    },

    this.march = function(){
      var currentLat = antGreen.mkr._latlng.lat;
      var currentLng = antGreen.mkr._latlng.lng;
      var choice = getRndInteger(0,4);
      // var choice = monteCarlo();
      if (choice === 0) {
          currentLat = currentLat + 0.00001;
          currentLng = currentLng + 0.00000;
        } else if (choice === 1) {
          currentLat = currentLat - 0.00001;
          currentLng = currentLng + 0.00000;
        } else if (choice === 2) {
          currentLat = currentLat + 0.0000;
          currentLng = currentLng + 0.00001;
        } else {
          currentLat = currentLat + 0.0000;
          currentLng = currentLng - 0.00001;
        };
      antGreen.mkr.setLatLng([currentLat,currentLng]);
    },

    this.foodCheck = function(){
      var foodTarget = this.mkr._latlng.distanceTo(ctrlFood.mkr._latlng);
      if (foodTarget < 100) {
        // console.log("helloworld");
        this.food++;
        ctrlFood.food--;
        ctrlFood.mkr.setRadius(ctrlFood.food);
        console.log(ctrlFood.food);
      }else{
        // console.log(this.mkr._latlng.distanceTo(ctrlFood.mkr._latlng));
      }
    };


};


// ************* AGENT INSTANCIATION ***************
var antGreen = new Ant(icnGreen);
var ctrlFood = new Food(ctrlFood);



// ************* PLOT SUCCESSFUL ROUTE ***************************//



//  working but without inheritance understanding
// i want this to go into the above func
//
// var mkrGreen = L.marker([46.109864097197146, 0.06161570549011231], {icon: icnGreen, draggable: true}).addTo(map);
// console.log(mkrGreen);



// *************** SIMULATION STARTING SETUP ************
// create a red polyline from an array of LatLng points
// PATH
// var polylist = [
//     [45.51, -122.68],
//     [37.77, -122.43],
//     [34.04, -118.2]
// ];
// var polyline = L.polyline(polylist, {color: 'red'}).addTo(map);


// ****************** UPDATING CALL FROM SIM LOOP***********************//
// this will have ctrl for food etc
function updateSim(marker) {
  antGreen.marchOnVector();
  antGreen.foodCheck();
  ctrlFood.foodStatus();


};



// ****************** MAP CONTOLS FOR USER INTERACTIONS***********************//
map.on('click', function(e) {
  console.log(e.latlng)
});

antGreen.mkr.on("dragend", function(){
    antGreen.mkr.setTooltipContent("we're moving");
});

// mkrRed.on("dragend", function(){
//     mkrRed.setTooltipContent("we're moving");
// });





// ****************** GAME LOOP CTRL ************************* //
var mapdiv = document.getElementById('map');
window.onload = initPhysicsLoop;

function initPhysicsLoop() {
  console.log("init the physicals game loop")
  animFrame();
};

function animFrame(){
  requestAnimationFrame(animFrame, mapdiv);
  onEachStep();
};

function onEachStep(){
  updateSim(antGreen);
};




//old
// Windows.oldfunction onEachStep(){
//   next_assetY = next_assetY +0.0001;
//   ship.setLatLng([next_assetX,next_assetY]);
//   greenteam(antGreen);
//   redteam();
  // console.log(next_assetY);
// };
