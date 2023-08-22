import { Button, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';
import { SIZES } from '../Models/Sizes.enum';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';

const Stocks = (props) => {

    const {stocks} = props

    const [changedStocks, setChangedStocks] = useState([]);
    
    const handleChanges = (e)=>{
        e.preventDefault()
        //encuentra el stock afectado
        let stockEditado = stocks.find((stock)=>stock.stock_id.toString()===e.target.id.toString())
        //busca si el stock esta en los cambiados
        const found = changedStocks.findIndex((stock)=> stock.stock_id.toString()===e.target.id.toString())
        if(found===-1){
            stockEditado = {...stockEditado,[e.target.name] :e.target.value}
            setChangedStocks(changedStocks.concat(stockEditado))
        } else{
            const nuevaChangedStocks = changedStocks
            stockEditado = {...stockEditado,[e.target.name] :e.target.value}
            nuevaChangedStocks[found] = stockEditado
            console.log(stockEditado)
            console.log(nuevaChangedStocks[found])
            setChangedStocks(nuevaChangedStocks)
        }
        // setGenero({...genero,[e.target.name] : e.target.value})  
    }

    const handleDelete = (id)=>{
        props.eliminar(id)
    }

    const handleEdit = (e)=>{
        e.preventDefault()
        props.editar(changedStocks)

    }

    return (
        
            <CardContent sx={{height:"100%", width: '100%', overflow: 'hidden'}} style={{display:"flex", flexDirection:"column", justifyContent:"space-between", verticalAlign:"center"}}>
                <TableContainer  style={{maxHeight: 245 }}>
                <Table stickyHeader size="small" style={{border:"1px", marginTop:"0px"}}>
                    <TableHead >
                        <TableRow>
                            <TableCell align="left"  style={{fontWeight: "bold"}}>
                                <Typography sx={{fontWeight:"bold"}} variant="h6" color="secondary">
                                    Tamaño
                                </Typography>
                            </TableCell>
                            <TableCell align="left"  style={{fontWeight: "bold"}}>
                                <Typography sx={{fontWeight:"bold"}} variant="h6" color="secondary" >
                                    Cantidad
                                </Typography>
                            </TableCell>
                            <TableCell align="left" style={{fontWeight: "bold"}}>
                                <Typography sx={{fontWeight:"bold"}} variant="h6" color="secondary" >
                                    Precio
                                </Typography>
                            </TableCell>
                            <TableCell align="left" width="60px"></TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    
                        {stocks.map((stock) => (
                            <TableRow
                                key={stock.stock_id}
                                sx={{borderColor:"secondary", '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    <select key={stock.stock_id} value={stock.size} name="size" id="size">
                                        <option value={SIZES.SIZE_5_10}>{SIZES.SIZE_5_10}</option>
                                        <option value={SIZES.SIZE_10_15}>{SIZES.SIZE_10_15}</option>
                                        <option value={SIZES.SIZE_15_20}>{SIZES.SIZE_15_20}</option>
                                        <option value={SIZES.SIZE_20_25}>{SIZES.SIZE_20_25}</option>
                                        <option value={SIZES.SIZE_25_30}>{SIZES.SIZE_25_30}</option>
                                        <option value={SIZES.SIZE_30_35}>{SIZES.SIZE_30_35}</option>
                                        <option value={SIZES.SIZE_35_40}>{SIZES.SIZE_35_40}</option>
                                        <option value={SIZES.SIZE_40_45}>{SIZES.SIZE_40_45}</option>
                                        <option value={SIZES.SIZE_45_50}>{SIZES.SIZE_45_50}</option>
                                        <option value={SIZES.SIZE_50_75}>{SIZES.SIZE_50_75}</option>
                                        <option value={SIZES.SIZE_75_100}>{SIZES.SIZE_75_100}</option>
                                        <option value={SIZES.SIZE_100_125}>{SIZES.SIZE_100_125}</option>
                                        <option value={SIZES.SIZE_125_150}>{SIZES.SIZE_125_150}</option>
                                        <option value={SIZES.SIZE_150_175}>{SIZES.SIZE_150_175}</option>
                                        <option value={SIZES.SIZE_175_200}>{SIZES.SIZE_175_200}</option>
                                        <option value={SIZES.SIZE_ABOVE200}>{SIZES.SIZE_ABOVE200}</option>
                                    </select> cms.
                                    
                                </TableCell>
                                <TableCell>
                                    
                                    <input style={{borderColor:"white", border:0, outline:0, width:"100px"}} onChange={handleChanges} defaultValue={stock.amount} type="number" id={stock.stock_id} name="amount" />
                                </TableCell>
                                <TableCell >
                                    
                                    <input style={{borderColor:"white", border:0, outline:0,  width:"100px"}} defaultValue={stock.price} type="number" id={stock.stock_id} name="price" />
                                </TableCell>
                                <TableCell>
                                    <div style={{display:"flex", flexDirection:"row"}}>
                                        <IconButton onClick={()=> handleDelete(stock.stock_id)} color="secondary">
                                            <ClearIcon></ClearIcon>
                                        </IconButton>
                                    </div>
                                
                                </TableCell>
                                
                            </TableRow>
                        ))}
                        
                    </TableBody>
                    
                </Table>
                </TableContainer>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"end"}}>
                    <Button style={{margin:"20px"}} variant="contained" color="secondary" 
                        startIcon={<SaveIcon/>} onClick={handleEdit}>Guardar cambios</Button>
                </div>                
            </CardContent>  
        
        
    );
}
Stocks.propTypes = {
    stocks: PropTypes.array.isRequired,
    eliminar: PropTypes.func.isRequired,
    editar: PropTypes.func.isRequired
}

export default Stocks;
