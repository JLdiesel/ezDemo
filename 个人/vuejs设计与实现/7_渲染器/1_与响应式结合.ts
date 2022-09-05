function renderer(dom, container) {
  container.innerHTML = dom
}
const count = ref(1)
effect(() => {
  renderer(`<h1>${count.value}<h1>`, document.getElementById('app'))
})
count.value++
function effect(fn: () => void) {
}
export { }
