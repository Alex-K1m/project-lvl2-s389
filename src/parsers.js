import yaml from 'js-yaml';
import ini from 'ini';

const parseJson = JSON.parse;

const parseYaml = yaml.safeLoad;

const parseIni = fileContent => ini.parse(fileContent.toString());

const parsers = {
  '.json': parseJson,
  '.yaml': parseYaml,
  '.yml': parseYaml,
  '.ini': parseIni,
};

const parse = (type, data) => parsers[type](data);

export default parse;
