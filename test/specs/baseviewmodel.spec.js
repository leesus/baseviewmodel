define(['underscore', 'baseviewmodel'], function(_, BaseViewModel){

  var TestViewModel;

  describe('BaseViewModel', function() {


    it('should convert the properties of the first argument to observables on viewModel', function() {
      var model = {id: 2, list: [1, 2, 3], listToString: function() { return this.list().join(', '); }};
      var viewModel = new BaseViewModel(model);

      expect(typeof viewModel.id).toEqual('function');
      expect(viewModel.id()).toBe(2);
      expect(typeof viewModel.list.push).toEqual('function');
      expect(viewModel.list()).toEqual([1, 2, 3]);
      expect(viewModel.listToString()).toEqual('1, 2, 3');
    });

    it('convert the properties of the defaults object to observables', function() {
      TestViewModel = BaseViewModel.extend({
        defaults: {
          foo: 'foo',
          bar: [1, 2, 3],
          barToString: function() {
            return this.bar().join(', ');
          }
        }
      });
      var viewModel = new TestViewModel();

      expect(viewModel.foo()).toEqual('foo');
      expect(viewModel.bar()).toEqual([1, 2, 3]);
      expect(viewModel.barToString()).toEqual('1, 2, 3');
    });

    it('should overwrite the defaults with properties of the first argument', function() {
      var model = new TestViewModel({ foo: 'bar' });

      expect(model.foo()).toEqual('bar');
    });

    it('should copy the properties of the second argument as is', function(){
      var model = new TestViewModel({ foo: 'bar' }, { myFunc: function(){ return 'hello' }});

      expect(typeof model.myFunc).toEqual('function');
      expect(model.myFunc()).toEqual('hello');
    });

    it('should call init method if defined', function(){
      TestViewModel = BaseViewModel.extend({
        defaults: {
          foo: 'foo',
          bar: [1, 2, 3],
          barToString: function barToString() {
            return this.bar().join(', ');
          }
        },
        init: function(){
          return 'hello ' + this.foo() + '!';
        }
      });
      var model = new TestViewModel();

      expect(typeof model.init).toEqual('function');
      expect(model.init()).toEqual('hello foo!');
    });

    it('should have a toModel method that returns only the model that was passed', function(){
      var model = new TestViewModel({ id: 1, name: 'foo' });
      var returnedModel = {
        id: 1,
        name: 'foo'
      };
      
      expect(typeof model.toModel).toEqual('function');
      expect(_.isEqual(model.toModel(), returnedModel)).toBe(true);
      expect(model.foo()).toEqual('foo');
      expect(model.toModel().foo).toBe.undefined;
      expect(model.bar()).toEqual([1, 2, 3]);
      expect(model.toModel().bar).toBe.undefined;
    });

    it('should have a toJSON method that returns a JSON representation of the model', function(){
      var model = new TestViewModel({ id: 1, name: 'foo' });
      var returnedModel = {
        id: 1,
        name: 'foo'
      };
      returnedModel = JSON.stringify(returnedModel);

      expect(typeof model.toJSON).toEqual('function');
      expect(_.isEqual(model.toJSON(), returnedModel)).toBe(true);
    });
  });
});