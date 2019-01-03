import fs from 'fs';
import gendiff from '../src';

describe('gendiff', () => {
  it('diff output json', () => {
    const pathToConfig1 = '__tests__/__fixtures__/before.json';
    const pathToConfig2 = '__tests__/__fixtures__/after.json';
    const expected = fs.readFileSync('__tests__/__fixtures__/expectedJson.txt')
      .toString();
    expect(gendiff(pathToConfig1, pathToConfig2)).toBe(expected);
  });

  it('diff output yaml', () => {
    const pathToConfig1 = '__tests__/__fixtures__/before.yaml';
    const pathToConfig2 = '__tests__/__fixtures__/after.yml';
    const expected = fs.readFileSync('__tests__/__fixtures__/expectedYaml.txt')
      .toString();
    expect(gendiff(pathToConfig1, pathToConfig2)).toBe(expected);
  });
});
