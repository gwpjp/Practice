var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var led = new five.Led(11);

  led.fade({
    easing: "inOutSine",
    duration: 4000,
    onstop: function() {
      console.log("Faded Led in.");
    }
  });

  this.wait(5000, function() {
  	led.fadeOut({
      easing: "inOutSine",
      duration: 4000,
      onstop: function() {
        console.log("Faded Led out.");
      }
    });
  });
});