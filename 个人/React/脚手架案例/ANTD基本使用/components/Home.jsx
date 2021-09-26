import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Button, Alert } from 'antd'
import { UpCircleOutlined } from '@ant-design/icons'
export default class Home extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isActive: true,
            isbar: false,
            Aclass: "happen"
        }
    }


    render() {
        return (
            <div>
                <UpCircleOutlined />
                <Alert type="success" />
                <Button type='primary' onClick={this.helloClick} >你好 </Button>
                <Button type='link'>你好 </Button>
                <h2 className={classNames({ "active": this.state.isActive, "bar": this.state.isbar }, this.state.Aclass, "hellow", "what")}> </h2>
                <h2 className={classNames([{ "active": this.state.isActive, "bar": this.state.isbar }, this.state.Aclass, "hellow", "what"])}> </h2>
            </div >
        )
    }
}
