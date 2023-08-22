import { Card, CardActionArea, CardContent, Divider, Grid, Pagination, Stack, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState} from 'react';
import { getVisibleSpecies } from '../../Services/SpeciesService';
import SpeciesCard from '../../Components/SpeciesCard';
import customTheme from '../../Styles/customTheme';

const HomePage = () => {

    const [especies, setEspecies] = useState([]);
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(1);
    const [selectedSpecies, setSelectedSpecies] = useState([]);

    useEffect(() => {
        getVisibleSpecies()

        .then((response)=>{
            setEspecies(response.data)
            setPages(obtenerPaginas(response.data))
            obtenerEspeciesPagina(page,response.data)
        })
        .catch((error)=> console.log(error))
        
    }, []);

    const obtenerPaginas = (data)=>{
        const pages=data.length/4

        if (pages===Math.round(pages)){
            return Number(Math.trunc(pages))
        } else{
            return Number(Math.trunc(pages)+1)
        }
    }

    const obtenerEspeciesPagina = (page,data)=>{
        const valMax = (page*4)-1
        const valMin = valMax - 3

        console.log(valMin+" "+valMax + "total: "+(data.length-1))
        if (valMax<=data.length-1){
            setSelectedSpecies(data.slice(valMin,4))
        } else{
            setSelectedSpecies(data.slice(valMin))
        }
    }

    const handlePageChange = (event,value)=>{
        setPage(value)
        obtenerEspeciesPagina(value,especies)
    }

    return (
        <div>
            <Grid container direction="column" alignContent="center" justifyContent="center">
                <div style={{marginTop:"10px", width: "1000px" , height:"440px" }}>
                    
                    <CardContent >
                        
                        <h2  style={{marginLeft:"15px", color:'#50A060'}}>INICIO</h2>
                        
                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                                <Stack direction="row" spacing={2}>
                                    {selectedSpecies.map((especie)=>(
                                        <Card key={especie.species_id} style={{backgroundColor:"#50A060", width:"230px"}} >
                                            <CardActionArea href={'/especies/detalle/'+especie.species_id}>
                                                <SpeciesCard  species={especie}></SpeciesCard>
                                            </CardActionArea>
                                            
                                        </Card>
                                        
                                    ))}
                                </Stack>
                            </div>

                            <ThemeProvider theme={customTheme}>
                                <Pagination style={{marginTop:"10px" ,alignSelf:"center"}} count={pages} color="soulgreen"
                                    shape="rounded" variant="outlined" onChange={handlePageChange}/>            
                            </ThemeProvider>
                                               
                        </div>
                    </CardContent>
                    
                </div>
            </Grid>
        </div>
    );
}

export default HomePage;
