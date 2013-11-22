BaseViewModel
=============

BaseViewModel class for Knockout that enables Backbone like extension for viewmodels, based on ideas in [BaseViewModel](https://github.com/bmac/BaseViewModel) and [ko.ninja](https://github.com/jcreamer898/ko.ninja). Uses [Backbone's]() extend function to provide inheritance.

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
## TODO:

- Finish off unit tests
- Add build scripts
- Create as ko plugin?
- Publish