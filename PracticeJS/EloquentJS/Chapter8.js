/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//Retry
function MultiplicatorUnitFailure() {
  this.message = "The odds are not in your favor!";
  this.stack = (new Error()).stack;
}

MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
MultiplicatorUnitFailure.prototype.name = "MultiplicatorUnitFailure";

function primitiveMultiply(x,y) {
  var r = Math.floor(2*Math.random());
  
  if (r === 0) {
    console.log(x*y);
  } else {
    throw new MultiplicatorUnitFailure();
  }
};

for (;;) {
  try {
    primitiveMultiply(1,2);
    break;
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      console.log(e.message);
    } else {
      throw e;
    }
  }

}

