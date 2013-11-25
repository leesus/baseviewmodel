var setupObservables = function(options) {
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