
import React from 'react'
import UserContext from '../context/UserContext'
export default function enProps(Component) {
    return function (props) {
        return (
            <UserContext.Consumer>
                {user => <Component  {...props} {...user} />}；
            </UserContext.Consumer>
        )
    }

}