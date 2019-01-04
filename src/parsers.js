import yaml from 'js-yaml';

const parseJson = data => JSON.parse(data);

const parseYaml = data => yaml.safeLoad(data);

const parsers = {
  '.json': parseJson,
  '.yaml': parseYaml,
  '.yml': parseYaml,
};

const parse = (type, data) => parsers[type](data);

export default parse;
