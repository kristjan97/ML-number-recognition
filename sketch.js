var socket;
var can;
var swidth = 640;
var sheight = 480;

function setup() {
  // put setup code here
  socket = io.connect('', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 99999
  });
  can = createCanvas(swidth, sheight);
  can.parent('canvasholder');
  background(color('gray'));
}

var justdrawnpoints = [];
var prevdrawnpoints = [];

function draw() {
  strokeWeight(1);
  stroke(255);
  // put drawing code here
  if (mouseIsPressed) {
    strokeWeight(1);
    stroke(255);
    // Make sure we are only getting the items on screen
    if (pmouseX > 0 &&
      pmouseY > 0 &&
      mouseX > 0 &&
      mouseY > 0 &&
      pmouseX <= swidth &&
      mouseX <= swidth &&
      pmouseY <= sheight &&
      mouseY <= sheight) {
      line(pmouseX, pmouseY, mouseX, mouseY);
      justdrawnpoints.push([pmouseX, pmouseY, mouseX, mouseY]);
    }
  }
}

function touchStarted() {

  if (pmouseX > 0 &&
    pmouseY > 0 &&
    mouseX > 0 &&
    mouseY > 0 &&
    pmouseX <= swidth &&
    mouseX <= swidth &&
    pmouseY <= sheight &&
    mouseY <= sheight) {
    prevdrawnpoints = justdrawnpoints;
    justdrawnpoints = [];
    return false;
  }
}

function mousePressed() {
  if (pmouseX > 0 &&
    pmouseY > 0 &&
    mouseX > 0 &&
    mouseY > 0 &&
    pmouseX <= swidth &&
    mouseX <= swidth &&
    pmouseY <= sheight &&
    mouseY <= sheight) {
    prevdrawnpoints = justdrawnpoints;
    justdrawnpoints = [];
  }
}


function bpress(numb) {
  console.log(numb);
  if (justdrawnpoints.length > 0) {
    sendData(justdrawnpoints, numb);
    justdrawnpoints = [];
    prevdrawnpoints = [];
    clear();
    background(color('gray'));
  }
}

function mouseReleased() {
  var hit;
  if (justdrawnpoints.length > 0 && prevdrawnpoints.length > 0) {
    for (let i = 0; i < justdrawnpoints.length; i++) {
      for (let j = 0; j < prevdrawnpoints.length; j++) {
        hit = collideLineLine(
          justdrawnpoints[i][0], justdrawnpoints[i][1], justdrawnpoints[i][2], justdrawnpoints[i][3],
          prevdrawnpoints[j][0], prevdrawnpoints[j][1], prevdrawnpoints[j][2], prevdrawnpoints[j][3]
        );
        if (hit) {
          print(hit);
          // console.log(justdrawnpoints.length);
          // console.log(prevdrawnpoints.length);
          justdrawnpoints = justdrawnpoints.concat(prevdrawnpoints);
          // console.log(justdrawnpoints.length);

          return true;
        }
      }
    }
    // print("No Collision");
    if (hit != true) {
      // console.log(justdrawnpoints);
    }
  }
}

function keyPressed() {
  if (keyCode != SHIFT &&
    keyCode != ALT &&
    keyCode != BACKSPACE &&
    keyCode != DELETE &&
    keyCode != ENTER &&
    keyCode != RETURN &&
    keyCode != TAB &&
    keyCode != ESCAPE &&
    keyCode != CONTROL &&
    keyCode != OPTION &&
    key != "F1" &&
    key != "F2" &&
    key != "F3" &&
    key != "F4" &&
    key != "F5" &&
    key != "F6" &&
    key != "F7" &&
    key != "F8" &&
    key != "F9" &&
    key != "F10" &&
    key != "F11" &&
    key != "F12"
  ) {
    console.log(key);
    if (justdrawnpoints.length > 0) {
      // console.log(key);
      sendData(justdrawnpoints, key);
      justdrawnpoints = [];
      prevdrawnpoints = [];
      clear();
      background(color('gray'));
    }
  }
}

function sendData(justdrawnpoints, key) {
  var data = {
    j: justdrawnpoints,
    k: key
  };
  socket.emit('sendData', data);
}