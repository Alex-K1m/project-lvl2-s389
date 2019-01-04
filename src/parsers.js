import yaml from 'js-yaml';

const parseJson = JSON.parse;

const parseYaml = yaml.safeLoad;

const parsers = {
  '.json': parseJson,
  '.yaml': parseYaml,
  '.yml': parseYaml,
};

const parse = (type, data) => parsers[type](data);

export default parse;
