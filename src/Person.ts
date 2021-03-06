import logKeyName from '@decorators/logKeyName';
import delay from 'decorators/delay';

class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  @delay(1500)
  @logKeyName
  static helloWorld(): void {
    console.log('Hello World!');
  }

  greet(): void {
    console.log(`Hello, I am ${this.name}`);
  }
}

export default Person;
