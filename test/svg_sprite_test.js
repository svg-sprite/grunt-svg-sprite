'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const { promisify } = require('util');
const svg2png = require('svg2png');
const looksSame = require('looks-same');

// This is so that we can fix tests on Node.js > 10 since the Array.sort algorithm changed
const isNodeGreaterThan10 = process.version.split('.')[0].slice(1) > 10;

const readFileP = promisify(fs.readFile);
const writeFileP = promisify(fs.writeFile);

/**
 * Rasterize an SVG file and compare it to an expected image
 *
 * @param {String} svg              SVG file path
 * @param {String} png              PNG file path
 * @param {String} expected         Expected PNG file path
 * @param {String} diff             Diff file path
 * @param {Object} test             Nodeunit Test
 * @param {String} msg              Message
 */
function compareSvg2Png(svg, png, expected, diff, test, msg) {
    fs.mkdirSync(path.dirname(png), { recursive: true });
    const ecb = function(err) {
        console.log(err);
        test.ifError(err);
        test.done();
    };

    readFileP(svg)
        .then(svg2png)
        .then(buffer => {
            writeFileP(png, buffer)
                .then(() => {
                    looksSame(png, expected, (err, result) => {
                        test.ifError(err);
                        test.ok(result.equal, msg + JSON.stringify(result.diffClusters) + png);
                        test.done();
                    });
                    looksSame.createDiff({
                        reference: expected,
                        current: png,
                        diff,
                        highlightColor: '#ff00ff'
                    }, () => {});
                })
                .catch(ecb);
        })
        .catch(ecb);
}

exports.svg_sprite = {
    setUp(done) {
        // setup here if necessary
        done();
    },
    vertical(test) {
        test.expect(2);
        compareSvg2Png(
            path.join(__dirname, '..', 'tmp', 'svg', 'vertical.svg'),
            path.join(__dirname, '..', 'tmp', 'png', 'vertical.png'),
            path.join(__dirname, 'expected', 'vertical.png'),
            path.join(__dirname, '..', 'tmp', 'diff', 'vertical.png'),
            test,
            'The vertical sprite doesn\'t match the expected one!'
        );
    },
    horizontal(test) {
        test.expect(2);
        compareSvg2Png(
            path.join(__dirname, '..', 'tmp', 'svg', 'horizontal.svg'),
            path.join(__dirname, '..', 'tmp', 'png', 'horizontal.png'),
            path.join(__dirname, 'expected', 'horizontal.png'),
            path.join(__dirname, '..', 'tmp', 'diff', 'horizontal.png'),
            test,
            'The horizontal sprite doesn\'t match the expected one!'
        );
    },
    diagonal(test) {
        test.expect(2);
        compareSvg2Png(
            path.join(__dirname, '..', 'tmp', 'svg', 'diagonal.svg'),
            path.join(__dirname, '..', 'tmp', 'png', 'diagonal.png'),
            path.join(__dirname, 'expected', 'diagonal.png'),
            path.join(__dirname, '..', 'tmp', 'diff', 'diagonal.png'),
            test,
            'The diagonal sprite doesn\'t match the expected one!'
        );
    },
    packed(test) {
        test.expect(2);
        compareSvg2Png(
            path.join(__dirname, '..', 'tmp', 'svg', 'packed.svg'),
            path.join(__dirname, '..', 'tmp', 'png', 'packed.png'),
            path.join(__dirname, 'expected', isNodeGreaterThan10 ? 'packed.12.png' : 'packed.png'),
            path.join(__dirname, '..', 'tmp', 'diff', 'packed.png'),
            test,
            'The packed sprite doesn\'t match the expected one!'
        );
    }
};
