module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Task configuration.
    concat: {
      options: {
        banner: ';(function(window, undefined){ \n \'use strict\';',
        footer: '\nif (typeof module === \'object\' && typeof module.exports === \'object\') { \n  var _ = require(\'underscore\'), ko = require(\'knockout\');\n  module.exports = exports = BaseViewModel; \nelse if (typeof define === \'function\' && define.amd) { \n  define([\'underscore\', \'knockout\'], function (_, ko) { window.BaseViewModel = BaseViewModel; }); \n} else if (typeof window === \'object\') { \n  window.BaseViewModel = BaseViewModel; \n})(window);'
      },
      dist: {
        src: ['src/baseviewmodel.js', 'src/extend.js'],
        dest: 'build/baseviewmodel.js'
      }
    },


  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // CSS compile/build task.
  grunt.registerTask('build', ['concat']);
  grunt.registerTask('default', ['concat']);
};
