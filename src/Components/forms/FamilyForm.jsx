import { Button, Card, CardContent, Grid, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createFamily, editFamily, getFamilyById } from '../../Services/FamilyService';
import {useNavigate} from "react-router-dom"
import Familia from '../../Models/familia.class';
import customTheme from '../../Styles/customTheme';
import { useDispatch, useSelector } from 'react-redux';
import {on,off} from "../../Store/Slices/alertSlice.js"


const FamilyForm = (props) => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const alert = useSelector(state => state.alert);
    const [familia, setFamilia] = useState(new Familia());

    useEffect(() => {
        if(props.id !== ""){
            
            getFamilyById(props.id)
            .then((result)=>{
                const fam = new Familia()
                // console.log(fam)
                fam.setData(result.data)
                setFamilia(fam)
            })
            .catch((error)=> console.log(error))
            
        }
    }, []);

    //METODOS
    const crearFamilia = (e)=>{
        e.preventDefault()
        if(familia.name===""){
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
        createFamily(JSON.stringify(familia))
        .then((response)=> {
            navigate("/familias")
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"success", message:'La familia ha sido creada con éxito.'}))
            }, 100)
        })
        .catch((error)=> {
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"error", message:'Error: La familia no pudo ser creada.'}))
            }, 100)
        })   
        
        
    }

    const editarFamilia = (e)=>{
        e.preventDefault()
        if(familia.name===""){
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
        editFamily(JSON.stringify(familia))
        .then((response)=>{
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"success", message:'La familia fue editada con éxito.'}))
            }, 100)
        })
        .catch((error)=> {
            dispatch(off({
                open: false,
                severity:alert.alert.severity,
                message:alert.alert.message
            }))
            setTimeout(() => {   
                dispatch(on({open:true,severity:"error", message:'La familia no pudo ser editada.'}))
            }, 100)
        })   
    }

    const handleChanges = (e) => {
        console.log(e.target.name + " | " + e.target.value )
        setFamilia({...familia,[e.target.name] : e.target.value})    
    }
    
    

    //RENDER
    return (
        
        <Grid container direction="column" alignContent="center" justifyContent="center">
            <ThemeProvider theme={customTheme}>
                <Card sx={{ mt: 2, width: "400px", color:"green", backgroundColor:"#50A060" }}>
                    <Typography sx={{fontWeight:"bold", fontStyle:"italic"}} variant="h4" color="#262626" margin="10px" marginLeft="20px">
                        {(props.id==="" ? "Nueva familia" : "Editar familia")}
                    </Typography>
                    <CardContent>
                        <form onSubmit={(props.id==="") ? crearFamilia : editarFamilia}>
                            <TextField value={familia.name} 
                                name="name" label="Nombre" color="obscure" 
                                onChange={handleChanges} sx={{ display: "flex", margin: ".5rem 0" }} />
                            <TextField value={familia.description}
                                name="description" label="Descripción" color="obscure" 
                                onChange={handleChanges} multiline rows={4} sx={{display: "flex", margin: ".5rem 0" }} />
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

export default FamilyForm;
