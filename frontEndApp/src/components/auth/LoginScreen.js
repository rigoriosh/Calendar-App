import React from 'react';
import { /* useSelector, */ useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [fieldsLogin, handledLoginInputChange] = useForm(
        {
            loginEmail: '',
            loginPassword: '123456'
        }
    )
    const {loginEmail, loginPassword} = fieldsLogin;

    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(fieldsLogin)
        //pendiente validaciones
        dispatch(startLogin(loginEmail, loginPassword))
    }

    ////////////// manejador de la info de creación de usuario
    const [fieldsRegister, handledRegisterInputChange] = useForm(
        {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            registerPasswordConfirm: '',
        }
    )
    const {registerName, registerEmail, registerPassword, registerPasswordConfirm} = fieldsRegister;

    const handleRegister = (e) => {
        e.preventDefault();
        //console.log(fieldsRegister)
        //pendiente validaciones
        if (registerPassword !== registerPasswordConfirm) {
            return Swal.fire('Error', 'Las contraseñas deben coincidir', 'warning')
        }
        dispatch(startRegister(registerName, registerEmail, registerPassword))
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail' value={loginEmail} onChange={handledLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword" value={loginPassword} onChange={handledLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                value={registerName} name='registerName' onChange={handledRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                value={registerEmail} name="registerEmail" onChange={handledRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                value={registerPassword} name="registerPassword" onChange={handledRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                value={registerPasswordConfirm} name="registerPasswordConfirm" onChange={handledRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}