

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
  return x,y;
};


function getRndLatLng(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
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
