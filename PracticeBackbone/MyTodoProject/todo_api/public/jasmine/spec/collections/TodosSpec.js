describe('Todo collection', function() {

  var todo;

  beforeEach(function() {
    todo = new app.Todo();
  });

  it('can be instantiated.', function() {
    expect(app.Todos).toBeDefined();
  });

  describe("when instantiated", function(){

    it ("should be of Todo models", function() {
      expect(app.Todos.model).toEqual(app.Todo);
    });

    it ("should be able to add models", function(){
      app.Todos.add(todo);
      expect(app.Todos.length).toEqual(1);
    });

    it ("should be able to find completed and remaining", function(){
      var l = app.Todos.remaining().length;
      var m = app.Todos.completed().length;
      app.Todos.add(todo);
      expect(app.Todos.remaining().length).toEqual(l+1);
      expect(app.Todos.completed().length).toEqual(m);
      todo.toggle();
      expect(app.Todos.remaining().length).toEqual(l);
      expect(app.Todos.completed().length).toEqual(m+1);
    });
  });

  describe('when fetched', function(){

    it("should add/remove a model to/from the collection", function() {
      var fakeServer;
      app.Todos.reset();
      expect(app.Todos.length).toEqual(0);

      fakeServer = sinon.fakeServer.create();
      fakeServer.respondWith('/todos/',
          JSON.stringify([{id: 1, title: "My Test", completed: false }]) );

      var callback = jasmine.createSpy('callback');

      app.Todos.fetch({success: callback});
      fakeServer.respond();
      expect(callback).toHaveBeenCalled();
      expect(app.Todos.length).toEqual(1);
      todo = app.Todos.get(1);
      expect(todo.get('title')).toEqual("My Test");

      todo.destroy();
      expect(app.Todos.length).toEqual(0);
    });
  });

  

});
