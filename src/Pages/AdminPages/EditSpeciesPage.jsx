import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpeciesForm from '../../Components/forms/SpeciesForm';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Stocks from '../../Components/Stocks';
import StockForm from '../../Components/forms/StockForm';
import { createStock, deleteStock, editStock, getAllStocksById } from '../../Services/StockService';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
            <div>
                {children}
            </div>
            )}
      </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const EditSpeciesPage = () => {
    const {id} = useParams()
    const [page, setPage] = useState(0);
    
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        if(id!==""){
            getAllStocksById(id)
            .then((response)=> {
                console.log(response)
                setStocks(response.data)
            })
            .catch((error)=> console.log(error))
        }
    }, []);

    //METODOS STOCKFORM
    const crearStock = (newStock)=>{
        createStock(JSON.stringify(newStock))
        .then((response)=>{
            console.log(response)
            alert("El stock ha sido creado.")
            getAllStocksById(id)
            .then((response)=> {
                console.log(response)
                setStocks(response.data)
            })
            .catch((error)=> console.log(error))
        })
        .catch((error)=>console.log(error))

    }

    //METODOS STOCKS
    const eliminarStock = (id)=>{
        console.log(id)
        deleteStock(id)
        .then((response)=>{
            alert("El stock ha sido eliminado.")
        })
        .catch((error)=> console.log(error))
        setStocks(stocks.filter(stock => stock.stock_id!==id)) 
    }

    const editarStocks = (editStocks)=>{
        console.log(editStocks)
        editStocks.map((stock)=>{
            editStock(JSON.stringify(stock))
            .then((result)=>console.log (result))
            .catch((error)=>console.log(error))
        })
        alert("Se han guardado los cambios.")
    }


    const handleChange = (event, newValue) => {
        setPage(newValue);
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} 
                aria-labelledby={`vertical-tab-${index}`}
                {...other}>
                    {value === index && (
                    <Box >
                        {children}
                    </Box>
                    )}
            </div>
        );
    }

    

    return (

        
        <div>
            <Grid container direction="column" alignContent="center" justifyContent="center">
                <Card sx={{ mt: 1, width: "800px", height:"430px", backgroundColor:"#ffffffbe", color:"green" }}>
                    
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display:"flex", flexDirection:"row"}}>
                        <Typography variant="h4" mt={3} ml={5}>
                            ESPECIE
                        </Typography>
                        <div style={{marginTop:"20px", marginLeft:"200px"}}>
                            <Tabs value={page} onChange={handleChange} centered 
                                aria-label="basic tabs example">
                                <Tab label="General" {...a11yProps(0)} />
                                <Tab label="Stock" {...a11yProps(1)} />
                            </Tabs>
                        </div>  
                        
                    </Box>
                    <TabPanel value={page} index={0}>
                        <SpeciesForm id={id}/>
                    </TabPanel>
                    <TabPanel value={page} index={1}>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <StockForm id={id} create={crearStock} />
                            <Divider orientation="vertical" flexItem></Divider>
                            <Stocks editar={editarStocks} eliminar={eliminarStock} stocks={stocks}/>
                        </div>
                    </TabPanel>
                </Card>
            </Grid>
        </div>
    );
}

export default EditSpeciesPage;
