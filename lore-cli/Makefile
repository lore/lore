MAKEFLAGS = -j1

.PHONY: clean-node install test

clean-node:
	rm -rf node_modules
	rm -rf packages/lore-cli-core/node_modules
	rm -rf packages/lore-generate/node_modules
	rm -rf packages/lore-generate-collection/node_modules
	rm -rf packages/lore-generate-component/node_modules
	rm -rf packages/lore-generate-generator/node_modules
	rm -rf packages/lore-generate-model/node_modules
	rm -rf packages/lore-generate-new/node_modules
	rm -rf packages/lore-generate-reducer/node_modules

install:
	cd packages/lore-cli-core && npm install
	cd packages/lore-generate && npm install
	cd packages/lore-generate-collection && npm install
	cd packages/lore-generate-component && npm install
	cd packages/lore-generate-generator && npm install
	cd packages/lore-generate-model && npm install
	cd packages/lore-generate-new && npm install
	cd packages/lore-generate-reducer && npm install

test:
	cd packages/lore-cli-core && npm test
	cd packages/lore-generate && npm test
	cd packages/lore-generate-collection && npm test
	cd packages/lore-generate-component && npm test
	cd packages/lore-generate-generator && npm test
	cd packages/lore-generate-model && npm test
	cd packages/lore-generate-new && npm test
	cd packages/lore-generate-reducer && npm test
