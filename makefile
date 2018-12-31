install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

build:
	npm run build

publish:
	npm publish

lint:
	npx eslint .

.PHONY: test
