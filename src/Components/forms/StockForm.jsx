import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { SIZES } from '../../Models/Sizes.enum';
import { createStock } from '../../Services/StockService';
import PropTypes from 'prop-types';

const StockForm = (props) => {

    const {id} = props
    const [stock, setStock] = useState({
        species_id: id,
        size: "",
        amount: "",
        price: ""
    });

    const handleChanges = (e) =>{
        e.preventDefault()
        setStock({...stock,[e.target.name] : e.target.value.toString()})    
    }

    const crearStock = (e) =>{
        e.preventDefault()
        props.create(stock)
    }
    
    return (
        <div style={{margin:"30px"}} >
            <form onSubmit={crearStock}>
                <div style={{display:"flex", flexDirection:"column", width:"100%", justifyContent:"center" }}>
                    <FormControl variant="standard" sx={{minWidth: 120 }}>
                        <InputLabel id="labelSize" color="success">Tamaño(cm)</InputLabel>
                        <Select value={stock.size} name="size"  labelId="labelSize" color="success" 
                            sx={{ display: "block",  margin: ".5rem 0" }}
                            onChange={handleChanges}>
                            <MenuItem value={SIZES.SIZE_5_10}>{SIZES.SIZE_5_10}</MenuItem>
                            <MenuItem value={SIZES.SIZE_10_15}>{SIZES.SIZE_10_15}</MenuItem>
                            <MenuItem value={SIZES.SIZE_15_20}>{SIZES.SIZE_15_20}</MenuItem>
                            <MenuItem value={SIZES.SIZE_20_25}>{SIZES.SIZE_20_25}</MenuItem>
                            <MenuItem value={SIZES.SIZE_25_30}>{SIZES.SIZE_25_30}</MenuItem>
                            <MenuItem value={SIZES.SIZE_30_35}>{SIZES.SIZE_30_35}</MenuItem>
                            <MenuItem value={SIZES.SIZE_35_40}>{SIZES.SIZE_35_40}</MenuItem>
                            <MenuItem value={SIZES.SIZE_40_45}>{SIZES.SIZE_40_45}</MenuItem>
                            <MenuItem value={SIZES.SIZE_45_50}>{SIZES.SIZE_45_50}</MenuItem>
                            <MenuItem value={SIZES.SIZE_50_75}>{SIZES.SIZE_50_75}</MenuItem>
                            <MenuItem value={SIZES.SIZE_75_100}>{SIZES.SIZE_75_100}</MenuItem>
                            <MenuItem value={SIZES.SIZE_100_125}>{SIZES.SIZE_100_125}</MenuItem>
                            <MenuItem value={SIZES.SIZE_125_150}>{SIZES.SIZE_125_150}</MenuItem>
                            <MenuItem value={SIZES.SIZE_150_175}>{SIZES.SIZE_150_175}</MenuItem>
                            <MenuItem value={SIZES.SIZE_175_200}>{SIZES.SIZE_175_200}</MenuItem>
                            <MenuItem value={SIZES.SIZE_ABOVE200}>{SIZES.SIZE_ABOVE200}</MenuItem>
                        </Select>
                    </FormControl>
                    
                        <TextField value={stock.amount} type="number" size="small" name="amount" variant="filled" label="Cantidad" 
                            color="success" onChange={handleChanges} sx={{ display: "block" , margin: ".5rem 0" }} />
                    
                    
                        <TextField value={stock.price} type="number" size="small" name="price" variant="filled" label="Precio($)" 
                            color="success" onChange={handleChanges} sx={{ display: "block", margin: ".5rem 0" }} />
                    <div style={{marginTop:"40px", display:"flex", flexDirection:"row", justifyContent:"center"}}>
                        <Button type="submit" variant="contained" color="secondary" >Añadir</Button>
                    </div>
                </div>
                
            </form>
            
            
        </div>
    );
}


StockForm.propTypes = {
    // stock: PropTypes.string.isRequired, // name debe ser un string y es requerido (isRequired)
    id: PropTypes.string.isRequired,
    create: PropTypes.func.isRequired // onClick debe ser una función y es requerido (isRequired)
};

export default StockForm;
