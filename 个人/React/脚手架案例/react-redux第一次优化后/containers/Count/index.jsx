//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'
//引入Count的UI组件
import CountUI from '../../components/Count'
import {
    createDecrementAction,
    createIncrementAction,
    createIncrementAsyncAction
} from '../../redux/count_action'
//mapStateToProps函数返回一个对象
//返回对象中的key作为传递给UI组件props的key
//value为props的value - 状态

//a函数返回一个对象
//中的key作为传递给UI组件props的key,
//value为props的value - 方法


//使用connect()()创建并暴露一个Count的容器组件
export default connect(
    state => ({ count: state }),
    //mapDispatchToPorps的一般写法
/*     dispatch => ({
        //通知redux执行加法
        jia: number => dispatch(createIncrementAction(number)),
        jian: number => dispatch(createDecrementAction(number)),
        Async: (number, time) => dispatch(createIncrementAsyncAction(number, time))
    }) */
    //精简写法
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        Async: createIncrementAsyncAction
    }
)(CountUI)
