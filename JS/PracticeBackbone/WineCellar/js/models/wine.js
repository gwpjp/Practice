var wine = Backbone.Model.extend({

  defaults: {
    country: "USA",
    grapes: "red",
    name: undefined,
    year: undefined,
  },

  validate: function(attributes) {
    if (attributes.name === undefined) {
      return "You need to give your wine a name!";
    };
    if (attributes.year === undefined) {
      return "You need to give the year of your wine!";
    }
  },

  initialize: function() {
    console.log("The todo has been initialized.");
    this.on("invalid", function(model, error) {
      console.log(error);
    });
  },

});
