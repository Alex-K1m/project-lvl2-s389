import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const fixtures = '__tests__/__fixtures__/';
const args = [
  ['1.json', '2.yml', 'json-yaml.txt'],
  ['2.yml', '3.ini', 'yaml-ini.txt'],
  ['3.ini', '1.json', 'ini-json.txt'],
];

const table = args.map(set => set.map(file => path.join(fixtures, file)));

test.each(table)('diff %#', (pathToConfig1, pathToConfig2, pathToExpected) => {
  expect(gendiff(pathToConfig1, pathToConfig2))
    .toBe(fs.readFileSync(pathToExpected).toString());
});
