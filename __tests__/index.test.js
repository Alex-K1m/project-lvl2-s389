import fs from 'fs';
import gendiff from '../src';

describe('gendiff', () => {
  it('diff output 1', () => {
    const pathToConfig1 = '__tests__/__fixtures__/before.json';
    const pathToConfig2 = '__tests__/__fixtures__/after.json';
    const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt')
      .toString();
    expect(gendiff(pathToConfig1, pathToConfig2)).toBe(expected);
  });

  it('diff output 2', () => {
    const pathToConfig1 = '__tests__/__fixtures__/before2.json';
    const pathToConfig2 = '__tests__/__fixtures__/after2.json';
    const expected = fs.readFileSync('__tests__/__fixtures__/expected2.txt')
      .toString();
    expect(gendiff(pathToConfig1, pathToConfig2)).toBe(expected);
  });
});
