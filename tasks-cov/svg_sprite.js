
// instrument by jscoverage, do not modifly this file
(function (file, lines, conds, source) {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (BASE._$jscoverage) {
    BASE._$jscmd(file, 'init', lines, conds, source);
    return;
  }
  var cov = {};
  /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
  function jscmd(file, type, line, express, start, offset) {
    var storage;
    switch (type) {
      case 'init':
        if(cov[file]){
          storage = cov[file];
        } else {
          storage = [];
          for (var i = 0; i < line.length; i ++) {
            storage[line[i]] = 0;
          }
          var condition = express;
          var source = start;
          storage.condition = condition;
          storage.source = source;
        }
        cov[file] = storage;
        break;
      case 'line':
        storage = cov[file];
        storage[line] ++;
        break;
      case 'cond':
        storage = cov[file];
        storage.condition[line] ++;
        return express;
    }
  }

  BASE._$jscoverage = cov;
  BASE._$jscmd = jscmd;
  jscmd(file, 'init', lines, conds, source);
})('tasks/svg_sprite.js', [1,13,14,19,20,24,25,26,27,29,31,32,34,37,38,43,44,45,58,51,53], {"25_14_6":0,"25_24_47":0,"26_15_7":0,"26_26_22":0,"27_28_10":0,"30_8_28":0,"42_6_7":0,"46_8_5":0,"52_11_42":0}, ["'use strict';","","/**"," * grunt-svg-sprite is a Grunt plugin for creating SVG sprites"," *"," * @see https://github.com/jkphl/grunt-svg-sprite"," *"," * @author Joschi Kuphal <joschi@kuphal.net> (https://github.com/jkphl)"," * @copyright © 2014 Joschi Kuphal"," * @license MIT https://raw.github.com/jkphl/grunt-svg-sprite/master/LICENSE.txt"," */","","module.exports = function(grunt) {","\tvar SVGSpriter\t\t\t= require('svg-sprite'),","\tpath\t\t\t\t\t= require('path'),","\tpretty\t\t\t\t\t= require('prettysize'),","\tchalk\t\t\t\t\t= require('chalk');","","\tgrunt.registerMultiTask('svg_sprite', 'Takes a folder of SVG images and creates an SVG sprite along with suitable CSS / Sass / LESS / Stylus etc. resources out of them', function() {","\t\tvar spriter\t\t\t= null,","\t\tconfig\t\t\t\t= null;","","\t\t// Iterate over all specified file groups.","\t\tthis.files.forEach(function(f) {","\t\t\tconfig\t\t\t= config || this.options({dest: path.resolve(f.orig.dest)});","\t\t\tspriter\t\t\t= spriter || new SVGSpriter(config);","\t\t\tvar cwd\t\t\t= path.resolve(f.orig.cwd || '.');","\t\t\t","\t\t\tf.src.filter(function(filepath) {","\t\t\t\tif (!grunt.file.exists(filepath)) {","\t\t\t\t\tgrunt.log.warn('Source file \"' + filepath + '\" not found.');","\t\t\t\t\treturn false;","\t\t\t\t} else {","\t\t\t\t\treturn true;","\t\t\t\t}","\t\t\t}).forEach(function(file){","\t\t\t\tvar p\t\t= path.resolve(file);","\t\t\t\tthis.add(p, path.relative(cwd, p), grunt.file.read(p));","\t\t\t}, spriter);","\t\t}, this);","\t\t","\t\tif (spriter) {","\t\t\tvar done\t\t= this.async();","\t\t\tspriter.compile(function(error, result) {","\t\t\t\tconsole.log();","\t\t\t\tif (error) {","\t\t\t\t\t","\t\t\t\t} else {","\t\t\t\t\tfor (var mode in result) {","\t\t\t\t\t\tfor (var resource in result[mode]) {","\t\t\t\t\t\t\tvar file\t\t= result[mode][resource];","\t\t\t\t\t\t\tif (grunt.file.write(file.path, file.contents)) {","\t\t\t\t\t\t\t\tgrunt.log.writeln(chalk.green('✔ ') + file.relative + chalk.gray(' (' + pretty(file.contents.length) + ')'));","\t\t\t\t\t\t\t}","\t\t\t\t\t\t}","\t\t\t\t\t}","\t\t\t\t}","\t\t\t\tdone();","\t\t\t});","\t\t}","\t});","};"]);
_$jscmd("tasks/svg_sprite.js", "line", 1);

