import fs from 'fs';
import _ from 'lodash';

const getData = (path) => {
  const file = fs.readFileSync(path);
  return JSON.parse(file);
};

const addLine = (str, key, value, mark = ' ') => `${str}\n  ${mark} ${key}: ${value}`;

const gendiff = (path1, path2) => {
  const file1 = getData(path1);
  const file2 = getData(path2);
  const keys = Array.from(new Set(
    Object.keys(file1).concat(Object.keys(file2)),
  ));

  const str = keys.reduce((acc, key) => {
    if (file1[key] === file2[key]) {
      return addLine(acc, key, file1[key]);
    }
    if (_.has(file1, key) && _.has(file2, key)) {
      const newAcc = addLine(acc, key, file1[key], '-');
      return addLine(newAcc, key, file2[key], '+');
    }
    if (_.has(file1, key)) {
      return addLine(acc, key, file1[key], '-');
    }
    return addLine(acc, key, file2[key], '+');
  }, '');

  return `{${str}\n}`;
};

export default gendiff;
