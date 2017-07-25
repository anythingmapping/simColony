
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





// **********************OTHER*****************************



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
    // BASIC VALUES OF THE ANT
    this.name = "ant",
    this.hasVectorTarget = false,
    this.VectorTarget = null,
    this.vectorTargetDistance = null;
    this.travelSpeed = 1;

    // PATH
    this.path = [],
    this.futurePath = [],

    this.pathNumber = 0,
    this.food = 0,
    this.mkr = L.marker([46.109864097197146, 0.06161570549011231],
       {icon: icnGreen, draggable: true})
       .addTo(map)
       .bindPopup(this.name);
    this.targetVector = this.mkr._latlng,

    this.marchOnVector = function(){
      //GET CURRENT LOCATION not sure any of this is really needed
      var currentLat = this.mkr._latlng.lat;
      var currentLng = this.mkr._latlng.lng;
      //CALL FOR A TARGET USING FOOD FOR NOW
      // var targetNodeLat = ctrlFood.mkr._latlng.lat;
      // var targetNodeLng = ctrlFood.mkr._latlng.lng;
      // var targetNodeLat = null;
      // var targetNodeLng = null;



      //GENERATE A VECTOR TO TARGET
      if (this.hasVectorTarget === false) {
        // console.log('false');
        // targetNodes = getRndLatLngTarget(currentLat, currentLng);
        // var targetNodeLat = targetNodes[1];
        // var targetNodeLng = targetNodes[0];

        var targetNodes = getRndLatLng(this.mkr._latlng.lat, this.mkr._latlng.lng);
        var targetNodeLng = targetNodes[0];
        var targetNodeLat = targetNodes[1];
        this.targetLatLng = L.latLng(targetNodeLat, targetNodeLng);
        //console.log(targetNodes);


        targetMarker2 = L.circle([targetNodeLat,targetNodeLng],{
          radius: 10,
          opacity: 1,
          color: '#ADD8E6'}).addTo(map);
        this.hasVectorTarget = true;

      } else {

        //MARCH
        // ESTABLISH A VECTOR MARCH!!!!!! now that you've got vector targets
        // https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-vectors/a/intro-to-vectors
        // I believe I want to establish smooth vector movement here.
        // console.log('currnet latlng is:');
        // console.log(this.mkr._latlng);
        //
        // console.log('current target latlng is:')
        // console.log(this.targetLatLng)
        this.futurePath = pathFactor(this.mkr._latlng,
                                     this.targetLatLng,
                                     this.vectorTargetDistance,
                                     this.travelSpeed);
        console.log(this.futurePath);


        // if (currentLat-this.targetLatLng.lat <= 0.000001){
        //   console.log('below');
        //   currentLat = this.targetLatLng.lat + 0.000000000000001;
        // }else if (currentLat - this.targetLatLng.lat >= 0.000001) {
        //   currentLat = this.targetLatLng.lat - 0.0000000000000000001;
        //   console.log('above');
        // };

        // if (currentLng-this.targetLatLng.lng <= 0.000001){
        //   currentLng = this.targetLatLng.lng + 0.00000000000000000001;
        // }else if (currentLng - this.targetLatLng.lng >= 0.000001) {
        //   currentLng = this.targetLatLng.lng - 0.00000000000000000001;
        // };
      }

      // DISTANCE TO VECTOR TARGET
      // console.log(currentLat-targetNodeLat);
      // console.log(isMarkerInsidePolygon(antGreen.mkr, enviroLayer));


      // ************************** BONUS LOGIC ************************
      // IF NEEDED THEN SET THE POLYGON TO ANOTHER COLOR
      // working logic for setting up a trail once I get that far
      // it workds but its a bonus to the sim

      // var latlngs = [[0.057935714721679694, 46.10747270790413],
      // [0.05911588668823243, 46.113958599065015],
      // [0.06523132324218751, 46.113467721156525],
      // [0.06544589996337892, 46.10826117120384]];
      // var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
      // // console.log(typeof(polygon));
      // // console.log(enviroLayer._layers);
      // console.log(polygon.getBounds().contains(antGreen.mkr._latlng));
      // enviroLayer.setStyle({
      //             fillColor: "#ff0000",
      //             fillOpacity: 0.8,
      //             weight: 0.5
      //         });
      //

      this.mkr.setLatLng([currentLat,currentLng]);
    },

    //will become target check and have another food check
    this.targetVectorCheck = function(){
      //console.log("vectorTargetDistance");
      this.vectorTargetDistance = this.mkr._latlng.distanceTo(this.targetLatLng);
      //console.log(vectorTargetDistance);


      if (this.vectorTargetDistance < 5) {
        console.log('vectorTargetDistance is < 1')
        // console.log("helloworld");
          this.hasVectorTarget = false;
          //console.log(this.path);
        };
    };



    //will become target check and have another food check
    this._foodCheck = function(){
      var foodTarget = this.mkr._latlng.distanceTo(ctrlFood.mkr._latlng);

      if (foodTarget < 100) {
        // console.log("helloworld");
        this.food++;
        ctrlFood.food--;
        if (ctrlFood.food <= 0){
          this.path.push(this.mkr._latlng, this.pathNumber);
          this.hasVectorTarget = false;
          //console.log(this.path);

        }
        ctrlFood.mkr.setRadius(ctrlFood.food);
        // console.log(ctrlFood.food);
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
function updateSim() {
  antGreen.marchOnVector();
  antGreen.targetVectorCheck();
  // antGreen.foodCheck();
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
  //CALL SETUP FUNCTIONS HERE
  animFrame();
};

// FRAMES PER SECOND REMAIN HIGH FOR TESTING
function animFrame(){
  setTimeout(function(){
    requestAnimationFrame(animFrame, mapdiv);
    updateSim();
  }, 1000/1);
};



//old
// Windows.oldfunction onEachStep(){
//   next_assetY = next_assetY +0.0001;
//   ship.setLatLng([next_assetX,next_assetY]);
//   greenteam(antGreen);
//   redteam();
  // console.log(next_assetY);
// };
