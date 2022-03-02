import delay from '../../decorators/delay';
jest.mock('../../decorators/delay');

const mockDelay = delay as jest.Mock;

describe('@delay decorator factory', () => {
  const mockDecoratorArgs = jest.fn();
  const mockReturn = jest.fn();

  beforeAll(() => {
    mockDelay.mockImplementation(
      (n) =>
        function (target: any, key: string, descriptor: PropertyDescriptor) {
          const originalMethod = descriptor.value;

          descriptor.value = function logKeyNameBeforeOriginal(
            ...args: Array<any>
          ) {
            mockReturn(n);
            mockDecoratorArgs(target, key, descriptor);
            originalMethod.apply(this, args);
          };
        }
    );
  });

  afterEach(() => {
    mockDecoratorArgs.mockClear();
    mockDelay.mockClear();
    mockReturn.mockClear();
  });

  it('should return a decorator', () => {
    class Button {
      @delay(10)
      onClick(): void {}
    }

    new Button().onClick();

    expect(mockDecoratorArgs).toBeCalledWith(
      Button.prototype,
      'onClick',
      expect.objectContaining<PropertyDescriptor>({ configurable: true })
    );
  });

  it('should return functions that store their lexical environment', () => {
    class Button {
      @delay(10)
      onClick(): void {}

      @delay(5)
      onPress(): void {}
    }

    new Button().onClick();
    new Button().onPress();

    expect(mockReturn).toHaveBeenNthCalledWith(1, 10);
    expect(mockReturn).toHaveBeenNthCalledWith(2, 5);
  });
});
