BaseViewModel
=============

Backbone like model extension for knockout viewmodels, including automatic observable and computed function creation for model properties. Based on ideas in [bmac's BaseViewModel](https://github.com/bmac/BaseViewModel) and [jcreamer898's ko.ninja](https://github.com/jcreamer898/ko.ninja). Uses [Backbone's](https://github.com/jashkenas/backbone/blob/master/backbone.js) extend function to provide inheritance. [BaseViewModel Project Page](http://labs.lee-ellam.com/BaseViewModel).

## Getting started

If you wish to contribute to BaseViewModel's development, clone the project and install the dependencies with `npm install`. That's it!

To build the files for deployment, run `grunt build`.

BaseViewModel is available on npm and bower and is a UMD module.

## Examples

### Create a BaseViewModel sub-class

You can extend the BaseViewModel class by using the `extend` method, passing in an object to be copied over to the new sub-class. Additionally, passing in a defaults hash will create default model observables on the sub-class.

```javascript
var Person = BaseViewModel.extend({
  defaults: {
    type: 'Human',
    getType: function() {
      return 'Species: ' + this.type();
    }
  },
  init: function(){
    // Do something when class instantiated
  }
});

var me = new Person();
me.type(); // 'Human'
me.getType(); // 'Species: Human'
```

### Passing a model

As well as sub-classing, you can pass an object to the BaseViewModel class or one of it's sub-classes to act as the model for that view model.

```javascript
var meModel = {
  name: 'Lee',
  age: 28,
  address: {
    city: 'London'
  },
  greeting: function() {
    return 'Hello, I\'m ' + this.name() + ' from ' + this.address.city();
  }
};

var me = new Person(meModel);
me.name(); // 'Lee'
me.age(); // 28
me.address.city(); // 'London'
me.greeting(); // 'Hello, I'm Lee from London'
```

### Getting back the model

To return the original model there is a toModel method to return the original model as an object, or a toJSON method that returns a JSON representation of the original model. Both methods ignore default properties.

```javascript
var model = {
  foo: 'foo',
  bar: 'bar'
};
var VM = new BaseViewModel.extend({
  defaults: {
    foobar: 'foobar'
  }
});
var myVM = new VM(model);
var obj = myVM.toModel();
var objJSON = myVM.toJSON();

console.log(obj.foobar); // undefined
console.log(obj.foo); // 'foo'
console.log(obj); // { foo: 'foo', bar: 'bar' }
console.log(objJSON); // '{"foo":"foo","bar":"bar"}'
```