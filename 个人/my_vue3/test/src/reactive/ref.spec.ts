import { ref } from '@test/reactivity/src/ref';
import { effect } from '@test/reactivity/src/effect';
describe('refTest', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  let a = 0;
  const name = ref('123');
  effect(() => {
    console.log(name.value);

    a++;
  });
  expect(a).toBe(1);
  it('test1', () => {
    let i = 0;
    effect(() => {
      console.log(name.value);

      i++;
    });
    setTimeout(() => {
      console.log(i);
    }, 3000);
    vi.runAllTimers();
    expect(i).toBe(1);
    name.value = '555';
    expect(i).toBe(2);
    name.value = '666';
    expect(i).toBe(3);
  });
});
