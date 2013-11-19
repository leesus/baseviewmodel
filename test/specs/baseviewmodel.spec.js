define(['underscore', 'viewmodels/baseviewmodel'], function(_, BaseViewModel){
  var TestModel = BaseViewModel.extend({
    this.id = 0;
    this.name = '';
    this.age = null;
    this.colors = [];
    this.getColors = function(){
      return this.colors().join(', ');
    }
  });


  describe('BaseViewModel', function() {
    it('should add ko.observable to each property', function() {
      var model = new TestModel();

      expect(typeof model.id).toEqual('function');
      expect(model.id()).toBe(0);
      expect(typeof model.name).toEqual('function');
      expect(_.isArray(model.colors())).toBe(true);
      expect(model.colors().length).toEqual(0);
    });

    it('should add ko.observable to each property passed in', function() {
      var model = new TestModel({
        id: 1,
        name: 'joe',
        age: 24,
        colors: ['blue', 'green', 'red']
      });

      expect(typeof model.id).toEqual('function');
      expect(model.id()).toEqual(1);
      expect(typeof model.name).toEqual('function');
      expect(model.age()).toEqual(24);
      expect(_.isArray(model.colors())).toBe(true);
      expect(model.colors().length).toEqual(3);
    });

    it('should call the initialize method', function() {
      var model = new TestModel();

      expect(model.name()).toEqual('foo');
    });
  });
});