//decorator to bind this to the class
export function AutoBindThis(
  _: any,
  __: string,
  descriptor: PropertyDescriptor
) {
  const oldMethod = descriptor.value;
  const newDescriptor: PropertyDescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      const boundFunc = oldMethod.bind(this);
      return boundFunc;
    },
  };
  return newDescriptor;
}
