;(function(window, undefined){ 
 'use strict';var setupObservables = function(options) {
	var computeds = _.functions(options),
		observables = _.omit(options, computeds);

	// Observables first...
	_.each(observables, function(value, prop){
		if (_.isArray(value)) {
			this[prop] = ko.observableArray(value);
		} else {
			this[prop] = ko.observable(value);
		}
	}, this);

	// Now computeds
	_.each(computeds, function(prop) {
		this[prop] = ko.computed(options[prop], this);
	}, this);
};

// Copy over options
var setupOptions = function(options) {
	_.each(options, function(value, prop){
		this[prop] = options[prop];
	}, this);
};

var BaseViewModel = function BaseViewModel(observables, options){
	observables = observables || {};
	options = options || {};

    this._model = _.clone(observables);
    
    setupObservables.call(this, this.defaults);
    setupObservables.call(this, observables);
    setupOptions.call(this, options);

    this.init.call(this, arguments);

    if (this.el) {
        ko.applyBindings(this, (typeof this.el === 'object') ? this.el : document.querySelector(this.el)[0]);
    }
};

_.extend(BaseViewModel.prototype, {
    init: function() {},
    toModel: function() {
    	var copy = {},
    		model = ko.toJS(this._model);

    	_.extend(copy, model);

    	return copy;
    },
    toJSON: function() {
        var model = this.toModel();

        return JSON.stringify(model);
    }
});

BaseViewModel.extend = extend;
// Backbone.js extend functionality - https://github.com/jashkenas/backbone

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
if (typeof module === 'object' && typeof module.exports === 'object') { 
  var _ = require('underscore'), ko = require('knockout');
  module.exports = exports = BaseViewModel; 
else if (typeof define === 'function' && define.amd) { 
  define(['underscore', 'knockout'], function (_, ko) { window.BaseViewModel = BaseViewModel; }); 
} else if (typeof window === 'object') { 
  window.BaseViewModel = BaseViewModel; 
})(window);