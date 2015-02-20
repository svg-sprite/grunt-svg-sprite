## 1.0.18 Bugfix release (2015-02-20)
* Compatible with [svg-sprite 1.0.18](https://github.com/jkphl/svg-sprite/tree/v1.0.18)
* Removed excessive console output

## 1.0.17 Maintenance release (2015-02-20)
* Compatible with [svg-sprite 1.0.17](https://github.com/jkphl/svg-sprite/tree/v1.0.17)
* Optimized stylesheet templates
* Introduced boolean hasCommon template variable
* Updated dependencies
* Fixed incomplete dimension CSS selector suffix ([#31](https://github.com/jkphl/grunt-svg-sprite/issues/31))

## 1.0.16 Maintenance release (2015-02-11)
* Compatible with [svg-sprite 1.0.16](https://github.com/jkphl/svg-sprite/tree/v1.0.16)
* Fixed missing file extensions with CSS resources ([svg-sprite #54](https://github.com/jkphl/svg-sprite/issues/54))
* Fixed broken sprite URL in css/view example HTML documents ([svg-sprite #53](https://github.com/jkphl/svg-sprite/issues/53))
* Fixed wrong base path for intermediate SVG shapes
* Removed the automatic dot prefix for CSS selectors ([svg-sprite #55](https://github.com/jkphl/svg-sprite/issues/55))

## v1.0.14 Maintenance release (2015-02-08)
* Compatible with [svg-sprite 1.0.14](https://github.com/jkphl/svg-sprite/tree/v1.0.14)
* Restructured documentation
* Fixed error with falsy rendering configurations ([svg-sprite #52](https://github.com/jkphl/svg-sprite/issues/52))

## v1.0.13 Maintenance (2015-01-28)
* Compatible with [svg-sprite 1.0.13](https://github.com/jkphl/svg-sprite/tree/v1.0.13)
* Fixed windows path separator bug ([gulp-svg-sprite #6](https://github.com/jkphl/gulp-svg-sprite/issues/6))
* Made dimension attributes (width & height) optional ([svg-sprite #45](https://github.com/jkphl/svg-sprite/issues/45))
* Added cache busting option for non-CSS sprites ([svg-sprite #48](https://github.com/jkphl/svg-sprite/issues/48))

## v1.0.12 Maintenance (2015-01-27)
* Compatible with [svg-sprite 1.0.12](https://github.com/jkphl/svg-sprite/tree/v1.0.12)
* Fixed broken `cwd` support ([#32](https://github.com/jkphl/grunt-svg-sprite/issues/32))
* Added dimension CSS output for non-CSS sprites ([#31](https://github.com/jkphl/grunt-svg-sprite/issues/31))
* Bumped lodash dependency version ([svg-sprite #44](https://github.com/jkphl/svg-sprite/issues/44))

## v1.0.11 Bugfix release
* Compatible with [svg-sprite 1.0.11](https://github.com/jkphl/svg-sprite/tree/v1.0.11)
* Fixed coordinate distortion in CSS sprites ([svg-sprite #41](https://github.com/jkphl/svg-sprite/issues/41))

## v1.0.10 Feature release
* Compatible with [svg-sprite 1.0.10](https://github.com/jkphl/svg-sprite/tree/v1.0.10)
* Added support for custom mode keys

## v1.0.9 Maintenance release
* Compatible with [svg-sprite 1.0.9](https://github.com/jkphl/svg-sprite/tree/v1.0.9)
* Updated dependencies
* Introduced `svg` getter in templating shape variables
* Fixed logging error in SVGO optimization
* Fixed missing XML namespaces in SVG stack 
* Fixed cache busting errors with example HTML document 

## v1.0.8 Bugfix release
* Compatible with [svg-sprite 1.0.8](https://github.com/jkphl/svg-sprite/tree/v1.0.8)
* Fixed broken rendering template path resolution ([#29](https://github.com/jkphl/grunt-svg-sprite/issues/29))

## v1.0.7 Feature & bugfix release
* Compatible with [svg-sprite 1.0.7](https://github.com/jkphl/svg-sprite/tree/v1.0.7)
* Improved error handling
* Improved XML & DOCTYPE declaration handling and fixed ([#28](https://github.com/jkphl/grunt-svg-sprite/issues/28))

## v1.0.6 Feature release
* Compatible with [svg-sprite 1.0.6](https://github.com/jkphl/svg-sprite/tree/v1.0.6)
* Made shape ID namespacing configurable ([#27](https://github.com/jkphl/grunt-svg-sprite/issues/27))
* Added extended alignment options ([svg-sprite #33](https://github.com/jkphl/svg-sprite/issues/33))

## v1.0.5 Bufix release
* Compatible with [svg-sprite 1.0.5](https://github.com/jkphl/svg-sprite/tree/v1.0.5)
* Fixed XML & doctype declaration bug with inline sprites ([gulp-svg-sprite #2](https://github.com/jkphl/gulp-svg-sprite/issues/2))
* Added support for ID generator templates ([svg-sprite #37](https://github.com/jkphl/svg-sprite/issues/37))

## v1.0.1
* First release of the new plugin generation, compatible with [svg-sprite 1.0.1](https://github.com/jkphl/svg-sprite/tree/v1.0.1)
* Rewritten from scratch ([#18](https://github.com/jkphl/grunt-svg-sprite/issues/18))
* Dropped [libxmljs](https://github.com/polotek/libxmljs) dependency for improving Windows support ([#14](https://github.com/jkphl/grunt-svg-sprite/issues/14))
* Added support for `view`, `symbol` and `stack` modes ([#19](https://github.com/jkphl/grunt-svg-sprite/issues/19), [#24](https://github.com/jkphl/grunt-svg-sprite/issues/24))
* Switched to relative positioning in CSS sprites ([#23](https://github.com/jkphl/grunt-svg-sprite/issues/23))
* Made the configuration of Mustache templates and destinations more intuitive
* Enabled customization of shape IDs
* Enabled custom SVG transformations
* Enhanced `padding` options ([#20](https://github.com/jkphl/grunt-svg-sprite/issues/20))
* Added cache busting for `css` and `view` mode (enabled by default; [#9](https://github.com/jkphl/grunt-svg-sprite/issues/9))
* Added support for meta data injection

For older release notes please [see here](https://github.com/jkphl/grunt-svg-sprite/tree/00f36c5a217798bfa22a9b80c8bd2a75dcbb32dd#release-history).