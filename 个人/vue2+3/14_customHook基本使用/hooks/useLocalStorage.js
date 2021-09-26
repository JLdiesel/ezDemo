import { ref, watch } from 'vue'
export default function (key, value) {
    const data = ref(value)
    if (value) {
        //两个值都传了，证明需要存储数据
        window.localStorage.setItem(key, JSON.stringify(value))
    } else {
        //只传了key，证明需要读取数据
        data.value = window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : '';
    }
    watch(data, (newvalue) => {
        window.localStorage.setItem(key, JSON.stringify(newvalue))
    })
    return data
}