





//Debugging code
var wine1 = new wine({"name": "Sonoma Star", "year": 1994});
console.log(wine1.isValid());
console.log(JSON.stringify(wine1));
var myList = new wineList();
myList.add(wine1);
console.log(myList.length);
if (wine1.isValid()){
  var wineView1 = new wineView({model: wine1});
  console.log(JSON.stringify(wineView1));
  console.log(wineView1.el);
  $("#wineList").append(wineView1.render());
} else{
  var newname = prompt("What would you like to name your wine?");
  var newyear = prompt("What is the year of your wine?");
  wine1.set("name", newname);
  wine1.set("year", newyear);
  var wineView1 = new wineView({model: wine1});
  console.log(JSON.stringify(wineView1));
  console.log(wineView1.el);
  $("#wineList").append(wineView1.render());
};

myList.fetch({url: "../WineCellar/data.json"});
console.log(myList.length);
console.log(myList);
