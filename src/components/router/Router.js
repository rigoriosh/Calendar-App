import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { LoginScreen } from '../auth/LoginScreen';
import { CalendarScreen } from '../calendar/CalendarScreen';

export const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={LoginScreen}/>
                    <Route path="/" exact component={CalendarScreen}/>
                    <Redirect to="/login" />
                </Switch>
            </BrowserRouter>
        </>
    )
}
