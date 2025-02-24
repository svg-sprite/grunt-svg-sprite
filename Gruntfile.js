/*
 * grunt-svg-sprite
 * https://github.com/svg-sprite/grunt-svg-sprite
 *
 * Copyright (c) 2018 Joschi Kuphal <joschi@kuphal.net>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    svg_sprite: {
      options: {
        log: 'info'
      },
      orthogonal: {
        src: ['**/*.svg'],
        dest: 'tmp',
        expand: true,
        cwd: 'test/fixtures',
        options: {
          mode: {
            css: {
              layout: 'vertical',
              sprite: '../svg/vertical.svg',
              render: {
                css: true,
                scss: true,
                less: true,
                styl: true
              },
              bust: false
            },
            view: {
              layout: 'horizontal',
              sprite: '../svg/horizontal.svg',
              bust: false
            },
            defs: {
              sprite: '../svg/defs.svg'
            },
            symbol: {
              sprite: '../svg/symbol.svg'
            },
            stack: {
              sprite: '../svg/stack.svg'
            }
          }
        }
      },
      others: {
        src: ['**/*.svg'],
        dest: 'tmp',
        expand: true,
        cwd: 'test/fixtures',
        options: {
          shape: {
            dest: 'intermediate'
          },
          mode: {
            css: {
              layout: 'diagonal',
              sprite: '../svg/diagonal.svg',
              bust: false
            },
            view: {
              layout: 'packed',
              sprite: '../svg/packed.svg',
              bust: false
            }
          }
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir,
  // then run this plugin's tasks.
  grunt.registerTask('test', ['clean', 'svg_sprite']);

  // By default, lint and run all tests.
  grunt.registerTask('default', 'test');
};