"use strict";

_$jscmd("tasks/svg_sprite.js", "line", 13);

/**
 * grunt-svg-sprite is a Grunt plugin for creating SVG sprites
 *
 * @see https://github.com/jkphl/grunt-svg-sprite
 *
 * @author Joschi Kuphal <joschi@kuphal.net> (https://github.com/jkphl)
 * @copyright © 2014 Joschi Kuphal
 * @license MIT https://raw.github.com/jkphl/grunt-svg-sprite/master/LICENSE.txt
 */
module.exports = function(grunt) {
    _$jscmd("tasks/svg_sprite.js", "line", 14);
    var SVGSpriter = require("svg-sprite"), path = require("path"), pretty = require("prettysize"), chalk = require("chalk");
    _$jscmd("tasks/svg_sprite.js", "line", 19);
    grunt.registerMultiTask("svg_sprite", "Takes a folder of SVG images and creates an SVG sprite along with suitable CSS / Sass / LESS / Stylus etc. resources out of them", function() {
        _$jscmd("tasks/svg_sprite.js", "line", 20);
        var spriter = null, config = null;
        _$jscmd("tasks/svg_sprite.js", "line", 24);
        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            _$jscmd("tasks/svg_sprite.js", "line", 25);
            config = _$jscmd("tasks/svg_sprite.js", "cond", "25_14_6", config) || _$jscmd("tasks/svg_sprite.js", "cond", "25_24_47", this.options({
                dest: path.resolve(f.orig.dest)
            }));
            _$jscmd("tasks/svg_sprite.js", "line", 26);
            spriter = _$jscmd("tasks/svg_sprite.js", "cond", "26_15_7", spriter) || _$jscmd("tasks/svg_sprite.js", "cond", "26_26_22", new SVGSpriter(config));
            _$jscmd("tasks/svg_sprite.js", "line", 27);
            var cwd = path.resolve(_$jscmd("tasks/svg_sprite.js", "cond", "27_28_10", f.orig.cwd) || ".");
            _$jscmd("tasks/svg_sprite.js", "line", 29);
            f.src.filter(function(filepath) {
                if (_$jscmd("tasks/svg_sprite.js", "cond", "30_8_28", !grunt.file.exists(filepath))) {
                    _$jscmd("tasks/svg_sprite.js", "line", 31);
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    _$jscmd("tasks/svg_sprite.js", "line", 32);
                    return false;
                } else {
                    _$jscmd("tasks/svg_sprite.js", "line", 34);
                    return true;
                }
            }).forEach(function(file) {
                _$jscmd("tasks/svg_sprite.js", "line", 37);
                var p = path.resolve(file);
                _$jscmd("tasks/svg_sprite.js", "line", 38);
                this.add(p, path.relative(cwd, p), grunt.file.read(p));
            }, spriter);
        }, this);
        if (_$jscmd("tasks/svg_sprite.js", "cond", "42_6_7", spriter)) {
            _$jscmd("tasks/svg_sprite.js", "line", 43);
            var done = this.async();
            _$jscmd("tasks/svg_sprite.js", "line", 44);
            spriter.compile(function(error, result) {
                _$jscmd("tasks/svg_sprite.js", "line", 45);
                console.log();
                if (_$jscmd("tasks/svg_sprite.js", "cond", "46_8_5", error)) {} else {
                    for (var mode in result) {
                        for (var resource in result[mode]) {
                            _$jscmd("tasks/svg_sprite.js", "line", 51);
                            var file = result[mode][resource];
                            if (_$jscmd("tasks/svg_sprite.js", "cond", "52_11_42", grunt.file.write(file.path, file.contents))) {
                                _$jscmd("tasks/svg_sprite.js", "line", 53);
                                grunt.log.writeln(chalk.green("✔ ") + file.relative + chalk.gray(" (" + pretty(file.contents.length) + ")"));
                            }
                        }
                    }
                }
                _$jscmd("tasks/svg_sprite.js", "line", 58);
                done();
            });
        }
    });
};