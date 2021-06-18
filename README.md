# macaddr

macaddr is a library for parsing and manipulating MAC addresses in JavaScript.

# Installation

    npm install macaddr

# API

## `parse(input)`

Parses a string representing and returns a `MAC` object representing the
address. A MAC address may be in any of the following forms:

- `01:02:03:04:05:06`
- `01-02-03-04-05-06`
- `010203040506`

When using `:` or `-` as a separator, the leading zero in an octet can be
dropped. For example:

- `1:2:3:4:5:6`
- `1-2-3-4-5-6`

If `parse(input)` is called with a number, it is interpreted as a 48-bit
integer representing the MAC address.

## `MAC`

### `MAC#toString([opts])`

Returns the string representation of the MAC address. An optional options
object allows for controlling the output, and takes the following fields:

- `zeroPad` (default: `true`), whether to pad octets that could print as a
  single character with a `0`.
- `separator` (default: `':'`), separator between octets.
- `octetFormatter` (default: (none)), a function that takes the integer
  octet as the argument and returns the formatted octet. If `zeroPad` is
  true, pad up to two characters.

### `MAC#toLong()`

Returns the 48-bit integer representation of the MAC address.

### `MAC#compare(other)`

Compares the MAC address to another `MAC` object, to determine if they
represent the same value. If the other MAC address has a larger 48-bit
representation, this method returns `-1`. If it has a smaller 48-bit
representation, then it returns `1`. If the two addresses are equivalent,
then the result is `0`.

# License

This Source Code Form is subject to the terms of the Mozilla Public License, v.
2.0.  For the full license text see LICENSE, or http://mozilla.org/MPL/2.0/.

Copyright (c) 2017, Joyent, Inc.
