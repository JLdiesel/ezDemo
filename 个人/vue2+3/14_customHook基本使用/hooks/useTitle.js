import { ref, watchEffect } from 'vue'
// watch
export default function (value) {
    const title = ref(value)
    // watch(title, () => {
    //     document.title = title.value
    // }, {
    //     immediate: true
    // })
    watchEffect(() => {
        document.title = title.value
    })
    return title

}