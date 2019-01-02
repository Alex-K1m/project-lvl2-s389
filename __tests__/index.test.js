import gendiff from '../src';

describe('gendiff', () => {
  it('should output "Hello, world!"', () => {
    expect(gendiff()).toBe('Hello, world!');
  });
});
