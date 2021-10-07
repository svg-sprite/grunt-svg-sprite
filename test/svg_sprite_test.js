'use strict';

const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');
const svg2png = require('svg2png');
const looksSame = require('looks-same');

/**
 * Rasterize an SVG file and compare it to an expected image
 *
 * @param {String} svg                SVG file path
 * @param {String} png                PNG file path
 * @param {String} expected           Expected PNG file path
 * @param {String} diff               Diff file path
 * @param {Function} done             Callback
 * @param {String} msg                Message
 */
// eslint-disable-next-line max-params
function compareSvg2Png(svg, png, expected, diff, done, msg) {
    fs.mkdirSync(path.dirname(png), { recursive: true });

    const ecb = function(err) {
        console.log(err);
        assert.ifError(err);
        done();
    };

    fs.promises.readFile(svg)
        .then(svg2png)
        .then(buffer => {
            fs.promises.writeFile(png, buffer)
                .then(() => {
                    looksSame(png, expected, (err, result) => {
                        assert.ifError(err);
                        assert.ok(result.equal, `${msg} ${JSON.stringify(result.diffClusters)} ${png}`);
                        done();
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

describe('grunt-svg-sprite', () => {
    it('vertical', done => {
        compareSvg2Png(
            path.join(__dirname, '../tmp/svg/vertical.svg'),
            path.join(__dirname, '../tmp/png/vertical.png'),
            path.join(__dirname, 'expected/vertical.png'),
            path.join(__dirname, '../tmp/png/vertical.diff.png'),
            done,
            'The vertical sprite doesn\'t match the expected one!'
        );
    });

    it('horizontal', done => {
        compareSvg2Png(
            path.join(__dirname, '../tmp/svg/horizontal.svg'),
            path.join(__dirname, '../tmp/png/horizontal.png'),
            path.join(__dirname, 'expected/horizontal.png'),
            path.join(__dirname, '../tmp/png/horizontal.diff.png'),
            done,
            'The horizontal sprite doesn\'t match the expected one!'
        );
    });

    it('diagonal', done => {
        compareSvg2Png(
            path.join(__dirname, '../tmp/svg/diagonal.svg'),
            path.join(__dirname, '../tmp/png/diagonal.png'),
            path.join(__dirname, 'expected/diagonal.png'),
            path.join(__dirname, '../tmp/png/diagonal.diff.png'),
            done,
            'The diagonal sprite doesn\'t match the expected one!'
        );
    });

    it('packed', done => {
        compareSvg2Png(
            path.join(__dirname, '../tmp/svg/packed.svg'),
            path.join(__dirname, '../tmp/png/packed.png'),
            path.join(__dirname, 'expected/packed.png'),
            path.join(__dirname, '../tmp/png/packed.diff.png'),
            done,
            'The packed sprite doesn\'t match the expected one!'
        );
    });
});
