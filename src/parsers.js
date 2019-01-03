const parsers = new Map();

const defineParser = (extension, fn) => parsers.set(extension, fn);

const getParser = extension => parsers.get(extension);

const parse = (extension, fileContent) => getParser(extension)(fileContent);
export default parse;

const parseJson = fileContent => JSON.parse(fileContent);
defineParser('.json', parseJson);

const parseYaml = fileContent => console.log('hit parseYaml');
defineParser('.yaml', parseYaml);
defineParser('.yml', parseYaml);
