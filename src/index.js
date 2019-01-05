import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers';
import render from './renderers';

const getData = (pathToFile) => {
  const file = fs.readFileSync(pathToFile);
  const extension = path.extname(pathToFile);
  return parse(extension, file);
};

// AST consists of these objects:
// { type: element, status: same | added | removed, key, value }
// { type: list, key, children }

const makeElement = (status, key, value) => ({
  type: 'element',
  status,
  key,
  value,
});

const genAst = (node1, node2) => {
  const keys = _.union(_.keys(node1), _.keys(node2));

  return keys.reduce((acc, key) => {
    const value1 = node1[key];
    const value2 = node2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return [...acc, { type: 'list', key, children: genAst(value1, value2) }];
    }

    if (_.has(node1, key) && _.has(node2, key)) {
      if (value1 === value2) {
        return [...acc, makeElement('same', key, value1)];
      }
      return [...acc,
        makeElement('removed', key, value1),
        makeElement('added', key, value2)];
    }
    if (_.has(node1, key)) {
      return [...acc, makeElement('removed', key, value1)];
    }
    return [...acc, makeElement('added', key, value2)];
  }, []);
};

const gendiff = (path1, path2) => {
  const data1 = getData(path1);
  const data2 = getData(path2);
  return render(genAst(data1, data2));
};

export default gendiff;
