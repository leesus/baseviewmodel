mocha.setup('bdd');

require.config({
  urlArgs: '_=' + (new Date()).getTime(),
  baseUrl: '../src/',
  paths: {
    underscore: '../lib/underscore/underscore-min',
    knockout: '../lib/knockout/build/output/knockout-latest.debug'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    knockout: {
      exports: 'ko'
    }
  }
});

require(['../test/specs/baseviewmodel.spec'], function () {
  mocha.run();
});