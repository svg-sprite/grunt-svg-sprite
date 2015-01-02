'use strict';

/**
 * grunt-svg-sprite is a Grunt plugin for creating SVG sprites
 *
 * @see https://github.com/jkphl/grunt-svg-sprite
 *
 * @author Joschi Kuphal <joschi@kuphal.net> (https://github.com/jkphl)
 * @copyright © 2015 Joschi Kuphal
 * @license MIT https://raw.github.com/jkphl/grunt-svg-sprite/master/LICENSE.txt
 */

module.exports = function(grunt) {
	var SVGSpriter			= require('svg-sprite'),
	path					= require('path'),
	pretty					= require('prettysize'),
	chalk					= require('chalk');

	grunt.registerMultiTask('svg_sprite', 'Takes a folder of SVG images and creates an SVG sprite along with suitable CSS / Sass / LESS / Stylus etc. resources out of them', function() {
		var spriter			= null,
		config				= null;

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			config			= config || this.options({dest: path.resolve(f.orig.dest)});
			spriter			= spriter || new SVGSpriter(config);
			var cwd			= path.resolve(f.orig.cwd || '.');
			
			f.src.filter(function(filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).forEach(function(file){
				var p		= path.resolve(file);
				this.add(p, path.relative(cwd, p), grunt.file.read(p));
			}, spriter);
		}, this);
		
		if (spriter) {
			var done		= this.async();
			spriter.compile(function(error, result) {
				console.log();
				if (error) {
					
				} else {
					for (var mode in result) {
						for (var resource in result[mode]) {
							var file		= result[mode][resource];
							if (grunt.file.write(file.path, file.contents)) {
								grunt.log.writeln(chalk.green('✔ ') + file.relative + chalk.gray(' (' + pretty(file.contents.length) + ')'));
							}
						}
					}
				}
				done();
			});
		}
	});
};