import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const fixtures = '__tests__/__fixtures__/';

describe('gendiff', () => {
  it('diff output json', () => {
    const pathToConfig1 = path.join(fixtures, 'before.json');
    const pathToConfig2 = path.join(fixtures, 'after.json');
    const expected = fs.readFileSync(path.join(fixtures, 'expectedJson.txt'))
      .toString();
    expect(gendiff(pathToConfig1, pathToConfig2)).toBe(expected);
  });

  it('diff output yaml', () => {
    const pathToConfig1 = path.join(fixtures, 'before.yaml');
    const pathToConfig2 = path.join(fixtures, 'after.yml');
    const expected = fs.readFileSync(path.join(fixtures, 'expectedYaml.txt'))
      .toString();
    expect(gendiff(pathToConfig1, pathToConfig2)).toBe(expected);
  });

  it('diff output ini', () => {
    const pathToConfig1 = path.join(fixtures, 'before.ini');
    const pathToConfig2 = path.join(fixtures, 'after.ini');
    const expected = fs.readFileSync(path.join(fixtures, 'expectedIni.txt'))
      .toString();
    expect(gendiff(pathToConfig1, pathToConfig2)).toBe(expected);
  });
});
