define(['underscore', 'ko', 'extend'], function(_, ko, extend){
	
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
		this._model = observables || {};
		options = options || {};
        
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
        		defaults = ko.toJS(this.defaults),
        		model = ko.toJS(this._model);

        	_.extend(copy, defaults, model);

        	console.log(copy)

        	return copy;
        }
    });

    BaseViewModel.extend = extend;

	return BaseViewModel;
});