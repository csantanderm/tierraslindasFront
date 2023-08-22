import { Box, Divider, List, ListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

const CartContainer = () => {

    const cart = useSelector(state => state.cart);


    return (
        <Box sx={{backgroundColor:"#262626", width:"500px", height:"100%"}}>
            <div style={{backgroundColor:"#50A060", margin:"5px", height:"85%"}}>
                <div style={{color:"#262626"}} >
                    <div style={{display:"flex", flexDirection:"row", 
                        justifyContent:"center", }}>
                        <ShoppingCartIcon fontSize='large' style={{marginTop:"27px"}}/>
                        <h1 style={{marginLeft:"15px"}}>Carrito de compras</h1>
                    </div>
                    <Divider/>
                    <div style={{}}>
                    <List>
                        {cart.cart.map((item)=>(
                            <ListItem>
                                {item.species.name} [{item.stock.size}]{" cms. (" }{item.stock.amount}{")u. --> "}   ${item.stock.price} 
                            </ListItem>                              
                        ))}
                    </List>
                    </div>
                </div>
                
            </div>
                <div style={{}}>
                        Footer
                </div>
        </Box>
    );
}

export default CartContainer;
