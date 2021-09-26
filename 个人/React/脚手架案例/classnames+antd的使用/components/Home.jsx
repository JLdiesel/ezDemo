import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Button } from 'antd'
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
                <Button type='primary' >你好 </Button>
                <h2 className={classNames({ "active": this.state.isActive, "bar": this.state.isbar }, this.state.Aclass, "hellow", "what")}> </h2>
                <h2 className={classNames([{ "active": this.state.isActive, "bar": this.state.isbar }, this.state.Aclass, "hellow", "what"])}> </h2>
            </div >
        )
    }
}
