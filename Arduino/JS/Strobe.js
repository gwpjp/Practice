var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create an Led on pin 12 and strobe it on/off
  // Optionall set the speed; defaults to 100ms
  var led = new five.Led(12)
  led.strobe(500, function(){
  	setTimeout(function(){
  		led.stop().off();
  	}, 10000);
  	
  });
  

});