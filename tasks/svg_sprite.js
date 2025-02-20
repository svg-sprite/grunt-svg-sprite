/**!
 * grunt-svg-sprite is a Grunt plugin for creating SVG sprites
 *
 * @see https://github.com/svg-sprite/grunt-svg-sprite
 *
 * @author Joschi Kuphal <joschi@kuphal.net> (https://github.com/jkphl)
 * @copyright © 2018 Joschi Kuphal
 * @license MIT https://github.com/svg-sprite/grunt-svg-sprite/blob/main/LICENSE
 */

'use strict';

const path = require('node:path');
const SVGSpriter = require('svg-sprite');
const picocolors = require('picocolors');
const figures = require('figures');
const pretty = require('prettysize');

const rtrim = (str, strip) => {
  while (str.length > 0 && strip.length > 0 && (str.substr(-strip.length) === strip)) {
    str = str.substr(0, str.length - strip.length);
  }

  return str;
};

module.exports = function(grunt) {
  grunt.registerMultiTask('svg_sprite', 'Takes a folder of SVG images and creates an SVG sprite along with suitable CSS/Sass/LESS/Stylus resources out of them', function() {
    const done = this.async();
    let spriter = null;
    let config = null;
    const errors = [];

    // Iterate over all specified file groups.
    for (const srcFile of this.files) {
      config ||= this.options({ dest: path.resolve(srcFile.orig.dest) });
      const cwd = rtrim(path.normalize(srcFile.orig.cwd || ''), path.sep);
      const cwdAbs = path.resolve(cwd || '.');
      const expand = Boolean(srcFile.orig.expand);

      if (spriter === null) {
        spriter = new SVGSpriter(config);
        spriter.config.log.on('logging', (transport, level, msg) => {
          if (level === 'error') {
            errors.push(msg);
          }
        });
      }

      const files = srcFile.src.map(file => {
        file = path.normalize(file);
        // The next line is probably too verbose and could be replaced with `path.basename`
        return path.resolve(cwdAbs, expand && cwd.length > 0 && file.startsWith(cwd + path.sep) ? file.substr(cwd.length + path.sep.length) : file);
      }).filter(file => {
        if (!grunt.file.exists(file)) {
          grunt.log.warn(`Source file "${file}" not found.`);
          return false;
        }

        return true;
      });

      for (const file of files) {
        spriter.add(file, path.relative(cwdAbs, file), grunt.file.read(file));
      }
    }

    spriter.compile((error, result) => {
      if (error) {
        grunt.fail.warn(`\nSVG sprite compilation failed with message: ${error}`, 3);
      } else {
        console.log('');
        for (const mode of Object.values(result)) {
          for (const file of Object.values(mode)) {
            if (grunt.file.write(file.path, file.contents)) {
              grunt.log.writeln(`${picocolors.green(figures.tick)} ${file.relative} ${picocolors.gray(`(${pretty(file.contents.length)})`)}`);
            }
          }
        }

        if (errors.length > 0) {
          const errSeparator = `\n${figures.cross} `;
          grunt.fail.warn(`\nThe following errors occured:${errSeparator}${errors.join(errSeparator)}\n`);
        }
      }

      done();
    });
  });
};
