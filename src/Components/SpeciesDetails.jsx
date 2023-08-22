import { Breadcrumbs, Card, IconButton, Popper, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getSpeciesById } from '../Services/SpeciesService';
import { useParams } from 'react-router-dom';
import { getGenusById } from '../Services/GenusService';
import { getFamilyById } from '../Services/FamilyService';
import { getAllStocksById } from '../Services/StockService';
import customTheme from '../Styles/customTheme';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import {add} from "../Store/Slices/cartSlice"

const SpeciesDetails = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart);

    const [anchor1, setAnchor1] = useState(null);
    const [anchor2, setAnchor2] = useState(null);

    const {id} = useParams()
    const [especie, setEspecie] = useState({
        species_id:"",
        cientificname: "",
        name: "",
        description:"",
        irrigation: "",
        publish: false,
        img: "",
        genus_id: ""
    });
    const [genero, setGenero] = useState({
        genus_id: "",
        name: "",
        description: "",
        family_id: "",
    });
    const [familia, setFamilia] = useState({
        family_id:"",
        name:"",
        description:""
    })
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        getSpeciesById(id)
        .then((response)=>{
            setEspecie(response.data)
            getGenusById(response.data.genus_id)
            .then((res)=>{
                setGenero(res.data)
                getFamilyById(res.data.family_id)
                .then((ans)=>{
                    setFamilia(ans.data)
                })
                .catch((e)=>console.log(e))
            })
            .catch((err)=>console.log(err))
            
            getAllStocksById(response.data.species_id)
            .then((response)=>{
                setStocks(response.data)
            })
            .catch((error)=>setStocks([]))
        })
        .catch((error)=> console.log(error))
    }, []);

    const open1 = Boolean(anchor1);
    const open2 = Boolean(anchor2);

    const handleOver1 = (event) => {
        setAnchor1(anchor1 ? null : event.currentTarget);
    }
    const handleOver2 = (event) => {
        setAnchor2(anchor2 ? null : event.currentTarget);
    }

    const handleAddCart = (stock) =>{
        let cartItem = {
            stock:stock,
            species:null
        }
        getSpeciesById(stock.species_id)
        .then((result)=>{
            
                cartItem.stock= stock
                cartItem.species= result.data
                const arr = cart.cart.concat([cartItem])
        
                console.log(arr)
                dispatch(add(arr))
            }
        )
        .catch((error)=>{
            console.log(error)
            return
        })
        
        
    }

    return (
        <Card sx={{ mt: 2, width: "800px", color:"#262626", backgroundColor:"#50A060" }}>
            <div style={{margin:"20px", display:"flex", flexDirection:"column"}}>
                <div>
                    <Breadcrumbs style={{lineHeight:0}} separator="›" aria-label="breadcrumb">
                        {[  
                            <div key="1" >
                                <p onMouseOver={handleOver1} onMouseLeave={handleOver1}>{familia.name}</p>
                                <Popper id={id} open={open1} anchorEl={anchor1} placement="right-start">
                                    <Card sx={{ml:2, width:"400px", bgcolor: "#a7ff8d" }}>
                                        <div style={{margin:"20px", fontSize:"14px"}}>
                                            {familia.description}
                                        </div>
                                    </Card>
                                </Popper>
                            </div>
                            ,
                            <div key="2">
                                <p onMouseOver={handleOver2} onMouseLeave={handleOver2}>{genero.name}</p>
                                <Popper id={id} open={open2} anchorEl={anchor2} placement="left-end">
                                    <Card sx={{ml:2, width:"400px", bgcolor: "#a7ff8d" }}>
                                        <div style={{margin:"20px", fontSize:"14px"}}>
                                            {genero.description}
                                        </div>
                                        
                                    </Card>
                                </Popper>
                            </div>
                            ,
                            <div key="3">
                                <p>{""}</p>
                            </div>
                            
                        ]}
                    </Breadcrumbs>
                </div>
                <div style={{marginLeft:"30px", display:"flex", flexDirection:"row"}}>
                    <p style={{marginTop:"0px",marginBottom:"10px",fontWeight:"bold", fontSize:"28px", alignSelf:"baseline"}}>{especie.name}</p>
                    <p style={{marginLeft:"5px", marginTop:"0px",marginBottom:"10px",fontStyle:"italic", fontSize:"20px", alignSelf:"baseline"}}>({especie.cientificname})</p>
                </div>
                <div style={{display:"flex", flexDirection:"row", verticalAlign:"center"}}>
                    <img width="250px" height="250px" src={"http://localhost:4000/image/"+especie.img} alt="img"/>
                    <div style={{marginLeft:"10px", display:"flex", flexDirection:"column"}}>
                        <p>{especie.description}</p>
                        <ThemeProvider theme={customTheme}>
                        {stocks.length!==0
                            ? 
                            <ul>
                                {
                                    stocks.map((stock)=>(
                                        <li key={stock.stock_id}>
                                            [{stock.size}] cms:   ${stock.price} -- ({stock.amount}u.)
                                            <IconButton onClick={()=>handleAddCart(stock)} color="obscure" >
                                                <AddShoppingCartIcon />
                                            </IconButton>
                                        </li>
                                    ))
                                }
                            </ul>
                            :<p>Stock agotado</p>
                        }
                        </ThemeProvider>
                        
                        <p>Riego: {especie.irrigation}</p>

                    </div>
                </div>
                
            </div>
            
        </Card>
    );
}

export default SpeciesDetails;
