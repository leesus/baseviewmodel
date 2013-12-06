mocha.setup('bdd');

require.config({
  urlArgs: '_=' + (new Date()).getTime(),
  baseUrl: '../test/',
  paths: {
    underscore: '../lib/underscore/underscore-min',
    ko: '../lib/knockout/build/output/knockout-latest.debug',
    src: '../src/',
  },
  shim: {
    underscore: {
      exports: '_'
    }
  }
});

require(['baseviewmodel'], function (BaseViewModel) {
  require(['specs/baseviewmodel.spec'], function () {
    mocha.run();
  });
});