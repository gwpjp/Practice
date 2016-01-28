describe('Todo model', function() {

  var todo;


  beforeEach(function() {
    todo = new app.Todo();
  });

  it('can be instantiated.', function() {
    expect(todo).not.toBeNull();
  });


  describe('when instantiated', function() {

    it('can be created with default values for title.', function() {
      expect(todo.get('title')).toEqual('');
    });

    it('can be created with default values for completed.', function() {
      expect(todo.get('completed')).toEqual(false);
    });

  });

  xit('can toggle its completed state.', function() {
    expect(todo.get('completed')).toEqual(false);
    todo.toggle();
    expect(todo.get('completed')).toEqual(true);
  });

  

});
