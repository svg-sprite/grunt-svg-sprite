'use strict';

var svg2png			= require('svg2png'),
imageDiff			= require('image-diff');
/*
 * ======== A Handy Little Nodeunit Reference ========
 * https://github.com/caolan/nodeunit
 * 
 * Test methods: test.expect(numAssertions) test.done() Test assertions:
 * test.ok(value, [message]) test.equal(actual, expected, [message])
 * test.notEqual(actual, expected, [message]) test.deepEqual(actual, expected,
 * [message]) test.notDeepEqual(actual, expected, [message])
 * test.strictEqual(actual, expected, [message]) test.notStrictEqual(actual,
 * expected, [message]) test.throws(block, [error], [message])
 * test.doesNotThrow(block, [error], [message]) test.ifError(value)
 */

exports.svg_sprite = {
	setUp : function(done) {
		// setup here if necessary
		done();
	},
	orthogonal : function(test) {
		test.expect(12);
		svg2png('tmp/svg/vertical.svg', 'tmp/png/vertical.png', function(error) {
			test.ifError(error);
			imageDiff({
				actualImage : 'tmp/png/vertical.png',
				expectedImage : 'test/expected/vertical.png',
				diffImage : 'tmp/diff/vertical.png'
			}, function(error, imagesAreSame) {
				test.ifError(error);
				test.ok(imagesAreSame, 'The vertical sprite doesn\'t match the expected result.');

				svg2png('tmp/svg/horizontal.svg', 'tmp/png/horizontal.png', function(error) {
					test.ifError(error);
					imageDiff({
						actualImage : 'tmp/png/horizontal.png',
						expectedImage : 'test/expected/horizontal.png',
						diffImage : 'tmp/diff/horizontal.png'
					}, function(error, imagesAreSame) {
						test.ifError(error);
						test.ok(imagesAreSame, 'The horizontal sprite doesn\'t match the expected result.');
						
						svg2png('tmp/svg/diagonal.svg', 'tmp/png/diagonal.png', function(error) {
							test.ifError(error);
							imageDiff({
								actualImage : 'tmp/png/diagonal.png',
								expectedImage : 'test/expected/diagonal.png',
								diffImage : 'tmp/diff/diagonal.png'
							}, function(error, imagesAreSame) {
								test.ifError(error);
								test.ok(imagesAreSame, 'The diagonal sprite doesn\'t match the expected result.');
								
								svg2png('tmp/svg/packed.svg', 'tmp/png/packed.png', function(error) {
									test.ifError(error);
									imageDiff({
										actualImage : 'tmp/png/packed.png',
										expectedImage : 'test/expected/packed.png',
										diffImage : 'tmp/diff/packed.png'
									}, function(error, imagesAreSame) {
										test.ifError(error);
										test.ok(imagesAreSame, 'The packed sprite doesn\'t match the expected result.');
										test.done();
									});
								});
							});
						});
					});
				});
			});
		});
	}
};
