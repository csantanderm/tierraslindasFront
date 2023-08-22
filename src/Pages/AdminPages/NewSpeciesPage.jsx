import React from 'react';
import SpeciesForm from '../../Components/forms/SpeciesForm';
import { Card, Grid, Typography } from '@mui/material';

const NewSpeciesPage = () => {
    return (
        <div>
            
        
            <Grid container direction="column" alignContent="center" justifyContent="center">
                <Card sx={{ mt: 1, width: "600px", color:"green", background: "white" }}>
                    <Typography variant="h4" mt={3} ml={5}>
                        NUEVA ESPECIE
                    </Typography>
                    
                    <SpeciesForm id=""></SpeciesForm>
                    
                </Card>
            </Grid>
        </div>
    );
}

export default NewSpeciesPage;
