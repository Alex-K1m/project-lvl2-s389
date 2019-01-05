import _ from 'lodash';

const getIndent = level => '    '.repeat(level);

const stringify = (item, currentLevel) => {
  if (!_.isObject(item)) return item;
  const indent = getIndent(currentLevel);
  const newLevel = currentLevel + 1;

  const result = _.keys(item).reduce((acc, key) => {
    const value = item[key];
    if (_.isObject(value)) {
      return `${acc}\n  ${indent}  ${key}: ${stringify(value, newLevel)}`;
    }
    return `${acc}\n  ${indent}  ${key}: ${value}`;
  }, '');

  return `{${result}\n${indent}}`;
};

const makeMark = (status) => {
  if (status === 'same') return ' ';
  if (status === 'added') return '+';
  return '-';
};

const render = (ast, currentLevel = 0) => {
  const indent = getIndent(currentLevel);
  const newLevel = currentLevel + 1;

  const transform = ((node) => {
    const {
      type, status, key, value, children,
    } = node;
    const mark = makeMark(status);
    if (type === 'element') {
      return `  ${indent}${mark} ${key}: ${stringify(value, newLevel)}`;
    }
    return `  ${indent}  ${key}: ${render(children, newLevel)}`;
  });

  const result = ast
    .map(transform)
    .join('\n');
  return `{\n${result}\n${indent}}`;
};

export default render;
