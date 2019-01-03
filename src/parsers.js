import yaml from 'js-yaml';
import ini from 'ini';

const parsers = new Map();

const defineParser = (extension, fn) => parsers.set(extension, fn);

const getParser = extension => parsers.get(extension);

const parse = (extension, fileContent) => getParser(extension)(fileContent);
export default parse;

const parseJson = fileContent => JSON.parse(fileContent);
defineParser('.json', parseJson);

const parseYaml = fileContent => yaml.safeLoad(fileContent);
defineParser('.yaml', parseYaml);
defineParser('.yml', parseYaml);

const parseIni = fileContent => ini.parse(fileContent.toString());
defineParser('.ini', parseIni);
