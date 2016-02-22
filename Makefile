MAKEFLAGS = -j1

.PHONY: clean clean-node clean-all install test build

clean:
	cd lore && npm run clean

clean-node:
	rm -rf node_modules
	cd lore && make clean-node
	cd lore-cli && make clean-node

clean-all:
	make clean
	make clean-node

install:
	cd lore && npm install
	cd lore-cli && npm install

test:
	cd lore && npm test
	cd lore-cli && npm install

build:
	cd lore && npm run build
	cd lore-cli && npm run build
