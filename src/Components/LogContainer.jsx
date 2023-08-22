import React from 'react';
import "../Styles/LogContainer.css"
import { useSelector } from 'react-redux';
import LoginForm from './forms/LoginForm';
import { getUser } from '../Services/UserService';
import { login, logout } from "../Store/Slices/userSlice";
import { useDispatch } from 'react-redux';
import Logout from './pure/Logout';

import {on,off} from "../Store/Slices/alertSlice.js"


const LogContainer = () => {

    const user = useSelector(state => state.user);
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    //METODOS DE LOG
    const loginUser = (user, pass) =>{
        if (user==="" || pass===""){
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))   
            setTimeout(() => {
                dispatch(on({open:true,severity:"warning", message:"Ingrese los campos restantes."}))    
            }, 100)
            
        } else{
            getUser(user, pass)
            .then((result)=>{
                dispatch(login({
                    user_id: result.data.user_id,
                    name: result.data.name,
                    token: result.data.token,
                    logged: true
                }))
                dispatch(off({
                    open: false,
                    severity:alert.alert.severity,
                    message:alert.alert.message
                }))
                setTimeout(() => {   
                    dispatch(on({open:true,severity:"success",message:"Inicio de sesión exitoso."}))
                }, 100)
            })
            .catch((error)=>{
                switch (error.response.data.message) {
                    case "User":
                        dispatch(off({
                            open: false,
                            severity:alert.alert.severity,
                            message:alert.alert.message
                        }))
                        setTimeout(() => {  
                            dispatch(on({open:true,severity:"warning", message:"El usuario no existe."}))
                        }, 100)
                        break;
                    case "Password":
                        dispatch(off({
                            open: false,
                            severity:alert.alert.severity,
                            message:alert.alert.message
                        }))
                        setTimeout(() => {  
                            dispatch(on({open:true,severity:"warning", message:"La contraseña es incorrecta."}))    
                        }, 100)
                        break;
                    default:
                        dispatch(off({
                            open: false,
                            severity:alert.alert.severity,
                            message:alert.alert.message
                        }))
                        setTimeout(() => {  
                            dispatch(on({open:true,severity:"error", message:"Error no controlado."}))   
                        }, 100)
                        break;
                }
            })
        }
    }

    const logoutUser = ()=>{
        dispatch(logout())
        dispatch(off({
            open: false,
            severity:alert.alert.severity,
            message:alert.alert.message
        }))
        setTimeout(() => {  
            dispatch(on({open:true,severity:"success", message:"Ha cerrado sesión."}))
        }, 100)    
    }

    return (
        <div className="log-container" >
            <div style={{margin:"5px"}}>
                {
                    user.user.logged
                    ? <Logout logout={logoutUser}/>
                    : <LoginForm login={loginUser}/>
                }
            </div>
        </div>
    );
}

export default LogContainer;
