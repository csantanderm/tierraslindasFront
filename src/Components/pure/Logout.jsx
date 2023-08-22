import { Button, ThemeProvider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import customTheme from '../../Styles/customTheme';

const Logout = (props) => {

    const user = useSelector(state => state.user);

    const handleLogout = (e) =>{
        e.preventDefault()
        props.logout()
    }

    return (
        <ThemeProvider theme={customTheme}>
            <div style={{padding:"10px", display:"flex", flexDirection:"column", backgroundColor:"#50A060"}}>
                <h3 style={{fontStyle:"italic", color:"#262626"}}>Bienvenido(a) {user.user.name}</h3>
                <Button style={{marginBottom:"28px"}} variant="contained" color="obscure" onClick={handleLogout}>Cerrar sesión</Button>

            </div>
        </ThemeProvider>
        
        
    );
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}
export default Logout;
