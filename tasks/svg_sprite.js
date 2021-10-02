'use strict';

/**
 * grunt-svg-sprite is a Grunt plugin for creating SVG sprites
 *
 * @see https://github.com/svg-sprite/grunt-svg-sprite
 *
 * @author Joschi Kuphal <joschi@kuphal.net> (https://github.com/jkphl)
 * @copyright © 2018 Joschi Kuphal
 * @license MIT https://github.com/svg-sprite/grunt-svg-sprite/blob/main/LICENSE
 */

const path = require('path');
const SVGSpriter = require('svg-sprite');
const chalk = require('chalk');
const figures = require('figures');
const pretty = require('prettysize');

const rtrim = (str, strip) => {
    while (str.length && strip.length && (str.substr(-strip.length) === strip)) {
        str = str.substr(0, str.length - strip.length);
    }

    return str;
};

module.exports = function(grunt) {
    grunt.registerMultiTask('svg_sprite', 'Takes a folder of SVG images and creates an SVG sprite along with suitable CSS / Sass / LESS / Stylus etc. resources out of them', function() {
        let spriter = null;
        let config = null;
        const errors = [];

        // Iterate over all specified file groups.
        this.files.forEach(f => {
            config = config || this.options({ dest: path.resolve(f.orig.dest) });
            const cwd = rtrim(path.normalize(f.orig.cwd || ''), path.sep);
            const cwdAbs = path.resolve(cwd || '.');
            const expand = Boolean(f.orig.expand);

            if (spriter === null) {
                spriter = new SVGSpriter(config);
                spriter.config.log.on('logging', (transport, level, msg) => {
                    if (level === 'error') {
                        errors.push(msg);
                    }
                });
            }

            f.src.map(file => {
                file = path.normalize(file);
                return path.resolve(cwdAbs, (expand && cwd.length && (file.indexOf(cwd + path.sep) === 0)) ? file.substr(cwd.length + path.sep.length) : file);
            }).filter(file => {
                if (!grunt.file.exists(file)) {
                    grunt.log.warn(`Source file "${file}" not found.`);
                    return false;
                }

                return true;
            }).forEach(file => {
                spriter.add(file, path.relative(cwdAbs, file), grunt.file.read(file));
            });
        });

        if (spriter) {
            const done = this.async();
            spriter.compile((error, result) => {
                console.log();
                if (error) {
                    grunt.fail.warn(`SVG sprite compilation failed with message: ${error}`, 3);
                } else {
                    for (const mode in result) {
                        if (!Object.prototype.hasOwnProperty.call(result, mode)) {
                            continue;
                        }

                        for (const resource in result[mode]) {
                            if (!Object.prototype.hasOwnProperty.call(result[mode], resource)) {
                                continue;
                            }

                            const file = result[mode][resource];
                            if (grunt.file.write(file.path, file.contents)) {
                                grunt.log.writeln(chalk.green(figures('✔ ')) + file.relative + chalk.gray(` (${pretty(file.contents.length)})`));
                            }
                        }
                    }

                    if (errors.length) {
                        const errSeparator = `\n${figures('✖')} `;
                        console.log();
                        grunt.fail.warn(`The following errors occured:${errSeparator}${errors.join(errSeparator)}\n`);
                    }
                }

                done();
            });
        }
    });
};
