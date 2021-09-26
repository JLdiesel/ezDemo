
import { customRef } from 'vue'
export default function (value, delay = 200) {
    let timer = null
    return customRef((track, trigger) => ({
        get() {
            track();
            return value
        },
        set(newvalue) {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                value = newvalue
                trigger()
            }, delay);
        }
    }))
}
