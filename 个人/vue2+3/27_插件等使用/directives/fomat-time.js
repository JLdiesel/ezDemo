import dayjs from 'dayjs'
export default function (app) {



    app.directive(
        'format-time'
        , {
            created(el, binding) {
                if (binding.value) {
                    binding.formatString = binding.value
                }
            },
            mounted(el, binding) {
                const textContent = el.textContent;
                let timestamp = parseInt(textContent);
                if (textContent.length === 10) {
                    timestamp = timestamp * 1000
                }
                el.textContent = dayjs(timestamp).format(binding.formatString ? binding.formatString : 'YYYY-MM-DD HH:mm:ss')
            },
        })
}