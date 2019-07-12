var wineView = Backbone.View.extend({

  el: '#wineList',

  wineListTemplate: _.template($('#wine-template').html()),

  render: function() {
    this.$el.html( this.wineListTemplate( this.model.attributes) );
    return this;
  },

});
