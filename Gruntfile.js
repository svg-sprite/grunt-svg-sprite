/*
 * grunt-svg-sprite
 * https://github.com/jkphl/grunt-svg-sprite
 *
 * Copyright (c) 2014 Joschi Kuphal <joschi@kuphal.net>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	
  // Load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    svgsprite: {
      spriteCSS: {
        src: ['test/files'],
        dest: 'tmp/css'
      },
      spriteScss: {
        src: ['test/files'],
        dest: 'tmp/css',
        options: {
          render: {
            css: false,
            scss: '../scss/_sprite'
          },
          maxwidth: 50,
          maxheight: 50,
          padding: 10,
          keep: true,
          dims: true
        }
      },
      spriteLess: {
        src: ['test/files'],
        dest: 'tmp/css',
        options: {
          render: {
            css: false,
            less: '../less/_sprite'
          },
          maxwidth: 50,
          maxheight: 50,
          padding: 10,
          keep: true,
          dims: true
        }
      },
      spriteStyl: {
        src: ['test/files'],
        dest: 'tmp/css',
        options: {
          render: {
            css: false,
            styl: '../styl/_sprite'
          },
          maxwidth: 50,
          maxheight: 50,
          padding: 10,
          keep: true,
          dims: true
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'svgsprite', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
