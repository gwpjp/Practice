/*jslint browser:true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

"use strict";

//This will be our world
var plan = ["############################",
            "#      #    #      o      ##",
            "#                          #",
            "#          #####           #",
            "##         #   #    ##     #",
            "###           ##     #     #",
            "#           ###      #     #",
            "#   ####                   #",
            "#   ##       o             #",
            "# o  #         o       ### #",
            "#    #                     #",
            "############################"];

//This will tell us where things are located
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

//Add a vector
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

//This will be a progammed object of our world
function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}

//Is a vector inside the grid?
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};

//What element is located at a specific point?
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};

//Set a specific point to be a specific element
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};

//Give shorthand notation to the possible directions
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

//Pick a random element (in our case, we have in mind a random direction)
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

//Create an array of directions to pass to the randomElement function
var directionNames = "n ne e se s sw w nw".split(" ");

//Wall
//A wall object does nothing
function Wall() {}

//Bouncing critter
//We now create a bouncing critter which randomly moves
function BouncingCritter() {
  this.direction = randomElement(directionNames);
};

//This is where its random motion is defined
BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

//Use the legend to get an element from its character
function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

//Gets the character for an element
function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
}

//World object
//The world object contains a map plus a legend to that map
function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}

//Outputs the grid as a string
World.prototype.toString = function() {
  var output = "";
  for (var y = 0; y < this.grid.height; y++) {
    for (var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += charFromElement(element);
    }
    output += "\n";
  }
  return output;
};

//A forEach function for our grid that provides the right scope
Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};

//Making a turn
World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

//Should it be able to make this move?
World.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  if (action && action.type == "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

//Checking the destination to see if it can act
World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};

//The View
function View(world, vector) {
  this.world = world;
  this.vector = vector;
}

//Check out a specific point
View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};

//Find all of a specific type
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == ch)
      found.push(dir);
  return found;
};

//Find a random element of a specific type
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length == 0) return null;
  return randomElement(found);
};

//Orient an angle n*45 degrees relative to a direction
function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

//Wall Follower
//A critter that only follows a wall
function WallFollower() {
  this.dir = "s";
}

WallFollower.prototype.act = function(view) {
  var start = this.dir;
  //First, check if the space behind and to the left is empty or not
  //If not, it will start scanning by looking ahead
  if (view.look(dirPlus(this.dir, -3)) != " ")
    start = this.dir = dirPlus(this.dir, -2);
  while (view.look(this.dir) != " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) break; //To avoid an infinite loop
  }
  return {type: "move", direction: this.dir};
};

//A New Life Like World
//Using Inheritance from World
function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}

LifelikeWorld.prototype = Object.create(World.prototype);

//An object that will handle the various actions allowed
var actionTypes = Object.create(null);

LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action &&
    action.type in actionTypes &&
    actionTypes[action.type].call(this, critter,
                                  vector, action);
  //If no action was called...
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0)
      this.grid.set(vector, null);
  }
};

//Grow action type
actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

//Move action type
actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 1 ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

//Eat action type
actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

//Reproduce action type
actionTypes.reproduce = function(critter, vector, action) {
  var baby = elementFromChar(this.legend,
                             critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};

//Plant
//Plants cannot move but can grow and reproduce
function Plant() {
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(view) {
  if (this.energy > 15) {
    var space = view.find(" ");
    if (space)
      return {type: "reproduce", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};

//Plant eater
//These can move and eat plants
function PlantEater() {
  this.energy = 20;
}
PlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};
  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
};

//Smart Plant eater
//These can move and eat plants but will not gorge themselves
//They will eat some and never move away from a plant
function SmartPlantEater() {
	this.energy = 20;
}

SmartPlantEater.prototype.act = function(view) {
	var space = view.find(" ");
	if (this.energy > 60 && space)
    	return {type: "reproduce", direction: space};
    var plant = view.find("*");
    var predator = view.find("@")
    if (plant && this.energy < 100) //This < 100 makes an interesting model with no predators
    	return {type: "eat", direction: plant};
  	if ((!plant || predator) && space)
   	 return {type: "move", direction: space};
};

//Tiger

function Tiger() {
	this.energy = 200;
}

Tiger.prototype.act = function(view) {
	var space = view.find(" ");
	if (this.energy > 100 && space)
		return {type: "reproduce", direction: space};
    var prey = view.find("0");
	if (prey && this.energy < 60) 
    	return {type: "eat", direction: plant};
  	if (!prey && space)
   	 return {type: "move", direction: space};
};
