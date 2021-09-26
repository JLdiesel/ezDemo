import React, { Component } from 'react'
const detailData = [
    { id: '01', content: '你好李焕英' },
    { id: '02', content: 'jl' },
    { id: '03', content: '你好sb' },
]
export default class Detail extends Component {

    render() {
        //接受params参数
        const { id, title } = this.props.match.params
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
