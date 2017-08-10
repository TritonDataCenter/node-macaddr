#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
#

#
# Copyright 2017, Joyent, Inc.
#

#
# node-macaddr Makefile
#

#
# Tools
#

ISTANBUL	:= node_modules/.bin/istanbul
FAUCET		:= node_modules/.bin/faucet
NPM		:= npm

#
# Files
#

JS_FILES	:= $(shell find lib test -name '*.js')
JSSTYLE_FILES	= $(JS_FILES)
JSSTYLE_FLAGS	= -f tools/jsstyle.conf
ESLINT		= ./node_modules/.bin/eslint
ESLINT_FILES	= $(JS_FILES)

include ./tools/mk/Makefile.defs
include ./tools/mk/Makefile.smf.defs

#
# Repo-specific targets
#

.PHONY: all
all: $(TAPE)
	$(NPM) rebuild

$(ESLINT): | $(NPM_EXEC)
	$(NPM) install \
	    eslint@`json -f package.json devDependencies.eslint` \
	    eslint-plugin-joyent@`json -f package.json devDependencies.eslint-plugin-joyent`

$(ISTANBUL): | $(NPM_EXEC)
	$(NPM) install

$(FAUCET): | $(NPM_EXEC)
	$(NPM) install

CLEAN_FILES += ./node_modules/

.PHONY: test
test: $(ISTANBUL) $(FAUCET)
	$(ISTANBUL) cover --print none test/run.js | $(FAUCET)

.PHONY: check
check:: $(ESLINT)
	$(ESLINT) $(ESLINT_FILES)

include ./tools/mk/Makefile.deps
include ./tools/mk/Makefile.targ
