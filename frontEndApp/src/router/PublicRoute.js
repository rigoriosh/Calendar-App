import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'


export const PublicRoute = ({isUserLoggedIn, component: Component, ...rest}) => {

    return (
       <Route {...rest}
        component = { (props) => (
            (isUserLoggedIn)
            ? <Redirect to="/" />
            : <Component {...props} />
        )}


       />
    )
}

PublicRoute.propTypes = {
    isUserLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}




export default PublicRoute