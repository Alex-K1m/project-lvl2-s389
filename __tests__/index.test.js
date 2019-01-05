import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const fixtures = '__tests__/__fixtures__/';
const args = [
  ['set1.json', 'set2.yml', 'json-yaml.txt'],
  ['set2.yml', 'set3.ini', 'yaml-ini.txt'],
  ['set3.ini', 'set1.json', 'ini-json.txt'],
];

const table = args.map(set => set.map(filename => path.join(fixtures, filename)));

test.each(table)('diff %#', (pathToConfig1, pathToConfig2, pathToExpected) => {
  expect(gendiff(pathToConfig1, pathToConfig2))
    .toBe(fs.readFileSync(pathToExpected).toString());
});
