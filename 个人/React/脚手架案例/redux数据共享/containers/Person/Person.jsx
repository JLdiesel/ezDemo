import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { creatAddPersonAction } from '../../redux/actions/person'
class Person extends Component {
    addPerson = () => {
        const name = this.nameNode.value
        const age = this.ageNode.value
        const personObj = {
            id: nanoid(), name, age
        }
        this.props.jiaPerson(personObj);
        this.nameNode.value = ''
        this.ageNode.value = ''

        console.log(personObj);
    }
    render() {
        return (
            <div>
                <input ref={c => this.nameNode = c} type="text" placeholder='请输入名字' />
                <input ref={c => this.ageNode = c} type="text" placeholder='请输入年龄' />
                <button onClick={this.addPerson}>添加</button>
                <ul>
                    {
                        this.props.person.map((p) => {
                            return <li key={p.id}>-- {p.name}--{p.age}</li>
                        })
                    }
                </ul>
                <div>{this.props.count}</div>
            </div>
        )
    }
}
export default connect(
    state => ({
        person: state.person,
        count: state.count
    }),
    //mapDispatchToPorps的一般写法
    /*     dispatch => ({
            //通知redux执行加法
            jia: number => dispatch(createIncrementAction(number)),
            jian: number => dispatch(createDecrementAction(number)),
            Async: (number, time) => dispatch(createIncrementAsyncAction(number, time))
        }) */
    //精简写法
    {
        jiaPerson: creatAddPersonAction
    }
)(Person)

