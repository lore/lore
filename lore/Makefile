MAKEFLAGS = -j1

.PHONY: clean clean-node clean-all install test build

clean:
	cd packages/lore-actions && npm run clean
	cd packages/lore-core && npm run clean
	cd packages/lore-models && npm run clean
	cd packages/lore-reducers && npm run clean

clean-node:
	rm -rf node_modules
	rm -rf packages/lore-actions/node_modules
	rm -rf packages/lore-core/node_modules
	rm -rf packages/lore-models/node_modules
	rm -rf packages/lore-reducers/node_modules

clean-all:
	make clean
	make clean-node

install:
	cd packages/lore-actions && npm install
	cd packages/lore-core && npm install
	cd packages/lore-models && npm install
	cd packages/lore-reducers && npm install

test:
	cd packages/lore-actions && npm test
	cd packages/lore-core && npm test
	cd packages/lore-models && npm test
	cd packages/lore-reducers && npm test

build:
	cd packages/lore-actions && npm run build
	cd packages/lore-core && npm run build
	cd packages/lore-models && npm run build
	cd packages/lore-reducers && npm run build
