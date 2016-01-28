$(function() {

  Handlebars.registerHelper('caps', function(text,options){
    if (!options.hash.lower || options.hash.lower === "no") {
      return text.toUpperCase();
    } else {
      return text.toLowerCase();
    }
  });

  Handlebars.registerHelper("greeting", function (options) {
    switch (options.data.language) {
      case "en":
        return "Welcome";
      case "de":
        return "Wilkommen";
      default:
        return "Hi?";
    }
  });

  Handlebars.registerHelper("listX", function(number, options) {
    var num = parseInt(number);
    var out = "";

    for (var i=1; i <= 10; i++) {
      var data = {
        number: i,
        result: Math.pow(num,i)
      }
      if (i%2 === 0){
        out+=options.fn(data);
      } else {
        out+=options.inverse(data);
      }
    };
    return out;
  });

  //Get the html
  var src=$("#mainTemplate").html();
  //Compile template
  var template=Handlebars.compile(src);

  var output = template({name:"Tom"}, {data: {language: "en"}});
  console.log(output);





  document.body.innerHTML += output;
});
