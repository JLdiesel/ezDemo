import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { asyncDecrement } from '../../redux/actions/countAction'
class About extends PureComponent {
    asyncDecrement = () => {
        this.props.asyncjian()
    }
    render() {
        return (
            <div>
                <span>{this.props.count}</span>
                <button onClick={this.asyncDecrement}>异步减1</button>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    count: state.count
})

const mapDispatchToProps = dispatch => ({
    asyncjian() {
        dispatch(asyncDecrement)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(About)
