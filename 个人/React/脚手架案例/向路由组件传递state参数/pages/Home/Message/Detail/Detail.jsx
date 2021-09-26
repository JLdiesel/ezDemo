import React, { Component } from 'react'
//引入querystring模块获取url参数
const detailData = [
    { id: '01', content: '你好李焕英' },
    { id: '02', content: 'jl' },
    { id: '03', content: '你好sb' },
]
export default class Detail extends Component {

    render() {
        //接受state参数
        console.log(this.props);
        //如果直接访问页面，无缓存的情况下state会是undefined,加个||{}能使页面正常加载不报错
        const { id, title } = this.props.location.state || {}

        const findContent = detailData.find(detalobj => {
            return detalobj.id === id
        }) || {}
        return (
            <ul>
                <li>ID:{id}</li>
                <li>TITLE:{title}</li>
                <li>CONTENT:{findContent.content}</li>
            </ul>
        )
    }
}
