import React, { Component } from 'react'
//引入querystring模块获取url参数
import qs from 'qs'
const detailData = [
    { id: '01', content: '你好李焕英' },
    { id: '02', content: 'jl' },
    { id: '03', content: '你好sb' },
]
export default class Detail extends Component {

    render() {
        //接受search参数
        const { search } = this.props.location
        //parse这个方法是将一个字符串反序列化为一个对象。
        //stringify这个方法是将一个对象序列化成一个字符串，与querystring.parse相对。
        //slice函数返回从第X个数值截取
        let { id, title } = qs.parse(search.slice(1))
        const findContent = detailData.find(detalobj => {
            return detalobj.id === id
        })
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{findContent.content}</li>
            </ul>
        )
    }
}
