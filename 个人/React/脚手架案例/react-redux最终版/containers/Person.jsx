import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { addPerson } from '../redux/actions/person.js'
export class Person extends Component {
    addPersons = () => {
        const name = this.name.value
        const age = this.age.value
        if (name & age)
            this.props.addPerson({
                id: nanoid(),
                name,
                age
            })
    }
    render() {
        return (
            <div>
                姓名：<input ref={a => this.name = a} type="text" />
                年龄： <input ref={a => this.age = a} type="text" />
                <ul>
                    {
                        this.props.person.map((personObj) => {
                            return <li key={personObj.id}>姓名:{personObj.name},年龄:{personObj.age}</li>
                        })
                    }

                </ul>
                <button onClick={this.addPersons}>添加人名</button>
                <div>当前数字为{this.props.count}</div>
            </div>

        )
    }
}


export default connect(
    state => ({ count: state.count, person: state.person })
    , {
        addPerson
    })(Person)
