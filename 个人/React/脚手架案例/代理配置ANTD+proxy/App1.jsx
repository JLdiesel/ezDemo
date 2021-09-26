import React, { Component } from 'react'
import Axios from 'axios'
export default class App1 extends Component {
    sendAxios = () => {
        Axios.get('http://localhost:3000/api/home').then(response => {
            console.log(response.data);
        }, err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.sendAxios}>发送Axios请求</button>
            </div>
        )
    }
}
