'use strict'

require.config({
	baseUrl: './',
	urlArgs: '_=' + (new Date()).getTime(),
	paths: {
		jquery: '../lib/jquery/jquery.min',
		ko: '../lib/knockout/build/output/knockout-latest',
		underscore: '../lib/underscore/underscore-min'
	},
	shim: {
        underscore: {
            exports: '_'
        }
	}
});