/*!
 * BaseViewModel v0.2.1
 * Copyright 2013 leesus
 */
;(function(name, global, factory){

  // Set up BaseViewModel for the correct environment - UMD

  // CommonJS first
  if (typeof exports === 'object') {
    module.exports = factory(
      require('underscore'),
      require('knockout')
    );
  // AMD next
  } else if (typeof define === 'function' && define.amd) {
    define(['underscore', 'knockout'], factory);
  // And global
  } else {
    global[name] = factory(global._, global.ko);
  }

}).call(this, 'BaseViewModel', this, function(_, ko) {
  'use strict';

  // Check dependencies available
  if (typeof _ === 'undefined' || typeof ko === 'undefined') {
    throw new Error('BaseViewModel depends on underscore and knockout');
  }


  // BaseViewModel
  // -------------
  //
  // BaseViewModel is a constructor to build convenient viewmodels for Knockout, using ideas in Backbone
  //
  // Pass in a model (key-value pairs) to create a model, and any options you wish to become instance properties
  var BaseViewModel = function BaseViewModel(model, options){
  	model = model || {};
  	options = options || {};

    // Save a copy of the model so that we can parse it back later on
    this._model = _.clone(model);
    
    // Convert default viewmodel properties to observables 
    setupObservables.call(this, this.defaults);
    // Convert model properties to observables
    setupObservables.call(this, model);
    // Copy over options (methods, properties etc) as instance properties
    setupOptions.call(this, options);
    // Call init method
    this.init.call(this, arguments);

    // If the viewmodel has an element to bind to, then apply bindings to it as a convenience
    if (this.el) {
      ko.applyBindings(this, (typeof this.el === 'object') ? this.el : document.querySelector(this.el)[0]);
    }
  };

  // Extend BaseViewModel's prototype
  _.extend(BaseViewModel.prototype, {
    // No-op to facilitate auto calling `#init()`
    init: function() {},
    // Method to make a plain object copy of the model
    toModel: function() {
    	var copy = {},
    		model = ko.toJS(this._model);

    	_.extend(copy, model);

    	return copy;
    },
    // Method to create a json model, useful for persisting to a server
    toJSON: function() {
      var model = this.toModel();

      return JSON.stringify(model);
    }
  });
  

  // Helpers
  // -------

  // Helper function to correctly create observables.
  // First, sort the men from the boys (or the computeds from the observables)
  // Next, copy over properties as observables and observableArrays
  // Finally, copy over computeds and bind them correctly to BaseViewModel
  function setupObservables(options) {
    var computeds = _.functions(options),
      observables = _.omit(options, computeds);

    _.each(observables, function(value, prop){
      if (_.isArray(value)) {
        this[prop] = ko.observableArray(value);
      } else {
        this[prop] = ko.observable(value);
      }
    }, this);

    _.each(computeds, function(prop) {
      this[prop] = ko.computed(options[prop], this);
    }, this);
  };

  // Helper function to copy over an objects properties to the BaseViewModel
  // Purely copied over, not converted to observables
  function setupOptions(options) {
    _.each(options, function(value, prop){
      this[prop] = options[prop];
    }, this);
  };

  // (Backbone.js extend functionality)[https://github.com/jashkenas/backbone/blob/master/backbone.js#L1539]
  // ========================================================================

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  function extend(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for BaseViewModel
  BaseViewModel.extend = extend;

  return BaseViewModel;

});