import React, { useEffect, useState } from 'react';

import {getAllGenus, deleteGenus} from '../Services/GenusService';
import { Button, Card, CardContent, IconButton, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Genero from "../Models/genero.class"
import Familia from '../Models/familia.class';
import { getAllFamilies } from '../Services/FamilyService';
import customTheme from '../Styles/customTheme';
import { useDispatch, useSelector } from 'react-redux';
import {on, off} from "../Store/Slices/alertSlice"

const Generos = () => {

    const navigate = useNavigate()
    const [generos, setGeneros] = useState([]);
    const [familias, setFamilias] = useState([]);

    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);
    
    const handleDelete = (id) =>{
        deleteGenus(id)
        .then((response)=>{
            if (response.data.error!==undefined){
                dispatch(off({
                    open: false,
                    severity:alert.alert.severity,
                    message:alert.alert.message
                }))
                setTimeout(() => {   
                    dispatch(on({open:true,severity:"error", message:"No se pudo eliminar el género porque hay datos que dependen de él."}))
                }, 100)
            } else{
                dispatch(off({
                    open: false,
                    severity:alert.alert.severity,
                    message:alert.alert.message
                }))
                setTimeout(() => {   
                    dispatch(on({open:true,severity:"success", message:"Se eliminó el género con éxito."}))    
                }, 100)
                setGeneros(generos.filter(genero => genero.genus_id!==id)) 
            }
        })
        .catch((error)=>{
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {
                dispatch(on({open:true,severity:"error", message:"Error: No se pudo eliminar el género."}))
            }, 100)
        })  
        
    }

    const handleEdit = (id) =>{
        navigate("/generos/"+id)
    }
    
    const shorterText = (text, number)=>{
        return text.slice(0,number-1)+"..."
    }

    const getFamilia = (id) =>{
        let name=""
        familias.map((familia)=>{
            if(familia.family_id===id){
                name = familia.name
            }
        })
        return name
    }

    useEffect(() => {
        getAllGenus()
        .then((response) => {
            const arreglo = []
            response.data.map((obj) =>{
                let genus = new Genero()
                genus.setData(obj)
                arreglo.push(genus)
            })
            setGeneros(arreglo)
            getAllFamilies()
            .then((response)=>{
                const arreglo=[]
                response.data.map((obj)=>{
                    let family = new Familia()
                    family.setData(obj)
                    arreglo.push(family)
                })
                setFamilias(arreglo)
            })
            .catch((error)=> console.log(error))
        })
        .catch((error)=> console.log(error))

    }, []);


    return (
        <div style={{width:"800px"}}>
            <ThemeProvider theme={customTheme}>
                <Card style={{display:"flex", backgroundColor:"#50A060", flexDirection:"column", 
                        marginTop:".7rem",  width:"100%"}}>
                    
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <Typography sx={{fontWeight:"bold", fontStyle:"italic"}} variant="h4" color="#262626" margin="10px" marginLeft="20px">
                            Géneros
                        </Typography>
                        <Button style={{margin:"10px"}} variant="outlined" color="obscure" startIcon={<AddBoxIcon/>} 
                            onClick={()=>navigate("/generos/new")}>Nuevo
                        </Button>
                    </div>

                    <CardContent>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="Dense table">
                            <TableHead>
                                <TableRow >
                                    <TableCell align="left" width="125px" style={{fontWeight: "bold"}}>
                                        <Typography sx={{fontWeight:"bold"}} variant="h6" color="#262626" >
                                            Nombre
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left" style={{fontWeight: "bold"}}>
                                        <Typography sx={{fontWeight:"bold"}} variant="h6" color="#262626" >
                                            Familia
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left" style={{fontWeight: "bold"}}>
                                        <Typography sx={{fontWeight:"bold"}} variant="h6" color="#262626" >
                                            Descripción
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left" width="60px"></TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {generos.map((genero) => (
                                    <TableRow
                                        key={genero.genus_id}
                                        sx={{borderColor:"secondary", '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                            {genero.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {getFamilia(genero.family_id)}
                                        </TableCell>
                                        <TableCell align="justify">{shorterText(genero.description,67)}</TableCell>
                                        <TableCell align="justify">
                                            <div style={{display:"flex", flexDirection:"row"}}>
                                                <Button variant="outlined" color="obscure" startIcon={<ModeEditIcon/>} onClick={()=> handleEdit(genero.genus_id)}>Editar</Button>
                                                <IconButton variant="contained" color="obscure" onClick={()=> handleDelete(genero.genus_id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        
                                        </TableCell>
                                        
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>

                </Card>
            </ThemeProvider>
            
        </div>

    );
}

export default Generos;