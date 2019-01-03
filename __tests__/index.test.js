import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const fixtures = '__tests__/__fixtures__/';
const args = [
  ['before.json', 'after.json', 'expectedJson.txt'],
  ['before.yaml', 'after.yml', 'expectedYaml.txt'],
  ['before.ini', 'after.ini', 'expectedIni.txt'],
];

const table = args.map(set => set.map(file => path.join(fixtures, file)));

test.each(table)('output diff %#', (pathToConfig1, pathToConfig2, pathToExpected) => {
  expect(gendiff(pathToConfig1, pathToConfig2))
    .toBe(fs.readFileSync(pathToExpected).toString());
});
