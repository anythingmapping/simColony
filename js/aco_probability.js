

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
};

function getRndLatLngTarget(x, y){
  var strY = y.toString();
  var strX = x.toString();

  strY = strY.slice(0, -3);
  strX = strX.slice(0, -3);


  var choice = getRndInteger(0,4);
  if (choice === 0) {
        strX = strX + 1;
    } else if (choice === 1) {
        strX = strX - 1;
    } else if (choice === 2) {
        strY = strY + 1;
    } else {
        strY = strY - 1;
    };
  x = Number(strX);
  y = Number(strX);
  return [x,y];
};

// *********** GENERATING THE TARGETING ***********
function getRndLatLng(originX, originY) {
    console.log('GENERATING A NEW TARGET');
    var r = 100/111300
    , y0 = originX
    , x0 = originY
    , u = Math.random()
    , v = Math.random()
    , w = r * Math.sqrt(u)
    , t = 2 * Math.PI * v
    , x = w * Math.cos(t)
    , y1 = w * Math.sin(t)
    , x1 = x / Math.cos(y0)

    newY = y0 + y1
    newX = x0 + x1

    return [newX,newY]
};



function pathFactor(originLatLng, targetLatLng, targetDistance, agentTravel){
  var calculatedPath = []; //THE VARIABLE TO PUSH BACK
  var xTot = originLatLng.lat - targetLatLng.lat;
  var yTot = originLatLng.lng - targetLatLng.lng;
  var updatedDistance = targetDistance - agentTravel;
  var originLat = originLatLng.lat;
  var originLng = originLatLng.lng;
  var agentTravelRelativeLat = null;
  var agentTravelRelativeLng = null;
  var newLat = null;
  var newLng = null;


  while (updatedDistance - agentTravel >= 15){
    updatedDistance = updatedDistance - agentTravel;

    // **************** WHAT IS THE VECTOR TO THE TARGET ********************
    if (xTot >= 0){
      console.log('marker is above');
      agentTravelRelativeLat = 0.00001;
      // console.log(agentTravelRelativeLat);
      // console.log(originLatLng.lat);
      newLat = originLat+agentTravelRelativeLat;
      originLat = newLat;
    }else if (xTot <= 0) {
      console.log('marker is below');
      agentTravelRelativeLat = -0.00001;
      // console.log(agentTravelRelativeLat);
      // console.log(originLatLng.lat);
      newLat = originLat+agentTravelRelativeLat;
      originLat = newLat;
    };

    if (yTot >= 0){
      agentTravelRelative = 0.00001;
      newLng = originLng+agentTravelRelativeLng;
      originLng = newLng;
    }else if (yTot <= 0) {
      console.log('marker is below');
      agentTravelRelativeLng = -0.00001;
      console.log(agentTravelRelativeLng);
      console.log(originLatLng.lng);
      newLng = originLng+agentTravelRelativeLng;
      originLng = newLng;
    };


    calculatedPath.push([newLat, newLng]); //THIS IS PRETEND PATH FOR THE MOMENT
    // console.log(updatedDistance);
  }

  // console.log(targetDistance, updatedDistance);


  return [calculatedPath]
};

var monteCarlo = function() {

    // We do this “forever” until we find a qualifying random value.
    while (true) {
        // Pick a random value.
        var r1 = Math.random(1);
        // Assign a probability.
        var probability = r1;
        // Pick a second random value.
        var r2 = Math.random(1);
        // Does it qualify? If so, we’re done!
        if (r2 < probability) {
            return r1;
        }
    }
};
