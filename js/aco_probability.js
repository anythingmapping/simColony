

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
};

function getRndLatLng(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

startlocations = [
  [46.109864097197146, 0.06161570549011231],
  [46.1132445933891, 0.05469560623168945],
  [46.109864097197146, 0.06161570549011231]]

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
