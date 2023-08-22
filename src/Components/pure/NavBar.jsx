import React from 'react';
import { Button, ButtonGroup, Menu, MenuItem, ThemeProvider, Toolbar } from "@mui/material"
import {useNavigate } from 'react-router-dom';
import customTheme from '../../Styles/customTheme';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const NavBar = (props) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <ThemeProvider theme={customTheme}>
             <Toolbar sx={{justifyContent:"center"}}>
                <ButtonGroup variant="contained" orientation="vertical" color="obscure" style={{margin:"10px"}}>
                    <Button onClick={()=>navigate("/")}>Inicio</Button>
                    <Button variant="contained" color="obscure" onClick={props.openDrawer}
                        startIcon={<ShoppingCartIcon/>}>Carrito</Button>
                    {user.user.logged ?
                        <>
                            <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick} endIcon={<ArrowRightIcon/>}>Administrar</Button>
                            <Menu id="basic-menu" anchorEl={anchorEl} open={open}
                                onClose={handleClose} MenuListProps={{'aria-labelledby': 'basic-button',}}
                                anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                                transformOrigin={{vertical: 'top', horizontal: 'left',}}
                                sx={{ "& .MuiMenu-paper":{ backgroundColor: "#262626", color:"#50A060"},}}>
                                <MenuItem onClick={()=>{
                                    handleClose()
                                    navigate("/familias")
                                }}>Familias</MenuItem>
                                <MenuItem onClick={()=>{
                                    handleClose()
                                    navigate("/generos")
                                }}>Géneros</MenuItem>
                                <MenuItem onClick={()=>{
                                    handleClose()
                                    navigate("/especies")
                                }}>Especies</MenuItem>
                            </Menu>
                        </>
                        
                        
                        :null
                    }
                </ButtonGroup>

            </Toolbar>
        </ThemeProvider>
        
    );
}

NavBar.propTypes = {
    openDrawer: PropTypes.func.isRequired
}

export default NavBar;
