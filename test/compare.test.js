/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright 2017, Joyent, Inc.
 */

'use strict';

var macaddr = require('../');
var test = require('tape');

test('addresses are the same', function (t) {
    var addr = macaddr.parse('0a0b0c0d0e0f');

    var others = [
        '0a:0b:0c:0d:0e:0f',
        'a:b:c:d:e:f',
        '0a:b:c:d:e:0f',
        '0a-0b-0c-0d-0e-0f',
        'a-b-c-d-e-f',
        'a-0b-c-d-0e-f'
    ];

    t.plan(others.length);

    others.forEach(function (s) {
        var other = macaddr.parse(s);
        t.equal(addr.compare(other), 0, s);
    });

    t.end();
});


test('addresses are different', function (t) {
    var addr = macaddr.parse('0a0b0c0d0e0f');

    var others = [
        '0a:0b:0c:0d:0e:0e',
        '1:2:3:4:5:6',
        'a:b:c:d0:e:f',
        '0a-9b-0c-0d-0e-0f',
        'a-b-c-d-e-1',
        'a-b0-c-d-0e-f'
    ];

    t.plan(others.length);

    others.forEach(function (s) {
        var other = macaddr.parse(s);
        t.notEqual(addr.compare(other), 0, s);
    });

    t.end();
});


test('address comes before compared addresses', function (t) {
    var addr = macaddr.parse('00000c0d0e0f');

    var others = [
        '0a:0b:0c:0d:0e:0e',
        '1:2:3:4:5:6',
        'a:b:c:d0:e:f',
        '0a-9b-0c-0d-0e-0f',
        'a-b-c-d-e-1',
        'a-b0-c-d-0e-f'
    ];

    t.plan(others.length);

    others.forEach(function (s) {
        var other = macaddr.parse(s);
        t.equal(addr.compare(other), -1, s);
    });

    t.end();
});


test('address comes after compared addresses', function (t) {
    var addr = macaddr.parse('1f002c0d0e0f');

    var others = [
        '0a:0b:0c:0d:0e:0e',
        '1:2:3:4:5:6',
        'a:b:c:d0:e:f',
        '0a-9b-0c-0d-0e-0f',
        'a-b-c-d-e-1',
        'a-b0-c-d-0e-f'
    ];

    t.plan(others.length);

    others.forEach(function (s) {
        var other = macaddr.parse(s);
        t.equal(addr.compare(other), 1, s);
    });

    t.end();
});
