# grunt-svg-sprite

Takes a folder of SVG images and creates an SVG sprite along with suitable stylesheet resources (e.g. CSS, Sass or LESS) out of them. It is a Grunt plugin that wraps around the [svg-sprite](https://npmjs.org/package/svg-sprite) Node.js module.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-svg-sprite --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-svg-sprite');
```

## The "svgsprite" task

### Overview
In your project's Gruntfile, add a section named `svgsprite` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
  svgsprite: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

Of course, the top level `options` object is optional and you may define as many targets as you want. Your targets should look like this:

```javascript
your_target: {
  src      : ['path/to/svg/image/dir'],
  dest     : 'path/to/main/output/dir'
}
```

As [svg-sprite](https://github.com/jkphl/svg-sprite) accepts exactly **one input directory** for each run, only the first element of the `src` resource list will be used. That said, you may also provide a simple string as `src` argument: 

```javascript
your_target: {
  src      : 'path/to/svg/image/dir',
  dest     : 'path/to/main/output/dir'
}
```

### Options

You may provide both task and target specific `options`:

```javascript
your_target: {
  src      : 'path/to/svg/dir',
  dest     : 'path/to/css/dir',

  // Target specific options  
  options  : {
    dims   : true,
    keep   : true
  }
}
```

The options are passed to [svg-sprite](https://github.com/jkphl/svg-sprite) as configuration values. A complete reference is [available here](https://github.com/jkphl/svg-sprite#available-options).

|Option       |Description  |
|:------------|:------------|
|render       |Rendering configuration (output formats like CSS, Sass, LESS, HTML with inline SVG, etc.; [details see here](https://github.com/jkphl/svg-sprite#rendering-configuration))|
|spritedir    |Sprite subdirectory name [`"svg"`]|
|sprite       |Sprite file name [`"sprite"`]|
|prefix       |CSS selector prefix [`"svg"`]|
|common       |Common CSS selector for all images [*empty*]|
|maxwidth     |Maximum single image width [`1000`]|
|maxheight    |Maximum single image height [`1000`]|
|padding      |Transparent padding around the single images (in pixel) [`0`]|
|layout       |Image arrangement within the sprite (`"vertical"`, `"horizontal"` or `"diagonal"`) [`"vertical"`]|
|pseudo       |Character sequence for denoting CSS pseudo classes [`"~"`]|
|dims         |Render image dimensions as separate CSS rules [`false`]|
|keep         |Keep intermediate SVG files (inside the sprite subdirectory) [`false`]|
|recursive    |Recursive scan of the input directory for SVG files [`false`]|
|verbose      | Output verbose progress information (0-3) [`0`]|
|cleanwith    |Module to be used for SVG cleaning. Currently "scour" or "svgo" [`"svgo"`]|
|cleanconfig  |Configuration options for the cleaning module [`{}`]|

### Usage Examples

#### Basic example
In this very basic example, the default options are used to create an SVG sprite along with a suitable CSS file (the `render.css` option defaults to `TRUE`):

```javascript
grunt.initConfig({
  svgsprite: {
    spriteCSS: {
      src: ['path/to/svg/dir'],
      dest: 'path/to/css/dir'
    }
  }
})
```

These files are created at `path/to/css/dir`:

```bash
|-- sprite.css
`-- svg
    `-- sprite.svg
```

#### Sass example
In this slightly more verbose example, custom options are used to disable CSS output and create Sass resources instead. Also, the images will be downscaled to 50 x 50 pixel (if necessary) and padded by 10 pixels before creating the SVG sprite. Finally, CSS rules specifying the image dimensions will be added and the optimized, intermediate SVG images used for creating the sprite won't be discarded.

```javascript
grunt.initConfig({
  svgsprite       : {
    spriteSass    : {
      src         : ['path/to/svg/dir'],
      dest        : 'path/to/css/dir',
      options     : {
        render    : {
          css     : false,
          scss    : {
            dest  : 'sass/_sprite'
          }
        },
        maxwidth  : 50,
        maxheight : 50,
        padding   : 10,
        keep      : true,
        dims      : true
      }
    }
  }
})
```

These files are created at `path/to/css/dir` (when run with the example SVG images coming with *grunt-svg-sprite*):

```bash
|-- sass
|   `-- _sprite.scss
`-- svg
    |-- sprite.svg
    |-- weather-clear-night.svg
    |-- weather-clear.svg
    |-- weather-few-clouds-night.svg
    |-- weather-few-clouds.svg
    |-- weather-overcast.svg
    |-- weather-severe-alert.svg
    |-- weather-showers-scattered.svg
    |-- weather-showers.svg
    |-- weather-snow.svg
    |-- weather-storm.svg
    `-- weather-storm~hover.svg
```

#### Custom output formats & inline SVG embedding

The output rendering of *grunt-svg-sprite* is based on [Mustache](http://mustache.github.io) templates, which enables **full customization of the generated results**. You can even introduce completely new output formats. For details please see the [svg-sprite documentation](https://github.com/jkphl/svg-sprite#custom-output-formats).

Also, you may use *grunt-svg-sprite* to create an **inline SVG sprite** that can be embedded directly into your HTML documents. Please see the [svg-sprite documentation](https://github.com/jkphl/svg-sprite#inline-embedding) for details.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

Release history
---------------

#### v0.3.2
*	[Compatibility release](https://github.com/jkphl/svg-sprite#v032)
*	Added a Stylus output template

#### v0.3.1
*	[Compatibility release](https://github.com/jkphl/svg-sprite#v031)
*	Documentation corrections

#### v0.3.0
*	[Compatibility release](https://github.com/jkphl/svg-sprite#v030)
*	Fixed bug with SVGO plugin configuration ([#13](https://github.com/jkphl/grunt-svg-sprite/issues/13))
*	Added new HTML output format for rendering an inline SVG HTML implementation ([#12](https://github.com/jkphl/grunt-svg-sprite/issues/12))
*	Added new SVG output format for rendering an inline SVG sprite ([#12](https://github.com/jkphl/grunt-svg-sprite/issues/12))
*	Documentation corrections

#### v0.2.0
*	Compatibility release
*	Fixed tests after fixing the [padding bug in svg-sprite](https://github.com/jkphl/svg-sprite/pull/10)

#### v0.1.5
*	Compatibility release

#### v0.1.4
*	Compatibility release

#### v0.1.3
*	Compatibility release

#### v0.1.2
*	Compatibility release

#### v0.1.0
*	Added support for omitting the sprite subdirectory ([svg-sprite issue #5](https://github.com/jkphl/svg-sprite/issues/5))
*	Added support for Mustache template based rendering ([svg-sprite issue #6](https://github.com/jkphl/svg-sprite/issues/6))
*	**Breaking change**: Dropped `css`, `sass`, `sassout`, `less` and `lessout` configuration options and added `render` instead (see the [svg-sprite documentation](https://github.com/jkphl/svg-sprite#rendering-configuration) for a description of the available options)

#### v0.0.5
*	Added support for LESS output ([#6](https://github.com/jkphl/grunt-svg-sprite/issues/6))

#### v0.0.4
*	Updated dependency to bugfixed svg-sprite ([#3](https://github.com/jkphl/grunt-svg-sprite/issues/3))

#### v0.0.3
*	Updated dependency to bugfixed svg-sprite ([#2](https://github.com/jkphl/grunt-svg-sprite/issues/2))

#### v0.0.2
*	Changed devDependencies

#### v0.0.1
*	Initial release

##Legal
Copyright © 2014 Joschi Kuphal <joschi@kuphal.net> / [@jkphl](https://twitter.com/jkphl)

*grunt-svg-sprite* is licensed under the terms of the [MIT license](LICENSE.txt).

The contained example SVG icons are part of the [Tango Icon Library](http://tango.freedesktop.org/Tango_Icon_Library) and belong to the Public Domain.
