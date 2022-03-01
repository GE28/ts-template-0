export default function delay(ms: number) {
  return function logKeyName(
    _target: any,
    _key: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function logKeyNameBeforeOriginal(...args: Array<any>) {
      console.log(`Please wait ${ms / 1000} second(s)...`);
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, ms);
    };
  };
}
