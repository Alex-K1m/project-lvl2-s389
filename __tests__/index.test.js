import fs from 'fs';
import gendiff from '../src';

describe('gendiff', () => {
  const pathToConfig1 = '__tests__/__fixtures__/before.json';
  const pathToConfig2 = '__tests__/__fixtures__/after.json';
  const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt')
    .toString();

  it('diff output', () => {
    expect(gendiff(pathToConfig1, pathToConfig2)).toBe(expected);
  });
});
