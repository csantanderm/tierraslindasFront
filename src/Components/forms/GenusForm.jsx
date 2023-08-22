import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getGenusById, editGenus, createGenus } from '../../Services/GenusService';
import {useNavigate} from "react-router-dom"
import { getAllFamilies } from '../../Services/FamilyService';
import { useDispatch, useSelector } from 'react-redux';
import {on,off} from "../../Store/Slices/alertSlice.js"
import customTheme from '../../Styles/customTheme';


const GenusForm = (props) => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);

    const [genero, setGenero] = useState({
        genus_id: "",
        name: "",
        description: "",
        family_id: "",
    });
    const [familias, setFamilias] = useState([]);

    useEffect(() => {
         //CARGA EL SELECT
         getAllFamilies()
         .then((response) => {
             setFamilias(response.data)
         })
         .catch((error)=> console.log(error))
        
         //CARGA EL GENERO
        if(props.id !== ""){
            
            getGenusById(props.id)
            .then((result)=>{
                setGenero(result.data)
            })
            .catch((error)=> console.log(error))
            
        }
    }, []);

    //METODOS
    const crearGenero = (e)=>{
        e.preventDefault()
        if(genero.name==="" || genero.family_id===""){
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"warning", message:'Los campos "nombre" y "familia" no pueden estar vacíos.'}))
            }, 100)
            return
        }
        createGenus(JSON.stringify(genero))
        .then((response)=> {
            navigate("/generos")
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"success", message:'El género ha sido creado con éxito.'}))
            }, 100)
        })
        .catch((error)=> {
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"error", message:'Error: El género no pudo ser creado.'}))
            }, 100)
        })
        
    }

    const editarGenero = (e)=>{
        e.preventDefault()
        if(genero.name===""){
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"warning", message:'El campo "nombre" no puede estar vacío.'}))
            }, 100)
            return
        }
        editGenus(JSON.stringify(genero))
        .then((response)=>{
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"success", message:'El género fue editado con éxito.'}))
            }, 100)
        })
        .catch((error)=> {
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"error", message:'El género no pudo ser editado.'}))
            }, 100)
        })   
         
    }

    const handleChanges = (e) => {
        console.log(e.target.name + " | " + e.target.value )
        setGenero({...genero,[e.target.name] : e.target.value})    
    }
    
    //RENDER
    return (
        <Grid container direction="column" alignContent="center" justifyContent="center">
            <ThemeProvider theme={customTheme}>
                <Card sx={{ mt: 2, width: "400px", color:"green", backgroundColor:"#50A060" }}>
                    <Typography sx={{fontWeight:"bold", fontStyle:"italic"}} variant="h4" color="#262626" margin="10px" marginLeft="20px">
                        {(props.id==="" ? "Nuevo género" : "Editar género")}
                    </Typography>
                    <CardContent>
                        <form onSubmit={(props.id==="") ? crearGenero : editarGenero}>
                            <FormControl variant="standard"  sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="lbFamily" color="obscure">Familia</InputLabel>
                                <Select value={genero.family_id} name="family_id" defaultValue="" labelId="lbFamily" color="obscure" 
                                    sx={{padding:"0", display: "block", margin: ".5rem 0" }} inputProps={{MenuProps: {MenuListProps: {sx: {backgroundColor: '#50A060'}}}}}
                                    onChange={handleChanges}>
                                    {familias.map(family =>(
                                        <MenuItem value={Number(family.family_id)} key={family.family_id}
                                                    style={{backgroundColor:"#50A060"}} >
                                            {family.name}</MenuItem>
                                    ))}                                
                                </Select>
                            </FormControl>
                            <TextField value={genero.name} 
                                name="name"  label="Nombre" color="obscure" 
                                onChange={handleChanges} sx={{ display: "flex", margin: ".5rem 0" }} />
                            <TextField value={genero.description}
                                name="description" label="Descripción" color="obscure" 
                                onChange={handleChanges} multiline rows={4} sx={{display: "flex", margin: ".5rem 0"}} />
                            <div align="right">
                                <Button variant="contained" color="obscure" type="submit">{(props.id==="") ? "Crear" : "Editar"}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </ThemeProvider>
            


        </Grid>
    );
}

export default GenusForm;
