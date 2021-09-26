import React, { PureComponent } from 'react'

export default class GetInput extends PureComponent {
    state = { title: '' }
    getInput = (e) => {
        console.log(e.target.value);
        console.log(this);
    }
    get() {
        console.log(this);
    }
    getsInput(e) {
        this.setState({ title: e.target.value })
        console.log(e.target.value);
    }
    render() {
        return (
            <div>
                <input type='text' onChange={this.getInput} />
                <input type='text' onChange={this.get} />
                <input type='text' value={this.state.title} onChange={this.getsInput.bind(this)} />
            </div>
        )
    }
}
