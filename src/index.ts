import logKeyName from '@decorators/logKeyName';

class Hello {
  @logKeyName
  static world(): void {
    console.log('Hello World!');
  }
}

Hello.world();
