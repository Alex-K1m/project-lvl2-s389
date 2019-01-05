import _ from 'lodash';

const getIndent = multiplier => '    '.repeat(multiplier);

const makeMark = (status) => {
  if (status === 'same') return ' ';
  if (status === 'added') return '+';
  return '-';
};

const buildLine = (indent, key, value, mark = ' ') => `  ${indent}${mark} ${key}: ${value}`;

const stringify = (node, currentLevel) => {
  if (!_.isObject(node)) return node;
  const indent = getIndent(currentLevel);
  const newLevel = currentLevel + 1;

  const result = _.keys(node).reduce((acc, key) => {
    const value = node[key];
    if (_.isObject(value)) {
      return `${acc}\n${buildLine(indent, key, stringify(value, newLevel))}`;
    }
    return `${acc}\n${buildLine(indent, key, value)}`;
  }, '');

  return `{${result}\n${indent}}`;
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
      return buildLine(indent, key, stringify(value, newLevel), mark);
    }
    return buildLine(indent, key, render(children, newLevel));
  });

  const result = ast
    .map(transform)
    .join('\n');
  return `{\n${result}\n${indent}}`;
};

export default render;
