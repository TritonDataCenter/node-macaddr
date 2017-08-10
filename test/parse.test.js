/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright 2017, Joyent, Inc.
 */

'use strict';

var constants = require('./constants');
var macaddr = require('../');
var test = require('tape');

test('equivalent ways to write addresses', function (t) {
    var strs = [
        '0a0b0c0d0e0f',
        '0a:0b:0c:0d:0e:0f',
        'a:b:c:d:e:f',
        '0a:b:c:d:e:0f',
        '0a-0b-0c-0d-0e-0f',
        'a-b-c-d-e-f',
        'a-0b-c-d-0e-f'
    ];
    var v = 0x0a0b0c0d0e0f;

    t.plan(strs.length * 2);

    strs.forEach(function (lc) {
        var uc = lc.toUpperCase();
        t.equal(macaddr.parse(lc).toLong(), v, 'parse ' + lc);
        t.equal(macaddr.parse(uc).toLong(), v, 'parse ' + uc);
    });

    t.end();
});


test('parse 48-bit integers', function (t) {
    t.plan(constants.ADDR_NUM_PAIRS.length);

    constants.ADDR_NUM_PAIRS.forEach(function (pair) {
        t.equal(macaddr.parse(pair[1]).toString(), pair[0],
            pair[1] + ' => ' + pair[0]);
    });

    t.end();
});


// --- Invalid MAC addresses

test('Unknown characters', function (t) {
    t.throws(function () {
        macaddr.parse('a/b/c/d/e/f');
    }, /unrecognized character "\/"$/);

    t.throws(function () {
        macaddr.parse('a:b:0:1:g:c');
    }, /unrecognized character "g"$/);

    t.throws(function () {
        macaddr.parse('a:b:_:1:e:c');
    }, /unrecognized character "_"$/);

    t.end();
});


test('Mixed separators', function (t) {
    t.throws(function () {
        macaddr.parse('a:b-c:d-e:f');
    }, /unrecognized character "-"$/);

    t.throws(function () {
        macaddr.parse('a-b:c-d:e-f');
    }, /unrecognized character ":"$/);

    t.end();
});


test('Bad numeric input', function (t) {
    t.throws(function () {
        macaddr.parse(1.2345);
    }, /Value must be an integer$/, 'floating point number');

    t.throws(function () {
        macaddr.parse(Math.pow(2, 48));
    }, /Value must be 48-bit$/, 'number is larger than 48 bits');

    t.end();
});


test('non-string, non-integer input', function (t) {
    t.throws(function () {
        macaddr.parse({});
    }, /expected string or integer, but got object$/, 'object input');

    t.throws(function () {
        macaddr.parse([]);
    }, /expected string or integer, but got object$/, 'array input');

    t.throws(function () {
        macaddr.parse(true);
    }, /expected string or integer, but got boolean$/, 'boolean input');

    t.throws(function () {
        macaddr.parse(false);
    }, /expected string or integer, but got boolean$/, 'boolean input');

    t.throws(function () {
        macaddr.parse();
    }, /expected string or integer, but got undefined$/, 'no input');

    t.end();
});


test('Trailing separator', function (t) {
    t.throws(function () {
        macaddr.parse('a:b:c:d:e:f:');
    }, /trailing ":" in MAC address$/);

    t.throws(function () {
        macaddr.parse('a-b-c-d-e-f-');
    }, /trailing "-" in MAC address$/);

    t.end();
});


test('Incomplete addresses', function (t) {
    t.throws(function () {
        macaddr.parse(':');
    }, /expected to find a hexadecimal number before ":"$/);

    t.throws(function () {
        macaddr.parse('1::0:e:5:6');
    }, /expected to find a hexadecimal number before ":"$/);

    t.throws(function () {
        macaddr.parse('1-2-3--5-6');
    }, /expected to find a hexadecimal number before "-"$/);

    t.throws(function () {
        macaddr.parse('');
    }, /MAC address is too short$/);

    t.throws(function () {
        macaddr.parse('a:b:c:d:e');
    }, /too few octets in MAC address$/);

    t.throws(function () {
        macaddr.parse('a:b:c:0d:0e');
    }, /too few octets in MAC address$/);

    t.throws(function () {
        macaddr.parse('0a0b0c0d0e');
    }, /MAC address is too short$/);

    t.end();
});


test('Extra characters in address', function (t) {
    t.throws(function () {
        macaddr.parse('1:e:39:d:e:f:0');
    }, /too many octets in MAC address$/);

    t.throws(function () {
        macaddr.parse('a:b:c:d:e:f:0:0');
    }, /too many octets in MAC address$/);

    t.throws(function () {
        macaddr.parse('a:b:c:00d:e:f');
    }, /too many hexadecimal digits in "00d"$/);

    t.end();
});


test('Whitespace characters', function (t) {
    t.throws(function () {
        macaddr.parse(' 90:b8:d0:81:91:30');
    }, /unrecognized character " "$/, 'whitespace before address');

    t.throws(function () {
        macaddr.parse('90:b8:d0:81:91:30 ');
    }, /unrecognized character " "$/, 'whitespace after address');

    t.throws(function () {
        macaddr.parse('90:b8: d0:81:91:30');
    }, /unrecognized character " "$/, 'whitespace inside address');

    t.throws(function () {
        macaddr.parse('90:b8:\td0:81:91:30');
    }, /unrecognized character "\\t"$/, 'whitespace inside address');

    t.throws(function () {
        macaddr.parse('90:b8:d0 :81:91:30');
    }, /unrecognized character " "$/, 'whitespace inside address');

    t.end();
});
