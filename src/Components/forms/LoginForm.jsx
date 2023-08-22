import { Button, TextField, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';


import customTheme from '../../Styles/customTheme';


const LoginForm = (props) => {
    
    const [user, setUser] = useState({
        name:"",
        password: "",
    });

    

    const handleLogin = (e) =>{
        e.preventDefault()
        props.login(user.name,user.password)
    }

    const handleChanges = (e) =>{
        setUser({...user,[e.target.name] : e.target.value.toString()})
    }

    return (
        <ThemeProvider theme={customTheme}>
            <form onSubmit={handleLogin}>
                <div style={{padding:"10px", display:"flex", flexDirection:"column", backgroundColor:"#50A060"}}>
                    <TextField color='obscure' name="name" label="Nombre de usuario"  
                            size="small" onChange={handleChanges}
                                style={{marginBottom:"5px"}}
                            />
                    <TextField name="password" onChange={handleChanges} color="obscure" label="Contraseña" type="password" size="small"
                            style={{marginBottom:"5px"}}/>
                    <Button type="submit" variant="contained" color='obscure'>Ingresar</Button>
                </div>
            </form>
        </ThemeProvider>
            
        
        
    );
}

LoginForm.propTypes ={
    login: PropTypes.func.isRequired
}

export default LoginForm;
