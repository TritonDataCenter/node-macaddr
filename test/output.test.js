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

test('output long', function (t) {
    t.plan(constants.ADDR_NUM_PAIRS.length);

    constants.ADDR_NUM_PAIRS.forEach(function (pair) {
        t.equal(macaddr.parse(pair[0]).toLong(), pair[1],
            pair[0] + ' => ' + pair[1]);
    });

    t.end();
});

test('output with leading zeros', function (t) {
    var strs = [
        [ 'a-b-c-d-e-f', '0a:0b:0c:0d:0e:0f' ],
        [ '0-1-ef-9d-ae-f0', '00:01:ef:9d:ae:f0' ],
        [ 'bc-10-ef-9d-ae-f0', 'bc:10:ef:9d:ae:f0' ]
    ];

    t.plan(strs.length * 2);

    strs.forEach(function (str) {
        var addr = macaddr.parse(str[0]);
        t.equal(addr.toString(), str[1], str[0] + ' (with defaults)');
        t.equal(addr.toString({ zeroPad: true }), str[1],
            str[0] + ' (with zeroPad=true)');
    });

    t.end();
});

test('output without leading zeros', function (t) {
    var strs = [
        [ '0a-0b-0c-0d-0e-0f', 'a:b:c:d:e:f' ],
        [ '00-01-ef-9d-ae-f0', '0:1:ef:9d:ae:f0' ],
        [ 'bc-10-ef-9d-ae-f0', 'bc:10:ef:9d:ae:f0' ]
    ];

    t.plan(strs.length);

    strs.forEach(function (str) {
        var addr = macaddr.parse(str[0]);
        t.equal(addr.toString({ zeroPad: false }), str[1],
          str[0] + ' (with zeroPad=false)');
    });

    t.end();
});

test('output with custom separator', function (t) {
    var strs = [
        [ '0a-0b-0c-0d-0e-0f', '0a|0b|0c|0d|0e|0f' ],
        [ '00-01-ef-9d-ae-f0', '00|01|ef|9d|ae|f0' ],
        [ 'bc-10-ef-9d-ae-f0', 'bc|10|ef|9d|ae|f0' ]
    ];

    t.plan(strs.length);

    strs.forEach(function (str) {
        var addr = macaddr.parse(str[0]);
        t.equal(addr.toString({ separator: '|' }), str[1],
          str[0] + ' (with separator="|")');
    });

    t.end();
});

test('output with custom octet formatter and padding disabled', function (t) {
    var strs = [
        [ '0a-0b-0c-0d-0e-0f', 'A:B:C:D:E:F' ],
        [ '00-01-ef-9d-ae-f0', '0:1:EF:9D:AE:F0' ],
        [ 'bc-10-ef-9d-ae-f0', 'BC:10:EF:9D:AE:F0' ]
    ];

    t.plan(strs.length);

    strs.forEach(function (str) {
        var addr = macaddr.parse(str[0]);
        function formatter(octet) {
            return octet.toString(16).toUpperCase();
        }
        t.equal(addr.toString( { octetFormatter: formatter, zeroPad: false}),
          str[1],
          str[0] + ' (with custom octet formatter and zeroPad=false)');
    });

    t.end();
});

test('output with custom octet formatter and padding enabled', function (t) {
    var strs = [
        [ 'a-b-c-d-e-f', '0A:0B:0C:0D:0E:0F' ],
        [ '0-1-ef-9d-ae-f0', '00:01:EF:9D:AE:F0' ],
        [ 'bc-10-ef-9d-ae-f0', 'BC:10:EF:9D:AE:F0' ]
    ];

    t.plan(strs.length);

    strs.forEach(function (str) {
        var addr = macaddr.parse(str[0]);
        function formatter(octet) {
            return octet.toString(16).toUpperCase();
        }
        t.equal(addr.toString({ octetFormatter: formatter, zeroPad: true }),
          str[1],
            str[0] + ' (with custom octet formatter)');
    });

    t.end();
});
