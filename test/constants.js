/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright 2017, Joyent, Inc.
 */

'use strict';

module.exports = {
    ADDR_NUM_PAIRS: [
        [ '0a:0b:0c:0d:0e:0f', 0x0a0b0c0d0e0f ],
        [ '1a:0b:30:0a:0e:00', 0x1a0b300a0e00 ],
        [ 'ff:ff:ff:ff:ff:ff', 281474976710655 ],
        [ 'ff:ff:ff:ff:ff:fe', 281474976710654 ],
        [ 'ff:ff:ff:ff:ff:fd', 281474976710653 ],
        [ '90:b8:d0:81:91:30', 159123446534448 ],
        [ '0e:43:81:95:4b:6d', 15683099642733 ],
        [ 'a6:50:61:c3:44:8f', 182864167781519 ],
        [ 'fc:a4:8e:94:b0:11', 277783696945169 ],
        [ '80:ab:eb:56:9c:d6', 141475876084950 ],
        [ 'a2:6b:b0:2a:71:88', 178583400771976 ],
        [ '7b:e5:b5:97:06:3c', 136226524300860 ],
        [ '2e:91:aa:8d:c7:be', 51203166554046 ]
    ]
};
