import _ from 'lodash';

const stringify = (item, indent) => {
  if (!_.isObject(item)) return item;

  const result = _.keys(item).reduce((acc, key) => {
    const value = item[key];
    if (_.isObject(value)) {
      return stringify(value, `${indent}    `);
    }
    return `${acc}\n${indent}      ${key}: ${value}`;
  }, '');

  return `{${result}\n${indent}  }`;
};

const makeMark = (status) => {
  if (status === 'same') return ' ';
  if (status === 'added') return '+';
  return '-';
};

const render = (ast, level = 0) => {
  const indentStep = '    '.repeat(level);
  const indent = `  ${indentStep}`;
  const newLevel = level + 1;

  const transform = ((node) => {
    const {
      type, status, key, value, children,
    } = node;
    const mark = makeMark(status);
    if (type === 'element') {
      return `${indent}${mark} ${key}: ${stringify(value, indent)}`;
    }
    return `${indent}  ${key}: ${render(children, newLevel)}`;
  });

  const result = ast
    .map(transform)
    .join('\n');
  return `{\n${result}\n${indentStep}}`;
};

export default render;
