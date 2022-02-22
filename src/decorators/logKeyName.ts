export default function logKeyName(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function logKeyNameBeforeOriginal(...args: Array<any>) {
    process.stdout.write(`${target.name}.${key}: `);
    originalMethod();
  }
}
