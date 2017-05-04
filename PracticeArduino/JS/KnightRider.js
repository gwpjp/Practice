var five = require("johnny-five");
var board = new five.Board();
var pwm = [3,5,6,9,10];
var dur = 2000;
var delay = 2000;
var num = 5;
var numTimes = 0;

board.on("ready", function() {

  myLoop(0,num,light,delay);

});

function myLoop(start,stop,func,delay){
  setTimeout(function(){
    func(start);
    start++;
    if (start < stop){
      myLoop(start,stop,func,delay);
    } else {
      if (numTimes < 3) {
        start = 0;
        numTimes++;
        myLoop(start,stop,func,delay);
      }
    }
  },delay);
}

function light(i) {
  console.log(pwm[i]);
  var led = new five.Led(pwm[i]);
  led.fade({
    easing: "inOutSine",
    duration: dur,
    onstop: function() {
      console.log("Faded Led " + pwm[i] + " in.");
    }
  });

  setTimeout(function() {
    led.fadeOut({
      easing: "inOutSine",
      duration: dur,
      onstop: function() {
        console.log("Faded Led " + pwm[i] + " out.");
      }
    });
  },delay);
  
}