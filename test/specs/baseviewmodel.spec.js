// Setup specs for UMD testing
(function(module, factory){
  // CommonJS
  if (typeof exports === 'object') {
    factory(require(module));
  // AMD
  } else if (typeof define === 'function' && define.amd) {
    define([module], factory);
  // Browser
  } else {
    factory(window[module]);
  }
}).call(this, 'BaseViewModel', function(BaseViewModel){

  describe('BaseViewModel', function() {

    var TestViewModel;

    it('should exist', function(){
      BaseViewModel.should.be.ok;
    });

    it('should convert the properties of the first argument to observables on viewModel', function() {
      var model = {id: 2, list: [1, 2, 3], listToString: function() { return this.list().join(', '); }};
      var viewModel = new BaseViewModel(model);

      (typeof viewModel.id).should.equal('function');
      viewModel.id().should.equal(2);
      (typeof viewModel.list.push).should.equal('function');
      viewModel.list().should.eql([1, 2, 3]);
      viewModel.listToString().should.equal('1, 2, 3');
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

      viewModel.foo().should.equal('foo');
      viewModel.bar().should.eql([1, 2, 3]);
      viewModel.barToString().should.equal('1, 2, 3');
    });

    it('should overwrite the defaults with properties of the first argument', function() {
      var model = new TestViewModel({ foo: 'bar' });

      model.foo().should.equal('bar');
    });

    it('should copy the properties of the second argument as is', function(){
      var model = new TestViewModel({ foo: 'bar' }, { myFunc: function(){ return 'hello' }});

      (typeof model.myFunc).should.equal('function');
      model.myFunc().should.equal('hello');
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

      (typeof model.init).should.equal('function');
      model.init().should.equal('hello foo!');
    });

    it('should have a toModel method that returns only the model that was passed', function(){
      var model = new TestViewModel({ id: 1, name: 'foo' });
      var returnedModel = {
        id: 1,
        name: 'foo'
      };
      
      (typeof model.toModel).should.equal('function');
      model.toModel().should.eql(returnedModel);
      model.foo().should.equal('foo');
      (model.toModel().foo === undefined).should.be.ok;
      model.bar().should.eql([1, 2, 3]);
      (model.toModel().bar === undefined).should.be.ok;
    });

    it('should have a toJSON method that returns a JSON representation of the model', function(){
      var model = new TestViewModel({ id: 1, name: 'foo' });
      var returnedModel = {
        id: 1,
        name: 'foo'
      };
      returnedModel = JSON.stringify(returnedModel);

      (typeof model.toJSON).should.equal('function');
      model.toJSON().should.eql(returnedModel);
    });
  });
});