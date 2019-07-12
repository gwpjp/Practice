describe('TodoView view', function() {
    var todo;

    beforeEach(function() {
      todo = new app.Todo;

    });


    describe('when constructing', function() {
      it ('should exist', function(){
        todo.set("title", "View test");
        var view = new AppView;
        expect(view).toBeDefined();
      });

      it ('should be a view', function(){
        expect(app.AppView).toEqual(jasmine.any(Backbone.View));
      });

      it ('should have the appropriate el', function(){
        expect(app.AppView.$el).toEqual('#todoapp');
      });

    });
});
