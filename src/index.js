import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';

const getData = (pathToFile) => {
  const file = fs.readFileSync(pathToFile);
  const extension = path.extname(pathToFile);
  return parse(extension, file);
};

const buildLine = (str, key, value, mark = ' ') => `${str}\n  ${mark} ${key}: ${value}`;

// {
//   status: not changed | added | changed | removed,
//   key: ___,
//   value: ___ | []
// }

const gendiff = (path1, path2) => {
  const file1 = getData(path1);
  const file2 = getData(path2);
  const keys = _.union(_.keys(file1), _.keys(file2));

  const str = keys.reduce((acc, key) => {
    if (file1[key] === file2[key]) {
      return buildLine(acc, key, file1[key]);
    }
    if (_.has(file1, key) && _.has(file2, key)) {
      const newAcc = buildLine(acc, key, file1[key], '-');
      return buildLine(newAcc, key, file2[key], '+');
    }
    if (_.has(file1, key)) {
      return buildLine(acc, key, file1[key], '-');
    }
    return buildLine(acc, key, file2[key], '+');
  }, '');

  return `{${str}\n}`;
};

export default gendiff;
