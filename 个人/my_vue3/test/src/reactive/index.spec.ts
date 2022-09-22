import { effect, reactive } from '@test/reactivity/src/index';
import { describe } from 'vitest';
describe('reactive', () => {
  const a = reactive({ a: 123, b: 456 });

  it('test1', () => {
    let i = 0;
    effect(() => {
      console.log(a.a);
      i++;
    });
    expect(i).toBe(1);
    a.a = 555;
    expect(i).toBe(2);
    a.b = 555;
    expect(i).toBe(2);
  });
});
