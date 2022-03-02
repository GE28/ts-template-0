import logKeyName from '../../decorators/logKeyName';
jest.mock('../../decorators/logKeyName');

const mockLogKeyName = logKeyName as jest.Mock;

describe('@delay decorator factory', () => {
  const mockDecoratorArgs = jest.fn();
  const mockReturn = jest.fn();

  beforeAll(() => {
    mockLogKeyName.mockImplementation(function (
      target: any,
      key: string,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;

      descriptor.value = function logKeyNameBeforeOriginal(
        ...args: Array<any>
      ) {
        mockReturn(`${target.name || target.constructor.name}.${key}`);
        mockDecoratorArgs(target, key, descriptor);
        originalMethod.apply(this, args);
      };
    });
  });

  afterEach(() => {
    mockDecoratorArgs.mockClear();
    mockLogKeyName.mockClear();
    mockReturn.mockClear();
  });

  it('should be a valid decorator', () => {
    class Button {
      @logKeyName
      onClick(): void {}
    }

    new Button().onClick();

    expect(mockDecoratorArgs).toBeCalledWith(
      Button.prototype,
      'onClick',
      expect.objectContaining<PropertyDescriptor>({ configurable: true })
    );
  });

  it('should display the method name when this method is called on instances of the class', () => {
    class Button {
      @logKeyName
      onClick(): void {}

      @logKeyName
      onPress(): void {}
    }

    new Button().onClick();
    new Button().onPress();

    expect(mockReturn).toHaveBeenNthCalledWith(1, 'Button.onClick');
    expect(mockReturn).toHaveBeenNthCalledWith(2, 'Button.onPress');
  });

  it('should display the method name when this method is called on the class itself', () => {
    class Button {
      @logKeyName
      static onClick(): void {}

      @logKeyName
      static onPress(): void {}
    }

    Button.onClick();
    Button.onPress();

    expect(mockReturn).toHaveBeenNthCalledWith(1, 'Button.onClick');
    expect(mockReturn).toHaveBeenNthCalledWith(2, 'Button.onPress');
  });
});
