module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    // Package file
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    concat: {
      options: {
        banner: '/*!\n' +
              ' * BaseViewModel v<%= pkg.version %>\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' */\n',
      },
      dist: {
        src: ['src/baseviewmodel.js'],
        dest: 'baseviewmodel.js'
      }
    },

    docco: {
      options: {
        output: 'docs/annotated-source'
      },
      annotate: {
        src: ['src/baseviewmodel.js']
      }
    },

    uglify: {
      minify: {
        files: {
          'baseviewmodel.min.js': ['baseviewmodel.js']
        }
      }
    }


  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-docco2');

  // Tasks
  grunt.registerTask('build', ['concat', 'uglify', 'docco'])
  grunt.registerTask('document', ['docco'])
  grunt.registerTask('default', ['concat', 'docco', 'uglify']);
};
