import Person from '../../Person';

jest.useFakeTimers();
const spiedOnTimeout = jest.spyOn(global, 'setTimeout');
const spiedOnConsole = jest.spyOn(console, 'log');
spiedOnConsole.mockReturnValue(undefined);

describe('Person class', () => {
  afterEach(() => {
    spiedOnTimeout.mockClear();
    spiedOnConsole.mockClear();
  });

  it('should use console.log', () => {
    Person.helloWorld();

    expect(console.log).toBeCalledTimes(1);
  });

  it('should use setTimeout', () => {
    Person.helloWorld();

    expect(setTimeout).toBeCalledTimes(1);
  });

  it('should use the instance name when greeting', () => {
    const name = 'Carlos';
    new Person(name).greet();

    expect(console.log).toBeCalledWith(expect.stringMatching(name));
  });
});
