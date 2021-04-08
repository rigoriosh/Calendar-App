import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'


export const PrivateRoute = ({isUserLoggedIn, component: Component, ...rest}) => {
    //console.log(rest);
    //localStorage.setItem('lastPath', rest.location.pathname+rest.location.search);
    return (
       <Route {...rest}
        component = { (props) => (
            (isUserLoggedIn)
            ? <Component {...props}/>
            : <Redirect to="/login" />
        )}


       />
    )
}

PrivateRoute.propTypes = {
    isUserLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}




export default PrivateRoute