import { reactive, computed } from '@test/reactivity/src';

describe('computed', () => {
  const a = reactive({ a: 123, b: 456 });

  it('test1', () => {
    const ab = computed(() => a.a + a.b);
    a.a = 1;
    expect(ab.value).toBe(457);
    a.b = 2;
    expect(ab.value).toBe(3);
    a.b = 555;
    expect(ab.value).toBe(556);
  });
});
