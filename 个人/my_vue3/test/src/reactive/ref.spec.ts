import { ref } from '@test/reactivity/src/ref'
import { effect } from '@test/reactivity/src/effect'
describe('refTest', () => {
  const name = ref('123')
  
  it('test1', () => {
    let i = 0
    effect(() => {
      console.log(name.value);
      console.log(i);
    
      i++
    })
    expect(i).toBe(1)
      name.value = '555'
    expect(i).toBe(2)
  name.value = '666'
    expect(i).toBe(3)
  })

})