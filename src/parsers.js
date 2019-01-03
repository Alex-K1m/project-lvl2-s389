import yaml from 'js-yaml';
import ini from 'ini';

const parseJson = fileContent => JSON.parse(fileContent);

const parseYaml = fileContent => yaml.safeLoad(fileContent);

const parseIni = fileContent => ini.parse(fileContent.toString());

const parsers = {
  '.json': parseJson,
  '.yaml': parseYaml,
  '.yml': parseYaml,
  '.ini': parseIni,
};

const parse = (extension, file) => parsers[extension](file);

export default parse;
