import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {startLogout} from '../../actions/authActions'



export const Navbar = () => {
    const {name} = useSelector( state => state.authReducer );
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(startLogout())
    }
    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>
            
            <button onClick={logOut} className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>

        </div>
    )
}
