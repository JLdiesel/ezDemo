import axios from 'axios'
let BASE_URL = ''

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://hua.testk8s.tsign.cn'
} else if (process.env.NODE_ENV === 'production') {
  //   BASE_URL = 'http://hua.esign.cn'
  BASE_URL = 'http://hua.esign.cn/'
} else {
  BASE_URL = 'http://hua.testk8s.tsign.cn'
}
axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 5000
export default axios
