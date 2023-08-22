import React, { useEffect, useState } from 'react';

import {getAllFamilies,deleteFamily} from '../Services/FamilyService';
import {Button, Card, CardContent, IconButton, Table, TableBody, TableCell, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import customTheme from '../Styles/customTheme';
import { useDispatch, useSelector } from 'react-redux';
import {on, off} from "../Store/Slices/alertSlice"


const Familias = () => {

    const navigate = useNavigate()
    const [familias, setFamilias] = useState([]);
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);
    
    const handleDelete = (id) =>{
        deleteFamily(id)
        .then((response)=>{
            if (response.data.error!==undefined){
                dispatch(off({
                    open: false,
                    severity:alert.alert.severity,
                    message:alert.alert.message
                }))
                setTimeout(() => {   
                    dispatch(on({open:true,severity:"error", message:"No se pudo eliminar la familia porque hay datos que dependen de ella."}))
                }, 100)
            } else{
                dispatch(off({
                    open: false,
                    severity:alert.alert.severity,
                    message:alert.alert.message
                }))
                setTimeout(() => {   
                    dispatch(on({open:true,severity:"success", message:"Se eliminó la familia con éxito."}))    
                }, 100)
                setFamilias(familias.filter(family => family.family_id!==id))
            }
        })
        .catch((error)=>{
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {
                dispatch(on({open:true,severity:"error", message:"Error: No se pudo eliminar la familia."}))
            }, 100)
        })  
    }

    const shorterText = (text, number)=>{
        return text.slice(0,number-1)+"..."
    }

    const handleEdit = (id) =>{
        navigate("/familias/"+id)
    }
        
    useEffect(() => {
        getAllFamilies()
        .then((response) => {
            setFamilias(response.data)
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
                            Familias
                        </Typography>
                        <Button style={{margin:"10px"}} variant="outlined" color="obscure" startIcon={<AddBoxIcon/>} 
                            onClick={()=>navigate("/familias/new")}>Nueva
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
                                            Descripción
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left" width="60px"></TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {familias.map((familia) => (
                                    <TableRow
                                        key={familia.family_id}
                                        sx={{borderColor:"obscure", '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                            {familia.name}
                                        </TableCell>
                                        <TableCell align="justify">{shorterText(familia.description,67)}</TableCell>
                                        <TableCell align="justify">
                                            <div style={{display:"flex", flexDirection:"row"}}>
                                                <Button variant="outlined" color="obscure" startIcon={<ModeEditIcon/>} onClick={()=> handleEdit(familia.family_id)}>Editar</Button>
                                                <IconButton variant="contained" color="obscure" onClick={()=> handleDelete(familia.family_id)}>
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

export default Familias;
