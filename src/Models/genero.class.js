import Familia from "../Models/familia.class"
const FamilyService = require("../Services/FamilyService")


export default class Genero{

    genus_id
    name
    description
    family_id

    constructor(){
        this.genus_id = ""
        this.name = ""
        this.description = ""
        this.family_id = ""
    }

    setData(data){
        this.genus_id = data.genus_id
        this.name = data.name
        this.description = data.description
        this.family_id = data.family_id
    }

    getFamilia (){
        
        FamilyService.getFamilyById(this.family_id)
        .then((result)=>{
            
            return result.data
        })
        .catch((error)=> {return(error)})
        
        
    }

}