import yaml from 'js-yaml';
import ini from 'ini';

const parseJson = fileContent => JSON.parse(fileContent);

const parseYaml = fileContent => yaml.safeLoad(fileContent);

const parsers = {
  '.json': parseJson,
  '.yaml': parseYaml,
  '.yml': parseYaml,
};

const parse = (extension, file) => parsers[extension](file);

export default parse;
