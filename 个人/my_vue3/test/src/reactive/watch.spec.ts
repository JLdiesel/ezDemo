import { watch, reactive } from '@test/reactivity/src';
describe('watch', () => {
  const a = reactive({ a: 123, b: 456 });

  it('test1', () => {
    let i = 0;
    watch(
      () => a.a,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
        i++;
      }
    );
    a.a = 234;
    expect(i).toBe(1);
    a.a = 555;
    expect(i).toBe(2);
    a.b = 555;
    expect(i).toBe(2);
    expect(a.b).toBe(555);
  });
});
