import { Divider} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import generic_species from "../Images/generic_species.png"

const SpeciesCard = (props) => {
    
    const {species} = props

    return (
        <div style={{color:"#262626",display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <div style={{marginLeft:"10px",fontSize:"22px", fontWeight:"bold"}}>
                {species.name}
            </div>
            <div  style={{alignSelf:"flex-end",marginRight:"10px", fontStyle:"italic"}}>
                {species.cientificname}
            </div>
            
            <Divider ></Divider>
            <div style={{display:"flex", flexDirection:"row", paddingTop:"10px", 
                paddingBottom:"10px", justifyContent:"center"}}>
                
                <img width="200" height="200px" src={(species.img!=="") 
                    ? "http://localhost:4000/image/"+species.img 
                    : generic_species} alt="caca">
                </img>
            </div>
            
        </div>
            
        
    );
}

SpeciesCard.propTypes = {
    species: PropTypes.object.isRequired,
    key: PropTypes.string
}

export default SpeciesCard;
