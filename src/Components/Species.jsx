import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { getAllSpecies, deleteSpecies} from '../Services/SpeciesService';
import { getAllGenus } from '../Services/GenusService';
import { getAllFamilies } from '../Services/FamilyService';


const Species = () => {
    const navigate = useNavigate()
    const [especies, setEspecies] = useState([]);
    const [generos, setGeneros] = useState([])
    const [familias, setFamilias] = useState([]);

    const handleDelete = (id) =>{
        deleteSpecies(id)
        .then((response)=> console.log(response))
        .catch((error)=> console.log(error))  
        alert("Especie eliminada con éxito.")
        setEspecies(especies.filter(species => species.species_id!==id)) 
    }

    const handleEdit = (id) =>{
        navigate("/especies/"+id)
    }
    const shorterText = (text, number)=>{
        return text.slice(0,number-1)+"..."
    }

    const getGeneroFamilia = (id) =>{
        let name=""
        generos.map((genero)=>{
            if(genero.genus_id===id){
                name = genero.name
                familias.map((familia)=>{
                    if(familia.family_id===genero.family_id){
                        name = familia.name + " -> " + name 
                        return name
                    }
                })    
            }
        })
        console.log(name)
        return name
    }

    useEffect(() => {
        getAllSpecies()
        .then((response) => {
            setEspecies(response.data)
            getAllGenus()
            .then((response)=>{
                setGeneros(response.data)
                getAllFamilies()
                .then((response)=>{
                    setFamilias(response.data)
                })
                .catch()
            })
            .catch()
        })
        .catch((error)=> console.log(error))

    }, []);

    return (
        <div style={{width:"800px"}}>
            
            <Card style={{display:"flex", backgroundColor:"#ffffffbe", flexDirection:"column", 
                    marginTop:".7rem",  width:"100%"}}>
                
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <Typography sx={{fontWeight:"bold", fontStyle:"italic"}} variant="h4" color="secondary" margin="10px" marginLeft="20px">
                        Especies
                    </Typography>
                    <Button style={{margin:"10px"}} variant="outlined" color="secondary" startIcon={<AddBoxIcon/>} 
                        onClick={()=>navigate("/especies/new")}>Nueva
                    </Button>
                </div>

                <CardContent>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" width="125px" style={{fontWeight: "bold"}}>
                                    <Typography sx={{fontWeight:"bold"}} variant="h6" color="secondary" >
                                        Nombre
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>
                                    <Typography sx={{fontWeight:"bold"}} variant="h6" color="secondary" >
                                        {"Familia -> Género"}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>
                                    <Typography sx={{fontWeight:"bold"}} variant="h6" color="secondary" >
                                        Descripción
                                    </Typography>
                                </TableCell>
                                <TableCell align="left" width="60px"></TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {especies.map((especie) => (
                                <TableRow
                                    key={especie.species_id}
                                    sx={{borderColor:"secondary", '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {especie.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {getGeneroFamilia(especie.genus_id)}
                                    </TableCell>
                                    <TableCell align="justify">{shorterText(especie.description,67)}</TableCell>
                                    <TableCell align="justify">
                                        <div style={{display:"flex", flexDirection:"row"}}>
                                            <Button variant="outlined" color="secondary" startIcon={<ModeEditIcon/>} onClick={()=> handleEdit(especie.species_id)}>Editar</Button>
                                            <IconButton variant="contained" color="secondary" onClick={()=> handleDelete(especie.species_id)}>
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
        </div>
    );
}

export default Species;
