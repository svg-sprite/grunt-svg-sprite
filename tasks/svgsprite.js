/*
 * grunt-svg-sprite https://github.com/jkphl/grunt-svg-sprite
 * 
 * Copyright (c) 2014 Joschi Kuphal <joschi@kuphal.net> Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	var SVGSprite			= require('svg-sprite'),
	util					= require('util'),
	chalk					= require('chalk');
	
	grunt.registerMultiTask('svgsprite', 'Creates an SVG sprite plus suitable CSS / Sass resources of a folder of SVG files', function() {
		var options			= this.options(),
		that				= this;
		
		this.files.forEach(function(file) {
			var inputDir	= file.src.shift() || './',
			cssout			= util.isArray(file.dest) ? file.dest.shift() : ('' + file.dest),
			done			= that.async();
			
			console.log('Building SVG sprite from directory "%s" ...', inputDir);
			
			SVGSprite.createSprite(inputDir, cssout, that.options(), function(error, results) {
				if (error) {
					console.error(error);
				} else {
					for (var file in results.files) {
						grunt.log.writeln(chalk.green('✔ ') + file + chalk.gray(' (' + results.files[file] + ' bytes)'));
					}
				}
				done();
			});
		});
	});
};
