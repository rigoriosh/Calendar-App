import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
import { startCheking } from '../actions/authActions';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const {checking, uid} = useSelector(state => state.authReducer)
    //console.log({checking, name, uid})
    useEffect(() => {
        dispatch(startCheking())
    }, [dispatch])

    if (checking) {
        return <h1>Waith please....</h1>
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute exact path="/login" component={LoginScreen} isUserLoggedIn={!!uid}/>
                    <PrivateRoute exact path="/" component={CalendarScreen} isUserLoggedIn={!!uid}/>
                    {/* <Route exact path="/login" component={ LoginScreen } />      
                    <Route exact path="/" component={ CalendarScreen } /> */}

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
