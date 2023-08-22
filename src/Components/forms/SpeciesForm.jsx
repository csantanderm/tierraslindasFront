import React, { useEffect, useState } from 'react';
import { Avatar, Button, CardContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material'
import { IRRIGATIONTYPES } from '../../Models/IrrigationTypes.enum';
import { getAllGenus} from '../../Services/GenusService';
import { createSpecies, getSpeciesById, editSpecies } from '../../Services/SpeciesService';
import { useNavigate } from 'react-router-dom';
import generic_species from "../../Images/generic_species.png"
import { uploadImg } from '../../Services/FileService';

const SpeciesForm = (props) => {
    
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
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

    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        //CARGA EL SELECT
        getAllGenus()
        .then((response) => {
            setGeneros(response.data)
        })
        .catch((error)=> console.log(error))

        //CARGA LA TAREA
        if(props.id !== ""){
            
            getSpeciesById(props.id)
            .then((result)=>{
                setEspecie(result.data)
            })
            .catch((error)=> console.log(error))
            
            
        }

        
    }, []);

    //METODOS
    const guardarImagen = ()=>{
        const formData = new FormData()
        formData.append("myFile",file.file, file.filename)
        uploadImg(formData.get("myFile"))
        .then((response)=> console.log(response))
        .catch((error)=> console.log(error))
    }

    const crearEspecie = (e)=>{
        e.preventDefault()
        createSpecies(JSON.stringify(especie))
        .then((response)=> {
            if(especie.img!==""){
                guardarImagen()
            }
            alert("Especie creada con éxito.")
        })
        .catch((error)=> alert(error))   
        navigate("/especies")
    }

    const editarEspecie = (e)=>{
        e.preventDefault()
        editSpecies(JSON.stringify(especie), props.id)
        .then((response)=> {
            if(especie.img!==""){
                guardarImagen()
            }
            alert("Especie editada con éxito.")
        })
        .catch((error)=> alert(error))   
    }

    const handleChanges = (e) => {
        console.log(e.target.name + " | " + e.target.value) 
        setEspecie({...especie,[e.target.name] : e.target.value.toString()})    
    }

    const handleSwitch = (e) =>{
        setEspecie({...especie,[e.target.name] : e.target.checked})
    }

    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }
        //TODO: deleteFile()
        const archivo = e.target.files[0];
        const { name } = archivo;
        const r = (Math.random() +1).toString(36).substring(2)
        const extension = name.split(".").pop()
        const img = {
            file: archivo,
            filename: r+"."+extension,
        }
        setFile(img)
        setEspecie({...especie,[e.target.name] : img.filename})
    };
    
    //RENDER
    return (
        <div style={{margin:"30px"}}>
            
            <CardContent>
                <form onSubmit={(props.id==="") ? crearEspecie : editarEspecie}>
                    <div style={{ display:"flex", flexDirection:"row", alignContent:"space-around"}}>
                        <FormControl variant="standard"  sx={{width:"250px", display:"flex", m: 1, minWidth: 120 }}>
                            <InputLabel id="lbGenus" color="success">Género</InputLabel>
                            <Select value={especie.genus_id} name="genus_id" defaultValue="" labelId="lbFamily" color="success" 
                                sx={{ display: "flex", margin: ".5rem 0" }}
                                onChange={handleChanges}>
                                {generos.map(genero =>(
                                    <MenuItem value={Number(genero.genus_id)} key={genero.genus_id}>{genero.name}</MenuItem>
                                ))}                                
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ display:"flex", m: 1, minWidth: 120 }}>
                            <InputLabel id="labelIrrigation" color="success">Irrigación</InputLabel>
                            <Select value={especie.irrigation} name="irrigation" defaultValue="" labelId="labelIrrigacion" color="success" 
                                sx={{ display: "flex", margin: ".5rem 0" }}
                                onChange={handleChanges}>
                                <MenuItem value={IRRIGATIONTYPES.HIGH}>{IRRIGATIONTYPES.HIGH}</MenuItem>
                                <MenuItem value={IRRIGATIONTYPES.MEDIUM}>{IRRIGATIONTYPES.MEDIUM}</MenuItem>
                                <MenuItem value={IRRIGATIONTYPES.LOW}>{IRRIGATIONTYPES.LOW}</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel labelPlacement="start" sx={{color:"gray"}} control={
                            <Switch name="publish" checked={especie.publish} onChange={handleSwitch}/>} label="Visible" >
                        </FormControlLabel>
                    </div>
                    
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div style={{width:"49%"}}>
                            <TextField value={especie.cientificname} name="cientificname" variant="filled" label="Nombre científico" color="success" 
                                onChange={handleChanges} sx={{display:"flex", margin: ".5rem 0" }} />
                        </div>
                        <div style={{width:"49%"}}>
                            <TextField value={especie.name} name="name" variant="filled" label="Nombre" color="success" 
                                onChange={handleChanges} sx={{display:"flex", margin: ".5rem 0"}} />
                        </div>
                        
                    </div>
                    
                    
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <div style={{width:"49%"}}>
                            <TextField value={especie.description} name="description" variant="filled" color="success" label="Descripción" 
                                onChange={handleChanges} multiline rows={4} sx={{ display: "flex", margin: ".5rem 0" }} />
                        
                        </div>
                        <div style={{width:"49%"}}>
                            
                                
                                <Button component="label" variant="outlined" color="secondary">
                                    Subir imagen
                                    <input name="img" type="file" accept="image/*" hidden onChange={handleFileUpload} ></input>
                                </Button>
                            
                            
                            
                            <Avatar alt="caca" sx={{bgcolor: "black", width: 95, height: 95 }}
                                src={(especie.img!=="") ? "http://localhost:4000/image/"+especie.img : generic_species}>
                            </Avatar>
                        </div>                  
                    </div>
                    <div align="right">
                        <Button variant="contained" color="secondary" type="submit">{(props.id==="") ? "Crear" : "Editar"}</Button>
                    </div>

                </form>
            </CardContent>
        </div>
    )
}

export default SpeciesForm;
